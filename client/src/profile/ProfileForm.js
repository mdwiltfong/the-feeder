import React, { useState, useContext } from "react";
import FeederApi from "../api/feeder_api";
import UserContext from "../auth/UserContext";
import Alert from "../common/Alert";

// Profile Form: Allows logged in users to edit their profile information
// Upon form submission, API saves new data and triggers a site-wide reload.
// A successful save renders an alert message.
// Routed @ /profile
// Routes -> ProfileForm -> Alert


function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext)

  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: ""
  });

  const [formErrors, setFormErrors] = useState([]);

  // Updates form field data
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
    setFormErrors([]);
  };

  // Handles form submission, by calling the signup function prop and redirecting
  // to companies route, if successful
  async function handleSubmit(evt) {
    evt.preventDefault();

    let userProfile = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password
    };

    let username = formData.username;
    let userUpdated;

    try {
      userUpdated = await FeederApi.profileSaver(username, userProfile)
    } catch (errors) {
      setFormErrors(errors);
      return;
    }
    setFormData(
      d => ({ ...d, password: "" }));
      setFormErrors([]);
      setCurrentUser(userUpdated);
  }

  return (
     <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
       <h2>Profile</h2>
       <div className="card">
         <div className="card-body">
          <form>
            <div className="form-group">
              <label>Username</label>
              <p className="form-control-plaintext">{formData.username}</p>
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                className="form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password to Make Changes:</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {formErrors.length
              ? <Alert type="danger" messages={formErrors} />
              : null}

            <button 
              className="btn btn-primary btn-block mt-4" 
              onClick={handleSubmit}>
              Save Changes
            </button>
          </form>
         </div>
       </div>
     </div>
  )
}

export default ProfileForm;
