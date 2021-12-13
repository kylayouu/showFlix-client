import React from "react";
import axios from "axios";
import { Form, Button, Card } from 'react-bootstrap';
import './update-user.scss';
import PropTypes from 'prop-types';

class UpdateUser extends React.Component {

	constructor() {
		super();
		this.state = {
			Username: null,
			Password: null,
			Email: null,
			Birthdate: null,
		};
	}

  componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem('user')
			});
			this.getUser(accessToken);
		}
	}

	getUser(token) {
		const Username = localStorage.getItem('user');
		axios.get(`https://cryptic-tor-08539.herokuapp.com/users/${Username}`, {
			headers: { Authorization: `Bearer ${token}` }
		}).then(response => {
			this.setState({
				Username: response.data.Username,
				Password: response.data.Password,
				Email: response.data.Email,
				Birthdate: response.data.Birthdate,
			});
		}).catch(error => {
			console.log(error)
		})
	}

	editUsername = (e) => {
		this.setState({
			Username: e.target.value
		})
	}

	editPassword = (e) => {
		this.setState({
			Password: e.target.value
		})
	}

	editEmail = (e) => {
		this.setState({
			Email: e.target.value
		})
	}

	editBirthdate = (e) => {
		this.setState({
			Birthdate: e.target.value
		})
	}

	handleUpdate = (e) => {
		e.preventDefault();
		const accessToken = localStorage.getItem('token');
		const Username = localStorage.getItem('user')

		axios.put(`https://cryptic-tor-08539.herokuapp.com/users/${Username}`, {
			Username: this.state.Username,
			Password: this.state.Password,
			Email: this.state.Email,
			Birthdate: this.state.Birthdate
		}, { headers: { Authorization: `Bearer ${accessToken}`} 
		}).then(response => {
			this.setState({
				Username: response.data.Username,
				Password: response.data.Password,
				Email: response.data.Email,
				Birthdate: response.data.Birthdate
			});
		}).catch(error => {
			console.log(error);
		});
	}

	render() {
		const { Username, Email, Birthdate } = this.state;
		return (
			<div className='update-user'>
						<Card>
							<Card.Title>
								Update Information
							</Card.Title>
							<Card.Body>
							<Form onSubmit={(e) => handleUpdate(e)}>
								<Form.Label>Username</Form.Label>
								<Form.Control type='text' name='Username' defaultValue={Username} onChange={e => editUsername(e)}/>
								<Form.Label>Password</Form.Label>
								<Form.Control type='password' name='Password' defaultValue='Password' onChange={e => editPassword(e)}/>
								<Form.Label>Email</Form.Label>
								<Form.Control type='email' name='email' defaultValue={Email} onChange={e => editEmail(e)}/>
								<Form.Label>Birthdate</Form.Label>
								<Form.Control type='date' name='birthdate' defaultValue={Birthdate} onChange={e => editBirthdate(e)}/>
							</Form>
							</Card.Body>
							<Card.Footer>
								<Button variant='primary' type='submit'>Update</Button>
							</Card.Footer>
						</Card>
				
			</div>
		)
	}	
}

UpdateUser.propTypes = {
  profile: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired
  })
};

export default UpdateUser