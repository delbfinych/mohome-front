import React, { Component } from "react";
import "./main.css";
import PlaylistItem from "./playlist-item";
import { withApiService } from "../hoc";
import AlbumNavigation from "../photo/album-navigation";
import Modal from "../modal";
import { CreateAlbumForm } from "../forms";

class Main extends Component {
  state = {
    playlists: [],
    photos: [],
    albumCovers: {},
    isExpanded: false
  };

  onExpandToggle = () => {
    this.setState(state => {
      return { isExpanded: !state.isExpanded };
    });
  };

  componentDidMount() {
    this._updatePlaylists();
  }

  _updatePlaylists = () => {
    const { getPlaylists } = this.props;

    getPlaylists().then(res => {
      console.log(res);
      this.setState({ playlists: res.data.response });
    });
  };

  render() {
    const {
      playlists,
      isExpanded,
      photos,
      photoCount,
      albumCovers
    } = this.state;
    const breadCrumbs = [
      {
        text: `My playlists ${playlists.length}`,
        link: "/music/"
      }
    ];

    return (
      <div>
        <AlbumNavigation
          onUpload={this.onUpload}
          breadCrumbs={breadCrumbs}
          rightContent={
            <React.Fragment>
              <Modal title={"New playlist"}>
                <div className="add-album-button">
                  <i className="zmdi zmdi-playlist-plus zmdi-hc-lg" /> New
                  playlist
                </div>
                <CreateAlbumForm
                  submitBtnTitle={"Create playlist"}
                  createAlbum={this.props.createPlaylist}
                  onUpdateAlbum={this._updatePlaylists}
                />
              </Modal>
            </React.Fragment>
          }
        />
        <div className="albums-container">
          <div
            className={`albums-panel ${
              playlists.length > 5 ? "able-to-expanded" : ""
            }`}
          >
            {playlists.length > 0 ? (
              <div className="container">
                <div className="row">
                  {playlists.slice(0, 5).map((e, i) => (
                    <PlaylistItem
                      key={e.playlistId}
                      title={e.name}
                      preview={albumCovers[e.albumId]}
                      id={e.playlistId}
                      count={e.musicCount}
                      description={e.description}
                    />
                  ))}
                  {isExpanded
                    ? playlists
                        .slice(5)
                        .map((e, i) => (
                          <PlaylistItem
                            key={e.playlistId}
                            title={e.name}
                            preview={albumCovers[e.albumId]}
                            id={e.playlistId}
                            count={e.musicCount}
                            description={e.description}
                          />
                        ))
                    : null}
                </div>
              </div>
            ) : (
              <div className={"container"}>
                <div className={"row"}>
                  <div className={"col-2 album-photo-empty"}>
                    <div className="ratio">
                      <div className={"ratio__content"} />
                    </div>
                  </div>
                  <div className={"centered-block"}>
                    No playlists here yet...
                  </div>
                </div>
              </div>
            )}
          </div>
          {playlists.length > 5 ? (
            <div
              onClick={this.onExpandToggle}
              title={isExpanded ? "Hide" : "Expand"}
              className="album-expand-btn"
            >
              <span className={"expand-text"}>
                {isExpanded ? <div>Show less</div> : <div>Show more</div>}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
const mapMethodToProps = service => {
  return {
    getPlaylists: service.getPlaylists,
    createPlaylist: service.createPlaylist
  };
};

export default withApiService(mapMethodToProps)(Main);
