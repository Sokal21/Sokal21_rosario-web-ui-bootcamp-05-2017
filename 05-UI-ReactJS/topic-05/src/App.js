import React, { Component } from 'react';
import './App.css';
import {Movie} from './Movie.js';
import MovieInput from './MovieInput.js'
import MovieList from './MovieList.js'
import ListElements from './ListElements.js'

let movieKey = 0;

function getMaxKey(actors){
  let maxKey = 0;
  for(let a in actors){
    if(actors[a].key > maxKey){
      maxKey = actors[a].key;
    }
  }
  return maxKey;
}

class MovieEditter extends Component {
  render(){
    if(this.props.movie){
      let actors = this.props.movie.cast;
      let key = getMaxKey(actors);
      return(
        <MovieInput handleNewMovie = {this.props.movieEdited} header = {"Put the new information for " + this.props.movie.title}
        required = {false} state = {{actors: this.props.movie.cast,key: key}}/>
      )
    } else {
      return (
        <div className = "MovieEditter">
          <p><strong>You are not editting a movie currently</strong></p>
        </div>
      )
    }
  }
}

class MovieUI extends Component {
  constructor(props) {
    super(props);
    this.state = {movies: [], edit: undefined};
    this.handleNewMovie = this.handleNewMovie.bind(this);
    this.handleFav = this.handleFav.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.movieEdited = this.movieEdited.bind(this);


  }

  handleNewMovie(title,year,duration,actors){
    let movie = new Movie(title,year,duration,movieKey);
    movieKey = movieKey + 1;
    movie.addCast(actors);
    this.state.movies.push(movie);
    this.forceUpdate();
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

  handleEdit(movie){
    if(!this.state.edit){
        this.setState({edit: movie});
    } else {
      alert("you are already edditing a movie");
    };
  }

  movieEdited(newTitle,newYear,newDuration,newActors){
    let movie = this.state.edit;
    if(newTitle){
      movie.title = newTitle;
    };
    if(newYear){
      movie.year = newYear;
    }
    if(newDuration){
      movie.duration = newDuration;
    }
    movie.cast = newActors;
    this.setState({edit: undefined});
    this.forceUpdate();
  }

  render() {
    return(
      <div className = "Container">
        <MovieInput handleNewMovie = {this.handleNewMovie} header = "Enter the movie's information"
        required = {true} state = {{actors: [],key: 0}}/>
        <MovieList movies = {this.state.movies} handleFav = {this.handleFav} handleDelete = {this.handleDelete} handleEdit = {this.handleEdit}/>
        <ListElements list = {this.state.movies.filter(function (mv){return mv.favourite})} title = "Your favourites movies!"
        class = "FavouritesMovies"/>
        <MovieEditter movie = {this.state.edit} movieEdited = {this.movieEdited}/>
      </div>
    )
  }
}

export default MovieUI;
