import React, { Component } from 'react';

class ActorElement extends Component {

  constructor(props){
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete(event){
    this.props.handleDelete(this.props.keyActor);
    event.preventDefault();
  }

  render(){
    return(
      <li>
        {this.props.value}
        <button onClick = {this.delete}>x</button>
      </li>
    )
  }
}

export default ActorElement
