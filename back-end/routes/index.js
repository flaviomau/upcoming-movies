const express = require('express'),
      router  = express.Router(),
      mongodb = require('../db/mongodb/mongoDbStrategy'),
      context = require('../db/base/contextStrategy')

const contextDatabase = new context(new mongodb())
contextDatabase.connect()
const MovieModel = require('../models/MovieModel')
const MovieRoutes = require('./movies')

router.get('/', function (request, response) {
  response.send('Upcoming Movies API')
})

router.use('/movies', MovieRoutes(new MovieModel(contextDatabase)))

module.exports = router