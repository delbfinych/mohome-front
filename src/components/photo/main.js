import React, { Component } from "react";
import "./main.css";
import { withApiService } from "../hoc";
import placeholder from "../../img/image_big.png";
import { CreateAlbumForm } from "../forms";
import Modal from "../modal";
import DropArea from "../drop-area";

import { Route, Switch, withRouter, Redirect, Link } from "react-router-dom";
import AlbumNavigation from "./album-navigation";
import NavBar from "../navbar";
import AddPhotosPage from "./add-photos-page";
import PhotoList from "./photo-list";
import CreateBreadCrumbs from "./creareBreadcrumbs";

class Main extends Component {
  state = {
    album: [],
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
    this._updateAlbums();
  }
  getPhotosByOrder = async photos => {
    if (photos.length) {
      const obj = [];
      for (let i = 0; i < photos.length; i++)
        await this.props.getPhoto(photos[i].name).then(res => {
          obj.push({
            ...res.data.response,
            created: photos[i].created,
            name: photos[i].name
          });
        });
      this.setState(prevState => {
        return {
          photos: obj
        };
      });
    }
  };
  _updateAlbums = () => {
    this.props.getAlbums().then(res => {
      this.setState({ album: res.data.response });
      console.log(this.state.album);
      const albums = this.state.album;
      for (let i = 0; i < albums.length; i++)
        if (albums[i].coverPhotoName)
          this.props.getPhoto(albums[i].coverPhotoName).then(res => {
            const newCover = { ...this.state.albumCovers };
            newCover[albums[i].albumId] = res.data.response;
            this.setState({ albumCovers: newCover });
          });
    });
    this.props
      .getPhotosByAlbumId()
      .then(res => {
        console.log(res.data.response);
        this.setState({ photoCount: res.data.response.length });
        this.getPhotosByOrder(res.data.response);
      })
      .catch(err => console.log(err));
  };

  onUpload = files => {
    //   this.props.history.push("upload");
    const ffiles = Array.from(files);
    ffiles.forEach(file => {
      if (/image\/\w*/.test(file.type)) {
        const formData = new FormData();

        formData.append("Photo", file);
        formData.append("AlbumId", 181);
        this.props
          .uploadPhoto(formData)
          .then(this._updateAlbums)
          .catch(err => console.log(err.response));
      }
    });
  };

  render() {
    const { album, isExpanded, photos, photoCount } = this.state;
    const breadCrumbs = [
      {
        text: `My albums ${album.length}`,
        link: "/photo/"
      }
    ];
    return (
      <div>
        <button
          onClick={() => {
            console.log(album);
          }}
        >
          GET PHOTOS
        </button>
        <AlbumNavigation
          onUpload={this.onUpload}
          breadCrumbs={breadCrumbs}
          extraBtn={
            <Modal title={"New album"}>
              <div className="add-album-button">
                <i className="zmdi zmdi-collection-folder-image zmdi-hc-lg" />{" "}
                New album
              </div>
              <CreateAlbumForm onUpdateAlbum={this._updateAlbums} />
            </Modal>
          }
        />
        <div className="albums-container">
          {/*<div className="albums-bar  left-right-bar">*/}
          {/*  <DropArea*/}
          {/*    id={"dnd"}*/}
          {/*    title={"Upload photos"}*/}
          {/*    onUpload={this.onUpload}*/}
          {/*    accept={"image/*"}*/}
          {/*  />*/}
          {/*  <div className="albums-bar-left">*/}
          {/*    <div className="albums-title">*/}
          {/*      My albums <span className="albums-count">{album.length}</span>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className="albums-bar-right">*/}

          {/*    <div className="add-photos-button">*/}
          {/*      <i className="zmdi zmdi-camera-add zmdi-hc-lg" /> Add photos*/}
          {/*      <label htmlFor={"dnd"} />*/}
          {/*    </div>*/}
          {/*  </div>*/}

          <div
            className={`albums-panel ${
              album.length > 5 ? "able-to-expanded" : ""
            }`}
          >
            {album.length > 0 ? (
              <div className="container">
                <div className="row">
                  {album.slice(0, 5).map((e, i) => (
                    <AlbumItem
                      key={e.albumId}
                      title={e.name}
                      preview={this.state.albumCovers[e.albumId]}
                      id={e.albumId}
                      count={e.photoCount}
                    />
                  ))}
                  {isExpanded
                    ? album
                        .slice(5)
                        .map((e, i) => (
                          <AlbumItem
                            key={e.albumId}
                            title={e.name}
                            preview={this.state.albumCovers[e.albumId]}
                            id={e.albumId}
                            count={e.photoCount}
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

        <div className="left-right-bar">
          <div className="albums-bar-left">My photos {photoCount}</div>
        </div>

        <PhotoList photos={photos} />
        {/*<div className="added-photos-container">*/}
        {/*  <div className="added-photos-bar left-right-bar">*/}
        {/*    <div className="added-photos-bar-left">*/}
        {/*      <div className="added-photos-title">Added photos</div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="added-photos-panel panel" />*/}
        {/*</div>*/}
      </div>
    );
  }
}

const AlbumItem = ({ title, count, preview, id }) => {
  // console.log(preview);
  const style = {
    backgroundImage: `url(${
      preview
        ? `data:${preview.imageType};base64,${preview.image}`
        : placeholder
    })`
  };
  return (
    <Link
      to={{
        pathname: `${id}/`,
        state: {
          albumTitle: title,
          albumId: id
        }
      }}
      className="col-2 album-photo"
    >
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
    </Link>
  );
};

const mapMethodToProps = service => {
  return {
    getAlbums: service.getAlbums,
    getPhoto: service.getPhoto,
    uploadPhoto: service.uploadPhoto,
    getPhotosByAlbumId: service.getPhotosByAlbumId
  };
};

export default withApiService(mapMethodToProps)(Main);
