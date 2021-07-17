import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Recipe from './Recipe';


function Home () {

  const API_ID = process.env.REACT_APP_API_ID
  const API_KEY = process.env.REACT_APP_API_KEY

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('')

  useEffect(() => {
    const getRecipes = async () => {
      const resp = await fetch (
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
      <Header />
        <div className="container">
          <form className="search-form" onSubmit={getSearch}>
            <input className="search-bar" type="text" 
                  value={search} onChange={updateSearch}/>
            <button 
              className="search-button" 
              type="submit">
                Search
            </button>
        </form>
        
        <p>Example: 'Vegetarian Soup', 'Low-Calorie Lunch", 'Keto-Friendly', etc.</p>

        <div className="recipes">
          {recipes.map((recipe, index) => (
            <Recipe
              className="recipe"
              key={index}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              source={recipe.recipe.url}
            />
          ))}
          </div>
        </div>
      <Footer />
    </div>
  )
};

export default Home;