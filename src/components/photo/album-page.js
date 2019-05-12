import React, { Component } from "react";
import AlbumNavigation from "./album-navigation";
import CreateBreadCrumbs from "./creareBreadcrumbs";
import { withApiService } from "../hoc";
import placeholder from "../../img/image_big.png";
import PhotoItem from "./photo-item";
import PhotoList from "./photo-list";

class AlbumPage extends Component {
  state = {
    photos: [],
    albumInfo: null,
    photoCount: 0
  };
  componentDidMount() {
    this._updateAlbum();
  }

  _updateAlbum = () => {
    this.props
      .getPhotosByAlbumId(this.props.albumId)
      .then(res => {
        console.log(res);

        this.setState({
          albumInfo: res.data.response,
          photoCount: res.data.response.length,
          photos: res.data.response
        });
      })
      .catch(err => console.log(err));
    this.props
      .getAlbumInfo(this.props.albumId)
      .then(res => {
        const { name, description } = res.data.response;
        console.log(res);
        this.setState({ albumTitle: name, description: description });
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
          link: `/albums/${this.props.albumId}/`
        },
        {
          text: "Add photos"
        }
      ]
    });
  };
  render() {
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
        </div>
        <PhotoList photos={photos} />
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
