import React, {Component} from 'react';
import requireAuth from './RequireAuth';

class IngredientForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      name: '',
    }

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <form onSubmit={(e) => this.props.handleSubmit(e, this.state)}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleInput}/>
        <button>Save this Ingredient!</button>
      </form>
    )
  }
}





export default requireAuth(IngredientForm);
