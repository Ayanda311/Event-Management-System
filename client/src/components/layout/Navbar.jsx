import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link
        to="/"
        className="navbar-brand"
        onClick={() => setMenuOpen(false)}
      >
        EventEase
      </Link>

      <button
        type="button"
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        ☰
      </button>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
        <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;