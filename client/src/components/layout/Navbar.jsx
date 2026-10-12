
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
        EventEase
      </NavLink>

      <button
        className="menu-toggle"
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        ☰
      </button>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" end onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/dashboard" onClick={closeMenu}>
          Dashboard
        </NavLink>
        <NavLink to="/profile" onClick={closeMenu}>
          Profile
        </NavLink>
        <NavLink to="/login" onClick={closeMenu}>
          Login
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
