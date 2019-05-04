import React, { Component } from "react";
import NavBar from "../navbar";
import Home from "../home";
import Photo from "../photo";
import Video from "../video";
import Music from "../music";
import SignIn from "../sign-in-page";
import SignUp from "../sign-up-page";
import Cookies from "universal-cookie";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import "./app.css";
const cookies = new Cookies();
export default class App extends Component {
  render() {
    // temporarily
    window.logout = () => {
      cookies.remove("id_token");
      this.forceUpdate();
    };
    return (
      <div>
        <NavBar />

        <Switch>
          <Route
            path="/"
            render={() => {
              return cookies.get("id_token") ? (
                <Home />
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
            exact
          />
          <Route
            path="/photo"
            render={() => {
              return cookies.get("id_token") ? (
                <Photo />
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
          />
          <Route
            path="/video"
            render={() => {
              return cookies.get("id_token") ? (
                <Video />
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
          />
          <Route
            path="/music"
            render={() => {
              return cookies.get("id_token") ? (
                <Music />
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
          />
          <Route
            path="/sign-in"
            render={({ history }) => {
              return cookies.get("id_token") ? (
                <Redirect to={"/"} />
              ) : (
                <SignIn history={history} />
              );
            }}
          />
          <Route
            path="/sign-up"
            render={({ history }) => {
              return cookies.get("id_token") ? (
                <Redirect to={"/"} />
              ) : (
                <SignUp history={history} />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}
