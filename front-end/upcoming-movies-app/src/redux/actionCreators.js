import { createActions } from 'reduxsauce'

export const {Types, Creators} = createActions({
  LoadMoviesRequest: ['filter'],
  LoadMoviesSuccess: ['data'],
  LoadMoviesFailure: ['data']
})

export default Creators