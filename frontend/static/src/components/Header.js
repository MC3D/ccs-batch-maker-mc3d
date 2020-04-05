import React from 'react';
import { NavLink } from "react-router-dom";

const Header = () => (
    <header>
    <ul className="menu">
      <li><NavLink to="/recipes/">Recipes</NavLink></li>
      <li><NavLink to="/recipes/new/">New Recipe</NavLink></li>
      <li><NavLink to="/pantry/">Pantry</NavLink></li>
      {/* NEED TO MAKE URLS DYNAMIC */}
      <li><NavLink to={`/accounts/2/following/`}>Following</NavLink></li>
      <li><NavLink to={`/accounts/2/followers/`}>Followers</NavLink></li>
      <li><NavLink to="/accounts/login/">Login</NavLink></li>
      <li><button type='button'>Logout</button></li>
    </ul>
    </header>
  )

export default Header;
