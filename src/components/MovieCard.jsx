import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { useNavigate } from "react-router-dom"

function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const navigate = useNavigate()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.stopPropagation()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    function onMovieClick() {
        navigate(`/movie/${movie.id}`)
    }

    return <div className="movie-card" onClick={onMovieClick}>
        <div className="movie-poster">
            <img 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"} 
                alt={movie.title}
                onError={(e) => {
                    e.target.src = "https://via.placeholder.com/500x750?text=No+Image";
                }}
            />
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.overview?.substring(0, 100)}...</p>
            <p>Rating: {movie.vote_average}/10</p>
        </div>
    </div>
}

export default MovieCard