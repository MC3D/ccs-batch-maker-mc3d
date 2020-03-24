import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button, TextField} from '@material-ui/core';

class RegistrationForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: ''
    }

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <form onSubmit={(e) => this.props.handleSubmit(e, this.state)}>
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

        <Button variant="contained" color="primary" onClick={(e) => this.props.handleSubmit(e, this.state)}>Register</Button>
        <Link to="/login/">Already have an account? Login</Link>
      </form>
    )
  }
}

export default RegistrationForm;
