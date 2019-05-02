'use strict'

class MovieDao {

  constructor(db) {
    this._db = db
  }

  async create(item){
    return this._db.create(item)
  }
  
  async find(query){
    return this._db.read(query)
  }
  
  async findOne(item){
    const movie = await this._db.read(item)
    if(movie.length == 0)
      return null
    else{
      return movie[0]
    }      
  }
  
  async update(id_movie, item){
    return this._db.update(id_movie, item)
  }
  
  async remove(id_movie){
    return this._db.delete(id_movie)
  }

  async drop(){
    return this._db.drop('movies')
  }
}

module.exports = MovieDao