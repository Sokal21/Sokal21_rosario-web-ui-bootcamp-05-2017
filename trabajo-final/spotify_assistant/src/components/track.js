import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTrackToPlaylist } from '../Actions'

class TrackInfo extends Component {
  render() {
    let name = this.props.name;
    let artists = this.props.artists;
    if(this.props.show) {
      return (
        <div className = "TrackInfo">
          <p><strong>{name}</strong> performed by:</p>
          <ul>
            {artists.map((artist) => {return(<li>{artist}</li>)})}
          </ul>
        </div>
      )
    } else {
      return (<div></div>);
    }
  }
};

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {info: false};
    this.showAllInfo = this.showAllInfo.bind(this);
    this.addToLocalPlaylist = this.addToLocalPlaylist.bind(this);
  }

  showAllInfo(event) {
    event.preventDefault();
    this.setState({info: !this.state.info});
  }

  componentWillReceiveProps(){
    this.setState({info:false});
  }

  addToLocalPlaylist(event) {
    event.preventDefault();
    this.setState({added: true});
    this.props.addTrackToPlaylist(this.props.track);
  }

  render() {
    let artists = this.props.track.artists.join(' & ');
    let name = this.props.track.name;
    let info = this.state.info;
    return (
      <div className = "Track">
        <li>{name.length <=  20 ? name : (name.substring(0,20)+"...")} <strong>by</strong> {artists.length <= 20 ? artists : (artists.substring(0,20)+"...")}</li>
        <button onClick = {this.showAllInfo} className = "TrackButton">Info</button>
        <button onClick = {this.addToLocalPlaylist} className = "TrackButton">ADD TO PLAYLIST</button>
        <TrackInfo name = {name} artists = {this.props.track.artists} show = {info}/>
      </div>
    );
  }
}

export default connect(state => {return {}}, dispatch => {return {addTrackToPlaylist: track => dispatch(addTrackToPlaylist(track))}})(Track)
