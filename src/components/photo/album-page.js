import React, { Component } from "react";
import AlbumNavigation from "./album-navigation";
import CreateBreadCrumbs from "./creareBreadcrumbs";
import { withApiService } from "../hoc";
import placeholder from "../../img/image_big.png";
import PhotoItem from "./photo-item";
import PhotoList from "./photo-list";
import { withRouter } from "react-router-dom";

class AlbumPage extends Component {
  state = {
    photos: [],
    albumInfo: null,
    photoCount: 0
  };
  componentDidMount() {
    this._updateAlbum();
  }
  getPhotosByOrder = async photos => {
    if (photos.length)
      for (let i = 0; i < photos.length; i++)
        await this.props.getPhoto(photos[i].name).then(res => {
          const image = res.data.response;
          console.log(res);
          const obj = {
            image: `data:${image.imageType};base64,${image.image}`,
            created: image.created,
            name: photos[i].name
          };

          this.setState(prevState => {
            return {
              photos: [...prevState.photos, obj]
            };
          });
        });
  };
  _updateAlbum = () => {
    this.props
      .getPhotosByAlbumId(this.props.albumId)
      .then(res => {
        console.log(res);

        this.setState({
          albumInfo: res.data.response,
          photoCount: res.data.response.length,
          photos: []
        });
        this.getPhotosByOrder(this.state.albumInfo);
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
    const { uploadPhoto, albumId, history } = this.props;
    const lastPhotos = [];
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();

      formData.append("Photo", files[i]);
      formData.append("AlbumId", albumId);

      await uploadPhoto(formData)
        .then(res => {
          lastPhotos.push(res.data.response.fileName);
          this._updateAlbum();
        })
        .catch(err => console.log(err.response));
    }

    history.push("upload", {
      albumId,
      lastPhotos,
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
        <button onClick={() => console.log(this.state.albumInfo)}>asd</button>
        <PhotoList photos={photos} />
      </div>
    );
  }
}

const mapMethodToProps = service => {
  return {
    getPhotosByAlbumId: service.getPhotosByAlbumId,
    getPhoto: service.getPhoto,
    uploadPhoto: service.uploadPhoto,
    getAlbumInfo: service.getAlbumInfo
  };
};

export default withApiService(mapMethodToProps)(AlbumPage);
