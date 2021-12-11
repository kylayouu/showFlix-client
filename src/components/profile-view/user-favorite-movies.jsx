import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, Col, Row, Button, Figure, CardGroup } from 'react-bootstrap';
import './user-favorite-movies.scss';
import '../movie-card/movie-card.scss';

class UserFavoriteMovies extends React.Component {
  render() {
    const { removeFaveMovie, FavoriteMovies } = this.props;

    return (
      <Container className='favorites-list'>
        <Row>
          <h2>My Favorite Movies</h2>
            <Row className='movie-card-row'>
              {FavoriteMovies.map((movie) => {
                return (
                  <Col className='d-flex justify-content-center' sm={4} md={3}  key={movie._id}>
                    <CardGroup className='movie-card'>
                      <Card>
                        <Link to={`/movies/${movie._id}`}>
                          <Card.Img variant='top' src={movie.ImagePath} />
                          <Card.Body>
                            <Card.Title>{movie.Title}</Card.Title>
                          </Card.Body>
                        </Link>
                        <Card.Footer>
                          <Button className='movie-card-btn' variant='primary' onClick={() => removeFaveMovie(movie._id)}>Remove</Button>
                        </Card.Footer>
                      </Card>
                    </CardGroup>
                  </Col>
                )
              })}
            </Row>
        </Row>
      </Container>
    )
  }
}

export default UserFavoriteMovies