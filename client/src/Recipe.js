import React from 'react';
import './Recipe.css' 

function Recipe ({ index, title, image, calories, ingredients, source }) {

  return(
    <div className="Recipe">
      <div className="card">
        <img className="card-img-top" src={image} alt={title}/>
          <h5 className="card-title">{title}</h5>
          <p>{parseInt(calories/6)} Calories Per Serving</p>
    
            <ul className="ingredients">
              {ingredients.map((ingredient) => (
                <li key={index}><small>{ingredient.text}</small></li>
              ))}
            </ul>
    
          <p>
          <a className="btn btn-primary" href={source}>Full Recipe</a>
          </p>
      </div>
    </div>
  )
}

export default Recipe;