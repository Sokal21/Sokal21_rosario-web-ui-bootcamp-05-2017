
class Movie {
  constructor(title,year,duration,key){
    this.title = title;
    this.year = year;
    this.duration = duration;
    this.cast = []
    this.key = key
    this.favourite = false;
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

  changeCast(actors){
    this.cast = actors;
  }

  makeFav(){
    this.favourite = true;
  }
};

exports.Movie = Movie;
