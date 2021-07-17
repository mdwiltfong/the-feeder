"use strict";

/** Users Routes */
const express = require("express");
const jsonschema = require("jsonschema");

const router = express.Router();

const User = require("../models/user");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");
const { ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");
const { createToken } = require("../helpers/tokens");
const { BadRequestError } = require("../expressError");


/** ROUTES FOR NON-ADMIN USERS AND ADMIN USERS */

/** GET Request => /users/[username] => { user }
 * 
 * Function: Retrieves data on a single user
 * 
 * Returns: { username, firstName, lastName, isAdmin, favorites }
 * 
 * Authorization Required: Non-Admin or Admin
*/

router.get("/:username", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const user = await User.getUser(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** POST Request => /users/[username]/recipes/[id] { state } => { favorites }
 * 
 * Function: Favorite a recipe
 * 
 * Returns: { "favorited": recipeId }
 * 
 * Authorization Required: Non-Admin or Admin
*/

router.post("/:username/recipes/:id", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const recipeId = +req.params.id;
    await User.makeFavorite(req.params.username, recipeId);
    return res.json({ favorited: recipeId });
  } catch (err) {
    return next(err);
  }
});

/** GET Request => /users/[username]/recipes/favorites => { favorites }
 * 
 * Function: Retrieves favorite recipes of a single user
 * 
 * Returns: [ { id, title, calories, image, ingredients, source }, ...]
 * 
 * Authorization Required: Non-Admin or Admin
*/

router.get("/:username/recipes/favorites", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const recipes = await User.getFavorites(req.params.username);
    return res.json({ recipes });
  } catch (err) {
    return next(err);
  }
});


/** PATCH  => /users/[username] { user } => { user }
 * 
 * Function: Updates user profile
 *  Data can include: { firstName, lastName, password, email }
 * 
 * Returns: { username, firstName, lastName, email, isAdmin }
 * 
 * Authorization Required: Non-Admin or Admin
*/

router.patch("/:username", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if(!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** DELETE => /users/[username] => { deleted: username }
 * 
 * Function: Allows deletion of user
 *  Data can include: { firstName, lastName, password, email }
 * 
 * Returns: { "deleted": username }
 * 
 * Authorization Required: Non-Admin or Admin
*/

router.delete("/:username", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    await User.delete(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});

/** ROUTES FOR ADMIN USERS ONLY */

/** GET Request => /[username] => { user }
 * 
 * Function: Retrieves data on ALL users
 * 
 * Returns: { users: [ {username, firstName, lastName, isAdmin, email}, ... ] }
 * 
 * Authorization Required: Admin
*/

router.get("/", ensureAdmin, async (req, res, next) => {
  try {
    const users = await User.getAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});


/** POST Request => /users/{ user } => { user, token }
 * 
 * Function: Adds new users, who can also be admin
 * 
 * Returns: { user: { username, firstName, lastName, email, isAdmin }, token }
 * 
 * Authorization Required: Admin
*/

router.post("/", ensureAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    if(!validator.valid) {
      const errs = validator.errors.map(e => e.stack)
      throw new BadRequestError(errs);
    }
    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;