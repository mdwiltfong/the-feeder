import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Alert from "../common/Alert";

// Login Form.
// Component renders login form and calls the login function prop and redirects to /recipes
// Routed @ /login
// Routes -> LoginForm -> Alert


function LoginForm({ login }) {
  // creates variable for storing user
  const history = useHistory();

  // Sets initial state for formData
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  // Sets initial state for formErros
  const [formErrors, setFormErrors] = useState([]);

  // Handles form field updates
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  };

  // Handles form submission and redirects to /companies, if successful
  async function handleSubmit(evt) {
    evt.preventDefault();
    let res = await login(formData);
    if(res.success) {
      history.push("/recipes");
    } else {
      setFormErrors(res.errors)
    }
  }

  return (
     <div className="LoginForm">
       <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
         <h4 className="mb-3">Log In</h4>
         <div className="card">
           <div className="card-body">
             <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input 
                  name="username" 
                  class="form-control"
                  value={formData.username} 
                  onChange={handleChange}
                  autocomplete="username" 
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password"
                  name="password" 
                  class="form-control"
                  value={formData.password} 
                  onChange={handleChange}
                  autocomplete="current-password" 
                  required
                />
              </div>
              
              {formErrors.length
                ? <Alert type="danger" message={formErrors} />
                : null}
  
              <button className="btn btn-primary float-right" onSubmit={handleSubmit}>
                Submit
              </button>
              <button className="btn btn-light-sm float-left">
                <Link to="/">Back to Home</Link>
              </button>
             </form>
           </div>
         </div>
       </div>
     </div>
  )
}

export default LoginForm;