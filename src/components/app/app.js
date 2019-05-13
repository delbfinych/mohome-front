import React, { Component } from "react";
import NavBar from "../navbar";
import Home from "../home";
import Slider from "../photo/slider";
import MainPhotoPage from "../photo";
import SinglePhotoPage from "../photo/single-photo-page";
import AlbumsPageContainer from "../photo/albums-page-container";
import Video from "../video";
import Music from "../music";
import EditAlbumPage from "../photo/edit-album-page";
import NotFoundPage from "../not-found-page";
import SignInPage from "../sign-in-page";
import SignUpPage from "../sign-up-page";
import Cookies from "js-cookie";
import AddPhotosPage from "../photo/add-photos-page";
import Main from "../photo/main";
import AlbumPage from "../photo/album-page";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import "./app.css";

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
    // убираем последнюю часть prevPathName, чтоб там содержалось только
    // /albums/ или /albums/id/
    if (prevPathName && prevPathName[prevPathName.length - 1] != "/") {
      prevPathName = prevPathName.slice(0, prevPathName.lastIndexOf("/") + 1);
    }

    // temporarily
    window.logout = () => {
      Cookies.remove("id_token", { path: "/" });
      Cookies.remove("expiresIn", { path: "/" });
      Cookies.remove("refreshToken", { path: "/" });
      this.forceUpdate();
    };
    let { location } = this.props;
    let isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );
    console.log(isModal);
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route
            path="/"
            render={() => {
              return Cookies.get("id_token") ? (
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
            render={({ history }) => {
              return Cookies.get("id_token") ? (
                <React.Fragment>
                  <NavBar />
                  <AlbumsPageContainer>
                    <Main history={history} />
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
              return Cookies.get("id_token") ? (
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
            path="/albums/:id/edit"
            render={({ history, match }) => {
              return Cookies.get("id_token") ? (
                <React.Fragment>
                  <NavBar />
                  <AlbumsPageContainer>
                    <EditAlbumPage
                      history={history}
                      albumId={match.params.id}
                    />
                  </AlbumsPageContainer>
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
              return Cookies.get("id_token") ? (
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
            path="/albums/upload"
            exact
            render={({ location, history }) => {
              if (this.previousLocation || history.action !== "POP")
                return Cookies.get("id_token") ? (
                  <React.Fragment>
                    <NavBar />
                    <AlbumsPageContainer>
                      <AddPhotosPage history={history} {...location.state} />
                    </AlbumsPageContainer>
                  </React.Fragment>
                ) : (
                  <Redirect to={"/sign-in"} />
                );
              else return <Redirect to={"/albums/"} />;
            }}
          />
          <Route
            path="/albums/:albumId/upload"
            exact
            render={({ history, location }) => {
              if (this.previousLocation || history.action !== "POP")
                return Cookies.get("id_token") ? (
                  <React.Fragment>
                    <NavBar />
                    <AlbumsPageContainer>
                      <AddPhotosPage history={history} {...location.state} />
                    </AlbumsPageContainer>
                  </React.Fragment>
                ) : (
                  <Redirect to={"/sign-in"} />
                );
              else return <Redirect to={"/albums/"} />;
            }}
          />
          <Route
            path="/albums/:albumId"
            exact
            render={({ history, match, location }) => {
              const id = match.params.albumId;
              return Cookies.get("id_token") ? (
                <React.Fragment>
                  <NavBar />
                  <AlbumsPageContainer>
                    <AlbumPage
                      history={history}
                      {...location.state}
                      albumId={id}
                    />
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
              return Cookies.get("id_token") ? (
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
              return Cookies.get("id_token") ? (
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
              return Cookies.get("id_token") ? (
                <Redirect to={"/"} />
              ) : (
                <SignInPage />
              );
            }}
          />
          <Route
            path="/sign-up"
            render={() => {
              return Cookies.get("id_token") ? (
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
            path={prevPathName + "photo/:name"}
            render={({ history, location }) => {
              return Cookies.get("id_token") ? (
                <React.Fragment>
                  <Slider
                    prevPath={this.previousLocation}
                    location={location}
                    history={history}
                  />
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
