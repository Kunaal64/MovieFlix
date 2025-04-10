import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import { Routes, Route, useNavigate } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import { useState } from "react";

function App() {
  const navigate = useNavigate();
  const [resetKey, setResetKey] = useState(0);

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate("/");
    // Force Home component to remount by changing its key
    setResetKey(prev => prev + 1);
  };

  return (
    <MovieProvider>
      <NavBar onHomeClick={handleHomeClick} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home key={resetKey} />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
