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
    while(sublist.length !== 0){
      this.setState({pages: this.state.pages.push(sublist)});
      i = i+5;
      sublist = nextProps.searchedTracks.slice(i,i+5);
    };
  }

  nextPage() {
    if (this.state.page < (this.state.pages.length - 1)) {
      this.setState({page: this.state.page + 1});
    }
  }

  prevPage() {
    if (this.state.page !== 0) {
      this.setState({page: this.state.page - 1});
    }
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    let pageToRender = (this.state.pages.length === 0?[]:this.state.pages[this.state.page]);
    console.log(pageToRender);
    return(
      <div className = "TrackList">
        <h1>Searched tracks</h1>
        <p>{this.props.searchedTracks.length < 20 ? "":<strong>This search has limited results :(</strong>}</p>
        <ul>
          {
            pageToRender.map(function (track){
              return (
                <Track track = {track}/>
              );
            })
          }
        </ul>
        <button onClick = {this.prevPage} className = "PageButton">{'<'}</button>
        <button onClick = {this.nextPage} className = "PageButton">{'>'}</button>
      </div>
    )
  }
}

export default connect(state => {return {searchedTracks: state.searchedTracks}})(ListSearchedTracks)
