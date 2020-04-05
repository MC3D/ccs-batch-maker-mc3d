import React, {Component} from 'react';

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
    const recipes = this.state.recipes.map(recipe => <li key={recipe.id}><a href={`/recipes/${recipe.id}`}>{recipe.name}</a></li>)
    return (
        <ul>{recipes}</ul>
    )
  }
}

export default RecipeList;
