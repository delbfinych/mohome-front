import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import NavBar from './components/navbar';
import { AlbumsPageWrapper } from './components/photo';
import PrivateRoute from './components/private-route';

import routes from './routes';



import './app.css';

export default class App extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    let { location } = this.props;
    if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)) {
      this.previousLocation = this.props.location;
    }
    return true;
  }

  render() {
    let prevPathName = this.previousLocation ? this.previousLocation.pathname : `/`;
    // убираем последнюю часть prevPathName, чтоб там содержалось только
    // /albums/ или /albums/id/
    if (prevPathName && prevPathName[prevPathName.length - 1] != '/') {
      prevPathName = prevPathName.slice(0, prevPathName.lastIndexOf('/') + 1);
    }
    console.log(routes);
    let { location } = this.props;
    let isModal = !!(location.state && location.state.modal && this.previousLocation !== location);
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <PrivateRoute
            path={routes.root.path}
            render={() => {
              return (
                <React.Fragment>
                  <NavBar />
                  <routes.root.view />
                </React.Fragment>
              );
            }}
            exact
          />
          <PrivateRoute
            path={routes.app.photo.main.path}
            exact
            render={({ history }) => {
              return (
                <React.Fragment>
                  <NavBar />
                  <AlbumsPageWrapper>
                    <routes.app.photo.main.view history={history} />
                  </AlbumsPageWrapper>
                </React.Fragment>
              );
            }}
          />
          <PrivateRoute
            path={routes.app.photo.photo.path}
            render={({ history, location, match }) => {
              return (
                <React.Fragment>
                  <routes.app.photo.photo.view
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
            path={routes.app.photo.albums.edit.path}
            render={({ history, match }) => {
              return (
                <React.Fragment>
                  <NavBar />
                  <AlbumsPageWrapper>
                    <routes.app.photo.albums.edit.view
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
            path={routes.app.photo.albums.photo.path}
            render={({ match, history }) => {
              const id = match.params.albumId;
              const name = match.params.name;
              return (
                <React.Fragment>
                  <routes.app.photo.albums.photo.view
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
            path={routes.app.photo.upload.path}
            exact
            render={({ location, history }) => {
              if (this.previousLocation || history.action !== 'POP')
                return (
                  <React.Fragment>
                    <NavBar />
                    <AlbumsPageWrapper>
                      <routes.app.photo.upload.view history={history} {...location.state} />
                    </AlbumsPageWrapper>
                  </React.Fragment>
                );
              else return <Redirect to={routes.app.photo.main.path} />;
            }}
          />
          <PrivateRoute
            path={routes.app.photo.albums.upload.path}
            exact
            render={({ history, location }) => {
              if (this.previousLocation || history.action !== 'POP')
                return (
                  <React.Fragment>
                    <NavBar />
                    <AlbumsPageWrapper>
                      <routes.app.photo.albums.upload.view history={history} {...location.state} />
                    </AlbumsPageWrapper>
                  </React.Fragment>
                );
              else return <Redirect to={routes.app.photo.main.path} />;
            }}
          />
          <PrivateRoute
            path={routes.app.photo.albums.album.path}
            exact
            render={({ history, match, location }) => {
              const id = match.params.albumId;
              return (
                <React.Fragment>
                  <NavBar />
                  <AlbumsPageWrapper>
                    <routes.app.photo.albums.album.view
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
            path={routes.app.video.main.path}
            render={() => {
              return (
                <React.Fragment>
                  <NavBar />
                  <routes.app.video.main.view />
                </React.Fragment>
              );
            }}
          />
          <PrivateRoute
            path={routes.app.music.main.path}
            render={() => {
              return (
                <React.Fragment>
                  <NavBar />
                  <routes.app.music.main.view />
                </React.Fragment>
              );
            }}
          />
          {/* <PrivateRoute
            path="/music/:id"
            exact
            render={({ history, match, location }) => {
              const id = match.params.id;
              return (
                <React.Fragment>
                  <NavBar />
                  <AlbumsPageWrapper>
                    <MusicPlaylist history={history} {...location.state} playlistId={id} />
                  </AlbumsPageWrapper>
                </React.Fragment>
              );
            }}
          />{' '}
          <PrivateRoute
            path="/music/:id/edit"
            render={({ history, match }) => {
              return (
                <React.Fragment>
                  <NavBar />
                  <AlbumsPageWrapper>
                    <EditMusicPlaylist history={history} albumId={match.params.id} />
                  </AlbumsPageWrapper>
                </React.Fragment>
              );
            }}
            exact
          /> */}
          <PrivateRoute
            render={({ history }) => {
              return (
                <div>
                  <div>404</div>
                  <div>not found: {history.location.pathname}</div>
                </div>
              );
            }}
          />
        </Switch>

        <Route
          path={routes.signIn.path}
          render={() => {
            return Cookies.get('id_token') ? (
              <Redirect to={routes.root.path} />
            ) : (
              <routes.signIn.view />
            );
          }}
        />
        <Route
          path={routes.signUp.path}
          render={() => {
            return Cookies.get('id_token') ? (
              <Redirect to={routes.root.path} />
            ) : (
              <routes.signUp.view />
            );
          }}
        />
        {isModal ? (
          <PrivateRoute
            path={prevPathName + routes.app.photo.slider.path}
            render={({ history, location }) => {
              return (
                <React.Fragment>
                  <routes.app.photo.slider.view
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
