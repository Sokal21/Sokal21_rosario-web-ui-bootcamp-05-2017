'use strict';

var _EventEmitter = require('./eventemitter.js');
var EventEmitter = _EventEmitter.EventEmitter;

class Movie extends EventEmitter {
  constructor(title,year,duration){
    super();
    this.title = title;
    this.year = year;
    this.duration = duration;
    this.cast = []
  }

  play(){
    super.emit("play");
  }

  pause(){
    super.emit("pause");
  }

  resume(){
    super.emit("resume");
  }

  addCast(actor){
    if (actor instanceof Array){
      for (let i = 0; i < actor.length; i++) {
        this.cast.push(actor[i]);
      }
    }
    else {
      this.cast.push(actor);
    }
  }
};

exports.Movie = Movie;
