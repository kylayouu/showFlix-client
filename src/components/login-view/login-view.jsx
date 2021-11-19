import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Card, Col } from 'react-bootstrap';
import './login-view.scss';

function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
		<Container className='login-container'>
			<Row className='justify-content-center'>
				<Col md={8} lg={8} xl={8}>
					<Card className='login-card'>
						<Card.Title>LOGIN</Card.Title>
						<Card.Body>
							<Form>
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
							<Button variant='primary' type='submit' onClick={handleSubmit}>Submit</Button>
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		</Container>
  );
};

export default LoginView;