import React from 'react';
import Header from './Header';
import Footer from './Footer';

const App = (props) => (
  <React.Fragment>
    <Header />
    { props.children }
    <Footer />
  </React.Fragment>
)

export default App

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
//   handleLogout(e) {
//     axios.post(`/api/v1/rest-auth/logout/`).then(res => {
//       localStorage.removeItem('ccs-batch-maker-user');
//       delete axios.defaults.headers.common["Authorization"];
//       this.setState({
//         isLoggedIn: false
//       }, () => this.props.history.push('/login/'));
//     }).catch(error => {
//       console.log('error logging out', error);
//     });
//   }
//
//   // followUser(user, following) {
//   //   axios.post(`/api/v1/users/connections/`, {user, following}).then(res => {
//   //     console.log(res);
//   //   }).catch(error => {
//   //     console.log('error adding recipe', error);
//   //   });
//   // }
//
//   render() {
//     const user = localStorage.getItem('ccs-batch-maker-user') ? JSON.parse(localStorage.getItem('ccs-batch-maker-user')).id : null;
//     return (
//       <React.Fragment>
//         <Header isAuthenticated={this.state.isAuthenticated} handleLogout={this.handleLogout}/>
//         <Switch>
//           <PrivateRoute path={`/accounts/${user}/following/`} render={() => <Following users={this.state.following}/>}/>
//           <PrivateRoute path={`/accounts/${user}/followers/`} render={() => <Followers users={this.state.followers} fetchData={() => this.fetchFollowers(user)}/>}/>
//           <Route path="/ingredients/:id/edit/" render={() => <IngredientForm />}/>
//           <Route path="/recipes/new/" render={() => <RecipeForm handleSubmit={this.addRecipe}/>}/>
//           <PrivateRoute  path="/recipes/:id/" render={() => <RecipeDetail selectedRecipe={this.state.selectedRecipe} />}/>
//           <Route path="/ingredients/new/" render={() => <IngredientForm />}/>
//           <Route path="/ingredients/" render={() => <IngredientList />}/>
//           <Route path="/login/" render={() => <LoginForm handleSubmit={this.handleLogin}/>}/>
//           <PrivateRoute path="/recipes/" render={() => <RecipeList recipes={this.state.recipes} selectRecipe={this.selectRecipe}/>}/>
//           <Route path="/register/" render={() => <RegistrationForm handleSubmit={this.handleRegistration}/>}/>
//         </Switch>
//         <Footer/>
//       </React.Fragment>);
//   }
// }
