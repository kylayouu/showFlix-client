import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './profile-view.scss';
import UserFavoriteMovies from './user-favorite-movies';
import UpdateUser from './update-user';

class ProfileView extends React.Component {

	constructor() {
		super();
		this.state = {
			Username: null,
			Password: null,
			Email: null,
			Birthday: null,
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
				Birthday: response.data.Birthday,
			});
		}).catch(error => {
			console.log(error)
		})
	}

	onLoggedOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({
			user: null
		});
	}

	removeUser = () => {
		const accessToken = localStorage.getItem('token');
		const Username = localStorage.getItem('user');

		axios.delete(`https://cryptic-tor-08539.herokuapp.com/users/${Username}`, {
			headers: { Authorization: `Bearer ${accessToken}`}
		}).then(response => {
			console.log(response)
			console.log(Username + ' has been successfully removed');
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			window.open('/', '_self');
		}).catch(error => {
			console.log(error + 'There has been an error.')
		})
	}

  render() {
		const { movies, user } = this.props;
		const { Username, Email } = this.state;

		return (
			<Container className='profile-view-container'>
				<Row className='page-title-row'>
					<h1>My Account</h1>
				</Row>
				<Row className='justify-content-center'>
					<Card className='profile-info-card'>
						<Card.Title>
							User Info
						</Card.Title>
						<Card.Body>
							<div>
								<span className='label'>Username: </span>
								<span className='value'>{Username}</span>
							</div>
							<div>
								<span className='label'>Email: </span>
								<span className='value'>{Email}</span>
							</div>
						</Card.Body>
						<Card.Footer>
							<Button variant="danger" onClick={() => this.removeUser(user)} >Delete Profile</Button>
						</Card.Footer>
					</Card>
					<Col md={6}>
					<UpdateUser user={user} />
					</Col>
				</Row>
				<UserFavoriteMovies movies={movies} />
			</Container>
		);
  }
}

ProfileView.propTypes = {
  profile: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired
  })
};

export default ProfileView;