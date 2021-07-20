import React, { useState, useEffect } from 'react';
import FeederAPI from '../api/feeder_api';
import Search from '../common/SearchForm';
import LoadingSpinner from '../common/LoadingSpinner';
import Recipe from './Recipe';


function RecipeSearch () {

  const [recipes, setRecipes] = useState([]);

  useEffect(function getRecipesOnMount() {
    search();
  }, []);

  async function search(keywords) {
    let recipes = await FeederAPI.getRecipes(keywords)
    setRecipes(recipes);
  }

  if(!recipes) return <LoadingSpinner />

  return (
    <div className="App">
      <div className="container">
       <Search searchFor={search} />

        <div className="recipes">
          {recipes && recipes.map((recipe, index) => (
            <Recipe
              className="recipe"
              key={recipe.recipe.uri}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              source={recipe.recipe.url}
            />
          ))}
          </div>
        </div>
    </div>
  )
};

export default RecipeSearch;