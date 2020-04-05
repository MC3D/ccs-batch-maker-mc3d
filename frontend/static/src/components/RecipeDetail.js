import React, {Component} from 'react';

class RecipeDetail extends Component {

  state = {

  };

  componentDidMount() {
    const options = {
      headers: {
        'Authorization': `Token ${JSON.parse(localStorage.getItem('ccs-batch-maker')).key}`,
      }
    }

    fetch(`/api/v1/recipes/${this.props.match.params.recipeId}/`, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({...data});
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }

  render() {
    return (
      <div>{this.state.name}</div>
    )
  }
}

export default RecipeDetail;
