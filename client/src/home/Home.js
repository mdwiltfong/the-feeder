import React from 'react';
import { Link } from 'react-router-dom';

/** The Feeder App Homepage -> '/'
 * Routes -> Home
 * 
 */

function Home() {

  return (
    <div className="Home">
      <div className="container text-center">
        <div className="image-container">
          <img src="images/dinner_plate.jpg" alt="dinner_plate" width="400" height="300" />
        </div>
        <p>
          <Link className="btn btn-dark font-weight-bold mr-3" to="/login">Log In</Link>
          <Link className="btn btn-dark font-weight-bold mr-3" to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Home;