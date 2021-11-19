import React from 'react';
import axios from 'axios';

import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
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
		axios.get('https://cryptic-tor-08539.herokuapp.com/movies')
			.then(response => {
				this.setState({
					movies: response.data
				});
			})
			.catch(error => {
				console.log(error);
			});
	};

	setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  };

	// When a new user registers
	// onRegistration(newUser) {
	// 	this.setState({
	// 		newUser
	// 	})
	// };

/* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
	// onLoggedIn(user) {
  //   this.setState({
  //     user
  //   });
  // };

  render() {
		const { movies, selectedMovie, user, newUser } = this.state;
		
		// When a user registers
		// if (!newUser) return <RegistrationView onRegistration={newUser => this.onRegistration(newUser)} />;

		/* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

		if (movies.length === 0) return <div className='main-view' />;

		return (
			<Container className='main-view-container'>
				<Row className='main-view justify-content-md-center'>
					{selectedMovie
						? (
							<Col>
								<MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
							</Col>
						)
						: 
						movies.map(movie => (
							<Col md={6} lg={4} xl={3} key={movie._id}>
								<MovieCard movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
							</Col>
						))
					}
				</Row>
		</Container>
		);
  }

}

export default MainView;