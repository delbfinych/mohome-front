import React, { Component } from "react";
import NavBar from "../navbar";
import Home from "../home";
import Slider from "../photo/slider";
import MainPhotoPage from "../photo";
import SinglePhotoPage from "../photo/single-photo-page";
import AlbumsPageContainer from "../photo/albums-page-container";
import Video from "../video";
import Music from "../music";
import NotFoundPage from "../not-found-page";
import SignInPage from "../sign-in-page";
import SignUpPage from "../sign-up-page";
import Cookies from "universal-cookie";
import AddPhotosPage from "../photo/add-photos-page";
import Main from "../photo/main";
import AlbumPage from "../photo/album-page";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import "./app.css";
const cookies = new Cookies();
// TODO: ПОчинить логаут

export default class App extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    let { location } = this.props;
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
    return true;
  }

  render() {
    let prevPathName = this.previousLocation
      ? this.previousLocation.pathname
      : `/`;
    // temporarily
    window.logout = () => {
      cookies.remove("id_token");
      cookies.remove("expiresIn");
      cookies.remove("refreshToken");
      this.forceUpdate();
    };
    let { location } = this.props;
    let isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );
    console.log(location);
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
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
            path="/albums/"
            exact
            render={() => {
              return cookies.get("id_token") ? (
                <React.Fragment>
                  <NavBar />
                  <button onClick={() => window.logout()}>logout</button>
                  <AlbumsPageContainer>
                    <Main />
                  </AlbumsPageContainer>
                </React.Fragment>
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
          />
          <Route
            path="/albums/photo/:name"
            render={({ history, location, match }) => {
              return cookies.get("id_token") ? (
                <React.Fragment>
                  <SinglePhotoPage
                    photoName={match.params.name}
                    location={location}
                    history={history}
                  />
                </React.Fragment>
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
            exact
          />
          <Route
            path="/albums/:albumId/photo/:name"
            render={({ match, history }) => {
              const id = match.params.albumId;
              const name = match.params.name;
              return cookies.get("id_token") ? (
                <React.Fragment>
                  <SinglePhotoPage
                    albumId={id}
                    history={history}
                    photoName={name}
                  />
                </React.Fragment>
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
            exact
          />
          <Route
            path="/photo/upload"
            exact
            render={() => {
              return cookies.get("id_token") ? (
                <React.Fragment>
                  <NavBar />
                  <AlbumsPageContainer>
                    <AddPhotosPage />
                  </AlbumsPageContainer>
                </React.Fragment>
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
          />
          <Route
            path="/photo/:albumId/upload"
            exact
            render={({ match }) => {
              const id = match.params.albumId;

              return cookies.get("id_token") ? (
                <React.Fragment>
                  <NavBar />
                  <AlbumsPageContainer>
                    <AddPhotosPage />
                  </AlbumsPageContainer>
                </React.Fragment>
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
          />
          <Route
            path="/albums/:albumId"
            exact
            render={({ history, match, location }) => {
              console.log(history);
              const id = match.params.albumId;
              return cookies.get("id_token") ? (
                <React.Fragment>
                  <NavBar />
                  <AlbumsPageContainer>
                    <AlbumPage {...location.state} albumId={id} />
                  </AlbumsPageContainer>
                </React.Fragment>
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
          />{" "}
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
          <Route component={NotFoundPage} />
        </Switch>

        {isModal ? (
          <Route
            path={`${prevPathName}photo/:name`}
            render={({ history, location }) => {
              return cookies.get("id_token") ? (
                <React.Fragment>
                  <Slider location={location} history={history} />
                </React.Fragment>
              ) : (
                <Redirect to={"/sign-in"} />
              );
            }}
          />
        ) : null}
      </div>
    );
  }
}
