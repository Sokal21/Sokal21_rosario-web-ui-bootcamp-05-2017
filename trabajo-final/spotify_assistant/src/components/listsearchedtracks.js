  import React, { Component } from 'react';
import { connect } from 'react-redux';
import Track from './track';

class ListSearchedTracks extends Component {

  constructor(props) {
    super(props);
    this.state = {page: 0, pages: []};
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({page: 0, pages: []});
    let i = 0;
    let sublist = nextProps.searchedTracks.slice(0,5);
    let pages = []
    while(sublist.length !== 0){
      pages = pages.concat([sublist])
      i = i+5;
      sublist = nextProps.searchedTracks.slice(i,i+5);
    };
    this.setState({pages: pages});
  }

  nextPage(event) {
    event.preventDefault();
    if (this.state.page < (this.state.pages.length - 1)) {
      this.setState({page: this.state.page + 1});
    }
  }

  prevPage(event) {
    event.preventDefault();
    if (this.state.page !== 0) {
      this.setState({page: this.state.page - 1});
    }
  }

  render() {
    let page = this.state.page + 1;
    let pageToRender = (this.state.pages.length !== 0?this.state.pages[this.state.page]:[]);
    return(
      <div className = "TrackList">
        <h1>Searched tracks</h1>
        <p>{this.props.searchedTracks.length < 20 ? "":<strong>This search has limited results :(</strong>}</p>
        <ul>
          {
            pageToRender.map(function (track,i){
              return (
                <Track track = {track} key = {i}/>
              );
            })
          }
        </ul>
        <button onClick = {this.prevPage} className = "PageButton">{'<'}</button>
        <button onClick = {this.nextPage} className = "PageButton">{'>'}</button>
        <p className = "Pages">{this.state.pages.length !== 0?<strong>{page}/{this.state.pages.length}</strong>:""}</p>
      </div>
    )
  }
}

export default connect(state => {return {searchedTracks: state.searchedTracks}})(ListSearchedTracks)
