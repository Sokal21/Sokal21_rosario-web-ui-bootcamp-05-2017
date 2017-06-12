import React, { Component } from 'react';
import InputRowUI from './InputRowUI.js';
import {Actor} from './Actor.js';

class InputActor extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleActorName = this.handleActorName.bind(this);
    this.handleActorAge = this.handleActorAge.bind(this);
    this.newActor = this.newActor.bind(this);
  }

  handleActorName(n){
    this.setState({name: n});
  }

  handleActorAge(a){
    this.setState({age: parseInt(a,10)});
  }

  newActor(event){
    let actor = new Actor(this.state.name, this.state.age, this.props.keyActor);
    this.props.handleSubmit(actor);
    event.preventDefault();
  }

  render(){
    return(
      <div className = "MovieActorUI">
        <p className = "InputActorTitle">Enter the actors/actress personal information</p>
        <InputRowUI title = "Name:" class = "ActorNameUI" type = "text" placeholder = "Actor/Actress name..."
        onInputChange = {this.handleActorName} required = {false}/>
        <InputRowUI title = "Age:" class = "ActorAgeUI" type = "number" placeholder = "Actor/Actress age..."
        onInputChange = {this.handleActorAge}  required = {false}/>
        <button onClick = {this.newActor} className = "ActorSubmit" >Add actor</button>
      </div>

    )
  }
};

export default InputActor
