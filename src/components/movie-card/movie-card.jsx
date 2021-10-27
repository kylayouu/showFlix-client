import React from 'react';

class MovieCard extends React.Component {
  render() {
		const { movie, onMovieClick } = this.props;
    return <div className='movie-card' onClick={ () => { onMovieClick(movie); on } } aria-hidden="true">{movie.Title}</div>;
  }
}

export default MovieCard;