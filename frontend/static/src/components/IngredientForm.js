import React, {Component} from 'react';
import Quagga from 'quagga';
import {Button, TextField} from '@material-ui/core';

class IngredientForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      name: '',
    }

    this.handleInput = this.handleInput.bind(this);
    this.scanBarcode = this.scanBarcode.bind(this);
  }

  handleInput(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  scanBarcode() {
    Quagga.init({
      inputStream: {
        type: "LiveStream",
        target: document.querySelector('#barcode-scanner'),
        mulitple: false,
        constraints: {
          width: 640,
          height: 480,
          facingMode: "environment",
          // aspectRatio: 1 / 1
          // facingMode: "user"  //"environment" for back camera, "user" front camera
        }
      },
      locator: {
        patchSize: 'small',
        halfSample: true,
      },
      numOfWorkers: 2,
      decoder: {
        readers: [
          // "code_128_reader",
          // "ean_reader",
          // "ean_8_reader",
          // "code_39_reader",
          // "code_39_vin_reader",
          // "codabar_reader",
          "upc_reader",
          // "upc_e_reader",
          // "i2of5_reader"
        ]
      }

    }, function(err) {
      if (err) {
        console.log(err)
        return
      }
      Quagga.start()
      Quagga.onDetected(function(result) {
        var last_code = result.codeResult.code;
        // once you have the barcode, then you can do a get request for
        // that specific item

        // once you have the barcode, display the detail view for that container #
        console.log("last_code ", last_code, result);
        Quagga.stop();
      })
    })
  }

  render() {
    return (
      <form onSubmit={(e) => this.props.handleSubmit(e, this.state)}>

      <div id="barcode-scanner"></div>
      <Button type='button' variant="contained" color="primary" onClick={this.scanBarcode}>Scan</Button>

      <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={this.state.name}
            onChange={this.handleInput}
          />
        <button>Save this Ingredient!</button>
      </form>
    )
  }
}





export default IngredientForm;
