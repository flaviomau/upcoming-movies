import React from 'react'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

const MovieCard = (props) => {

  const overview = props.movie.overview <= 50 ? props.movie.overview : props.movie.overview.substr(1, 100) + '...'

  return (
    <Card>
      <Card.Img variant="top" src={props.movie.poster} />
      <Card.Body>
        <Card.Title>{props.movie.name}</Card.Title>
        <Card.Text>{overview}</Card.Text>
        {
          props.movie.genre.map( g => {
            return <Badge pill variant="info" key={g._id}>{g.name}</Badge>
          })
        }        
        <Button variant="outline-info" className="justify-content-end">Read More</Button>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Release: {props.movie.releaseDate}</small>
      </Card.Footer>
    </Card>
  )
}

export default MovieCard