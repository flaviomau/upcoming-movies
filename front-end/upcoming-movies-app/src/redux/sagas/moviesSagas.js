import { put } from 'redux-saga/effects'
import axios from 'axios'
import actionCreators from '../actionCreators'
import config from '../../config'

export function* loadMovies(action) {
  try {    
    const response = yield axios.get(`${config.UpcomingMoviesAppAPIURL}/movies?filter=${action.filter}`)
    yield put(actionCreators.LoadMoviesSuccess(response.data))
  } catch (ex) {
    yield put(actionCreators.LoadMoviesFailure(ex.response.data))
  }
}

export function* loadMovie(action) {
  try {    
    const response = yield axios.get(`${config.UpcomingMoviesAppAPIURL}/movies/${action.id}`)
    yield put(actionCreators.LoadMovieSuccess(response.data))
  } catch (ex) {
    yield put(actionCreators.LoadMovieFailure(ex.response.data))
  }
}

//export default loadMovies