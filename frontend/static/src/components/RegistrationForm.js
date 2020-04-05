import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, TextField } from '@material-ui/core';
// import Cookies from 'js-cookie';

class RegistrationForm extends Component {

  state = {
      username: '',
      email: '',
      password1: '',
      password2: ''
    }


  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // NEED TO BUILD REGISTRATION ENDPOINT FIRST!

    // const csrftoken = Cookies.get('csrftoken');
    // const options = {
    //   method: 'POST',
    //   body: this.state,
    //   headers: {
    //     'X-CSRFToken': csrftoken,
    //   }
    // }

    // fetch(`/api/v1/rest-auth/registration/`, options)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.props.history.push('/recipes/')
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={this.state.username}
              onChange={this.handleInput}
            />

        <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleInput}
            />

        <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password1"
              label="Password"
              name="password1"
              autoComplete="password"
              autoFocus
              type="password"
              value={this.state.password1}
              onChange={this.handleInput}
            />

        <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password2"
              label="Confirm Password"
              name="password2"
              autoComplete="confirm password"
              autoFocus
              type="password"
              value={this.state.password2}
              onChange={this.handleInput}
            />

        <Button variant="contained" color="primary">Register</Button>
        <Link to="/login/">Already have an account? Login</Link>
      </form>
    )
  }
}

export default RegistrationForm;
