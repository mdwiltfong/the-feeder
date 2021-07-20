import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import './Header.css'

function Header({ logout }) {
  const { currentUser } = useContext(UserContext);

  function loggedInNav() {
    return (
      <ul className="navbar-nav ml-auto">
      <li className="nav-item mr-4">
        <NavLink className="nav-link" to="/favorites">
          Favorites
        </NavLink>
      </li>
      <li className="nav-item mr-4">
        <NavLink className="nav-link" to="/profile">
          Profile
        </NavLink>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/" onClick={logout}>
          Log out {currentUser.first_name || currentUser.username}
        </Link>
      </li>
    </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <a className="link" href="https://developer.edamam.com/edamam-docs-recipe-api">
            Edaman API
          </a>
        </li>
      </ul>
    );
  }
  
  return (
    <header>
      <nav className="Navigation navbar navbar-expand-md">
        {currentUser ? loggedInNav() : loggedOutNav()}
      </nav>
      The Feeder
      <p>A Simple Recipe Directory</p>
      <small>Brought to You By the Edaman Recipe Search API</small>
    </header>
  );
}

export default Header;