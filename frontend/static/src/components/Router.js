import React from 'react'; // you need to import React when you're using JSX

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import App from './App';

import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';

import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

import NotFound from './NotFound';

const history = createBrowserHistory();

// stateless component
const Router = () => (
  <BrowserRouter history={history}>
    <App>
      <Switch>
        <Route path='/recipes/new' component={RecipeForm}/>
        <Route path='/recipes/:recipeId' component={RecipeDetail}/>
        <Route path='/recipes' component={RecipeList}/>
        <Route path='/accounts/register' component={RegistrationForm}/>
        <Route path='/accounts/login' component={LoginForm}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </BrowserRouter>
)

export default Router;
