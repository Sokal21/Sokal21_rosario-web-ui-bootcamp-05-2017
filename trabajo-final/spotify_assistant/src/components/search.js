import React, { Component } from 'react';
import { connect } from 'react-redux';
import { refreshSearchedTrack } from '../Actions';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {track: ""};
    this.handleChange = this.handleChange.bind(this);
    this.makeSearch = this.makeSearch.bind(this);
  }

  handleChange(event) {
    this.setState({track: event.target.value});
  }

  makeSearch(event) {
    event.preventDefault();
    let obj = this;
    this.props.spotify.searchTracks(this.state.track)
      .then(function(data) {
        let tracks = data.tracks.items.map((track) => { return {name: track.name,
                                                                id: track.id,
                                                                artists: track.artists.map((artist) => {return artist.name}),
                                                                uri: track.uri
                                                              }
                                                      });
        let action = refreshSearchedTrack(tracks);
        obj.props.dispatch(action);
      }, function(err) {
      });
  }

  render() {
    return(
      <form className = "Search" onSubmit = {this.makeSearch}>
        <strong>Search a track!</strong>
        <input type = "text" placeholder = "Search a track in Spotify" onChange = {this.handleChange} />
        <input type="submit" value="Search" className = "ButtonSubmit" />
      </form>
    )
  }
}

export default connect(state => {return {spotify: state.spotify}})(Search)
