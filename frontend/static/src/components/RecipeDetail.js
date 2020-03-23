import React, {Component} from 'react';

class RecipeDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }
  
  componentDidMount() {
    this.setState(this.props.selectedRecipe);
  }

  render() {
    return (
      <div>{this.state.name}</div>
    )
  }
}

export default RecipeDetail;
