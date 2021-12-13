import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import NavbarView from '../navbar-view/navbar';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import { Container, Row, Col } from 'react-bootstrap';
import './main-view.scss';

class MainView extends React.Component {

	constructor() {
		super();
		this.state = {
			movies: [],
			selectedMovie: null,
			user: null,
			newUser: null
		};
	}

	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem('user')
			});
			this.getMovies(accessToken); 
		}
	}

	getMovies(token) {
		axios.get('https://cryptic-tor-08539.herokuapp.com/movies', {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then(response => {
				// Assign the result to the state
				this.setState({
					movies: response.data
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  };
	
/* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
	onLoggedIn(authData) {
		console.log(authData);
    this.setState({
      user: authData.user.Username
    });

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		// this.props.getUser(authData.token);
		this.getMovies(authData.token);
  };

	onLoggedOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({
			user: null
		});
	}

  render() {
		const { movies, user, newUser } = this.state;

		return (
			<Router>
				<NavbarView user={user} />
				<Container className='main-view-container'>
					<Row className='main-view justify-content-md-center'>

						<Route exact path='/' render={() => {
    					if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
							if (movies.length === 0) return <div className='main-view' />;
							return movies.map(movie => (
								<Col className='d-flex justify-content-center' md={6} lg={4} xl={3} key={movie._id}>
									<MovieCard movie={movie} />
								</Col>
							))
						}} />

						<Route exact path='/users/:Username'
            render={({ history }) => {
							if (newUser) return <RegistrationView />;
							if (movies.length === 0) return <div className='main-view' />;
              return <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />;
            }} />

						<Route path='/register' render={() => {
							if (newUser) return <RegistrationView />;
							if (user) return <Redirect to='/' />;
							return <RegistrationView />
						}} />

						<Route path='/login' render={() => {
							return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
						}} />

						<Route path='/movies/:movieId' render={({ match, history }) => {
							if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
							if (movies.length === 0) return <div className='main-view' />;
							return <Col>
								<MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
							</Col>
						}} />

						<Route path='/genres/:name' render={({ match, history }) => {
							if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
							if (movies.length === 0) return <div className="main-view" />;
							return <Col>
								<GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
							</Col>
						}
						} />

						<Route path='/directors/:name' render={({ match, history }) => {
							if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
							if (movies.length === 0) return <div className="main-view" />;
							return <Col md={8}>
								<DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
							</Col>
						}
						} />

					</Row>
				</Container>
			</Router>
		);
  }
}

export default MainView;