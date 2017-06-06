import React, { Component } from 'react';
import './App.css';

const DB_STORE_NAME = "textDataBase";
let db;

class Actor {
  constructor(name,age,key){
    this.name = name;
    this.age = age;
    this.key = key;
  }
};

class Movie {
  constructor(title,year,duration){
    this.title = title;
    this.year = year;
    this.duration = duration;
    this.cast = []
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
              <div className = "Actor">
                <ActorElement keyActor = {listValue.key} value = {listValue.name} handleDelete = {obj.props.deleteActor} />
              </div>
              )
            }
          )
        }
      </ul>
    )
  }
};

class MovieUI extends Component {
  constructor(props) {
    super(props);
    this.state = {actors: [],key: 0};
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
    let movie = new Movie(this.state.title,this.state.year,this.state.duration);
    movie.addCast(this.state.actors);
    addMovie(movie);
    this.setState({actors: []});
    this.setState({key: 0});
    console.log(movie);
    event.preventDefault();
  }

  render() {
    openDataBase();
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
      </div>
    )
  }
}

function openDataBase(){

  let request = indexedDB.open(DB_STORE_NAME, 1);

  request.onerror = function(event){
    console.log(event);
    alert("There has been an error in indexedDB, error code: " + event.target.errorCode);
  };

  request.onsuccess = function (event) {
    db = this.result;
    console.log("openDb DONE");
  };

  request.onupgradeneeded = function (event) {
      let store = event.currentTarget.result.createObjectStore(DB_STORE_NAME, { autoIncrement: true });
  }
};

function addMovie(movie) {

  let store = db.transaction(DB_STORE_NAME, 'readwrite').objectStore(DB_STORE_NAME);
  let req = store.add(movie);

  req.onsuccess = function (event) {
    console.log("Insertion in DB successful");
  };

  req.onerror = function() {
    alert("There has been an error in indexedDB, error code: " + this.error);
  }
}

function deleteEntries(){
  let objectStore = db.transaction(DB_STORE_NAME,'readonly').objectStore(DB_STORE_NAME);

  objectStore.openCursor().onsuccess = function(event) {
    let cursor = event.target.result;
    if (cursor) {
      let request = db.transaction(DB_STORE_NAME, "readwrite").objectStore(DB_STORE_NAME)
                .delete(cursor.key);

      request.onerror = function(event) {
        alert("There has been an error while trying to delete an entrie " + event.target.errorCode);
      };
      request.onsuccess = function(event) {
        console.log("An item has been deleted");
      };
      cursor.continue();
    }
  }
};


export default MovieUI;
