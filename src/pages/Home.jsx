import MovieCard from "../components/MovieCard";
import { useState, useEffect, useCallback } from "react";
import { searchMovies, getPopularMovies, getTrendingMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("popular");
  const [isSearching, setIsSearching] = useState(false);

  const loadMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [popular, trending] = await Promise.all([
        getPopularMovies(),
        getTrendingMovies()
      ]);
      setMovies(popular);
      setTrendingMovies(trending);
    } catch (err) {
      console.error(err);
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset and load initial data when component mounts
  useEffect(() => {
    setSearchQuery("");
    setIsSearching(false);
    setActiveTab("popular");
    loadMovies();
  }, [loadMovies]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchQuery("");
      setIsSearching(false);
      loadMovies();
      return;
    }

    setLoading(true);
    setIsSearching(true);
    setError(null);

    try {
      const searchResults = await searchMovies(searchQuery);
      if (searchResults.length === 0) {
        setError("No movies found matching your search.");
      }
      setMovies(searchResults);
    } catch (err) {
      console.error(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    if (tab === activeTab || loading) return;
    setActiveTab(tab);
    setSearchQuery("");
    setIsSearching(false);
    setError(null);
  };

  const displayMovies = isSearching ? movies : (activeTab === "popular" ? movies : trendingMovies);

  return (
    <div className="home">
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
          />
          <button 
            type="submit" 
            className="search-button" 
            disabled={loading}
          >
            {loading ? "Searching..." : "🔍 Search"}
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      {!isSearching && (
        <div className="tabs">
          <button
            className={`tab ${activeTab === "popular" ? "active" : ""}`}
            onClick={() => handleTabChange("popular")}
            disabled={loading}
          >
            Popular Movies
          </button>
          <button
            className={`tab ${activeTab === "trending" ? "active" : ""}`}
            onClick={() => handleTabChange("trending")}
            disabled={loading}
          >
            Trending Now
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : displayMovies.length > 0 ? (
        <div className="movies-grid">
          {displayMovies.slice(0, 12).map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          {error || "No movies found"}
        </div>
      )}
    </div>
  );
}

export default Home;
