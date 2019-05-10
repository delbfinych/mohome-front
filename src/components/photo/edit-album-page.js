import React, { Component } from "react";

import AlbumNavigation from "./album-navigation";
import { withApiService } from "../hoc";
import PhotoList from "./photo-list";
import { ConfirmingForm } from "../forms";
import Modal from "../modal";

class EditAlbumPage extends Component {
  state = {
    coverPhotoName: "",
    description: "asd",
    name: "",
    photos: []
  };
  componentDidMount() {
    this._updateAlbum();
    // this.getPhotosByOrder(this.props.lastPhotos);
  }
  _updateAlbum = () => {
    const { getAlbumInfo, albumId } = this.props;
    getAlbumInfo(albumId)
      .then(res => {
        const { coverPhotoName, description, name } = res.data.response;
        this.setState({ coverPhotoName, description, name });
      })
      .catch(err => console.log(err));
  };
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
  onSubmit = () => {
    const { description, name, coverPhotoName } = this.state;
    const { albumId } = this.props;
    console.log(description, name, coverPhotoName);
    this.props
      .changeAlbum(albumId, {
        description,
        albumName: name,
        coverPhotoName
      })
      .then(res => this._updateAlbum)
      .catch(err => console.log(err.response));
    console.log({ albumId, description, albumName: name, coverPhotoName });
  };
  onDeleteAlbum = () => {
    const { deleteAlbum, albumId, history } = this.props;
    deleteAlbum({ albumId }).then(() => history.push("/albums/"));
  };
  render() {
    console.log(this.state.photos);
    const breadCrumbs = [
      {
        text: `My photos`,
        link: "/albums/"
      },
      {
        text: `${this.state.name}`,
        link: `/albums/${this.props.albumId}/`
      },
      {
        text: "Manage album"
      }
    ];
    return (
      <div>
        <AlbumNavigation
          rightContent={
            <Modal title={"Delete album"}>
              <div className="left-right-bar">
                <div>
                  <i className="zmdi zmdi-delete zmdi-hc-lg" /> Delete album
                  <label htmlFor={"imageDnd"} />
                </div>
              </div>
              <ConfirmingForm
                body={<p>Are you sure you want to delete this album?</p>}
                confirmText={"Delete album"}
                onConfirm={this.onDeleteAlbum}
              />
            </Modal>
          }
          onUpload={this.onUpload}
          breadCrumbs={breadCrumbs}
        />
        <button onClick={this.onSubmit}>Save changes</button>
        <PhotoList isEditing photos={this.state.photos} />
      </div>
    );
  }
}

const mapMethodToProps = service => {
  return {
    getPhoto: service.getPhoto,
    deleteAlbum: service.deleteAlbum,
    getAlbumInfo: service.getAlbumInfo,
    changeAlbum: service.changeAlbum
  };
};

export default withApiService(mapMethodToProps)(EditAlbumPage);
