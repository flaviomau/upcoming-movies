import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
  data: [],
  isLoading: false,
  error: false
}

export const LoadMoviesRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true,
    data: [],
    error: false
  }
}

export const LoadMoviesSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    data: action.data,
    error: false
  }
}

export const LoadMoviesFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    data: [],
    error: true,
    message: action.data
  }
}

export const LoadMovieRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true,
    data: [],
    error: false
  }
}

export const LoadMovieSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    data: action.data,
    error: false
  }
}

export const LoadMovieFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    data: [],
    error: true,
    message: action.data
  }
}

export const HANDLERS = {
  [Types.LOAD_MOVIES_REQUEST]: LoadMoviesRequest,
  [Types.LOAD_MOVIES_SUCCESS]: LoadMoviesSuccess,
  [Types.LOAD_MOVIES_FAILURE]: LoadMoviesFailure,
  [Types.LOAD_MOVIE_REQUEST]: LoadMovieRequest,
  [Types.LOAD_MOVIE_SUCCESS]: LoadMovieSuccess,
  [Types.LOAD_MOVIE_FAILURE]: LoadMovieFailure
}

export default createReducer(INITIAL_STATE, HANDLERS)
