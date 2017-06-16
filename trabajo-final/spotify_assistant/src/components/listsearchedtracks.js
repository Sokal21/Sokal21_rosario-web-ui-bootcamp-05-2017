import React, { Component } from 'react';
import { connect } from 'react-redux';
import Track from './track';

class ListSearchedTracks extends Component {

  render(){
    return(
      <div className = "TrackList">
        <h1>Searched tracks</h1>
        <ul>
          {
            this.props.searchedTracks.map(function (track){
              return (
                <Track track = {track}/>
              );
            })
          }
        </ul>
        {this.props.searchedTracks.length < 20 ? <p></p>:<p><strong>This search has a limited result :(</strong></p>}
      </div>
    )
  }
}

export default connect(state => {return {searchedTracks: state.searchedTracks}})(ListSearchedTracks)
