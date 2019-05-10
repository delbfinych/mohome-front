import React, { Component } from "react";

import AlbumNavigation from "./album-navigation";
import { withApiService } from "../hoc";
import PhotoList from "./photo-list";

class AddPhotosPage extends Component {
  state = {
    previewPhoto: [],
    photos: []
  };
  componentDidMount() {
    this.getPhotosByOrder(this.props.lastPhotos);
  }
  getPhotosByOrder = async photos => {
    if (photos.length)
      for (let i = 0; i < photos.length; i++)
        await this.props.getPhoto(photos[i]).then(res => {
          const image = res.data.response;
          const obj = {
            image: `data:${image.imageType};base64,${image.image}`,
            name: photos[i]
          };

          this.setState(prevState => {
            return {
              photos: [...prevState.photos, obj]
            };
          });
        });
  };
  onUpload = async files => {
    const { albumId, uploadPhoto } = this.props;
    const newPhotos = [];
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();

      formData.append("Photo", files[i]);
      if (albumId) formData.append("AlbumId", albumId);
      console.log(albumId);
      await uploadPhoto(formData)
        .then(res => {
          newPhotos.push(res.data.response.fileName);
        })
        .catch(err => console.log(err.response));
    }
    console.log(newPhotos);
    this.getPhotosByOrder(newPhotos);
  };

  render() {
    console.log(this.state.photos);
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
          breadCrumbs={this.props.breadCrumbs}
        />
        <PhotoList isEditing photos={this.state.photos} />
      </div>
    );
  }
}

const mapMethodToProps = service => {
  return {
    getPhoto: service.getPhoto,
    uploadPhoto: service.uploadPhoto
  };
};

export default withApiService(mapMethodToProps)(AddPhotosPage);
