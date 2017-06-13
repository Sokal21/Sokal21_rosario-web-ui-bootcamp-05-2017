import React, { Component } from 'react';
import './App.css';

let ClientOAuth2 = require('client-oauth2')
let Spotify = require('spotify-web-api-js');

let express = require('express');
let app = express();

let spotifyApi = new Spotify();

console.log(spotifyApi);

let CLIENT_ID = "dc192dafed7149819ae38d006e45102a";
let CLIENT_SECRET = "4e93539f057643f39f41b687ea56e9f2"
let REDIRECT_URI = "http://localhost:3000/";

let spotify = new ClientOAuth2({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  accessTokenUri: "https://accounts.spotify.com/api/token",
  authorizationUri: "https://accounts.spotify.com/authorize",
  redirectUri: REDIRECT_URI,
  scopes: ['user-read-private', 'user-read-email']
})

class App extends Component {

  constructor(props) {
    super(props);
    this.callingTest = this.callingTest.bind(this);
    this.pathCall = this.pathCall.bind(this);
  }

  callingTest(event) {
    event.preventDefault();
    let uri = spotify.code.getUri();
    window.location.assign(uri);
  }

  pathCall(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div className="App">
        <button onClick = {this.callingTest}>test</button>
        <button onClick = {this.pathCall}>path</button>
      </div>
    );
  }
}

export default App;
