"use strict";

const db = require('../db');
const bcrypt = require('bcrypt');
const { sqlForSpecificUpdate } = require('../helpers/sql');
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError
} = require('../expressError'); 

const { BCRYPT_WORK_FACTOR } = require('../config');

/** Related Functions for Users. */

class User {

  /** Authenticate
   * 
   * Function: Authenticate user w/ username & pasword
   * Returns: { username, first_name, last_name, email, is_admin, profile_pic_url }
   * 
   * Throws UnautorizedError if user is not found or invalid password.
   */
  static async authenticate(username, password) {
    const res = await db.query(
          `SELECT username,
                  password,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  is_admin AS "isAdmin",
                  profile_pic_url AS "profilePicUrl"
           FROM users
           WHERE username = $1`,
        [username]
    );

    const user = res.rows[0];

    if(user) {
      // Compare hashed password to a new hash from password.
      const isValid = await bcrypt.compare(password, user.password);
      if(isValid === true) {
        delete user.password;
        return user;
      }
    }
    throw new UnauthorizedError("Invalid username/password.")
  }

  /** Register
   * 
   * Function: Register user with data.
   * Return: { username, firstName, lastName, email, isAdmin }
   * 
   * Throws BadRequestError on duplicate registrations.
   */
  static async register(
    { username, password, firstName, lastName, email, isAdmin, profilePicUrl }) {
    const duplicateCheck = await db.query(
          `SELECT username
           FROM users
           WHERE username = $1`,
          [username],
      );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`)
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const res = await db.query(
      `INSERT INTO users
        (username,
         password,
         first_name,
         last_name,
         email,
         is_admin,
         profile_pic_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin", profile_pic_url AS "profilePicUrl"`,
      [
        username,
        hashedPassword,
        firstName,
        lastName,
        email,
        isAdmin,
        profilePicUrl
      ],
    );

    const user = res.rows[0];
    return user;
  }

  /** Get All
   * 
   * Function: Retrieves all users' data.
   * Returns: [{ username, first_name, last_name, email, is_admin }, ...]
   * 
   */

  static async getAll() {
    const res = await db.query(
          `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  is_admin AS "isAdmin",
                  profile_pic_url AS "profilePicUrl"
           FROM users
           ORDER BY username`
    );
    return res.rows;
  }

  /** Get User
   * 
   * Function: Retrives a single user's data.
   * Return: { username, first_name, last_name, email, is_admin, profile_pic_url }
   * 
   * Throws NotFoundError if user is not found.
   */

  static async getUser(username) {
    const userRes = await db.query(
          `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email,
                  is_admin AS "isAdmin",
                  profile_pic_url AS "profilePicUrl"
           FROM users
           WHERE username = $1`,
          [username],
    );
    
    const user = userRes.rows[0];

    if(!user) throw new NotFoundError(`No user: ${username}`);

    const userFavoriteRes = await db.query(
          `SELECT f.recipe_id
           FROM favorites AS f
           WHERE f.username = $1`, 
          [username]);
    
    user.favorites = userFavoriteRes.rows.map(f => f.recipe_id);
    return user;
  }

  /** Update
   * 
   * Function: Updates user profile with `data`; primarily for "specific update"
   * will only change provided fields, which can include firstName, lastName, password,
   * email, and admin status
   * Return: { username, firstName, lastName, email, isAdmin }
   * 
   * Throws NotFoundError if not found.
   * 
   * WARNING: this function can set a new password or make a user an admin.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */
  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR)
    }

    const { setCols, values } = sqlForSpecificUpdate (
      data,
      {
        firstName: "first_name",
        lastName: "last_name",
        isAdmin: "is_admin"
      });
    
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users
                      SET ${setCols}
                      WHERE username = ${usernameVarIdx}
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email,
                                is_admin AS "isAdmin"`;

    const res = await db.query(querySql, [...values, username]);
    const user = res.rows[0];

    if(!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  };

  /** Delete
   * 
   * Function: Deletes a given users from database
   * Return: undefined
   * 
   * Throw NotFound Error if user is not found.
   */

  static async delete(username) {
    let res = await db.query(
        `DELETE
         FROM users
         WHERE username = $1
         RETURNING username`,
      [username]);
    
    const user = res.rows[0];

    if(!user) throw new NotFoundError(`No user: ${username}`)
  };

  /** Favorite 
   * 
   * Function: Favorite a recipe
   * Return: undefined
   * 
   * Throws NotFoundError if no recipe is found.
   */

  static async makeFavorite(username, recipeId) {
    const preCheck = await db.query(
          `SELECT id
           FROM recipes
           WHERE id = $1`, [recipeId]);
    const recipe = preCheck.rows[0];

    if(!recipe) throw new NotFoundError(`No recipe: ${recipeId}`);

    const preCheck2 = await db.query(
          `SELECT username
           FROM users
           WHERE username = $1`, [username]);
    const user = preCheck2.rows[0];

    if(!user) throw new NotFoundError(`No username: ${username}`)

    await db.query(
          `INSERT INTO favorites (recipe_id, username)
           VALUES ($1, $2)`,
        [recipeId, username]);
  }

  // static async getFavorites(username) {
  //   const recipeRes = await db.query(
  //         `SELECT recipe_id as "recipeId",
  //                 username
  //          FROM favorites
  //          WHERE username = $1`, [username]);
      
  //   const recipes = recipeRes.rows[0];

  //   if(!recipes) throw new NotFoundError(`No Favorites for: ${username}`)

  //   return recipes;
  // };
}

module.exports = User;