import React, { Component } from 'react';
import { connect } from 'react-redux';
import { refreshSearchedTrack , clearSearch} from '../Actions';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {track: ""};
    this.handleChange = this.handleChange.bind(this);
    this.makeSearch = this.makeSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  handleChange(event) {
    this.setState({track: event.target.value});
  }

  clearSearch(event) {
    event.preventDefault();
    this.props.clearSearch();
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
        obj.props.refreshSearchedTrack(tracks);
      }, function(err) {
      });
  }

  render() {
    return(
      <form onSubmit = {this.makeSearch} className = "Search">
        <p>Search a track!</p>
        <input type = "text" placeholder = "Search a track in Spotify" onChange = {this.handleChange} />
        <input type = "submit" value = "SEARCH" className = "ButtonSubmit" />
        <button onClick = {this.clearSearch} className = "ClearButton">CLEAR SEARCH</button>
      </form>
    )
  }
}

export default connect(state => {return {spotify: state.spotify}},
                       dispatch => {return {clearSearch: () => dispatch(clearSearch()),
                                            refreshSearchedTrack: (tracks) => dispatch(refreshSearchedTrack(tracks))
                                            }
                                    })(Search)
