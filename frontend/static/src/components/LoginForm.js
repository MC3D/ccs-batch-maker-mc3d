import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button, TextField} from '@material-ui/core';

class LoginForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      username: '',
      email: '',
      password: ''
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
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              autoFocus
              type="password"
              value={this.state.password}
              onChange={this.handleInput}
            />

          <Button variant="contained" color="primary" onClick={(e) => this.props.handleSubmit(e, this.state)}>Sign In</Button>
        <Link to="/register/">Don't have an account? Register</Link>
      </form>
    )
  }
}

export default LoginForm;
