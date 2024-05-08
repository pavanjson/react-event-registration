import { Link, useLocation } from "react-router-dom";
import "../assets/NavBar.css";
import ThemeSwitch from "./ThemeSwitch";
import "../index.css";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/">
        Event Registration
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse nav-items-container"
        id="navbarNav"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link
              className={`nav-link mx-3 ${
                location.pathname === "/" ? "active" : ""
              }`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link mx-3 ${
                location.pathname === "/about" ? "active" : ""
              }`}
              to="/about"
            >
              About
            </Link>
          </li>
        </ul>
        <div className="form-inline login-signup-btn">
          <Link
            className="btn btn-primary m-3 custom-btn"
            to="login"
            role="button"
          >
            Login
          </Link>
          <Link
            className="btn btn-primary custom-btn"
            to="signup"
            role="button"
          >
            Sign Up
          </Link>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
