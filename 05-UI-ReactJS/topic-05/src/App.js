import React, { Component } from 'react';
import './App.css';
import {Movie} from './Movie.js';
import MovieInput from './MovieInput.js'
import MovieList from './MovieList.js'
import ListElements from './ListElements.js'
import { createStore } from 'redux'

let movieKey = 0;

function todoApp(state = {movies: [], edit: undefined},action) {
  switch (action.type) {
    case 'ADD_MOVIE':
      let movie = new Movie(action.title, action.year, action.duration, action.key);
      movie.addCast(action.cast);
      return Object.assign({},state,{movies: [...state.movies, movie]});
    case 'DELETE_MOVIE':
      return Object.assign({},state,{movies: [...state.movies.slice(0,action.index),
                                              ...state.movies.slice(action.index + 1)]});
    case 'FAV_MOVIE':
      let obj = state.movies[action.index];
      obj.makeFav();
      return Object.assign({},state,{movies: [...state.movies.slice(0,action.index),
                                              ...[obj],
                                              ...state.movies.slice(action.index + 1)]});
    case 'EDIT_MOVIE':
      return Object.assign({},state,{edit: action.movie});
    case 'EDITTED_MOVIE':
      let obj2 = state.movies[action.index];
      return Object.assign({},state,{movies: [...state.movies.slice(0,action.index),
                                              ...[Object.assign({},obj2,action.movieChanges)],
                                              ...state.movies.slice(action.index + 1)], edit: undefined});
    default:
      return state;
  }
}

let store = createStore(todoApp);

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
    this.state = store.getState();
    this.handleNewMovie = this.handleNewMovie.bind(this);
    this.movieEdited = this.movieEdited.bind(this);
  }

  handleNewMovie(title,year,duration,actors){
    let action = {type: 'ADD_MOVIE',title: title,year: year,duration: duration,cast: actors, key: movieKey};
    movieKey = movieKey + 1;
    store.dispatch(action);
  }

  movieEdited(newTitle,newYear,newDuration,newActors){
    let movieChanges = {};
    let index = 0;
    for(index in store.getState().movies){
      if(store.getState().movies[index].key === store.getState().edit.key){
        break;
      }
    };
    if(newTitle){
      movieChanges['title'] = newTitle;
    };
    if(newYear){
      movieChanges['year'] = newYear;
    }
    if(newDuration){
      movieChanges['duration'] = newDuration;
    }
    movieChanges['cast'] = newActors;
    console.log(movieChanges);
    let action = {type: 'EDITTED_MOVIE',movieChanges: movieChanges,index: index};
    store.dispatch(action);
  }

  render() {
    return(
      <div className = "Container">
        <MovieInput handleNewMovie = {this.handleNewMovie} header = "Enter the movie's information"
        required = {true} state = {{actors: [],key: 0}}/>
        <MovieList movies = {store.getState().movies} store = {store} />
        <ListElements list = {store.getState().movies.filter(function (mv){return mv.favourite})} title = "Your favourites movies!"
        class = "FavouritesMovies"/>
        <MovieEditter movie = {store.getState().edit} movieEdited = {this.movieEdited}/>
      </div>
    )
  }
}

export default {MovieUI,store};
