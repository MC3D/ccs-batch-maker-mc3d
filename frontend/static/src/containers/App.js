import React, {Component} from 'react';
import {Switch, Route } from "react-router-dom";
import './App.css';

import axios from 'axios';

import Header from './../components/Header';
import Footer from './../components/Footer';

import RecipeList from './../components/RecipeList';
import RecipeForm from './../components/RecipeForm';
import RecipeDetail from './../components/RecipeDetail';

import IngredientList from './../components/IngredientList';
import IngredientForm from './../components/IngredientForm';

import LoginForm from './../components/LoginForm';
import RegistrationForm from './../components/RegistrationForm';

import Following from './../components/Following';
import Followers from './../components/Followers';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      following: [],
      followers: [],
      isLoggedIn: false,
      selectedRecipe: null,
      result: 'No result'
    }

    this.addRecipe = this.addRecipe.bind(this);
    this.fetchRecipes = this.fetchRecipes.bind(this);
    this.fetchFollowing = this.fetchFollowing.bind(this);
    this.fetchFollowers = this.fetchFollowers.bind(this);
    // this.followUser = this.followUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.selectRecipe = this.selectRecipe.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('ccs-batch-maker-user')) {
      const token = JSON.parse(localStorage.getItem('ccs-batch-maker-user')).key;
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      this.setState({
        isLoggedIn: true
      });
      this.fetchRecipes();
    }
  }

  fetchFollowers(user) {
    // let user = JSON.parse(localStorage.getItem('ccs-batch-maker-user')).user.id;
    axios.get(`/api/v1/users/${user}/followers`).then(res => {
      this.setState({followers: res.data});
    }).catch(error => {
      console.log('error fetching users', error);
    });
  }

  fetchFollowing(user) {
    // let user = JSON.parse(localStorage.getItem('ccs-batch-maker-user')).user.id;
    axios.get(`/api/v1/users/${user}/following`).then(res => {
      this.setState({following: res.data});
    }).catch(error => {
      console.log('error fetching users', error);
    });
  }

  fetchRecipes(user) {
    axios.get(`/api/v1/recipes/`).then(res => {
      this.setState({recipes: res.data});
    }).catch(error => {
      console.log('error fetching recipes', error);
    });
  }

  handleLogin(e, user) {
    e.preventDefault();
    axios.post(`/api/v1/rest-auth/login/`, user).then(res => {
      localStorage.setItem('ccs-batch-maker-user', JSON.stringify(res.data));
      axios.defaults.headers.common["Authorization"] = `Token ${res.data.key}`;
      this.setState({
        isLoggedIn: true
      }, () => this.props.history.push('/recipes/'));
      this.fetchRecipes();
    }).catch(error => {
      console.log('error logging in', error);
    });
  }

  handleLogout(e) {
    axios.post(`/api/v1/rest-auth/logout/`).then(res => {
      localStorage.removeItem('ccs-batch-maker-user');
      delete axios.defaults.headers.common["Authorization"];
      this.setState({
        isLoggedIn: false
      }, () => this.props.history.push('/login/'));
    }).catch(error => {
      console.log('error logging out', error);
    });
  }

  handleRegistration(e) {
    console.log(e);
  }

  addRecipe(e, recipe) {
    e.preventDefault();

    let {recipes} = this.state;
    const keys = Object.keys(recipe);

    let formData = new FormData();
    keys.forEach(key => formData.append(key, recipe[key]));

    axios.post(`/api/v1/recipes/`, formData).then(res => {
      recipes.push(res.data);
      this.setState({recipes});

    }).catch(error => {
      console.log('error adding recipe', error);
    });
  }

  // followUser(user, following) {
  //   axios.post(`/api/v1/users/connections/`, {user, following}).then(res => {
  //     console.log(res);
  //   }).catch(error => {
  //     console.log('error adding recipe', error);
  //   });
  // }

  selectRecipe(selectedRecipe) {
    this.setState({
      selectedRecipe
    }, () => this.props.history.push(`/recipes/${selectedRecipe.id}`));
  }

  render() {
    const user = localStorage.getItem('ccs-batch-maker-user') ? JSON.parse(localStorage.getItem('ccs-batch-maker-user')).id : null;
    return (
      <React.Fragment>
        <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
        <Switch>
          <Route path={`/accounts/${user}/following/`} render={() => <Following users={this.state.following} fetchData={() => this.fetchFollowing(user)}/>}/>
          <Route path={`/accounts/${user}/followers/`} render={() => <Followers users={this.state.followers} fetchData={() => this.fetchFollowers(user)}/>}/>
          <Route path="/ingredients/:id/edit/" render={() => <IngredientForm />}/>
          <Route path="/recipes/new/" render={() => <RecipeForm handleSubmit={this.addRecipe}/>}/>
          <Route path="/recipes/:id/" render={() => <RecipeDetail selectedRecipe={this.state.selectedRecipe} />}/>
          <Route path="/ingredients/new/" render={() => <IngredientForm />}/>
          <Route path="/ingredients/" render={() => <IngredientList />}/>
          <Route path="/login/" render={() => <LoginForm handleSubmit={this.handleLogin}/>}/>
          <Route path="/recipes/" render={() => <RecipeList recipes={this.state.recipes} selectRecipe={this.selectRecipe}/>}/>
          <Route path="/register/" render={() => <RegistrationForm handleSubmit={this.handleRegistration}/>}/>
        </Switch>
        <Footer/>
      </React.Fragment>);
  }
}

export default App;
