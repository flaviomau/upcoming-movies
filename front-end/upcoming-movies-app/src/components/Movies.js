import React, { Component } from 'react'
import { connect } from 'react-redux'
import actionCreators from '../redux/actionCreators'

import Spinner from 'react-bootstrap/Spinner'
import CardColumns from 'react-bootstrap/CardColumns'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'

import MovieCard from './MovieCard'

class Movies extends Component {
  state = {
    filter: ''
  }

  componentDidMount() {
    this.props.LoadMoviesRequest('')
  }

  handleChangeText = field => event => {
    const state = {...this.state}
    state[field] = event.target.value
    this.setState(state)
  }

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Upcomming Movies Web App</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Form inline>
              <Form.Control type="text" placeholder="Filter" className="mr-sm-2" onChange={this.handleChangeText('filter')}/>
              <Button variant="outline-info" onClick={ () => this.props.LoadMoviesRequest(this.state.filter)}>Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        {
          this.props.isLoading && <Spinner animation="border" />
        }
        {
          !this.props.isLoading &&
          <CardColumns>
            {
              this.props.data.map(movie => {
                return (
                  <MovieCard key={movie._id} movie={movie} />
                )
              })
            }
          </CardColumns>
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