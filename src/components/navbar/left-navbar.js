import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class LeftNavBar extends Component {
  render() {
    return (
      <div className="navbar-collapse collapse dual-nav w-50 order-1 order-md-0">
        <ul className="navbar-nav">
          <li className="nav-item  mr-2">
            <NavLink className="nav-link" to="/" exact>
              <i className="zmdi zmdi-home zmdi-hc-lg" /> Home
            </NavLink>
          </li>
          <li className="nav-item mr-2">
            <NavLink className="nav-link" to="/albums/">
              <i className="zmdi zmdi-image zmdi-hc-lg" /> Photo
            </NavLink>
          </li>
          <li className="nav-item mr-2">
            <NavLink className="nav-link" to="/video/">
              <i className="zmdi zmdi-movie zmdi-hc-lg" /> Video
            </NavLink>
          </li>
          <li className="nav-item mr-2">
            <NavLink className="nav-link" to="/music/">
              <i className="zmdi zmdi-audio zmdi-hc-lg" /> Music
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
