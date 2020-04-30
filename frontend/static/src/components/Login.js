import React, { useReducer, useContext } from 'react';
import { Link, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';

import { AppContext } from './../containers/App';

const initialState = {
  username: '',
  email: '',
  password: '',
  isSubmitting: false,
  errorMessage: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'HANDLE_INPUT':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

function Login(props) {

  // const [data, setData] = React.useState(initialState);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { state: store, dispatch: dispatchContext } = useContext(AppContext);

  const handleInput = e => dispatch({type: 'HANDLE_INPUT', payload: {[e.target.name]: e.target.value}});
  const { username, email, password } = state;

  const authenticate = (e) => {
    e.preventDefault();

    // setData({
    //   ...data,
    //   isSubmitting: true,
    //   errorMessage: null
    // });
    //
    const csrftoken = Cookies.get('csrftoken');
    const options = {
      method: 'POST',
      body: JSON.stringify(state),
      headers: {
        'X-CSRFToken': csrftoken,
        'Content-Type': 'application/json'
      }
    }

    fetch(`/api/v1/rest-auth/login/`, options)
      .then((res) => res.json())
      .then((resJSON) => {
        localStorage.setItem("ccs-batch-maker-token", resJSON.key);
        localStorage.setItem("ccs-batch-maker-user", JSON.stringify(resJSON.user));
        dispatchContext({
          type: 'LOGIN',
          payload: {
            user: resJSON.user,
            token: resJSON.key
          }
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (

    <React.Fragment>
      { store.isAuthenticated
          ?
          <Redirect to='/recipes' />
          :
          <form onSubmit={authenticate}>
            <label htmlFor='username'>Username</label>
            <input
              id='username'
              type='text'
              name='username'
              placeholder='Enter username'
              value={username}
              onChange={handleInput}/>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              name='email'
              placeholder='Enter email'
              value={email}
              onChange={handleInput}/>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              name='password'
              placeholder='Enter password'
              value={password}
              onChange={handleInput}/>
            <button>Login</button>
            <Link to="/accounts/register/">Don't have an account? Register</Link>
          </form>
        }
    </React.Fragment>

    );
};
export default Login;
