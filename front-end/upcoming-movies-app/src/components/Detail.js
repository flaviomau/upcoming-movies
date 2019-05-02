import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import actionCreators from '../redux/actionCreators'
import Media from 'react-bootstrap/Media'
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'

class Detail extends Component {
  componentDidMount() {
    this.props.LoadMovieRequest(this.props.match.params.id)
  }

  render() {
    return (
      <div>
        {
          this.props.isLoading && <Spinner animation="border" />
        }
        {
          !this.props.isLoading &&
          <Media>
            {
              this.props.data.poster &&
              <img                
                className="mr-3"
                src={this.props.data.poster}
                alt="Poster"
              />
            }
            {
              !this.props.data.poster &&
              <p>Poster not available</p>
            }
            
            <Media.Body>
              <h3>{this.props.data.name}</h3>
              <h4><p>{this.props.data.overview}</p></h4>
              <h5>
                <p>Release date: {this.props.data.releaseDate}</p>
                <p> 
                {
                  this.props.data.genre && this.props.data.genre.map(g => {
                    return <Badge pill variant="info" key={g._id}>{g.name}</Badge>
                  })
                }
                </p>
                <p><Link to={'/'} className="justify-content-end">Home page</Link></p>
              </h5>
            </Media.Body>            
            {
              this.props.data.backdrop &&
              <img                
                className="mr-3"
                src={this.props.data.backdrop}
                alt="Backdrop"
              />
            }
            {
              !this.props.data.backdrop &&
              <p>Poster not available</p>
            }            
          </Media>
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
    LoadMovieRequest: (id) => dispatch(actionCreators.LoadMovieRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
