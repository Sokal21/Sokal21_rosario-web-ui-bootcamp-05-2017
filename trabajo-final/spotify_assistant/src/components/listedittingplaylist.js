import React, { Component } from 'react';
import { connect } from 'react-redux';
import { refreshPlaylistEditting, addPlaylistToLocalStorage, deletePickedTrack } from '../Actions'

class PickedTrack extends Component {
  constructor(props){
    super(props);
    this.deletePickedTrack = this.deletePickedTrack.bind(this);
  }

  deletePickedTrack(event){
    event.preventDefault();
    let playlistEditting = this.props.playlistEditting;
    let index = 0;
    for(let index in playlistEditting){
      if(playlistEditting[index].id === this.props.track.id){
        break;
      }
    };
    this.props.deletePickedTrack(index);
  }

  render() {
    return(
      <div className = "PickedTrack">
        <li>{this.props.track.name} <button onClick = {this.deletePickedTrack} className = "DeleteTrack">x</button></li>
      </div>
    )
  }
}

class ListEdittingPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {playlistName: ""}
    this.storePlaylist = this.storePlaylist.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  storePlaylist(event) {
    event.preventDefault();
    let playlist= {name: this.state.playlistName,
                   tracks: this.props.playlistEditting};
    this.props.addPlaylistToLocalStorage(playlist);
    this.props.refreshPlaylistEditting();
  }

  handleChange(event) {
    this.setState({playlistName: event.target.value});
  }

  render() {
    let obj = this;
    return(
      <div className = "ListEdittingPlaylist">
        <h1>{this.props.playlistEditting.length !== 0?"Your actual Playlist!":"Add tracks to your Playlist!"}</h1>
        <ul className="PlaylistEdittingTracks">
          {this.props.playlistEditting.map((track) => {return(<PickedTrack track = {track} deletePickedTrack = {obj.props.deletePickedTrack}
                                                                playlistEditting = {obj.props.playlistEditting}/>)})}
        </ul>
        <form onSubmit = {this.storePlaylist}>
          <input type = "text" placeholder = "Playlist name..." onChange = {this.handleChange} required/>
          <input type="submit" value="ADD YOUR PLAYLIST!" className = "ButtonSubmit" />
        </form>
      </div>
    )
  }
}

export default connect(state => {return {playlistEditting: state.playlistEditting}},
                       dispatch => {return {refreshPlaylistEditting: () => dispatch(refreshPlaylistEditting()),
                                            addPlaylistToLocalStorage: (playlist) => dispatch(addPlaylistToLocalStorage(playlist)),
                                            deletePickedTrack: (trackId) => dispatch(deletePickedTrack(trackId))}
                                   })(ListEdittingPlaylist)
