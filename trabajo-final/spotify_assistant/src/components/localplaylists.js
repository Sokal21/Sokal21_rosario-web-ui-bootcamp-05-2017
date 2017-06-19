import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteLocalPlaylist } from '../Actions'

class PLaylistInfo extends Component {
  render() {
    if(this.props.show) {
      return (
        <div className = "PlaylistInfo">
          <p><strong>tracks:</strong></p>
          <ul>
            {this.props.tracks.map((track) => {return(<li>{track.name}</li>)})}
          </ul>
        </div>
      )
    } else {
      return (<div></div>);
    }
  }
}

class Playlist extends Component {

  constructor(props) {
    super(props);
    this.state = {info: false};
    this.showAllInfo = this.showAllInfo.bind(this);
    this.uploadPlaylist = this.uploadPlaylist.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
  }

  deletePlaylist(event) {
    event.preventDefault();
    this.props.deleteLocalPlaylist(this.props.playlist.name)
  }

  uploadPlaylist(event) {
    event.preventDefault();
    let spotify = this.props.spotify;
    let userId = this.props.user.id;
    let tracks = this.props.playlist.tracks.map(track => {return (track.uri)});
    let name = this.props.playlist.name
    spotify.createPlaylist(userId,{name: name})
      .then(function(data) {
        spotify.addTracksToPlaylist(userId,data.id,tracks)
      }, function(err) {
      });
  }

  showAllInfo(event) {
    event.preventDefault();
    this.setState({info: !this.state.info});
  }

  render() {
    return(
      <div className = "Playlist">
        <li>
          {this.props.playlist.name}
        </li>
        <button onClick = {this.showAllInfo} className = "LocalPlaylistInfo">Info</button>
        <button onClick = {this.uploadPlaylist} className = "UploadLocalPLaylist">UPLOAD</button>
        <button onClick = {this.deletePlaylist} className = "DeleteLocalPlaylist">DELETE</button>
        <PLaylistInfo tracks = {this.props.playlist.tracks} show = {this.state.info}/>
      </div>
    )
  }
}

class LocalPlaylists extends Component {

  render() {
    let playlists = this.props.localPlaylist;
    let obj = this;
    return(
      <div className = "LocalPlaylists">
        <h1>This are your localy stored Playlists!</h1>
        <ul>
          {playlists.map(playlist => {return(<Playlist playlist = {playlist}
                                              spotify = {obj.props.spotify} user = {obj.props.user} deleteLocalPlaylist = {this.props.deleteLocalPlaylist}/>)})}
        </ul>
      </div>
    )
  }
}

export default connect(state => {return {spotify: state.spotify,
                                         user: state.user,
                                         localPlaylist: state.localPlaylist,
                                         change: state.change}},
                      dispatch => {return {deleteLocalPlaylist: (name) => dispatch(deleteLocalPlaylist(name))}})(LocalPlaylists)
