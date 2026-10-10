
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        EventEase
      </NavLink>

      <div className="navbar-links">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/profile">
          Profile
        </NavLink>

        <NavLink to="/login">
          Login
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
