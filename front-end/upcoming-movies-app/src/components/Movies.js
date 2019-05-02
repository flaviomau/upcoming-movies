import React, { Component } from 'react'
import { connect } from 'react-redux'
import actionCreators from '../redux/actionCreators'

import Spinner from 'react-bootstrap/Spinner'

class Movies extends Component {
  componentDidMount() {
    this.props.LoadMoviesRequest()
  }

  render() {
    return (      
      <div>
      {
        this.props.isLoading && <Spinner animation="border" />
      }
      {
        !this.props.isLoading && this.props.data.map( movie => {
          return (
            <h4 key={movie._id}>{movie.name}</h4>
          )
        })
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.movies.data,
    isLoading: state.movies.isLoading,
    error: state.movies.error,
    message: state.movies.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    LoadMoviesRequest: (filter) => dispatch(actionCreators.LoadMoviesRequest(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies)