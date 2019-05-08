import React, { Component } from "react";
import AlbumNavigation from "./album-navigation";
import CreateBreadCrumbs from "./creareBreadcrumbs";
import { withApiService } from "../hoc";
import placeholder from "../../img/image_big.png";
import PhotoItem from "./photo-item";
import PhotoList from "./photo-list";
import { Link } from "react-router-dom";
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
          const obj = {
            ...res.data.response,
            created: photos[i].created,
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
      .getPhotosByAlbumId(this.props.id)
      .then(res => {
        this.setState({
          albumInfo: res.data.response,
          photoCount: res.data.response.length
        });
        this.getPhotosByOrder(this.state.albumInfo);
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
        formData.append("AlbumId", this.props.albumId);
        this.props
          .uploadPhoto(formData)
          .then(res => this._updateAlbum())
          .catch(err => console.log(err.response));
      }
    });
  };
  render() {
    const { photos, photoCount } = this.state;
    const { albumTitle } = this.props;
    const breadCrumbs = [
      {
        text: `My photos`,
        link: "/photo/"
      },
      {
        text: `${albumTitle} ${photoCount}`
      }
    ];

    return (
      <div>
        <AlbumNavigation onUpload={this.onUpload} breadCrumbs={breadCrumbs} />
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
    uploadPhoto: service.uploadPhoto
  };
};

export default withApiService(mapMethodToProps)(AlbumPage);
