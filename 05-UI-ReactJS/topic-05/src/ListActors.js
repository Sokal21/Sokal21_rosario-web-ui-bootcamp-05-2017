import React, { Component } from 'react';
import ActorElement from './ActorElement.js';

class ListActors extends Component {

  render(){
    let obj = this;
    return(
      <div className = "ActorList">
        <p><strong>Added actors</strong></p>
        <ul>
          {
            this.props.list.map(function (listValue){
              return (
                  <ActorElement keyActor = {listValue.key} value = {listValue.name} handleDelete = {obj.props.deleteActor} />
                )
              }
            )
          }
        </ul>
      </div>
    )
  }
};

export default ListActors
