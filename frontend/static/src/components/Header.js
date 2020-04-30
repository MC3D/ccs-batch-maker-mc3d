import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

import { AppContext } from './../containers/App';

function Header(props) {
  const { state: store, dispatch: dispatchContext } = useContext(AppContext);

  const logout = () => {
      const csrftoken = Cookies.get('csrftoken');
      const options = {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrftoken,
        }
      }

      fetch(`/api/v1/rest-auth/logout/`, options)
        .then((res) => res.json())
        .then((resJSON) => {
          localStorage.removeItem("ccs-batch-maker-token");
          localStorage.removeItem("ccs-batch-maker-user");
          dispatchContext({
            type: 'LOGOUT',
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

  return (
      <nav className='d-flex'>
        <h1>Batch Maker</h1>
        <ul className='ml-auto d-flex'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          <li><Link to="/recipes/new">New Recipe</Link></li>

          { store.isAuthenticated
            ?
              <li><button type='button' onClick={logout}>Logout</button></li>
            :
              <li><Link to="/accounts/login">Login</Link></li>
          }
        </ul>
      </nav>
  );
};
export default Header;
