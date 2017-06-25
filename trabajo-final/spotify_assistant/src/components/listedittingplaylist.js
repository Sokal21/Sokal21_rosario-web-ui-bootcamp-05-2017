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
    this.props.deletePickedTrack(this.props.index);
  }

  render() {
    let name = this.props.track.name;
    return(
      <div className = "PickedTrack">
        <li>{name.length <20 ?name:(name.substring(0,20)+"...")} <button onClick = {this.deletePickedTrack} className = "DeleteTrack">x</button></li>
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
          {this.props.playlistEditting.map((track, i) => {return(<PickedTrack track = {track} deletePickedTrack = {obj.props.deletePickedTrack}
                                                                playlistEditting = {obj.props.playlistEditting} key = {i} index = {i}/>)})}
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
                                            deletePickedTrack: (index) => dispatch(deletePickedTrack(index))}
                                   })(ListEdittingPlaylist)
