import React, {Component} from 'react';
import {Switch, Route } from "react-router-dom";
import './App.css';

import axios from 'axios';

import Header from './../components/Header';
import Footer from './../components/Footer';

import RecipeList from './../components/RecipeList';
import RecipeForm from './../components/RecipeForm';

import LoginForm from './../components/LoginForm';
import ProfileList from './../components/ProfileList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      users: [],
      isLoggedIn: false
    }

    this.addRecipe = this.addRecipe.bind(this);
    this.fetchRecipes = this.fetchRecipes.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {

    if (localStorage.getItem('ccs-batch-maker-token')) {
      axios.defaults.headers.common["Authorization"] = `Token ${localStorage.getItem('ccs-batch-maker-token')}`;
      this.setState({isLoggedIn: true});
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

  render() {
    // console.log('app props', this.props);
    return (<React.Fragment>
      <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
      <Switch>
        <Route path="/login/" render={() => <LoginForm handleSubmit={this.handleLogin}/>}/>
        <Route path="/recipes/new/" render={() => <RecipeForm handleSubmit={this.addRecipe}/>}/>
        <Route path="/recipes/" render={() => <RecipeList recipes={this.state.recipes}/>}/>
        <Route path="/users/" render={() => <ProfileList users={this.state.users}/>}/>
      </Switch>
      <Footer/>
    </React.Fragment>);
  }
}

export default App;
