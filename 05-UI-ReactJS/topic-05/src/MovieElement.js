import React, { Component } from 'react';

class MovieElement extends Component {

  constructor(props){
    super(props);
    this.state = {added: false};
    this.fav = this.fav.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.editMovie = this.editMovie.bind(this);
  }

  fav(event){
    if(!this.state.added){
      event.preventDefault();
      this.setState({added: true});
      this.props.movie.makeFav();
      this.props.handleFav();
    } else {
      alert("this movie already is among your favourites!");
    }
  }

  deleteMovie(event){
    event.preventDefault();
    this.props.handleDelete(this.props.movie.key);
  }

  editMovie(event){
    event.preventDefault();
    this.props.handleEdit(this.props.movie);
  }

  render(){
    return(
      <li>
        {this.props.movie.title}
        <button onClick = {this.fav}>Fav</button>
        <button onClick = {this.deleteMovie}>Delete</button>
        <button onClick = {this.editMovie}>Edit</button>
      </li>
    )
  }
}

export default MovieElement
