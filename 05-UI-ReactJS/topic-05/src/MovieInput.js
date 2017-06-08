import React, { Component } from 'react';

import InputRowUI from './InputRowUI.js';
import InputActor from './InputActor.js'
import ListActors from './ListActors.js'

class MovieInput extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
    this.handleMovieTitle = this.handleMovieTitle.bind(this);
    this.handleMovieYear = this.handleMovieYear.bind(this);
    this.handleMovieDuration = this.handleMovieDuration.bind(this);
    this.newActorRegistered = this.newActorRegistered.bind(this);
    this.newMovieRegistered = this.newMovieRegistered.bind(this);
    this.deleteActor = this.deleteActor.bind(this);

  }

  handleMovieTitle(t){
    this.setState({title: t});
  }

  handleMovieYear(y){
    this.setState({year: parseInt(y,10)});
  }

  handleMovieDuration(d){
    this.setState({duration: parseInt(d,10)});
  }

  deleteActor(k){
    let actorsList = this.state.actors;
    let newActorsList = [];
    for (let a in actorsList){
      if(actorsList[a].key !== k){
        newActorsList.push(actorsList[a]);
      };
    }
    this.setState({actors: newActorsList})
  }

  newActorRegistered(actor){
    let listActors = this.state.actors;
    let newKey = this.state.key + 1;
    listActors.push(actor);
    this.setState({actors: listActors});
    this.setState({key: newKey})
  }

  newMovieRegistered(event) {
    event.preventDefault()
    this.props.handleNewMovie(this.state.title,this.state.year,this.state.duration,this.state.actors);
    this.setState({actors: []});
    this.setState({key: 0});
  }

  render() {
    return(
      <div className="MovieInput">
        <form className = "MovieRegiterUI" onSubmit = {this.newMovieRegistered}>
          <p><strong>{this.props.header}</strong></p>
          <InputRowUI title = "Title:" class = "MovieTitleUI" type = "text" placeholder = "Movie title..."
          onInputChange = {this.handleMovieTitle} required = {this.props.required} />
          <InputRowUI title = "Year:" class = "MovieYearUI" type = "number" placeholder = "Movie year..."
          onInputChange = {this.handleMovieYear} required = {this.props.required}/>
          <InputRowUI title = "Duration:" class = "MovieDurationUI" type = "number" placeholder = "Movie duration..."
          onInputChange = {this.handleMovieDuration} required = {this.props.required}/>
          <InputActor handleSubmit = {this.newActorRegistered} keyActor = {this.state.key}/>
          <input type="submit" value="Submit" />
        </form>
          <ListActors list = {this.state.actors} deleteActor = {this.deleteActor}/>
      </div>
    )
  }
}

export default MovieInput
