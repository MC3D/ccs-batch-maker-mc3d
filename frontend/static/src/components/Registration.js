import React, { useState } from 'react';
import { Link } from "react-router-dom";
// import Cookies from 'js-cookie';

 function Registration() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  return (
      <form>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          name='username'
          placeholder='Enter username'
          value={username}
          onChange={(e) => {setUsername(e.target.value)}}/>

        <label htmlFor='email'>Username</label>
        <input
          id='email'
          type='email'
          name='email'
          placeholder='Enter email'
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}/>

        <label htmlFor='password1'>Password</label>
        <input
          id='password1'
          type='password'
          name='password1'
          placeholder='Enter password'
          value={password1}
          onChange={(e) => {setPassword1(e.target.value)}}/>

        <label htmlFor='password2'>Confirm password</label>
        <input
          id='password2'
          type='password'
          name='password2'
          placeholder='Confirm password'
          value={password2}
          onChange={(e) => {setPassword2(e.target.value)}}/>
        <button>Register</button>
        <Link to="/accounts/login/">Already have an account? Login</Link>

      </form>
    );

  // state = {
  //     username: '',
  //     email: '',
  //     password1: '',
  //     password2: ''
  //   }
  //
  //
  // handleInput = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // }
  //
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //
  //   // NEED TO BUILD REGISTRATION ENDPOINT FIRST!
  //
  //   // const csrftoken = Cookies.get('csrftoken');
  //   // const options = {
  //   //   method: 'POST',
  //   //   body: this.state,
  //   //   headers: {
  //   //     'X-CSRFToken': csrftoken,
  //   //   }
  //   // }
  //
  //   // fetch(`/api/v1/rest-auth/registration/`, options)
  //   //   .then((response) => response.json())
  //   //   .then((data) => {
  //   //     this.props.history.push('/recipes/')
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error('Error:', error);
  //   //   });
  // }
  //
  // render() {
  //   return (
  //     <form onSubmit={this.handleSubmit}>
  //       <div
  //             variant="outlined"
  //             margin="normal"
  //             required
  //             fullWidth
  //             id="username"
  //             label="Username"
  //             name="username"
  //             autoComplete="username"
  //             autoFocus
  //             value={this.state.username}
  //             onChange={this.handleInput}
  //           />
  //
  //       <div
  //             variant="outlined"
  //             margin="normal"
  //             required
  //             fullWidth
  //             id="email"
  //             label="Email Address"
  //             name="email"
  //             autoComplete="email"
  //             autoFocus
  //             type="email"
  //             value={this.state.email}
  //             onChange={this.handleInput}
  //           />
  //
  //       <div
  //             variant="outlined"
  //             margin="normal"
  //             required
  //             fullWidth
  //             id="password1"
  //             label="Password"
  //             name="password1"
  //             autoComplete="password"
  //             autoFocus
  //             type="password"
  //             value={this.state.password1}
  //             onChange={this.handleInput}
  //           />
  //
  //       <div
  //             variant="outlined"
  //             margin="normal"
  //             required
  //             fullWidth
  //             id="password2"
  //             label="Confirm Password"
  //             name="password2"
  //             autoComplete="confirm password"
  //             autoFocus
  //             type="password"
  //             value={this.state.password2}
  //             onChange={this.handleInput}
  //           />
  //
  //         <button variant="contained" color="primary">Register</button>
  //       <Link to="/login/">Already have an account? Login</Link>
  //     </form>
  //   )
  // }
}

export default Registration;
