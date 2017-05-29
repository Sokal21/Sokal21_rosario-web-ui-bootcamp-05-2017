'use strict';

class EventEmitter {
  constructor(){
    this.callbacks = {};
  }

  on(event,listener){
    this.callbacks[event] = listener;
  }

  emit(event){
    let response = this.callbacks[event]
    if (response === undefined){
      console.log("Event undefined, can't be handle");
    }
    else {
      response(this);
    }
  }

  off(event){
    let response = this.callbacks[event]
    if (response === undefined){
      console.log("Event undefined, can't delete it");
    }
    else {
      delete this.callbacks[event];
    }
  }
};

exports.EventEmitter = EventEmitter;
