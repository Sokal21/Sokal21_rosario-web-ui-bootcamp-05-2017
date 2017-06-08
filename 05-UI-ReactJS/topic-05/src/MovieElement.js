import React, { Component } from 'react';

function textifyActors(actors) {
  let text = "";
  for(let i in actors){
    text = text + `Name: ${actors[i].name} - Age: ${actors[i].age}
`;
  }
  return ("Cast: \n"+text);
}

class MovieElement extends Component {

  constructor(props){
    super(props);
    this.state = {added: false};
    this.fav = this.fav.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.editMovie = this.editMovie.bind(this);
    this.viewMovie = this.viewMovie.bind(this);
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

  viewMovie(event){
    event.preventDefault();
    let text = `Title: ${this.props.movie.title}
Year: ${this.props.movie.year}
Duration: ${this.props.movie.duration}
${textifyActors(this.props.movie.cast)}`;
    alert(text);
  }

  render(){
    return(
      <li>
        <p className = "MovieTitleList">{this.props.movie.title}</p>
        <button onClick = {this.fav}>Fav</button>
        <button onClick = {this.deleteMovie}>Delete</button>
        <button onClick = {this.editMovie}>Edit</button>
        <button onClick = {this.viewMovie}>View</button>
      </li>
    )
  }
}

export default MovieElement
