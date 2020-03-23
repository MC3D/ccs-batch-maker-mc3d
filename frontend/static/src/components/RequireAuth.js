import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

export default (ProtectedRoute) => {
  return class extends Component {
    // constructor(props){
    //   super(props);
    // }
    render() {
      if (!localStorage.getItem('ccs-batch-maker-token')) {
        return <Redirect to="/login/" />
      }

      return <ProtectedRoute { ...this.props } />;
    }
  };
}
