import { takeLatest, all } from 'redux-saga/effects'
import loadMovies from './moviesSagas'
import { Types } from '../actionCreators'

function* rootSaga() {
  yield all([
    takeLatest(Types.LOAD_MOVIES_REQUEST, loadMovies)
  ])
}

export default rootSaga