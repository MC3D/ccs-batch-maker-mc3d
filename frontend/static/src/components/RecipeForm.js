import React, {Component} from 'react';

class RecipeForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      image: null,
      preview: '',
      name: '',
      is_public: false,
      type: '',
      prep_time: '',
      cook_time: '',
      cook_temp: '',
      cook_scale: 'F',
      amount: '',
      unit: '',
      personal_notes: '',
      steps: []
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleInput(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleImage(e) {
    // The selected files' are returned by the element's HTMLInputElement.files property — this returns a FileList object, which contains a list of File objects
    let file = e.target.files[0];
    // we'll use this value when we save the image (see _saveImage)
    this.setState({image: file});
    // The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
    let reader = new FileReader();
    // A handler for the loadend event. This event is triggered each time the reading operation is completed (either in success or failure).
    reader.onloadend = () => {
      this.setState({preview: reader.result});
    }
    // Starts reading the contents of the specified Blob, once finished, the result attribute contains a data: URL representing the file's data.
    reader.readAsDataURL(file);
  }

  handleCheckbox(e) {
    this.setState({[e.target.name]: !this.state[e.target.name]});
  }


  render() {
    return (
      <form onSubmit={(e) => this.props.handleSubmit(e, this.state)}>
        <input type="file" name='image' onChange = {this.handleImage}/>

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleInput}/>

        {this.state.image ? (
          <img src={this.state.preview} alt='preview'/>
        ) : (
          null
        )}

        <label htmlFor="is_public">Public</label>
        <input type="checkbox" id="is_public" name="is_public" checked={this.state.is_public} onChange={this.handleCheckbox}/>

        <select name="type" value={this.state.type} onChange={this.handleInput}>
          <option>Select Recipe Type</option>
          <option value="BKFST">Breakfast</option>
          <option value="LNCH">Lunch</option>
          <option value="DIN">Dinner</option>
          <option value="DSSRT">Dessert</option>
        </select>

        <label htmlFor="prep_time">Prep Time</label>
        <input type="number" id="prep_time" name="prep_time" min="0" value={this.state.prep_time} onChange={this.handleInput}/>

        <label htmlFor="cook_time">Cook Time</label>
        <input type="number" id="cook_time" name="cook_time" min="0" value={this.state.cook_time} onChange={this.handleInput}/>

        <label htmlFor="cook_temp">Cook Temp</label>
        <input type="number" id="cook_temp" name="cook_temp" value={this.state.cook_temp} onChange={this.handleInput}/>

        <select name="cook_scale" value={this.state.cook_scale} onChange={this.handleInput}>
          <option value="F">F</option>
          <option value="C">C</option>
        </select>

        <span>This recipe will make</span>

        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount" name="amount" value={this.state.amount} onChange={this.handleInput}/>

        <label htmlFor="unit">Unit</label>
        <input type="text" id="unit" name="unit" value={this.state.unit} onChange={this.handleInput}/>

        <label htmlFor="personal_notes">Personal Notes</label>
        <textarea id="personal_notes" name="personal_notes" rows="5" cols="33" value={this.state.personal_notes} onChange={this.handleInput}></textarea>

        <button>Save this Recipe!</button>
      </form>
    )
  }
}





export default RecipeForm;
