import React from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

class MainView extends React.Component {

	constructor() {
		super();
		this.state = {
			movies: [
				{_id: 1, Title: 'Inception', Description: 'The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets.', Genre: 'Sci-Fi', Director: 'Christopher Nolan', ImagePath: 'inception.jpeg'},
				{_id: 2, Title: 'The Shawshank Redemption', Description: 'It tells the story of banker Andy Dufresne (Tim Robbins), who is sentenced to life in Shawshank State Penitentiary for the murders of his wife and her lover, despite his claims of innocence.', Genre: 'Drama', Director: 'Frank Darabont', ImagePath: 'shawshank_redemption.jpeg'},
				{_id: 3, Title: 'Gladiator', Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', Genre: 'Action', Director: 'Ridley Scott', ImagePath: 'gladiator.jpeg'}
			],
			selectedMovie: null
		};
	}

	setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
		const { movies, selectedMovie } = this.state;
		
		if (movies.length === 0) return <div className='main-view'>The list is empty!</div>;

		return (
			<div className="main-view">
      {selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
        ))
      }
    </div>
		);
  }
}

export default MainView;