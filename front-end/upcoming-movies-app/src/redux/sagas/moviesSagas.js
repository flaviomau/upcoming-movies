import { put } from 'redux-saga/effects'
import axios from 'axios'
import actionCreators from '../actionCreators'
import config from '../../config'

function* loadMovies(action) {
  try {    
    const response = yield axios.get(`${config.UpcomingMoviesAppAPIURL}/movies?filter=${action.filter}`)
    yield put(actionCreators.LoadMoviesSuccess(response.data))
  } catch (ex) {
    yield put(actionCreators.LoadMoviesFailure(ex.response.data))
  }
}

export default loadMovies