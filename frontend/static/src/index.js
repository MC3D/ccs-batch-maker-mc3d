import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './css/index.css';
import * as serviceWorker from './serviceWorker';

import App from './containers/App';

import Header from './components/Header';
import Footer from './components/Footer';

import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';

import Registration from './components/Registration';
import Login from './components/Login';

import NotFound from './components/NotFound';

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Header />
      <Switch>
          <Route path='/recipes/new' component={RecipeForm}/>
          <Route path='/recipes/:recipeId' component={RecipeDetail}/>
          <Route path='/recipes' component={RecipeList}/>
          <Route path='/accounts/register' component={Registration}/>
          <Route path='/accounts/login' component={Login}/>
          <Route component={NotFound}/>
      </Switch>
      <Footer />
    </App>
  </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
