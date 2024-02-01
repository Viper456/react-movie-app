import React from "react";
import { Link } from "react-router-dom";
import user_logo from "../../images/user_logo.png";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <div className="logo">React Movie App</div>
      </Link>
      <div className="user-image">
        <img src={user_logo} alt="user" />
      </div>
    </div>
  );
};

export default Header;