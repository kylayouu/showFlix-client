import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import './genre-view.scss';

function GenreView(props) {
	const { genre, onBackClick } = props;
	
	return (
		<Container className='genre-view-container'>
			<Row>
				<Col>
					<Card className='genre-card-info'>
						<Card.Title className='genre-name'>
							<span className='value'>{genre.Name}</span>
						</Card.Title>
						<Card.Body className='genre-description'>
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