import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Container } from 'react-bootstrap';
import './profile-view.scss';
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';

class ProfileView extends React.Component {

	constructor() {
		super();
		this.state = {
			Username: null,
			Password: null,
			Email: null,
			Birthdate: null,
			FavoriteMovies: []
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

	onLoggedOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({
			user: null
		});
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
				FavoriteMovies: response.data.FavoriteMovies
			});
		}).catch(error => {
			console.error(error)
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
			console.error(error);
		});
	}

	removeFaveMovie = (movie) => {
		const accessToken = localStorage.getItem('token');
		const Username = localStorage.getItem('user');

		axios.delete(`https://cryptic-tor-08539.herokuapp.com/users/${Username}/favorites/${movie._id}`, {
			headers: { Authorization: `Bearer ${accessToken}`}
		}).then(response => {
			this.setState({
				FavoriteMovies: response.data.FavoriteMovies
			});
			console.log(response.data.FavoriteMovies);
			this.componentDidMount;
		}).catch(error => {
			console.error(error);
		})
	}

	removeUser = (e) => {
		e.preventDefault();
		const accessToken = localStorage.getItem('token');
		const Username = localStorage.getItem('user');

		axios.delete(`https://cryptic-tor-08539.herokuapp.com/users/${Username}`, {
			headers: { Authorization: `Bearer ${accessToken}`}
		}).then(response => {
			console.log(response)
			console.log(Username + ' has been successfully removed');
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			this.setState({
				user: null
			});
		}).catch(error => {
			console.error(error + 'There has been an error.')
		})
	}

  render() {
		const { user, movies } = this.props;
		const FavoriteMovies = movies.filter(movie => {
			return this.state.FavoriteMovies.includes(movie._id)
		})

		return (
			<Container className="profileWrapper">
				<UserInfo />
				<FavoriteMovies FavoriteMovies={FavoriteMovies} />
				<UpdateUser editUsername={editUsername} editPassword={editPassword} editEmail={editEmail} editPassword={editPassword} handleUpdate={handleUpdate}/>
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