import React from 'react';

function Header(props) {
  // console.log('header props', props)
  return (
    <header>
    <ul className="menu">
      {props.isLoggedIn ? (
        <React.Fragment>
          <li><a href="/recipes/new/">New Recipe</a></li>
          <li><a href="/recipes/">Recipes</a></li>
          <li><a href="/users/">Find Users</a></li>
          <li><button type='button' onClick={props.handleLogout}>Logout</button></li>
        </React.Fragment>
      ) : (
        <li><a href="/login/">Login</a></li>
      )}
    </ul>
    </header>
  )
}

export default Header;
