"use strict";

/** Recipes Routes */
const express = require("express");
const fetch = require('node-fetch');

const router = express.Router();

const BASE_URL = 'https://api.edamam.com/api/recipes/v2'
const API_ID = process.env.REACT_APP_API_ID
const API_KEY = process.env.REACT_APP_API_KEY

/** ROUTES FOR NON-ADMIN USERS AND ADMIN USERS */

/** GET Request => /recipes => { recipes }
 * 
 * Function: Retrieves Recipes Based on a Query
 * 
 * Returns: 
 * 
 * Authorization Required: Non-Admin or Admin
*/

router.get("/", async(req, res, next) => { 
  const query = req.query;
  console.log(query);
  
  try {
    const recipes = await fetch (
      `${BASE_URL}?type=public&q=${query}&app_id=${API_ID}&app_key=${API_KEY}`);
    console.log(recipes)
    return res.json({ recipes })
  } catch (err) {
    return next(err);
  }
});


/** GET Request => /recipes/[id] => { recipe }
 * 
 * Function: Retrieves A Single Recipe 
 * 
 * Returns: 
 * 
 * Authorization Required: Non-Admin or Admin
*/

router.get("/:id", async (req, res, next) => {
  try {
    const recipe = await fetch (
      `${BASE_URL}/${req.params.id}?type=public&app_id=${API_ID}&app_key=${API_KEY}`);
    console.log(recipe);
    return res.json({ recipe })
  } catch (err) {
    return next(err);
  }
});




module.exports = router;