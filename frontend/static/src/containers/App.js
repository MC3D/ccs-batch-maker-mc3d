import React, {Component} from 'react';
import './App.css';

import axios from 'axios';

import LoginForm from './../components/LoginForm';
import RecipeList from './../components/RecipeList';
import RecipeForm from './../components/RecipeForm';

import ProfileList from './../components/ProfileList';

axios.defaults.headers.common["Authorization"] = `Token ${localStorage.getItem('ccs-batch-maker-token')}`;

class App extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      users: []
    }

    this.addRecipe = this.addRecipe.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {

     axios.get(`/api/v1/recipes/`)
     .then(res => {
         this.setState({recipes: res.data});
     })
     .catch(error => {
         console.log(error);
     });

     axios.get(`/api/v1/accounts/`)
     .then(res => {
         this.setState({users: res.data});
     })
     .catch(error => {
         console.log(error);
     });
}
   handleLogin(e, user) {
    e.preventDefault();
    axios.post(`/api/v1/rest-auth/login/`, user)
    .then(res => {
        // console.log(res);
        localStorage.setItem('ccs-batch-maker-token', res.data.key);
    })
    .catch(error => {
        console.log(error);
    });

   }

   handleLogout(e) {
     axios.post(`/api/v1/rest-auth/logout/`)
     .then(res => {
         // console.log(res);
         localStorage.removeItem('ccs-batch-maker-token');
     })
     .catch(error => {
         console.log(error);
     });
   }

   addRecipe(e, recipe) {
     e.preventDefault();

     let {recipes} = this.state;
     const keys = Object.keys(recipe);

     let formData = new FormData();
     keys.forEach(key => formData.append(key, recipe[key]));

     axios.post(`/api/v1/recipes/`, formData)
     .then(res => {
       console.log(res);
       recipes.push(res.data);
       this.setState({recipes});

     })
     .catch(error => {
       console.log(error);
     });
   }

  render() {
    // console.log(this.state.users);
    return (
      <React.Fragment>
        <button type='button' onClick={this.handleLogout}>Logout</button>
        <LoginForm handleSubmit={this.handleLogin}/>
        <RecipeForm handleSubmit={this.addRecipe}/>
        {/*<RecipeList recipes={this.state.recipes}/>*/}
        {/*<ProfileList users={this.state.users}/>*/}
      </React.Fragment>
    );
  }
}

export default App;
