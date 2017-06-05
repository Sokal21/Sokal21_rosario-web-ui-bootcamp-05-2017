'use strict';

var Social = {
  share : function share(friend){console.log(`${friend} shared ${this.title}`)},
  like : function like(friend){console.log(`${friend} likes ${this.title}`)}
};

exports.Social = Social;
