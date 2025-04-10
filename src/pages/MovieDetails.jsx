import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, getSimilarMovies } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../css/MovieDetails.css";

function MovieDetails() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const [movieData, similarData] = await Promise.all([
          getMovieDetails(movieId),
          getSimilarMovies(movieId)
        ]);
        setMovie(movieData);
        setSimilarMovies(similarData.slice(0, 6)); // Show only 6 similar movies
      } catch (err) {
        setError("Failed to load movie details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  const handleFavoriteClick = () => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div className="error">Movie not found</div>;

  const favorite = isFavorite(movie.id);

  return (
    <div className="movie-details">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="movie-details-content">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/500x750?text=No+Image";
            }}
          />
          <button 
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={handleFavoriteClick}
          >
            {favorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <div className="movie-meta">
            <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
            <span className="release-date">📅 {movie.release_date}</span>
            <span className="runtime">⏱️ {movie.runtime} min</span>
          </div>
          <div className="genres">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="genre">
                {genre.name}
              </span>
            ))}
          </div>
          <p className="overview">{movie.overview}</p>
          <div className="additional-info">
            <h3>Production Companies</h3>
            <div className="companies">
              {movie.production_companies.map((company) => (
                <span key={company.id} className="company">
                  {company.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {similarMovies.length > 0 && (
        <div className="similar-movies">
          <h2>Similar Movies</h2>
          <div className="movies-grid">
            {similarMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails; 