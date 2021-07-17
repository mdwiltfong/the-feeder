"use strict";

const db = require('../db');
const { sqlForSpecificUpdate } = require('../helpers/sql');
const { NotFoundError } = require("../expressError");

class Recipe {

  // Create Recipes 
  static async create(data) {
    const res = await db.query(
          `INSERT INTO recipes (title, 
                               calories,
                               image,
                               ingredients,
                               source)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id, title, calories, image, ingredients, source`,
          [
            data.title,
            data.calories,
            data.image,
            data.ingredients,
            data.source
          ]);
    let recipe = res.rows[0];
      
    return recipe;
  }

  // Get All Recipes
  static async getAll ({ title, calories, ingredients } = {}) {
    let query = `SELECT r.id,
                        r.title,
                        r.calories,
                        r.image,
                        r.ingredients,
                        r.source
                 FROM recipes r`;
      
    let whereExpressions = [];
    let queryValues = [];

    if (title !== undefined) {
      queryValues.push(`%${title}%`);
      whereExpressions.push(`title ILIKE $${queryValues.length}`);
    }

    if(calories !== undefined) {
      queryValues.push(calories);
      whereExpressions.push(`calories >= $${queryValues.length}`);
    }

    if (ingredients !== undefined) {
      queryValues.push(`%${ingredients}%`);
      whereExpressions.push(`ingredients ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    query += " ORDER BY title";
    const recipesRes = await db.query(query, queryValues);
    return recipesRes.rows;
  };

  // Get Single Recipe
  static async getRecipe(id) {
    const recipeRes = await db.query(
          `SELECT id,
                  title,
                  calories,
                  image,
                  ingredients,
                  source
           FROM recipes
           WHERE id = $1`, [id]);
      
    const recipe = recipeRes.rows[0];

    if(!recipe) throw new NotFoundError(`No recipe: ${id}`)

    return recipe;
  };

  // Update Recipe
  static async update(id, data) {
    const { setCols, values } = sqlForSpecificUpdate(
        data,
        {});
      
    const idVarIdx = "$" + (values.length + 1);
  
    const querySql = `UPDATE recipes
                      SET ${setCols}
                      WHERE id = ${idVarIdx}
                      RETURNING id,
                                title,
                                calories,
                                image,
                                ingredients,
                                source`;
    const res = await db.query(querySql, [...values, id]);
    const recipe = res.rows[0];
  
    if(!recipe) throw new NotFoundError(`No recipe: ${id}`);
  
    return recipe;
  };

  // Delete Recipe
  static async delete(id) {
    const res = await db.query(
         `DELETE
          FROM recipes
          WHERE id = $1
          RETURNING id`,
        [id]);
  
    const recipe = res.rows[0];
  
    if(!recipe) throw new NotFoundError(`No recipe: ${id}`);
  }
}

module.exports = Recipe;