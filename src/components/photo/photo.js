import React, { Component } from "react";
import "./photo.css";
import { withApiService } from "../hoc";
import placeholder from "../../img/image_big.png";
import { CreateAlbumForm } from "../forms";
import Modal from "../modal";
import DropArea from "../drop-area";
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
    this._updateAlbum();
  }

  _updateAlbum = () => {
    this.props.getAlbums().then(res => {
      this.setState({ album: res.data.response });
      console.log(this.state.album);
    });
  };
  onUpload = files => {
    const ffiles = Array.from(files);
    console.log(ffiles);
    ffiles.forEach(file => {
      const formData = new FormData();
      formData.append("Photo", file);
      formData.append("Extension", file.name.split(".")[1]);
      formData.append("AlbumId", 136);
      this.props
        .uploadPhoto(formData)
        .then(res => console.log(res))
        .catch(err => console.log(err.response));
    });
  };
  render() {
    const { album, isExpanded } = this.state;
    return (
      <div className="photo-section-container container">
        <DropArea
          id={"dnd"}
          title={"Upload photos"}
          onUpload={this.onUpload}
          accept={"image/*"}
        />
        <button
          onClick={() => {
            this.props
              .getPhotosByAlbumId(136)
              .then(res => console.log(res))
              .catch(e => console.log);
          }}
        >
          GET PHOTOS
        </button>
        <div className="albums-container">
          <div className="albums-bar  left-right-bar">
            <div className="albums-bar-left">
              <div className="albums-title">
                My albums <span className="albums-count">{album.length}</span>
              </div>
            </div>
            <div className="albums-bar-right">
              <Modal title={"New album"}>
                <div className="add-album-button">
                  <i className="zmdi zmdi-collection-folder-image zmdi-hc-lg" />{" "}
                  New album
                </div>
                <CreateAlbumForm onUpdateAlbum={this._updateAlbum} />
              </Modal>

              <div className="add-photos-button">
                <i className="zmdi zmdi-camera-add zmdi-hc-lg" /> Add photos
                <label htmlFor={"dnd"} />
              </div>
            </div>
          </div>
          <div
            className={`albums-panel ${
              album.length > 5 ? "able-to-expanded" : ""
            }`}
          >
            {album.length > 0 ? (
              <div className="container">
                <div className="row">
                  {album.slice(0, 5).map(e => (
                    <PhotoItem
                      key={e.albumId}
                      title={e.name}
                      preview={e.coverPhotoPath}
                    />
                  ))}
                  {isExpanded
                    ? album
                        .slice(5)
                        .map(e => (
                          <PhotoItem
                            key={e.albumId}
                            title={e.name}
                            preview={e.coverPhotoPath}
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
                      <div className={"ratio__content"}>
                        No albums found ...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {album.length > 5 ? (
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
    backgroundImage: `url(${preview ? preview : placeholder})`
  };
  return (
    <div className="col-2 album-photo">
      <div className="ratio">
        <div
          style={style}
          className={`ratio__content album-photo-item ${
            preview ? "" : "photos_album_no_cover"
          }`}
        >
          <div
            className={`album-info ${preview ? "" : "album-info-wo_shadow"}`}
          >
            <span
              title={title}
              className={`album-title ${preview ? "" : "album-title_black"}`}
            >
              {title}
            </span>
            <span className={"album-count"}>{count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapMethodToProps = service => {
  return {
    getAlbums: service.getAlbums,
    uploadPhoto: service.uploadPhoto,
    getPhotosByAlbumId: service.getPhotosByAlbumId
  };
};

export default withApiService(mapMethodToProps)(Photo);
