
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active-link" : "";
  };

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
        <Link
          to="/"
          className={isActive("/")}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>

        <Link
          to="/dashboard"
          className={isActive("/dashboard")}
          onClick={() => setMenuOpen(false)}
        >
          Dashboard
        </Link>

        <Link
          to="/participants"
          className={isActive("/participants")}
          onClick={() => setMenuOpen(false)}
        >
          Participants
        </Link>

        <Link
          to="/profile"
          className={isActive("/profile")}
          onClick={() => setMenuOpen(false)}
        >
          Profile
        </Link>

        <Link
          to="/login"
          className={isActive("/login")}
          onClick={() => setMenuOpen(false)}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
