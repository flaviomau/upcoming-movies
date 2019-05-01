class MovieController {
    
    constructor(model) {
      this.model = model
    }
  
    handleNotFound(data) {
      if (!data) {
        var err = new Error('Not Found in database')
        err.status = 404
        throw err
      }
      return data
    }
  
    readAll(request, response, next) {
      //check if validate the cache data
      //  if the cache must be checked, read the fisrt page of TMDb API
      //    If the hash of first page data is diferent from the hash of cache, we need to update the cache database
      //    update cache first page hash 
      //return data using chache database
      this.model.find({})
        .then(function (data) {
          response.json(data)
        })
        .catch(next)
    }
  
    readById(request, response, next) {
      const query = { id_movie: request.params._id }
      this.model.findOne(query)
        .then(this.handleNotFound)
        .then(function (data) {
          response.json(data)
        })
        .catch(next)
    }
  
    create(request, response, next) {
      const movie = request.body
      this.model.create(movie)
        .then(data => {
          response.json(data)
        })
        .catch(error => {
          response.json(error)
        })
  
    }
  
    update(request, response, next) {
      const _id = request.params._id
      const movie = request.body
      this.model.update(_id, movie)
        .then(data => {
          response.json(data)
        })
        .catch(error => {
          response.json(error)
        })
    }
  
    remove(request, response, next) {
      const _id = request.params._id
      this.model.remove(_id)
        .then(function (data) {
          response.json(data)
        })
        .catch(next)
    }
  }
  
  module.exports = function (MovieModel) {
    return new MovieController(MovieModel)
  }