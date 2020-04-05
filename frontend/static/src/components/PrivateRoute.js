import React from 'react';
import { Route, Redirect } from "react-router-dom";

// https://tylermcginnis.com/react-router-protected-routes-authentication/
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('ccs-batch-maker')
      ? <Component { ...props } />
    : <Redirect to='/accounts/login' />
  )} />
)

export default PrivateRoute;
