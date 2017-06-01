'use strict';

var _Movie = require('./movie.js');
var Movie = _Movie.Movie;
var _Logger = require('./logger.js');
var Logger = _Logger.Logger;
var _Actor = require('./actor.js');
var Actor = _Actor.Actor;
var _Social = require('./social.js');
var Social = _Social.Social;

let childOfMen = new Movie("Children of Men",2006,114);
let logger = new Logger();
let love = new Movie("Love",2015,135);
let cherry2000 = new Movie("Cherry 2000",1987,98);
let terminator = new Movie('Terminator I', 1985, 60);
let arnold = new Actor('Arnold Schwarzenegger', 50);
let otherCast = [
  new Actor('Paul Winfield', 50),
  new Actor('Michael Biehn', 50),
  new Actor('Linda Hamilton', 50)
];
terminator.addCast(arnold);
terminator.addCast(otherCast);
Object.assign(childOfMen, Social);
console.log(childOfMen);
console.log(terminator.cast);
childOfMen.on("play",logger.log);
childOfMen.emit("play");
childOfMen.like("Tomas Lopez");
childOfMen.emit("pause");
