import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const RightNavBar = () => {
  const token = Cookies.get("id_token");
  let payload = "";
  let username = "";
  if (token) {
    payload = token.split(".")[1];
    username = payload ? JSON.parse(atob(payload)).Name : "";
  }
  return (
    <div className="navbar__right">
      <button
        type="button"
        className=" dropdown-toggle drop-down-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {username}
        <div className="nav-avatar" />
      </button>
      <div className="dropdown-menu dropdown-menu-right">
        <button className="dropdown-item" type="button">
          My profile
        </button>
        <div className="dropdown-divider" />
        <button className="dropdown-item" type="button">
          Settings
        </button>
        <button className="dropdown-item" type="button">
          Help
        </button>
        <div className="dropdown-divider" />
        <Link
          onClick={() => {
            Cookies.remove("id_token", { path: "/" });
            Cookies.remove("expiresIn", { path: "/" });
            Cookies.remove("refreshToken", { path: "/" });
          }}
          to={"/sign-in"}
          className="dropdown-item"
        >
          Sign out
        </Link>
      </div>
    </div>
  );
};

export default RightNavBar;
