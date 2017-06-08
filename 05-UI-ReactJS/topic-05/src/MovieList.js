import React, { Component } from 'react';
import MovieElement from './MovieElement.js'

class MovieList extends Component {

  render(){
    let movies = this.props.movies;
    let obj = this;
    return (
      <div className = "MovieList">
        <p><strong>Movies that has been created</strong></p>
        <ul>
          {
            movies.map(function (listValue){
              return (
                  <MovieElement movie = {listValue} handleFav = {obj.props.handleFav}
                    handleDelete = {obj.props.handleDelete} handleEdit = {obj.props.handleEdit}/>
                )
              }
            )
          }
        </ul>
      </div>
    )
  }
}

export default MovieList
