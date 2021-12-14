import React from "react";
import PropTypes from 'prop-types';
import {Container, Row, Col, Button, Card } from 'react-bootstrap';
import { CLIENT_RENEG_WINDOW } from "tls";
import './movie-view.scss';
import { Link } from "react-router-dom";

class MovieView extends React.Component {

	keypressCallback(event) {
    console.log(event.key);
  }

	componentDidMount() {
		document.addEventListener('keypress', event => {
			console.log(event.key);
		});
	}

	componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }
	
	render() {
		const { movie, onBackClick } = this.props;

		return (
			<Container className='movie-view-container'>
				<Row>
					<Col className='movie-poster' xs={3} md={4}>
						<img src={movie.ImagePath} alt='imagepath' />
					</Col>
					<Col xs={9} md={8}>
						<Card className='movie-card-info'>
							<Card.Title className='movie-title'>
								<span className='label'>Title: </span>
								<span className='value'>{movie.Title}</span>
							</Card.Title>
							<Card.Body className='movie-description'>
								<div>
									<span className='label'>Description: </span>
									<span className='value'>{movie.Description}</span>
								</div>
								<div className='movie-description'>
									<span className='label'>Genre: </span>
									<Link to={`/genres/${movie.Genre.Name}`}>
										<Button variant='link'>{movie.Genre.Name}</Button>
									</Link>
								</div>
								<div className='movie-description'>
									<span className='label'>Director: </span>
									<Link to={`/directors/${movie.Director.Name}`}>
										<Button variant='link'>{movie.Director.Name}</Button>
									</Link>
								</div>
							</Card.Body>
							<Button onClick={() => { onBackClick(null) }}>Back</Button>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
};

MovieView.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		Genre: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Description: PropTypes.string.isRequired
		}),
		Director: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Bio: PropTypes.string.isRequired,
			Birth: PropTypes.string.isRequired
		}),
    ImagePath: PropTypes.string.isRequired,
	}).isRequired
};

export default MovieView;