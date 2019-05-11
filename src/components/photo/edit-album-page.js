import React, { Component } from "react";

import AlbumNavigation from "./album-navigation";
import { withApiService } from "../hoc";
import PhotoList from "./photo-list";
import { ConfirmingForm } from "../forms";
import Modal from "../modal";

class EditAlbumPage extends Component {
  state = {
    coverPhotoName: "",
    description: "",
    title: "",
    photos: [],
    titleValid: true
  };
  componentDidMount() {
    this._updateAlbum();
    // this.getPhotosByOrder(this.props.lastPhotos);
  }
  _updateAlbum = () => {
    console.log("upd");
    const { getAlbumInfo, albumId, getPhotosByAlbumId } = this.props;
    getAlbumInfo(albumId)
      .then(res => {
        console.log(res);
        const { coverPhotoName, description, name } = res.data.response;
        this.setState({ coverPhotoName, description, title: name });
      })
      .catch(err => console.log(err));
    getPhotosByAlbumId(albumId)
      .then(res =>
        this.setState({ photos: [] }, () =>
          this.getPhotosByOrder(res.data.response)
        )
      )
      .catch(err => console.log(err.response));
  };
  getPhotosByOrder = async photos => {
    if (photos.length)
      for (let i = 0; i < photos.length; i++)
        await this.props.getPhoto(photos[i]).then(res => {
          const image = res.data.response;
          console.log(res.data.response);
          const obj = {
            image: `data:${image.imageType};base64,${image.image}`,
            name: photos[i],
            created: image.created
          };

          this.setState(prevState => {
            return {
              photos: [...prevState.photos, obj]
            };
          });
        });
  };
  onSubmit = () => {
    const { description, title, coverPhotoName } = this.state;
    const { albumId } = this.props;
    this.props
      .changeAlbum(albumId, {
        description,
        albumName: title,
        coverPhotoName
      })
      .then(res => this._updateAlbum())
      .catch(err => console.log(err.response));
  };
  onChange(e, type) {
    this.setState({
      [type]: e.target.value
    });
  }
  onDeleteAlbum = () => {
    const { deleteAlbum, albumId, history } = this.props;
    deleteAlbum(albumId).then(() => history.push("/albums/"));
  };
  render() {
    const { title, description, titleValid } = this.state;
    const breadCrumbs = [
      {
        text: `My photos`,
        link: "/albums/"
      },
      {
        text: `${this.state.title}`,
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
                <div className={"delete-album"}>
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
        <div className="edit-album-cover" />
        <form className={"form"} onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id={"title"}
              className={`form-control ${titleValid ? "" : "is-invalid"}`}
              onChange={e => this.onChange(e, "title")}
              value={title}
              type={"text"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              rows={4}
              id={"description"}
              className={`form-control`}
              onChange={e => this.onChange(e, "description")}
              value={description}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <button className={"ok-btn"} type={"submit"}>
              Save changes
            </button>
          </div>
        </form>
        <button type={"submit"}>Save changes</button>
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
    changeAlbum: service.changeAlbum,
    getPhotosByAlbumId: service.getPhotosByAlbumId
  };
};

export default withApiService(mapMethodToProps)(EditAlbumPage);
