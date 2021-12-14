import React from "react";
import axios from "axios";
import { Form, Button, Card } from 'react-bootstrap';
import './update-user.scss';
import PropTypes from 'prop-types';

class UpdateUser extends React.Component {

	constructor() {
		super();
		this.state = {
			Username: '',
			Password: '',
			Email: '',
			Birthday: '',
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
			console.log(response)
			const dateFormat = new Date(response.data.Birthday).getMonth().toString().length == 1 ? "0" + new Date(response.data.Birthday).getMonth() : new Date(response.data.Birthday).getMonth();
			this.setState({
				Username: response.data.Username,
				Password: response.data.Password,
				Email: response.data.Email,
				Birthday: new Date(response.data.Birthday).getFullYear() + "-" + dateFormat + "-" + new Date(response.data.Birthday).getDate() 
			});
		}).catch(error => {
			console.log(error)
		})
	}

	editUsername(value) {
		this.state.Username = value;
	}

	editPassword(value) {
		this.state.Password = value;
	}

	editEmail(value) {
		this.state.Email = value;
	}

	editBirthday(value) {
		this.state.Birthday = value;
	}

	handleUpdate(e) {
		e.preventDefault();
		const accessToken = localStorage.getItem('token');
		const Username = localStorage.getItem('user')

		axios.put(`https://cryptic-tor-08539.herokuapp.com/users/${Username}`, {
			Username: this.state.Username,
			Password: this.state.Password,
			Email: this.state.Email,
			Birthday: this.state.Birthday
		}, { headers: { Authorization: `Bearer ${accessToken}`} 
		}).then(response => {
			this.setState({
				Username: response.data.Username,
				Password: response.data.Password,
				Email: response.data.Email,
				Birthday: new Date(response.data.Birthday).getFullYear() + "-" + new Date(response.data.Birthday).getMonth() + "-" + new Date(response.data.Birthday).getDate()
			});
			localStorage.setItem('user', this.state.Username);
			const data = response.data;
			console.log(data);
			alert('User information has been updated.')
		}).catch(error => {
			console.log(error);
		});
	}

	render() {
		const { Username, Email, Birthday } = this.state;
		return (
			<div className='update-user'>
						<Card>
							<Card.Title>
								Update Information
							</Card.Title>
							<Card.Body>
							<Form onSubmit={(e) => this.handleUpdate(e)}>
								<Form.Label>Username</Form.Label>
								<Form.Control type='text' name='Username' disabled="disabled" defaultValue={Username} onChange={(e) => this.editUsername(e.target.value)}/>
								<Form.Label>Password</Form.Label>
								<Form.Control type='password' name='Password' defaultValue='Password' onChange={(e) => this.editPassword(e.target.value)}/>
								<Form.Label>Email</Form.Label>
								<Form.Control type='email' name='Email' defaultValue={Email} onChange={(e) => this.editEmail(e.target.value)}/>
								<Form.Label>Birthday</Form.Label>
								<Form.Control type='date' name='Birthday' defaultValue={Birthday} onChange={(e) => this.editBirthday(e.target.value)}/>
							</Form>
							</Card.Body>
							<Card.Footer>
								<Button variant='primary' type='submit' onClick={(e) => this.handleUpdate(e)}>Update</Button>
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
    Birthday: PropTypes.string.isRequired
  })
};

export default UpdateUser