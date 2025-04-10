import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';
import { FaHeart } from 'react-icons/fa';
import '../css/Favorites.css';

const Favorites = () => {
  const { favorites } = useMovieContext();

  return (
    <div className="favorites">
      <h1>My Favorites</h1>
      {favorites.length === 0 ? (
        <div className="no-favorites">
          <div className="no-favorites-content">
            <FaHeart className="no-favorites-icon" />
            <h2>No favorite movies yet</h2>
            <p>Start adding movies to your favorites by clicking the heart icon on any movie!</p>
          </div>
        </div>
      ) : (
        <div className="movies-grid">
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
