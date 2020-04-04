import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

export default (ProtectedRoute) => {
  return class extends Component {
    // constructor(props){
    //   super(props);
    // }
    render() {
      // need to bring this in from App state REFACTOR!!!
      if (!localStorage.getItem('ccs-batch-maker-user')) {
        return <Redirect to="/login/" />
      }

      return <ProtectedRoute { ...this.props } />;
    }
  };
}
