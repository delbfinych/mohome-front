import React, { Component } from "react";
import "./photo.css";
import { withApiService } from "../hoc";
import placeholder from "../../img/camera_big.png";
class Photo extends Component {
  state = {
    album: [1, 2, 3, 4, 5],
    isExpanded: false
  };
  onExpandToggle = () => {
    this.setState(state => {
      return { isExpanded: !state.isExpanded };
    });
  };
  componentDidMount() {
    this.props.getAlbums().then(res => console.log(res));
  }

  render() {
    const { album, isExpanded } = this.state;
    return (
      <div className="photo-section-container container">
        <div className="albums-container">
          <div className="albums-bar  left-right-bar">
            <div className="albums-bar-left">
              <div className="albums-title">
                My albums <span className="albums-count">{album.length}</span>
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
          <div
            className={`albums-panel ${
              album.length > 4 ? "able-to-expanded" : ""
            }`}
          >
            <div className="container">
              <div className="row">
                {album.slice(0, 4).map(e => (
                  <PhotoItem preview={placeholder} />
                ))}
                {isExpanded
                  ? album.slice(4).map(e => <PhotoItem preview={placeholder} />)
                  : null}
              </div>
            </div>
          </div>
          {album.length > 4 ? (
            <div
              onClick={this.onExpandToggle}
              title={isExpanded ? "Hide" : "Expand"}
              className="album-expand-btn"
            >
              <span>
                {isExpanded ? (
                  <i className="zmdi zmdi-chevron-up" />
                ) : (
                  <i className="zmdi zmdi-chevron-down" />
                )}
              </span>
            </div>
          ) : null}
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
  const style = {
    backgroundImage: `url(${preview})`
  };
  return (
    <div className="album-photo col-3">
      <div style={style} className={"album-photo-item"}>
        <div className="album-info">
          <span title={title} className={"album-title"}>
            {title}
          </span>
          <span className={"album-count"}>{count}</span>
        </div>
      </div>
    </div>
  );
};

const mapMethodToProps = service => {
  return {
    // getPhoto: service.getPhoto,
    getAlbums: service.getAlbums,
    createAlbum: service.createAlbum
  };
};

export default withApiService(mapMethodToProps)(Photo);
