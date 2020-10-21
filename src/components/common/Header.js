import React from "react";
import { Link } from "react-router-dom";
import todoIcon from "../../assets/images/logo.png";
const Header = () => {
  return (
    <header className="header" id="header">
      <Link to={"/"}>
        <img src={todoIcon} alt="To do app" />
        <h1>To Do App</h1>
      </Link>
    </header>
  );
};

export default Header;
