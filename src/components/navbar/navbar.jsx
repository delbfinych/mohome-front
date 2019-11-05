import React from "react";
import LeftNavBar from "./left-navbar";
import RightNavBar from "./right-navbar";
import "./navbar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <LeftNavBar />
        <RightNavBar />
      </div>
    </nav>
  );
};

export default NavBar;
