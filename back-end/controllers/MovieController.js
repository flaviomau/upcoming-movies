const config = require('config')
const axios = require('axios')
const md5 = require('md5')

class MovieController {

  constructor(model) {
    this.model = model
    this.lastAPICheck = 0
    this.lastAPIHash = 0
    this.url = config.get('TMDbUpcomingURL')
    this.token = config.get('TMDbToken')
  }

  handleNotFound(data) {
    if (!data) {
      var err = new Error('Not Found in database')
      err.status = 404
      throw err
    }
    return data
  }

  createMovieItem(movie, urls){
    return {
      name: movie.title,
      poster: movie.poster_path ? urls.poster + movie.poster_path : '',
      backdrop: movie.backdrop_path ? urls.backdrop + movie.backdrop_path : '',
      overview: movie.overview,
      releaseDate: movie.release_date,
      genre: movie.genre_ids
    }
  }

  async getAPIBaseUrlImages(){
    const url = config.get('TMDbConfigURL')
    const response = await axios.get(url, { params: { api_key: this.token } } )
    const base_url = response.data.images.base_url
    const backdrop_size = response.data.images.backdrop_sizes[0]
    const poster_size = response.data.images.poster_sizes[2]

    return {
      poster: base_url + poster_size + '/',
      backdrop: base_url + backdrop_size + '/'
    }
  }

  async getAPIHash() {
    const response = await axios.get(this.url, { params: { api_key: this.token, page: 1 } } )
    return {
      hash: md5(response.data.results),
      total_pages: response.data.total_pages
    }
  }

  async updateCacheDB(total_pages) {
    console.log('updating cache database')    
    const promises = Array.from({length: total_pages}, (v, k) => axios.get(this.url, { params: { api_key: this.token, page: k+1 } } ))
    const responses = await Promise.all(promises)
    const urls = await this.getAPIBaseUrlImages()
    
    await this.model.drop()
    
    const promisePages = await responses.map( async resp => {      
      const promisesMovies = resp.data.results.map(async movie => {      
        const item = this.createMovieItem(movie, urls)        
        return this.model.create(item)
      })
      return await Promise.all(promisesMovies)
    })
    return await Promise.all(promisePages)
  }

  async readAll(request, response, next) {
    let movieData = []
    const cacheExpire = config.get('cacheValidTime') || 360
    try{
      if (Math.floor(Date.now() / 1000) > this.lastAPICheck + cacheExpire) {
        const apiAnswer = await this.getAPIHash()
        if (apiAnswer.hash != this.lastAPIHash) {
          const movies = await this.updateCacheDB(apiAnswer.total_pages)
          movieData = movies.flat()
          this.lastAPIHash = apiAnswer.hash
        }
        this.lastAPICheck = Math.floor(Date.now() / 1000) + cacheExpire
      }
    }catch(error){
      console.log(error)
    }
    
    if(movieData.length === 0){
      console.log('reading from cache database')
      this.model.find({})
      .then(function (data) {
        response.json(data)
      })
      .catch(next)
    }else{   
      response.json(movieData)
    }
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