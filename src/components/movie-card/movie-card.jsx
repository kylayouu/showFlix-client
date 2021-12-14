import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';
import { CardGroup, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class MovieCard extends React.Component {
	addToFav(id) {
		const token = localStorage.getItem('token');
		const Username = localStorage.getItem('user');
		axios.post(`https://cryptic-tor-08539.herokuapp.com/users/${Username}/favorites/${id}`, {
			headers: { Authorization: `Bearer ${token}` }
		}).then(response => {
			console.log(response)
			alert ('The movie has been added to favorites.')
		}).catch(error => {
			alert ('Failed to add move to favorites.')
		})
	}
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
						<Link to="#" onClick={() => {this.addToFav(movie._id)}}>
							<Button className='movie-card-btn' variant='link'>Add to Favorites</Button>
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