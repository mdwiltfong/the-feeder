<form className="search-form" onSubmit={handleSubmit}>

        <div className="form-input">
          <label>Main Ingredient:</label>
          <input
            id='main_ingredient'
            type='text'
            name='main_ingredient'
            value={formData.main_ingredient}
            onChange={handleChange}
            required/>
        </div>

        <div className="form-input">
          <Select
            className="dt_dropdown"
            name="diet_type"
            components={animatedComponents}
            options={diet_type}
            closeMenuOnSelect={false}
            isMulti/>
        </div>

        <div className="form-input">
          <Select
            className="hr_dropdown"
            name="health_restrictions"
            components={animatedComponents}
            options={health_restrictions}
            closeMenuOnSelect={false}
            isMulti/>
        </div>

        <div className="form-input">
          <Select
            className="mt_dropdown"
            name="meal_type"
            components={animatedComponents}
            options={meal_type}
            closeMenuOnSelect={false}
            isMulti/>
        </div>

        <div className="form-input">
          <Select
            className="dt2_dropdown"
            name="dish_type"
            components={animatedComponents}
            options={dish_type}
            closeMenuOnSelect={false}
            isMulti/>
        </div>

        <div className="form-input">
          <Select
            className="ct_dropdown"
            name="cuisine_type"
            components={animatedComponents}
            options={cuisine_type}
            closeMenuOnSelect={false}
            isMulti/>
        </div>

        <div className="form-input">
          <label>Minimum Calories:</label>
            <input
              id='min_calories'
              type='integer'
              name='min_calories'
              value={formData.min_calories}
              onChange={handleChange}/>
        </div>
        
        <div className="form-input">
          <label>Maximum Calories:</label>
            <input
              id='max_calories'
              type='integer'
              name='max_calories'
              value={formData.max_calories}
              onChange={handleChange}/>
        </div>

        <div className="form-input">
          <label>Minimum Prep Time:</label>
            <input
              id='min_prep'
              type='integer'
              name='min_prep'
              value={formData.min_prep}
              onChange={handleChange}/>
        </div>

        <div className="form-input">
          <label>Maximum Prep Time:</label>
            <input
              id='max_prep'
              type='integer'
              name='max_prep'
              value={formData.max_prep}
              onChange={handleChange}/>
        </div>

        <div className="form-input">
          <label>Exclude:</label>
            <input
              id='exclusions'
              type='text'
              name='exculsions'
              value={formData.excluded}
              onChange={handleChange}/>
        </div>
        
        <button className="search-button" onChange={handleSubmit}>Search</button>
      </form>