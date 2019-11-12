import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import routes from "../../routes";
import { Brand } from "../../constants";
<<<<<<< HEAD
=======

>>>>>>> develop
export default class LeftNavBar extends Component {
  state = {
    isMenuOpened: false
  };
  render() {
    return (
      <div className={"navbar__left"}>
        <Link to={routes.root.path} className="navbar__logo">
          <img src={Brand} className="logo" alt="Mohome" />
        </Link>
        <div
          onClick={() =>
            this.setState(prevState => {
              return {
                isMenuOpened: !prevState.isMenuOpened
              };
            })
          }
          className={`burger-menu ${
            this.state.isMenuOpened ? "menu-on" : ""
          }   menu-toggle`}
        >
          <div className="burger" />
        </div>
        <Menu
          isMenuOpened={this.state.isMenuOpened}
          onClick={() =>
            this.setState(prevState => {
              return {
                isMenuOpened: !prevState.isMenuOpened
              };
            })
          }
        />
      </div>
    );
  }
}

const Menu = ({ isMenuOpened, onClick }) => {
  return (
    <ul className={`navbar__menu ${isMenuOpened ? "menu-opened" : ""}`}>
      <li className="navbar__item">
        <NavLink
          onClick={onClick}
          activeClassName={"link-active"}
          className="navbar__link"
          to={routes.root.path}
          exact
        >
          <i className="zmdi zmdi-home zmdi-hc-lg" /> Home
        </NavLink>
      </li>
      <li className="navbar__item">
        <NavLink
          onClick={onClick}
          activeClassName={"link-active"}
          className="navbar__link"
          to={routes.app.photo.main.path}
        >
          <i className="zmdi zmdi-image zmdi-hc-lg" /> Photo
        </NavLink>
      </li>
      <li className="navbar__item">
        <NavLink
          onClick={onClick}
          activeClassName={"link-active"}
          className="navbar__link"
          to={routes.app.video.main.path}
        >
          <i className="zmdi zmdi-movie zmdi-hc-lg" /> Video
        </NavLink>
      </li>
      <li className="navbar__item">
        <NavLink
          onClick={onClick}
          activeClassName={"link-active"}
          className="navbar__link"
          to={routes.app.music.main.path}
        >
          <i className="zmdi zmdi-audio zmdi-hc-lg" /> Music
        </NavLink>
      </li>
    </ul>
  );
};
