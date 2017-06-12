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
      let index = 0;
      for(index in this.props.store.getState().movies){
        if(this.props.store.getState().movies[index].key === this.props.movie.key){
          break;
        }
      };
      let action = {type: 'FAV_MOVIE',index: index};
      this.props.store.dispatch(action);
    } else {
      alert("this movie already is among your favourites!");
    }
  }

  deleteMovie(event){
    event.preventDefault();
    let index = 0;
    for(index in this.props.store.getState().movies){
      if(this.props.store.getState().movies[index].key === this.props.movie.key){
        break;
      }
    };
    let action = {type: 'DELETE_MOVIE',index: index};
    if(this.props.store.getState().edit.key === this.props.movie.key){
      let action2 = {type:'EDIT_MOVIE', movie: undefined};
      this.props.store.dispatch(action2);
    }
    this.props.store.dispatch(action);
  }

  editMovie(event){
    event.preventDefault();
    if(!this.props.store.getState().edit){
      let action = {type: 'EDIT_MOVIE',movie: this.props.movie}
      this.props.store.dispatch(action);
    } else {
      alert("You are already editting a movie!");
    }
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
