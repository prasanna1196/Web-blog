import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;

  const onLogout = () => {
    logout();
  };

  useEffect(() => {
    loadUser();
  }, []);

  const authLinks = (
    <Fragment>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/dashboard">{user && user.name} Dashboard</Link>
      </li>
      <li>
        <a onClick={onLogout} href="/">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <Link to="/">
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.defaultProps = {
  title: "React Blog",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
