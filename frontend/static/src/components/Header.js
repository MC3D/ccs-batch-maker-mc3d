import React from 'react';
import {NavLink} from "react-router-dom";

function Header(props) {
  return (
    <header>
    <ul className="menu">
      {props.isLoggedIn ? (
        <React.Fragment>
          <li><NavLink to="/recipes/new/">New Recipe</NavLink></li>
          <li><NavLink to="/recipes/">Recipes</NavLink></li>
          <li><NavLink to="/users/">Find Users</NavLink></li>
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
