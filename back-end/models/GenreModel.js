'use strict'

class GenreDao {

  constructor(db) {
    this._db = db
  }

  async create(item) {
    return this._db.create(item)
  }

  async find(query) {
    return this._db.read(query)
  }

  async findOne(item) {
    const genre = await this._db.read(item)
    if (genre.length == 0)
      return null
    else {
      return genre[0]
    }
  }

  async update(id, item) {
    return this._db.update(id, item)
  }

  async remove(id) {
    return this._db.delete(id)
  }

  async drop() {
    return this._db.drop('genre')
  }
}

module.exports = GenreDao