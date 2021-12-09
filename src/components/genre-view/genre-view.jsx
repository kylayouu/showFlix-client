import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './genre-view.scss';

function GenreView(props) {
	const { genre } = props;
	
	return (
		<Container className='genre-view-container'>
			<Row>
				<Col>
					<Card className='movie-card-info'>
						<Card.Title className='movie-title'>
							<span className='label'>Name: </span>
							<span className='value'>{genre.Name}</span>
						</Card.Title>
						<Card.Body className='movie-description'>
							<div>
								<span className='label'>Description: </span>
								<span className='value'>{genre.Description}</span>
							</div>
						</Card.Body>
						<Button onClick={() => { onBackClick(null) }}>Back</Button>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default GenreView;