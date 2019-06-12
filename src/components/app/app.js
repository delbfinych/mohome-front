import React, { Component } from "react";
import NavBar from "../navbar";
import Home from "../home";

import {
  MainPhotoPage,
  Slider,
  AddPhotosPage,
  AlbumPage,
  AlbumsPageContainer,
  EditAlbumPage,
  SinglePhotoPage
} from "../photo";

import Video from "../video";
import { MainMusicPage, PlaylistPage, EditPlaylistPage } from "../music";

import NotFoundPage from "../not-found-page";
import SignInPage from "../sign-in-page";
import SignUpPage from "../sign-up-page";
import Cookies from "js-cookie";

import { Route, Switch, Redirect } from "react-router-dom";
import "./app.css";

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

    let { location } = this.props;
    let isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );
    return (
      <div>
        {Cookies.get("id_token") ? (
          <Switch location={isModal ? this.previousLocation : location}>
            <Route
              path="/"
              render={() => {
                return (
                  <React.Fragment>
                    <NavBar />
                    <Home />
                  </React.Fragment>
                );
              }}
              exact
            />
            <Route
              path="/albums/"
              exact
              render={({ history }) => {
                return (
                  <React.Fragment>
                    <NavBar />
                    <AlbumsPageContainer>
                      <MainPhotoPage history={history} />
                    </AlbumsPageContainer>
                  </React.Fragment>
                );
              }}
            />
            <Route
              path="/albums/photo/:name"
              render={({ history, location, match }) => {
                return (
                  <React.Fragment>
                    <SinglePhotoPage
                      photoName={match.params.name}
                      location={location}
                      history={history}
                    />
                  </React.Fragment>
                );
              }}
              exact
            />
            <Route
              path="/albums/:id/edit"
              render={({ history, match }) => {
                return (
                  <React.Fragment>
                    <NavBar />
                    <AlbumsPageContainer>
                      <EditAlbumPage
                        history={history}
                        albumId={match.params.id}
                      />
                    </AlbumsPageContainer>
                  </React.Fragment>
                );
              }}
              exact
            />
            <Route
              path="/albums/:albumId/photo/:name"
              render={({ match, history }) => {
                const id = match.params.albumId;
                const name = match.params.name;
                return (
                  <React.Fragment>
                    <SinglePhotoPage
                      albumId={id}
                      history={history}
                      photoName={name}
                    />
                  </React.Fragment>
                );
              }}
              exact
            />
            <Route
              path="/albums/upload"
              exact
              render={({ location, history }) => {
                if (this.previousLocation || history.action !== "POP")
                  return (
                    <React.Fragment>
                      <NavBar />
                      <AlbumsPageContainer>
                        <AddPhotosPage history={history} {...location.state} />
                      </AlbumsPageContainer>
                    </React.Fragment>
                  );
                else return <Redirect to={"/albums/"} />;
              }}
            />
            <Route
              path="/albums/:albumId/upload"
              exact
              render={({ history, location }) => {
                if (this.previousLocation || history.action !== "POP")
                  return (
                    <React.Fragment>
                      <NavBar />
                      <AlbumsPageContainer>
                        <AddPhotosPage history={history} {...location.state} />
                      </AlbumsPageContainer>
                    </React.Fragment>
                  );
                else return <Redirect to={"/albums/"} />;
              }}
            />
            <Route
              path="/albums/:albumId"
              exact
              render={({ history, match, location }) => {
                const id = match.params.albumId;
                return (
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
                );
              }}
            />
            <Route
              path="/video"
              render={() => {
                return (
                  <React.Fragment>
                    <NavBar />
                    <Video />
                  </React.Fragment>
                );
              }}
            />
            <Route
              path="/music"
              exact
              render={() => {
                return (
                  <React.Fragment>
                    <NavBar />
                    <AlbumsPageContainer>
                      <MainMusicPage />
                    </AlbumsPageContainer>
                  </React.Fragment>
                );
              }}
            />
            <Route
              path="/music/:id"
              exact
              render={({ history, match, location }) => {
                const id = match.params.id;
                return (
                  <React.Fragment>
                    <NavBar />
                    <AlbumsPageContainer>
                      <PlaylistPage
                        history={history}
                        {...location.state}
                        playlistId={id}
                      />
                    </AlbumsPageContainer>
                  </React.Fragment>
                );
              }}
            />{" "}
            <Route
              path="/music/:id/edit"
              render={({ history, match }) => {
                return (
                  <React.Fragment>
                    <NavBar />
                    <AlbumsPageContainer>
                      <EditPlaylistPage
                        history={history}
                        albumId={match.params.id}
                      />
                    </AlbumsPageContainer>
                  </React.Fragment>
                );
              }}
              exact
            />
            <Route component={NotFoundPage} />
          </Switch>
        ) : (
          <Redirect to={"/sign-in"} />
        )}
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
