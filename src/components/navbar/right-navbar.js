import React from "react";
import { Dropdown } from "react-bootstrap";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const RightNavBar = () => {
  const token = Cookies.get("id_token");
  let payload = token.split(".")[1];
  let username = JSON.parse(atob(payload));
  return (
    <div className="navbar__right">
      <button
        type="button"
        className=" dropdown-toggle drop-down-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {username.Name}
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
          Log out
        </Link>
      </div>
      {/*<li className="nav-item">*/}
      {/*    <div className="profile nav-link">*/}
      {/*        <div className="profile-img rounded-circle mr-2"></div>*/}
      {/*        <i className="zmdi zmdi-chevron-down zmdi-hc-lg"> </i>*/}
      {/*    </div>*/}
      {/*</li>*/}
    </div>
  );
};

export default RightNavBar;
