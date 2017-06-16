import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSpotify, addUserData } from '../Actions';
import Search from './search';
import ListSearchedTracks from './listsearchedtracks';
import ListEdittingPlaylist from './listedittingplaylist';
import LocalPlaylists from './localplaylists';


let Spotify = require('spotify-web-api-js');
let Q = require("q");

let spotifyApi = new Spotify();

class UIapi extends Component {

  constructor(props) {
    super(props);
    this.setWrapper();
  }

  setWrapper() {
    let accessToken = window.location.hash.split('&')[0].substring(14);
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setPromiseImplementation(Q);
    let action = addSpotify(spotifyApi);
    this.props.dispatch(action);
  }

  setUserInfo() {
    let obj = this;
    spotifyApi.getMe()
      .then(function(data) {
        let action = addUserData(data);
        obj.props.dispatch(action);
      }, function(err) {
      });
  }

  componentDidMount(){
    this.setUserInfo();
  }

  render(){
    return(
      <div className = "UserInterface">
          <h1 className ="WelcomeTitle">Welcome {this.props.user === null ? "" : this.props.user.display_name}!</h1>
          <div className = "LeftBlock">
            <Search />
            <ListEdittingPlaylist />
            <LocalPlaylists />
          </div>
          <div className = "RightBlock">
            <ListSearchedTracks />
          </div>
      </div>
    )
  }
}

export default connect(state => state)(UIapi);
