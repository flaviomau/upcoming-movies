import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

const MovieCard = (props) => {
  return (
    <Card>
      <Card.Img variant="top" src={props.movie.poster} />
      <Card.Body>
        <Card.Title>{props.movie.name}</Card.Title>        
        <p><Link to={`/detail/${props.movie._id}`} className="justify-content-end">Read More</Link></p>
        {
          props.movie.genre.map( g => {
            return <Badge pill variant="info" key={g._id}>{g.name}</Badge>
          })
        }                        
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Release: {props.movie.releaseDate}</small>
      </Card.Footer>
    </Card>
  )
}

export default MovieCard