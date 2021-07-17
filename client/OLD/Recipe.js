import React, { useState, useEffect } from 'react';

function Recipe () {

  return (
    <div className="Recipe">
      <h1>{title}</h1>
      <p>{calories}</p>
      <img className={style.image} src={image} alt={title} />
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.text}
          </li>
        ))}
      </ul>
      <a href="/">
        <button>Back to Home</button>
      </a>
    </div>
  )
}

export default Recipe;

{recipes.map((recipe, index) => (
  <div className="col-md-4" key={index}>
    <Link to={`/recipes/${recipe.recipe.label}`}>
    <div className="card border-5">
    <img src={recipe.recipe.image} alt={recipe.recipe.label}/>
      <div className="card-body">
        <p>{recipe.recipe.label}</p>
        <p>{parseInt(recipe.recipe.calories)} Calories</p>
      </div>
    </div>
    </Link>