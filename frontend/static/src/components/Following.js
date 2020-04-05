import React, {Component} from 'react';

class Followers extends Component{
  // componentDidMount() {
  //   this.props.fetchData();
  // }

  render() {
    const users = this.props.users.map(user => (
      <li key={user.id}>
        <h1>{user.username}</h1>
      </li>
    ))

    return(
      <ul>{users}</ul>
    )
  }
}

export default Followers;
