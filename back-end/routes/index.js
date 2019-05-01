const express = require('express'),
      router  = express.Router(),
      Context = require('../db/base/contextStrategy'),
      MongoDB = require('../db/mongodb/mongoDbStrategy'),
      MovieSchema = require('../db/mongodb/schemas/movieSchema'),
      connection = MongoDB.connect(),
      MovieDatabase = new Context(new MongoDB(connection, MovieSchema))

const MovieModel = require('../models/MovieModel')
const MovieRoutes = require('./movies')

router.get('/', function (request, response) {
  response.send('Upcoming Movies API')
})

router.use('/movies', MovieRoutes(new MovieModel(MovieDatabase)))

module.exports = router