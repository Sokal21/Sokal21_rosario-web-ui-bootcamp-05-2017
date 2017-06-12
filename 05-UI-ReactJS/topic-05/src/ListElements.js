import React, { Component } from 'react';

class ListElements extends Component {

  render(){
    let favouritesMovies = this.props.list;
    return (
      <div className = {this.props.class}>
        <p><strong>{this.props.title}</strong></p>
        <ul>
          {
            favouritesMovies.map(function (listValue){
              return (
                <li>{listValue.title}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default ListElements
