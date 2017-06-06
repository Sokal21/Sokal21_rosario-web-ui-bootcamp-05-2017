import React, { Component } from 'react';
import './App.css';

let movieKey = 0;

class Actor {
  constructor(name,age,key){
    this.name = name;
    this.age = age;
    this.key = key;
  }
};

class Movie {
  constructor(title,year,duration,key){
    this.title = title;
    this.year = year;
    this.duration = duration;
    this.cast = []
    this.key = key
    this.favourite = false;
  }

  addCast(actor){
    if (actor instanceof Array){
      for (let i = 0; i < actor.length; i++) {
        this.cast.push(actor[i]);
      }
    }
    else {
      this.cast.push(actor);
    }
  }

  makeFav(){
    this.favourite = true;
  }
};

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
        <p>Enter the actors/actress personal information</p>
        <InputRowUI title = "Name:" class = "ActorNameUI" type = "text" placeholder = "Actor/Actress name..."
        onInputChange = {this.handleActorName} required = {false}/>
        <InputRowUI title = "Age:" class = "ActorAgeUI" type = "number" placeholder = "Actor/Actress age..."
        onInputChange = {this.handleActorAge}  required = {false}/>
        <button onClick = {this.newActor}>Add actor</button>
      </div>

    )
  }
};

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

class ListActors extends Component {

  render(){
    let obj = this;
    return(
      <ul>
        {
          this.props.list.map(function (listValue){
            return (
                <ActorElement keyActor = {listValue.key} value = {listValue.name} handleDelete = {obj.props.deleteActor} />
              )
            }
          )
        }
      </ul>
    )
  }
};

class MovieElement extends Component {

  constructor(props){
    super(props);
    this.state = {added: false};
    this.fav = this.fav.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this)
  }

  fav(event){
    if(!this.state.added){
      event.preventDefault();
      this.setState({added: true});
      this.props.movie.makeFav();
      this.props.handleFav();
    } else {
      console.log("Already Added");
    }
  }

  deleteMovie(event){
    event.preventDefault;
    this.props.handleDelete(this.props.movie.key);
  }

  render(){
    return(
      <li>
        {this.props.movie.title}
        <button onClick = {this.fav}>Fav</button>
        <button onClick = {this.deleteMovie}>Delete</button>
      </li>
    )
  }
}

class MovieList extends Component {

  render(){
    let movies = this.props.movies;
    let obj = this;
    return (
      <ul>
        {
          movies.map(function (listValue){
            return (
                <MovieElement movie = {listValue} handleFav = {obj.props.handleFav} handleDelete = {obj.props.handleDelete}/>
              )
            }
          )
        }
      </ul>
    )
  }
}

class ListElements extends Component {

  render(){
    let favouritesMovies = this.props.list;
    console.log(this.props.list);
    return (
    <ul>
      {
        favouritesMovies.map(function (listValue){
          return (
            <li>{listValue.title}</li>
          )
        })
      }
    </ul>
    )
  }
}

class MovieUI extends Component {
  constructor(props) {
    super(props);
    this.state = {actors: [],key: 0, movies: []};
    this.handleMovieTitle = this.handleMovieTitle.bind(this);
    this.handleMovieYear = this.handleMovieYear.bind(this);
    this.handleMovieDuration = this.handleMovieDuration.bind(this);
    this.newActorRegistered = this.newActorRegistered.bind(this);
    this.newMovieRegistered = this.newMovieRegistered.bind(this);
    this.deleteActor = this.deleteActor.bind(this);
    this.handleFav = this.handleFav.bind(this);
    this.handleDelete = this.handleDelete.bind(this);


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
        <div className = "ActorList">
          <p><strong>Added actors</strong></p>
          <ListActors list = {this.state.actors} deleteActor = {this.deleteActor}/>
        </div>
        <div className = "MovieList">
          <p><strong>Movies that has been created</strong></p>
          <MovieList movies = {this.state.movies} handleFav = {this.handleFav} handleDelete = {this.handleDelete}/>
        </div>
        <div>
          <p><strong>Your favourites movies!</strong></p>
          <ListElements list = {this.state.movies.filter(function (mv){return mv.favourite})}/>
        </div>

      </div>
    )
  }
}

export default MovieUI;
