import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';
import { CardGroup, Card, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

class MovieCard extends React.Component {
  render() {
		const { movie } = this.props;
    return (
			<CardGroup className='movie-card'>
				<Card>
					<Card.Img variant='top' src={movie.ImagePath} />
					<Card.Body>
						<Card.Title>{movie.Title}</Card.Title>
					</Card.Body>
					<Card.Footer>
						<Link to={`/movies/${movie._id}`}>
							<Button className='movie-card-btn' variant='link'>Open</Button>
						</Link>
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
};

export default MovieCard;