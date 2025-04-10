import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css"

function NavBar({ onHomeClick }) {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="brand-link" onClick={onHomeClick}>
                    <span className="brand-icon">🎬</span>
                    <span className="brand-text">MovieFlix</span>
                </Link>
            </div>
            <div className="navbar-links">
                <Link 
                    to="/" 
                    className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                    onClick={onHomeClick}
                >
                    <span className="nav-icon">🏠</span>
                    <span className="nav-text">Home</span>
                </Link>
                <Link 
                    to="/favorites" 
                    className={`nav-link ${location.pathname === "/favorites" ? "active" : ""}`}
                >
                    <span className="nav-icon">❤️</span>
                    <span className="nav-text">Favorites</span>
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;