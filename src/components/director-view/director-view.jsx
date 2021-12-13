import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './director-view.scss';

function DirectorView(props) {
	const { director, onBackClick } = props;
	
	return (
		<Container className='director-view-container'>
			<Row>
				<Col>
					<Card className='director-card-info'>
						<Card.Title className='director-name'>
							<span className='value'>{director.Name}</span>
						</Card.Title>
						<Card.Body className='director-description'>
							<div>
								<span className='label'>Bio: </span>
								<span className='value'>{director.Bio}</span>
							</div>
							<div>
								<span className='label'>Birth: </span>
								<span className='value'>{director.Birth}</span>
							</div>
						</Card.Body>
						<Button onClick={() => { onBackClick(null) }}>Back</Button>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default DirectorView;