import React, { useEffect, useState } from 'react';
import Recipe from '../Recipe';
import './App.css';

function App() {

  const API_ID = process.env.REACT_APP_API_ID
  const API_KEY = process.env.REACT_APP_API_KEY

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('')

  useEffect(() => {
    const getRecipes = async () => {
      const resp = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`);
      const data = await resp.json();
      setRecipes(data.hits);
    };
    getRecipes();
  }, [query, API_ID, API_KEY]);  

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <h1>MeMe's Menu</h1>
      <img src="/images/food_pic.png" alt="food_pic"></img>
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" 
               value={search} onChange={updateSearch}/>
        <button 
          className="search-button" 
          type="submit">
            Search
        </button>
      </form>
      <div className="recipes">
      {recipes.map((recipe, index) => (
        <Recipe 
          key={index} 
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
    </div>
    </div>
  );
}

export default App;
