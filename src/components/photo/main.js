import React, { Component } from "react";
import "./main.css";
import { withApiService } from "../hoc";
import placeholder from "../../img/image_big.png";
import { CreateAlbumForm } from "../forms";
import Modal from "../modal";
import DropArea from "../drop-area";
import AlbumItem from "./album-item";
import { Route, Switch, withRouter, Redirect, Link } from "react-router-dom";
import AlbumNavigation from "./album-navigation";
import NavBar from "../navbar";
import AddPhotosPage from "./add-photos-page";
import PhotoList from "./photo-list";
import CreateBreadCrumbs from "./creareBreadcrumbs";
import Slider from "./slider";

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

  _updateAlbums = () => {
    this.props.getAlbums().then(res => {
      console.log(res);
      this.setState({ album: res.data.response });
      console.log(this.state.album);
      const albums = this.state.album;
      for (let i = 0; i < albums.length; i++)
        if (albums[i].coverPhotoName)
          this.props
            .getPhoto(albums[i].coverPhotoName)
            .then(res => {
              const newCover = { ...this.state.albumCovers };
              newCover[albums[i].albumId] = res.data.response;
              this.setState({ albumCovers: newCover });
            })
            .catch(err => console.log(err));
    });
    this.props
      .getPhotosByAlbumId()
      .then(res => {
        this.setState({
          photoCount: res.data.response.length,
          photos: res.data.response
        });
      })
      .catch(err => console.log(err));
  };

  onUpload = async files => {
    const { history } = this.props;

    history.push("upload", {
      files,
      breadCrumbs: [
        {
          text: `My photos`,
          link: "/albums/"
        },
        {
          text: "Add photos"
        }
      ]
    });
  };

  render() {
    const { album, isExpanded, photos, photoCount } = this.state;
    const breadCrumbs = [
      {
        text: `My albums ${album.length}`,
        link: "/albums/"
      }
    ];
    return (
      <div>
        <AlbumNavigation
          onUpload={this.onUpload}
          breadCrumbs={breadCrumbs}
          rightContent={
            <React.Fragment>
              <Modal title={"New album"}>
                <div className="add-album-button">
                  <i className="zmdi zmdi-collection-folder-image zmdi-hc-lg" />{" "}
                  New album
                </div>
                <CreateAlbumForm onUpdateAlbum={this._updateAlbums} />
              </Modal>
              <div className="add-photos-button">
                <i className="zmdi zmdi-camera-add zmdi-hc-lg" /> Add photos
                <label htmlFor={"imageDnd"} />
              </div>
            </React.Fragment>
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
                      description={e.description}
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
                      <div className={"ratio__content"}>No albums found.</div>
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

const mapMethodToProps = service => {
  return {
    getAlbums: service.getAlbums,
    getPhoto: service.getPhoto,
    uploadPhoto: service.uploadPhoto,
    getPhotosByAlbumId: service.getPhotosByAlbumId,
    deletePhoto: service.deletePhoto
  };
};

export default withApiService(mapMethodToProps)(Main);
