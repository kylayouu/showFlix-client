import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Card, Container, Row, Col, Button } from 'react-bootstrap';
import './registration-view.scss';
import { Link } from 'react-router-dom';

function RegistrationView() {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ birthdate, setBirthdate ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log( username, password, email, birthdate);
		axios.post('https://cryptic-tor-08539.herokuapp.com/users/register', {
			Username: username,
			Password: password,
			Email: email,
			Birthdate: birthdate
		})
		.then(response => {
			const data = response.data;
			console.log(data);
			window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
		})
		.catch(e => {
			console.log('error registering the user')
		});
  };

  return (
		<Container className='registration-container'>
			<Row className='justify-content-center'>
				<Col md={9} lg={9} xl={9}>
					<Card>
						<Card.Title>REGISTER</Card.Title>
						<Card.Body>
							<Form>
								<Form.Group>
									<Form.Label>Email:</Form.Label>
									<Form.Control type='text' placeholder='Enter your email address (Ex: abc@email.com)' value={email} onChange={e => setEmail(e.target.value)} />
								</Form.Group>
								<Form.Group>
									<Form.Label>Birthdate:</Form.Label>
									<Form.Control type='date' placeholder='Enter your birthdate' value={birthdate} onChange={e => setBirthdate(e.target.value)} />
								</Form.Group>
								<Form.Group>
									<Form.Label>Username:</Form.Label>
									<Form.Control type='text' placeholder='Enter your username' value={username} onChange={e => setUsername(e.target.value)} />
								</Form.Group>
								<Form.Group>
									<Form.Label>Password:</Form.Label>
									<Form.Control type='password' placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
								</Form.Group>
							</Form>
						</Card.Body>
						<Card.Footer>
							<Button type='submit' variant='primary' onClick={handleSubmit}>Submit</Button>
						</Card.Footer>
					</Card>
					<div className='user-status'>
						Already have an account?
						<span className='user-status'>
							<Link to={`/`}>Log In</Link>
						</span>
					</div>
				</Col>
			</Row>
		</Container>
  );
};

RegistrationView.propTypes = {
	newUser: PropTypes.shape({
		Username: PropTypes.string.isRequired,
		Password: PropTypes.string.isRequired,
		Email: PropTypes.string.isRequired,
		Birthdate: PropTypes.string.isRequired
	})
};

export default RegistrationView;