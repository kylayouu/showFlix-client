import React from "react";

class MovieView extends React.Component {

	componentDidMount() {
		document.addEventListener('keypress', event => {
			console.log(event.key);
		});
	}
	
	render() {
		const { movie, onBackClick } = this.props;

		return (
			<div className='movie-view'>
				<div className='movie-poster'>
					<img src={movie.ImagePath} alt='imagepath' />
				</div>
				<div className='movie-title'>
					<span className='label'>Title: </span>
					<span className='value'>{movie.Title}</span>
				</div>
				<div className='movie-description'>
					<span className='label'>Description: </span>
					<span className='value'>{movie.Description}</span>
				</div>
				<div className='movie-genre'>
					<span className='label'>Genre: </span>
					<span className='value'>{movie.Genre}</span>
				</div>
				<div className='movie-directors'>
					<span className='label'>Director: </span>
					<span className='value'>{movie.Director}</span>
				</div>
				<button onClick={() => { onBackClick(null); }} >Back</button>

			</div>
		);
	}
}

export default MovieView;