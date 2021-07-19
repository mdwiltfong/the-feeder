import React, { useState } from "react";
import "./SearchForm.css";


function SearchForm({ searchFor }) {
   
  const [searchTerms, setSearchTerms] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    searchFor(searchTerms.trim() || undefined);
    setSearchTerms(searchTerms.trim());
  }

  function handleChange(evt) {
    setSearchTerms(evt.target.value);
  }

  return (
    <div className="SearchForm mb-4">
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control form-control-md flex-grow-1"
          name="searchTerms"
          placeholder="Example: 'Vegetarian Soup', 'Low-Calorie Lunch', 'Keto-Friendly', etc."
          value={searchTerms}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-md btn-dark">
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchForm;

