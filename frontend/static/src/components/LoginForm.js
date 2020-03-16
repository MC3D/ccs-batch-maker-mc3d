import React, {Component} from 'react';

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

        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" value={this.state.username} onChange={this.handleInput}/>

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleInput}/>

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleInput}/>

        <button>Login!</button>
      </form>
    )
  }
}





export default LoginForm;
