import React, { Component } from "react";
import NavBar from "../navbar";
import Home from "../home";
import MainPhotoPage from "../photo";
import PhotoPageContainer from "../photo/photo-page-container";
import Video from "../video";
import Music from "../music";
import SignInPage from "../sign-in-page";
import SignUpPage from "../sign-up-page";
import Cookies from "universal-cookie";
import AddPhotosPage from "../photo/add-photos-page";
import Main from "../photo/main";
import AlbumPage from "../photo/album-page";
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
        <Switch>
          {" "}
          <Route
            path="/"
            render={() => {
              return cookies.get("id_token") ? (
                <React.Fragment>
                  <NavBar />
                  <Home />
                </React.Fragment>
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
            exact
          />
          <Route
            path="/photo/"
            exact
            render={() => {
              return cookies.get("id_token") ? (
                <React.Fragment>
                  <NavBar />
                  <PhotoPageContainer>
                    <Main />
                  </PhotoPageContainer>
                </React.Fragment>
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
          />
          <Route
            path="/photo/upload"
            exact
            render={() => {
              return cookies.get("id_token") ? (
                <React.Fragment>
                  <NavBar />
                  <PhotoPageContainer>
                    <AddPhotosPage />
                  </PhotoPageContainer>
                </React.Fragment>
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
          />
          <Route
            path="/photo/:albumId"
            exact
            render={({ match, location }) => {
              const id = match.params.albumId;

              return cookies.get("id_token") ? (
                <React.Fragment>
                  <NavBar />

                  <PhotoPageContainer>
                    <AlbumPage albumTitle={location.state.albumTitle} id={id} />
                  </PhotoPageContainer>
                </React.Fragment>
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
          />{" "}
          <Route
            path="/photo/:albumId/upload"
            exact
            render={({ match }) => {
              const id = match.params.albumId;

              return cookies.get("id_token") ? (
                <React.Fragment>
                  <NavBar />
                  <PhotoPageContainer>
                    <AddPhotosPage />
                  </PhotoPageContainer>
                </React.Fragment>
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
          />
          <Route
            path="/video"
            render={() => {
              return cookies.get("id_token") ? (
                <React.Fragment>
                  <NavBar />
                  <Video />
                </React.Fragment>
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
          />
          <Route
            path="/music"
            render={() => {
              return cookies.get("id_token") ? (
                <React.Fragment>
                  <NavBar />
                  <Music />
                </React.Fragment>
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
          />
          <Route
            path="/sign-in"
            render={() => {
              return cookies.get("id_token") ? (
                <Redirect to={"/"} />
              ) : (
                <SignInPage />
              );
            }}
          />
          <Route
            path="/sign-up"
            render={() => {
              return cookies.get("id_token") ? (
                <Redirect to={"/"} />
              ) : (
                <SignUpPage />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}
