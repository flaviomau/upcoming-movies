import { takeLatest, all } from 'redux-saga/effects'
import { loadMovies, loadMovie } from './moviesSagas'
import { Types } from '../actionCreators'

function* rootSaga() {
  yield all([
    takeLatest(Types.LOAD_MOVIES_REQUEST, loadMovies),
    takeLatest(Types.LOAD_MOVIE_REQUEST, loadMovie)
  ])
}

export default rootSaga