import React from 'react';
import {NavLink} from "react-router-dom";

function Header(props) {
  const user = localStorage.getItem('ccs-batch-maker-user') ? JSON.parse(localStorage.getItem('ccs-batch-maker-user')).id : null;
  return (
    <header>
    <ul className="menu">
      {props.isLoggedIn ? (
        <React.Fragment>
          <li><NavLink to="/recipes/">Recipes</NavLink></li>
          <li><NavLink to="/recipes/new/">New Recipe</NavLink></li>
          <li><NavLink to="/pantry/">Pantry</NavLink></li>
          <li><NavLink to={`/accounts/${user}/following/`}>Following</NavLink></li>
          <li><NavLink to={`/accounts/${user}/followers/`}>Followers</NavLink></li>
          <li><button type='button' onClick={props.handleLogout}>Logout</button></li>
        </React.Fragment>
      ) : (
        <li><NavLink to="/login/">Login</NavLink></li>
      )}
    </ul>
    </header>
  )
}

export default Header;
