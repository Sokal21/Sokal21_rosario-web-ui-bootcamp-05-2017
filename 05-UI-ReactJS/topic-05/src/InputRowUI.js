import React, { Component } from 'react';

class InputRowUI extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.props.onInputChange(event.target.value);
  }

  render() {
    if(this.props.required){
      return (
        <label className = {this.props.class}>
          <strong>{this.props.title}</strong>
            <input type = {this.props.type} placeholder = {this.props.placeholder} onChange = {this.handleChange} required/>
        </label>
      );
    } else {
      return (
        <label className = {this.props.class}>
          <strong>{this.props.title}</strong>
            <input type = {this.props.type} placeholder = {this.props.placeholder} onChange = {this.handleChange} />
        </label>
      );
    }
  }
};

export default InputRowUI
