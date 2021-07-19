import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Alert from "../common/Alert";

// Signup Form: show form and handle state updates upon changes
// Routed @ /signup
// Routes -> SignupForm -> Alert


function SignupForm({ signup }) {
  const history = useHistory();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  const [formErrors, setFormErrors] = useState([]);

  // Updates form field data
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  };

  // Handles form submission, by calling the signup function prop and redirecting
  // to companies route, if successful
  async function handleSubmit(evt) {
    evt.preventDefault();
    let res = await signup(formData);
    if(res.success) {
      history.push("/recipes");
    } else {
      setFormErrors(res.errors)
    }
  }

  return (
     <div className="SignupForm">
       <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
         <h4 className="mb-3">Sign Up</h4>
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
                />
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input 
                  name="firstName" 
                  class="form-control"
                  value={formData.firstName} 
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input 
                  name="lastName" 
                  class="form-control"
                  value={formData.lastName} 
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email"
                  name="email" 
                  class="form-control"
                  value={formData.email} 
                  onChange={handleChange}
                />
              </div>

              {formErrors.length
                ? <Alert type="danger" message={formErrors} />
                : null}
                
              <button 
                className="btn btn-primary float-right" 
                type="submit" 
                onSubmit={handleSubmit}>
                Submit
              </button>
              <button className="btn btn-light-sm float-left">
                <Link to="/login">Already a User?</Link>
              </button>
             </form>
           </div>
         </div>
       </div>
     </div>
  )
}

export default SignupForm;
