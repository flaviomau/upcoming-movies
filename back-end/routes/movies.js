const createRouter = (MovieModel) => {
  const express = require('express'),
        router = express.Router(),
        MovieController = require('../controllers/MovieController')(MovieModel)

  router.get('/',       MovieController.readAll.bind(MovieController))
  router.get('/:_id',   MovieController.readById.bind(MovieController))
  router.post('/',      MovieController.create.bind(MovieController))
  router.put('/:_id',   MovieController.update.bind(MovieController))
  router.delete('/:_id',MovieController.remove.bind(MovieController))
  return router
}

module.exports = createRouter