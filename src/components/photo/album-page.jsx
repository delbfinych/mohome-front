import React, { Component } from "react";
import AlbumNavigation from "./album-navigation";
import { withApiService } from "../hoc";
import PhotoList from "./photo-list";
import { Link } from "react-router-dom";

class AlbumPage extends Component {
  state = {
    photos: [],
    albumInfo: null,
    photoCount: 0
  };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    this._updateAlbum();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  _updateAlbum = () => {
    const { getPhotosByAlbumId, getAlbumInfo, albumId } = this.props;
    getPhotosByAlbumId({ albumId: +albumId })
      .then(res => {
        if (this._isMounted)
          this.setState({
            albumInfo: res.data.response,
            photos: res.data.response
          });
      })
      .catch(err => console.log(err));

    getAlbumInfo(albumId)
      .then(res => {
        const { name, description, photoCount } = res.data.response;
        if (this._isMounted)
          this.setState({
            albumTitle: name,
            description: description,
            photoCount
          });
      })
      .catch(err => console.log(err));
  };

  onUpload = async files => {
    const { albumId, history } = this.props;

    history.push("upload", {
      albumId,
      files,
      breadCrumbs: [
        {
          text: `My photos`,
          link: "/albums/"
        },
        {
          text: `${this.state.albumTitle}`,
          link: `/albums/${albumId}/`
        },
        {
          text: "Add photos"
        }
      ]
    });
  };
  render() {
    const { albumId } = this.props;
    const { photos, photoCount, albumTitle, description } = this.state;
    const breadCrumbs = [
      {
        text: `My photos`,
        link: "/albums/"
      },
      {
        text: `${albumTitle} ${photoCount ? photoCount : ""}`
      }
    ];

    return (
      <div>
        <AlbumNavigation
          rightContent={
            <div className="add-photos-button">
              <i className="zmdi zmdi-camera-add zmdi-hc-lg" /> Add photos
              <label htmlFor={"imageDnd"} />
            </div>
          }
          onUpload={this.onUpload}
          breadCrumbs={breadCrumbs}
        />
        <div className="photos_album_intro">
          <div className={"photos_album_intro__title"}>{albumTitle}</div>
          <div className={"photos_album_intro__description"}>{description}</div>
          <div className={"photos_album_intro__photo-count"}>
            {photoCount} photos
          </div>
          <div>
            <Link style={{ textAlign: "center" }} to={`edit`}>
              Edit album
            </Link>
          </div>
        </div>
        <PhotoList
          albumId={albumId}
          onPhotoDeleted={this._updateAlbum}
          photos={photos}
        />
      </div>
    );
  }
}

const mapMethodToProps = service => {
  return {
    getPhotosByAlbumId: service.getPhotosByAlbumId,
    getAlbumInfo: service.getAlbumInfo
  };
};

export default withApiService(mapMethodToProps)(AlbumPage);
