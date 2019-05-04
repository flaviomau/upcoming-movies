import { createActions } from 'reduxsauce'

export const {Types, Creators} = createActions({
  LoadMoviesRequest: ['filter'],
  LoadMoviesSuccess: ['data'],
  LoadMoviesFailure: ['data'],
  LoadMovieRequest: ['id'],
  LoadMovieSuccess: ['data'],
  LoadMovieFailure: ['data']
})

export default Creators