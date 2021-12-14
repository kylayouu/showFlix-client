import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Container, Card, Col, Row, Button, CardGroup } from 'react-bootstrap';
import './user-favorite-movies.scss';
import '../movie-card/movie-card.scss';


class UserFavoriteMovies extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user : null, 
      FavoriteMovies : []
    }
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
				FavoriteMovies: response.data.FavoriteMovies
			});
		}).catch(error => {
			console.log(error)
		})
	}

  removeFaveMovie = (id) => {
    const accessToken = localStorage.getItem('token');
    const Username = localStorage.getItem('user');

    axios.delete(`https://cryptic-tor-08539.herokuapp.com/users/${Username}/favorites/` + (id), {
      headers: { Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      console.log(response.data.FavoriteMovies);
      this.componentDidMount;
    }).catch(error => {
      console.log(error);
    })
  }

  render() {
    const { movies } = this.props;
    const FavoriteMovies = movies.filter(m => {
			return this.state.FavoriteMovies.includes(m._id)
		})

    return (
      <Container className='favorites-list'>
        <Row className='justify-content-center'>
          <h2>My Favorite Movies</h2>
        </Row>
        <Row>
          {FavoriteMovies.map((movies) => {
            return (
              <Col className='d-flex justify-content-center' sm={4} md={3}  key={movies._id}>
                <CardGroup className='movie-card'>
                  <Card>
                    <Link to={`/movies/${movies._id}`}>
                      <Card.Img variant='top' src={movies.ImagePath} />
                      <Card.Body>
                        <Card.Title>{movies.Title}</Card.Title>
                      </Card.Body>
                    </Link>
                    <Card.Footer>
                      <Button variant='danger' onClick={() => {this.removeFaveMovie(movies._id)}}>Remove</Button>
                    </Card.Footer>
                  </Card>
                </CardGroup>
              </Col>
            )
          })}
        </Row>
      </Container>
    )
  }
}

export default UserFavoriteMovies