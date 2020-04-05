import React, { Component } from 'react';
import { withRouter } from 'react-router'
import Cookies from 'js-cookie';
import Header from './Header';
import Footer from './Footer';

class BaseLayout extends Component {

  logout = () => {
    const csrftoken = Cookies.get('csrftoken');
    const options = {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrftoken,
      }
    }

    fetch(`/api/v1/rest-auth/logout/`, options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.removeItem('ccs-batch-maker');
        this.props.history.push('/accounts/login');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  render() {
    const isAuthenticated = localStorage.getItem('ccs-batch-maker') ? true : false;
    return (
      <React.Fragment>
        <Header isAuthenticated={isAuthenticated} logout={this.logout}/>
        { this.props.children }
        <Footer />
      </React.Fragment>
    );
  }
}
export default withRouter(BaseLayout);

//   fetchFollowers(user) {
//     console.log(user)
//     axios.get(`/api/v1/users/${user}/followers`).then(res => {
//       this.setState({followers: res.data}, () => console.log(res));
//     }).catch(error => {
//       console.log('error fetching users', error);
//     });
//   }
//
//   fetchFollowing(user) {
//     console.log(user)
//     // let user = JSON.parse(localStorage.getItem('ccs-batch-maker')).id;
//     axios.get(`/api/v1/users/${user}/following`).then(res => {
//       this.setState({following: res.data}, () => console.log(res));
//     }).catch(error => {
//       console.log('error fetching users', error);
//     });
//   }
//
//
//   // followUser(user, following) {
//   //   axios.post(`/api/v1/users/connections/`, {user, following}).then(res => {
//   //     console.log(res);
//   //   }).catch(error => {
//   //     console.log('error adding recipe', error);
//   //   });
//   // }
