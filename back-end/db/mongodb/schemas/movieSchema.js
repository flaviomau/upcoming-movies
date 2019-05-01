const Mongoose = require('mongoose')
const movieSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  backdrop: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  releaseDate: {
    type: String,
    required: true
  }
})

module.exports = Mongoose.model('movies', movieSchema)