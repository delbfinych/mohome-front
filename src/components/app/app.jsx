import React, { Component } from "react";
import NavBar from "../navbar";
import Home from "../home";

import {
  MainPhotoPage,
  Slider,
  AddPhotosPage,
  AlbumPage,
  AlbumsPageWrapper,
  EditAlbumPage,
  SinglePhotoPage
} from "../photo";

import Video from "../video";
import { MainMusicPage, PlaylistPage, EditPlaylistPage } from "../music";

import PrivateRoute from "../private-route";

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
        <Switch location={isModal ? this.previousLocation : location}>
          <PrivateRoute
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
          <PrivateRoute
            path="/albums/"
            exact
            render={({ history }) => {
              return (
                <React.Fragment>
                  <NavBar />
                  <AlbumsPageWrapper>
                    <MainPhotoPage history={history} />
                  </AlbumsPageWrapper>
                </React.Fragment>
              );
            }}
          />
          <PrivateRoute
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
          <PrivateRoute
            path="/albums/:id/edit"
            render={({ history, match }) => {
              return (
                <React.Fragment>
                  <NavBar />
                  <AlbumsPageWrapper>
                    <EditAlbumPage
                      history={history}
                      albumId={match.params.id}
                    />
                  </AlbumsPageWrapper>
                </React.Fragment>
              );
            }}
            exact
          />
          <PrivateRoute
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
          <PrivateRoute
            path="/albums/upload"
            exact
            render={({ location, history }) => {
              if (this.previousLocation || history.action !== "POP")
                return (
                  <React.Fragment>
                    <NavBar />
                    <AlbumsPageWrapper>
                      <AddPhotosPage history={history} {...location.state} />
                    </AlbumsPageWrapper>
                  </React.Fragment>
                );
              else return <Redirect to={"/albums/"} />;
            }}
          />
          <PrivateRoute
            path="/albums/:albumId/upload"
            exact
            render={({ history, location }) => {
              if (this.previousLocation || history.action !== "POP")
                return (
                  <React.Fragment>
                    <NavBar />
                    <AlbumsPageWrapper>
                      <AddPhotosPage history={history} {...location.state} />
                    </AlbumsPageWrapper>
                  </React.Fragment>
                );
              else return <Redirect to={"/albums/"} />;
            }}
          />
          <PrivateRoute
            path="/albums/:albumId"
            exact
            render={({ history, match, location }) => {
              const id = match.params.albumId;
              return (
                <React.Fragment>
                  <NavBar />
                  <AlbumsPageWrapper>
                    <AlbumPage
                      history={history}
                      {...location.state}
                      albumId={id}
                    />
                  </AlbumsPageWrapper>
                </React.Fragment>
              );
            }}
          />
          <PrivateRoute
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
          <PrivateRoute
            path="/music"
            render={() => {
              return (
                <React.Fragment>
                  <NavBar />
                  <MainMusicPage />
                </React.Fragment>
              );
            }}
          />
          <PrivateRoute
            path="/music/:id"
            exact
            render={({ history, match, location }) => {
              const id = match.params.id;
              return (
                <React.Fragment>
                  <NavBar />
                  <AlbumsPageWrapper>
                    <PlaylistPage
                      history={history}
                      {...location.state}
                      playlistId={id}
                    />
                  </AlbumsPageWrapper>
                </React.Fragment>
              );
            }}
          />{" "}
          <PrivateRoute
            path="/music/:id/edit"
            render={({ history, match }) => {
              return (
                <React.Fragment>
                  <NavBar />
                  <AlbumsPageWrapper>
                    <EditPlaylistPage
                      history={history}
                      albumId={match.params.id}
                    />
                  </AlbumsPageWrapper>
                </React.Fragment>
              );
            }}
            exact
          />
          <PrivateRoute component={NotFoundPage} />
        </Switch>

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
          <PrivateRoute
            path={prevPathName + "photo/:name"}
            render={({ history, location }) => {
              return (
                <React.Fragment>
                  <Slider
                    prevPath={this.previousLocation}
                    location={location}
                    history={history}
                  />
                </React.Fragment>
              );
            }}
          />
        ) : null}
      </div>
    );
  }
}
