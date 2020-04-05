import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import BaseLayout from './BaseLayout';

import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';

import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import PrivateRoute from './PrivateRoute';

import NotFound from './NotFound';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout>
          <Switch>
              <PrivateRoute path='/recipes/new' component={RecipeForm}/>
              <PrivateRoute path='/recipes/:recipeId' component={RecipeDetail}/>
              <PrivateRoute path='/recipes' component={RecipeList}/>
              <Route path='/accounts/register' component={RegistrationForm}/>
              <Route path='/accounts/login' component={LoginForm}/>
              <Route component={NotFound}/>
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    )
  }
}

export default Router;
