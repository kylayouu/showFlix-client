import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap';

function FavoriteMovies({FavoriteMovies, removeFaveMovie}) {
	return (
		<div>
			<h2>My Favorite Movies</h2>
			{FavoriteMovies.map((movie) => {
				return(
					<div key={movie._id}>
						<img src={movie.ImagePath} alt='imagepath' />
						<Link to={`/movies/${movie._id}`}>
							<h4>{movie.Title}</h4>
						</Link>
						<Button variant='secondary' onClick={() => removeFaveMovie(movie._id)}>Delete</Button>
					</div>
				)
			})}
		</div>
	)
}

export default FavoriteMovies