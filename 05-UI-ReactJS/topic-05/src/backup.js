import React, { Component } from 'react';
import './App.css';
import {Movie} from './Movie.js';
import InputRowUI from './InputRowUI.js';
import InputActor from './InputActor.js'
import ListActors from './ListActors.js'
import MovieList from './MovieList.js'
import ListElements from './ListElements.js'

let movieKey = 0;

class MovieUI extends Component {
  constructor(props) {
    super(props);
    this.state = {actors: [],key: 0, movies: [],editting: null};
    this.handleMovieTitle = this.handleMovieTitle.bind(this);
    this.handleMovieYear = this.handleMovieYear.bind(this);
    this.handleMovieDuration = this.handleMovieDuration.bind(this);
    this.newActorRegistered = this.newActorRegistered.bind(this);
    this.newMovieRegistered = this.newMovieRegistered.bind(this);
    this.deleteActor = this.deleteActor.bind(this);
    this.handleFav = this.handleFav.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

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

  handleEdit(movie){
    if(!this.state.editting){
      this.setState({editting: movie});
    }
  }

  newActorRegistered(actor){
    let listActors = this.state.actors;
    let newKey = this.state.key + 1;
    listActors.push(actor);
    this.setState({actors: listActors});
    this.setState({key: newKey})
  }

  handleFav(){
    this.forceUpdate();
  }

  handleDelete(movieKey){
    for(let a in this.state.movies){
      if(this.state.movies[a].key === movieKey){
        this.state.movies.splice(a,1);
        break;
      }
    }
    this.forceUpdate();
  }

  addMovie(movie){
    this.state.movies.push(movie);
  }

  newMovieRegistered(event) {
    event.preventDefault()

    let movie = new Movie(this.state.title,this.state.year,this.state.duration,movieKey);
    movieKey = movieKey + 1;
    movie.addCast(this.state.actors);
    this.addMovie(movie);
    this.setState({actors: []});
    this.setState({key: 0});
  }

  render() {
    return(
      <div className="UserUI">
        <form className = "MovieRegiterUI" onSubmit = {this.newMovieRegistered}>
          <p><strong>Enter the new movie's information</strong></p>
          <InputRowUI title = "Title:" class = "MovieTitleUI" type = "text" placeholder = "Movie title..."
          onInputChange = {this.handleMovieTitle} required = {true} />
          <InputRowUI title = "Year:" class = "MovieYearUI" type = "number" placeholder = "Movie year..."
          onInputChange = {this.handleMovieYear} required = {true}/>
          <InputRowUI title = "Duration:" class = "MovieDurationUI" type = "number" placeholder = "Movie duration..."
          onInputChange = {this.handleMovieDuration} required = {true}/>
          <InputActor handleSubmit = {this.newActorRegistered} keyActor = {this.state.key}/>
          <input type="submit" value="Submit" />
        </form>
          <ListActors list = {this.state.actors} deleteActor = {this.deleteActor}/>
          <MovieList movies = {this.state.movies} handleFav = {this.handleFav} handleDelete = {this.handleDelete}/>
          <ListElements list = {this.state.movies.filter(function (mv){return mv.favourite})} title = "Your favourites movies!"
          class = "FavouritesMovies"/>
      </div>
    )
  }
}

export default MovieUI;
