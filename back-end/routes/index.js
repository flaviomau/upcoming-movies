const express = require('express'),
      router  = express.Router(),
      Context = require('../db/base/contextStrategy'),
      MongoDB = require('../db/mongodb/mongoDbStrategy'),
      MovieSchema = require('../db/mongodb/schemas/movieSchema'),
      GenreSchema = require('../db/mongodb/schemas/genreSchema'),
      connection = MongoDB.connect(),
      MovieDatabase = new Context(new MongoDB(connection, MovieSchema)),
      GenreDatabase = new Context(new MongoDB(connection, GenreSchema)),
      MovieModel = require('../models/MovieModel'),
      GenreModel = require('../models/GenreModel'),
      MovieRoutes = require('./movies')

router.get('/', function (request, response) {
  response.send('Upcoming Movies API')
})

router.use('/movies', MovieRoutes(new MovieModel(MovieDatabase), new GenreModel(GenreDatabase)))

module.exports = router