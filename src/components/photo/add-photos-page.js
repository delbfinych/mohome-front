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
    const photos = this.props.lastPhotos;
    for (let i = 0; i < photos.length; i++)
      this.setState(prevState => {
        return {
          photos: [...prevState.photos, { name: photos[i] }]
        };
      });
  }

  onUpload = async files => {
    const { albumId, uploadPhoto } = this.props;
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();

      formData.append("Photo", files[i]);
      if (albumId) formData.append("AlbumId", albumId);
      console.log(albumId);
      await uploadPhoto(formData)
        .then(res => {
          this.setState(prevState => {
            return {
              photos: [
                ...prevState.photos,
                { name: res.data.response.fileName }
              ]
            };
          });
        })
        .catch(err => console.log(err.response));
    }
  };

  render() {
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
