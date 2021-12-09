import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './director-view.scss';

function DirectorView(props) {
	const { director } = props;
	
	return (
		<Container className='director-view-container'>
			<Row>
				<Col>
					<Card className='movie-card-info'>
						<Card.Title className='movie-title'>
							<span className='label'>Name: </span>
							<span className='value'>{director.Name}</span>
						</Card.Title>
						<Card.Body className='movie-description'>
							<div>
								<span className='label'>Bio: </span>
								<span className='value'>{director.Bio}</span>
							</div>
							<div>
								<span className='label'>Birth: </span>
								<span className='value'>{director.Birth}</span>
							</div>
						</Card.Body>
						<Link to={'/'}>
							<Button variant='link'>Back</Button>
						</Link>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default DirectorView;