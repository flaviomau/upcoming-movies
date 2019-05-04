const Mongoose = require('mongoose')
const genreSchema = new Mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

module.exports = Mongoose.models.genres || Mongoose.model('genres', genreSchema)