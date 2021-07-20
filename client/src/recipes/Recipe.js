import React, {useContext, useState } from 'react';
import UserContext from '../auth/UserContext';
import './Recipe.css' 

function Recipe ({ uri, title, image, calories, ingredients, source }) {

  const { hasFavoritedRecipe, makeFavorite } = useContext(UserContext);
  const [favorited, setFavorited] = useState();

  React.useEffect(function updateFavoritedStatus() {
    console.log("RecipeCard useEffect updateFavoritedStatus", "id=", uri);
    setFavorited(hasFavoritedRecipe(uri));
  }, [uri, hasFavoritedRecipe]);

  async function handleFavorite(uri) {
    if(hasFavoritedRecipe(uri)) return;
    makeFavorite(uri);
    setFavorited(true);
  }


  return(
    <div className="Recipe"> {favorited}
      <div className="card">
        <img className="card-img-top" src={image} alt={title}/>
          <h5 className="card-title">{title}</h5>
          <p>{parseInt(calories/6)} Calories Per Serving</p>
    
            <ul className="ingredients">
              {ingredients.map((ingredient) => (
                <li key={uri}><small>{ingredient.text}</small></li>
              ))}
            </ul>
    
          <p>
            <button className="btn btn-primary float-right" to={source}>
              Full Recipe
            </button>
          </p>

          <p>
            <button 
              className="btn btn-primary float-left" 
              onClick={handleFavorite}
              disabled={favorited}>
              {favorited ? "Favorited" : "Favorite"}
            </button>
          </p>
         
      </div>
    </div>
  )
}

export default Recipe;