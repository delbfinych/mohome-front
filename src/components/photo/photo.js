import React, { Component } from "react";
import "./photo.css";
import { withApiService } from "../hoc";

class Photo extends Component {
  state = {
    album: [],
    isExpanded: false
  };
  onExpandToggle = () => {
    this.setState(state => {
      return { isExpanded: !state.isExpanded };
    });
  };
  componentDidMount() {
    this.props.getAlbum().then(res => this.setState({ album: res.ids }));
  }

  render() {
    const { album, isExpanded } = this.state;
    return (
      <div className="photo-section-container container">
        <div className="albums-container">
          <div className="albums-bar  left-right-bar">
            <div className="albums-bar-left">
              <div className="albums-title">
                My albums <span className="albums-count">0</span>
              </div>
            </div>
            <div className="albums-bar-right">
              <div className="add-album-button">
                <i className="zmdi zmdi-collection-folder-image zmdi-hc-lg" />{" "}
                Add new album
              </div>
              <div className="add-photos-button">
                <i className="zmdi zmdi-camera-add zmdi-hc-lg" /> Add photos
              </div>
            </div>
          </div>
          <div className="albums-panel">
            <div className="container">
              <div className="row">
                {album.slice(0, 4).map(e => (
                  <PhotoItem
                    key={e.id}
                    title={e.title}
                    count={e.count}
                    preview={this.props.getPhoto(e.photo_ids[0])}
                  />
                ))}
                {album.length > 4 ? (
                  <button
                    title={isExpanded ? "hide" : "expand"}
                    className={"album-expand-btn"}
                    onClick={this.onExpandToggle}
                  >
                    <span>{isExpanded ? "-" : "+"}</span>
                  </button>
                ) : null}

                {isExpanded
                  ? album
                      .slice(4)
                      .map(e => (
                        <PhotoItem
                          key={e.id}
                          title={e.title}
                          count={e.count}
                          preview={this.props.getPhoto(e.photo_ids[0])}
                        />
                      ))
                  : null}
              </div>
            </div>
          </div>
        </div>

        <div className="added-photos-container">
          <div className="added-photos-bar left-right-bar">
            <div className="added-photos-bar-left">
              <div className="added-photos-title">Added photos</div>
            </div>
          </div>
          <div className="added-photos-panel panel" />
        </div>
      </div>
    );
  }
}

const PhotoItem = ({ title, count, preview }) => {
  return (
    <div className="album-photo col-3">
      <div className={"album-photo-item"}>
        <img src={preview} alt="" />
        <div className="album-overlay">
          <div className="album-info">
            <span className={"album-title"}>{title}</span>
            <span className={"album-count"}>{count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapMethodToProps = service => {
  return {
    getPhoto: service.getPhoto,
    getAlbum: service.getAlbum
  };
};

export default withApiService(mapMethodToProps)(Photo);
