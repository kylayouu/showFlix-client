import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';
import { Container, Row, Col, CardGroup, Card, Button } from 'react-bootstrap';

class MovieCard extends React.Component {
  render() {
		const { movie, onMovieClick } = this.props;
    return (
			<CardGroup className='movie-card'>
				<Card>
					<Card.Img variant='top' src={movie.ImagePath} />
					<Card.Body>
						<Card.Title>{movie.Title}</Card.Title>
						<Card.Text>{movie.Description}</Card.Text>
					</Card.Body>
					<Card.Footer>
						<Button id='movie-card-btn' onClick={ () => { onMovieClick(movie) } }>Open</Button>
					</Card.Footer>
				</Card>
			</CardGroup>
		);
	}
};

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
	}).isRequired,
	onMovieClick: PropTypes.func.isRequired
};

export default MovieCard;