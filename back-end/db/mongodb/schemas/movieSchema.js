const Mongoose = require('mongoose')
const movieSchema = new Mongoose.Schema({  
  name: {
    type: String,
    required: true
  },
  poster: {
    type: String
  },
  backdrop: {
    type: String
  },
  genre: {
    type: [String]
  },
  overview: {
    type: String
  },
  releaseDate: {
    type: String
  }
})

module.exports = Mongoose.models.movies || Mongoose.model('movies', movieSchema)