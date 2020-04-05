import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, TextField } from '@material-ui/core';
import Cookies from 'js-cookie';

class LoginForm extends Component {

  state = {
      username: '',
      email: '',
      password: ''
    }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const csrftoken = Cookies.get('csrftoken');
    const options = {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'X-CSRFToken': csrftoken,
        'Content-Type': 'application/json'
      }
    }

    fetch(`/api/v1/rest-auth/login/`, options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('ccs-batch-maker', JSON.stringify(data));
        this.props.history.push('/recipes');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              autoFocus
              type="password"
              value={this.state.password}
              onChange={this.handleInput}
            />

        <Button variant="contained" color="primary" type='submit'>Sign In</Button>
        <Link to="/register/">Don't have an account? Register</Link>
      </form>
    )
  }
}

export default LoginForm;
