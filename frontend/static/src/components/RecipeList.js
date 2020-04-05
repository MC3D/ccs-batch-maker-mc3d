import React, {Component} from 'react';
import RecipeCard from './RecipeCard';

class RecipeList extends Component {

  state = {
    recipes: [],
  }
  
  componentDidMount() {
    fetch(`/api/v1/recipes/`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({recipes: data});
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }

  render() {
    const recipes = this.state.recipes.map(recipe => (
      <RecipeCard key={recipe.id} recipe={recipe}/>
    ));
    return (
        <React.Fragment>
          {recipes}
        </React.Fragment>
    )
  }
}

export default RecipeList;
