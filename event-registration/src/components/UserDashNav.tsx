import { Link, useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";
import ThemeSwitch from "./ThemeSwitch";
import "../assets/NavBar.css";

const UserDashNav = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/">
        Event Registration
      </Link>

      <div
        className="collapse navbar-collapse nav-items-container"
        id="navbarNav"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link
              className={`nav-link mx-3 ${
                location.pathname === "/login/admin" ? "active" : ""
              }`}
              to="/login/admin"
            >
              Home
            </Link>
          </li>
        </ul>
        <form className="form-inline login-signup-btn">
          <UserProfile />
          <ThemeSwitch />
        </form>
      </div>
    </nav>
  );
};

export default UserDashNav;
