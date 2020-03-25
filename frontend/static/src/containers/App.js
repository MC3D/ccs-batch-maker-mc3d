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
import ProfileList from './../components/ProfileList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      users: [],
      isLoggedIn: false,
      selectedRecipe: null
    }

    this.addRecipe = this.addRecipe.bind(this);
    this.fetchRecipes = this.fetchRecipes.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.followUser = this.followUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.selectRecipe = this.selectRecipe.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('ccs-batch-maker-token')) {
      axios.defaults.headers.common["Authorization"] = `Token ${localStorage.getItem('ccs-batch-maker-token')}`;
      this.setState({
        isLoggedIn: true
      }, () => this.props.history.push('/recipes/'));
      this.fetchUsers();
      this.fetchRecipes();
    }
  }

  fetchRecipes() {
    axios.get(`/api/v1/recipes/`).then(res => {
      this.setState({recipes: res.data});
    }).catch(error => {
      console.log('error fetching recipes', error);
    });
  }

  fetchUsers() {
    axios.get(`/api/v1/accounts/`).then(res => {
      this.setState({users: res.data});
    }).catch(error => {
      console.log('error fetching users', error);
    });
  }

  handleLogin(e, user) {
    e.preventDefault();
    axios.post(`/api/v1/rest-auth/login/`, user).then(res => {
      localStorage.setItem('ccs-batch-maker-token', res.data.key);
      axios.defaults.headers.common["Authorization"] = `Token ${res.data.key}`;
      this.setState({
        isLoggedIn: true
      }, () => this.props.history.push('/recipes/'));
      this.fetchRecipes();
      this.fetchUsers();
    }).catch(error => {
      console.log('error logging in', error);
    });
  }

  handleLogout(e) {
    axios.post(`/api/v1/rest-auth/logout/`).then(res => {
      localStorage.removeItem('ccs-batch-maker-token');
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

  followUser(user) {
    axios.post(`/api/v1/accounts/${user.id}/connections/`).then(res => {
      console.log(res);
    }).catch(error => {
      console.log('error adding recipe', error);
    });
  }

  selectRecipe(selectedRecipe) {
    this.setState({
      selectedRecipe
    }, () => this.props.history.push(`/recipes/${selectedRecipe.id}`));
  }

  render() {
    console.log('this app.js')
    return (
      <React.Fragment>
        <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
        <Switch>
          <Route path="/ingredients/:id/edit/" render={() => <IngredientForm />}/>
          <Route path="/recipes/new/" render={() => <RecipeForm handleSubmit={this.addRecipe}/>}/>
          <Route path="/recipes/:id/" render={() => <RecipeDetail selectedRecipe={this.state.selectedRecipe} />}/>
          <Route path="/pantry/" render={() => <IngredientList />}/>
          <Route path="/login/" render={() => <LoginForm handleSubmit={this.handleLogin}/>}/>
          <Route path="/recipes/" render={() => <RecipeList recipes={this.state.recipes} selectRecipe={this.selectRecipe}/>}/>
          <Route path="/register/" render={() => <RegistrationForm handleSubmit={this.handleRegistration}/>}/>
          <Route path="/users/" render={() => <ProfileList users={this.state.users} followUser={this.followUser}/>}/>
        </Switch>
        <Footer/>
      </React.Fragment>);
  }
}

export default App;
