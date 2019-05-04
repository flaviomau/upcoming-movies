const config = require('config')
const axios = require('axios')
const md5 = require('md5')

class MovieController {

  constructor(movieModel, genreModel) {
    this.movieModel = movieModel
    this.genreModel = genreModel
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

  async updateGenresCache(){
    const url = config.get('TMDbGenresURL')
    const response = await axios.get(url, { params: { api_key: this.token } } )
    const genres = await this.genreModel.find({})

    if(md5(genres) !== md5(response.data.genres)){      
      await this.genreModel.drop()
      const promisesGenres = response.data.genres.map(async genre => {
        const item = {_id: genre.id, name: genre.name}        
        return this.genreModel.create(item)
      })
      await Promise.all(promisesGenres)
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

  async updateMoviesCache(total_pages) {
    console.log('updating cache database')
    const promises = Array.from({length: total_pages}, (v, k) => axios.get(this.url, { params: { api_key: this.token, page: k+1 } } ))
    const responses = await Promise.all(promises)
    const urls = await this.getAPIBaseUrlImages()
    
    await this.movieModel.drop()
    
    const promisePages = await responses.map( async resp => {      
      const promisesMovies = resp.data.results.map(async movie => {      
        const item = this.createMovieItem(movie, urls)        
        return this.movieModel.create(item)
      })
      return await Promise.all(promisesMovies)
    })
    return await Promise.all(promisePages)
  }

  async readAll(request, response, next) {
    const cacheExpire = config.get('cacheValidTime') || 360
    try{
      if (Math.floor(Date.now() / 1000) > this.lastAPICheck + cacheExpire) {
        const apiAnswer = await this.getAPIHash()
        if (apiAnswer.hash != this.lastAPIHash) {
          await this.updateGenresCache()
          await this.updateMoviesCache(apiAnswer.total_pages)
          this.lastAPIHash = apiAnswer.hash
        }
        this.lastAPICheck = Math.floor(Date.now() / 1000) + cacheExpire
      }
    }catch(error){
      console.log(error)
    }
    
    const query = (request.query.filter) ? {name: { $regex: '.*' + request.query.filter + '.*', $options: 'i' }} :  {}

    this.movieModel.find(query)
    .then(function (data) {
      response.json(data)
    })
    .catch(next)
  }

  readById(request, response, next) {
    const query = { _id: request.params._id }
    this.movieModel.findOne(query)
      .then(this.handleNotFound)
      .then(function (data) {
        response.json(data)
      })
      .catch(next)
  }

  create(request, response, next) {
    const movie = request.body
    this.movieModel.create(movie)
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
    this.movieModel.update(_id, movie)
      .then(data => {
        response.json(data)
      })
      .catch(error => {
        response.json(error)
      })
  }

  remove(request, response, next) {
    const _id = request.params._id
    this.movieModel.remove(_id)
      .then(function (data) {
        response.json(data)
      })
      .catch(next)
  }
}

module.exports = function (MovieModel, GenreModel) {
  return new MovieController(MovieModel, GenreModel)
}