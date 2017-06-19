import React, { Component } from 'react';
import { connect } from 'react-redux';
import Track from './track';

class ListSearchedTracks extends Component {

  render(){
    return(
      <div className = "TrackList">
        <h1>Searched tracks</h1>
        <p>{this.props.searchedTracks.length < 20 ? "":<strong>This search has limited results :(</strong>}</p>
        <ul>
          {
            this.props.searchedTracks.map(function (track){
              return (
                <Track track = {track}/>
              );
            })
          }
        </ul>
      </div>
    )
  }
}

export default connect(state => {return {searchedTracks: state.searchedTracks}})(ListSearchedTracks)
