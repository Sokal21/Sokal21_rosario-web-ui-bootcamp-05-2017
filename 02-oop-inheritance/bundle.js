(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Actor = function Actor(name, age) {
  _classCallCheck(this, Actor);

  this.name = name;
  this.age = age;
};

;

exports.Actor = Actor;

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.callbacks = {};
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(event, listener) {
      this.callbacks[event] = listener;
    }
  }, {
    key: "emit",
    value: function emit(event) {
      var response = this.callbacks[event];
      if (response === undefined) {
        console.log("Event undefined, can't be handle");
      } else {
        response(this);
      }
    }
  }, {
    key: "off",
    value: function off(event) {
      var response = this.callbacks[event];
      if (response === undefined) {
        console.log("Event undefined, can't delete it");
      } else {
        delete this.callbacks[event];
      }
    }
  }]);

  return EventEmitter;
}();

;

exports.EventEmitter = EventEmitter;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, [{
    key: "log",
    value: function log() {
      console.log("The 'play' event has been emitted");
    }
  }]);

  return Logger;
}();

;

exports.Logger = Logger;

},{}],4:[function(require,module,exports){
'use strict';

var _Movie = require('./movie.js');
var Movie = _Movie.Movie;
var _Logger = require('./logger.js');
var Logger = _Logger.Logger;
var _Actor = require('./actor.js');
var Actor = _Actor.Actor;
var _Social = require('./social.js');
var Social = _Social.Social;

var childOfMen = new Movie("Children of Men", 2006, 114);
var logger = new Logger();
var love = new Movie("Love", 2015, 135);
var cherry2000 = new Movie("Cherry 2000", 1987, 98);
var terminator = new Movie('Terminator I', 1985, 60);
var arnold = new Actor('Arnold Schwarzenegger', 50);
var otherCast = [new Actor('Paul Winfield', 50), new Actor('Michael Biehn', 50), new Actor('Linda Hamilton', 50)];
terminator.addCast(arnold);
terminator.addCast(otherCast);
Object.assign(childOfMen, Social);
console.log(childOfMen);
console.log(terminator.cast);
childOfMen.on("play", logger.log);
childOfMen.emit("play");
childOfMen.like("Tomas Lopez");
childOfMen.emit("pause");

},{"./actor.js":1,"./logger.js":3,"./movie.js":5,"./social.js":6}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _EventEmitter = require('./eventemitter.js');
var EventEmitter = _EventEmitter.EventEmitter;

var Movie = function (_EventEmitter2) {
  _inherits(Movie, _EventEmitter2);

  function Movie(title, year, duration) {
    _classCallCheck(this, Movie);

    var _this = _possibleConstructorReturn(this, (Movie.__proto__ || Object.getPrototypeOf(Movie)).call(this));

    _this.title = title;
    _this.year = year;
    _this.duration = duration;
    _this.cast = [];
    return _this;
  }

  _createClass(Movie, [{
    key: 'play',
    value: function play() {
      _get(Movie.prototype.__proto__ || Object.getPrototypeOf(Movie.prototype), 'emit', this).call(this, "play");
    }
  }, {
    key: 'pause',
    value: function pause() {
      _get(Movie.prototype.__proto__ || Object.getPrototypeOf(Movie.prototype), 'emit', this).call(this, "pause");
    }
  }, {
    key: 'resume',
    value: function resume() {
      _get(Movie.prototype.__proto__ || Object.getPrototypeOf(Movie.prototype), 'emit', this).call(this, "resume");
    }
  }, {
    key: 'addCast',
    value: function addCast(actor) {
      if (actor instanceof Array) {
        for (var i = 0; i < actor.length; i++) {
          this.cast.push(actor[i]);
        }
      } else {
        this.cast.push(actor);
      }
    }
  }]);

  return Movie;
}(EventEmitter);

;

exports.Movie = Movie;

},{"./eventemitter.js":2}],6:[function(require,module,exports){
'use strict';

var Social = {
  share: function share(friend) {
    console.log(friend + ' shared ' + this.title);
  },
  like: function like(friend) {
    console.log(friend + ' likes ' + this.title);
  }
};

exports.Social = Social;

},{}]},{},[4]);
