import React, { Component } from "react";
import AlbumNavigation from "../photo/album-navigation";
import { withApiService } from "../hoc";
import { ConfirmingForm } from "../forms";
import Modal from "../modal";

class EditPlaylistPage extends Component {
  state = {
    coverPhoto: null,
    description: "",
    title: "",
    photos: [],
    titleValid: true,
    isLoading: false,
    coverPreview: null
  };

  componentDidMount() {
    this._updateAlbum();
  }

  _updateAlbum = async () => {
    const { getPlaylistInfo, albumId } = this.props;

    getPlaylistInfo(albumId)
      .then(res => {
        const { coverPhoto, description, name } = res.data.response;
        this.setCoverPreview(coverPhoto);
        this.setState({
          coverPhoto,
          description,
          title: name
        });
      })
      .catch(err => console.log(err));
  };

  setCoverPreview = photo => {
    if (photo)
      this.setState({
        coverPreview: `data:${photo.imageType};base64,${photo.photo}`
      });
  };

  onSubmit = () => {
    const { description, title } = this.state;
    const { albumId, changePlaylist } = this.props;
    changePlaylist(albumId, {
      description,
      name: title
    })
      .then(res => this._updateAlbum())
      .catch(err => console.log(err.response));
  };

  onChange(e, type) {
    this.setState({
      [type]: e.target.value
    });
  }

  onAlbumDelete = () => {
    const { deletePlaylist, albumId, history } = this.props;
    deletePlaylist(albumId).then(() => history.push("/music/"));
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
          text: `${this.state.title}`,
          link: `/albums/${this.props.albumId}/`
        },
        {
          text: "Add photos"
        }
      ]
    });
  };
  onCoverUpload = e => {
    let files = e.target.files;
    if (files.length) {
      files = Array.from(files);
      files = files.filter(el => /image\/\w*/.test(el.type));
      const formData = new FormData();
      formData.append("Photo", files[0]);
      this.setState({ isLoading: true });
      this.props.setPlaylistCover(formData, this.props.albumId).then(res => {
        this.setCoverPreview(res.data.response);
        this.setState({ isLoading: false });
      });
    }
  };
  onCoverDelete = () => {
    const { albumId, deletePlaylistCover } = this.props;

    deletePlaylistCover(albumId).then(res =>
      this.setState({ coverPreview: null })
    );
  };
  render() {
    const {
      title,
      description,
      titleValid,
      coverPreview
    } = this.state;
    const breadCrumbs = [
      {
        text: `My photos`,
        link: "/music/"
      },
      {
        text: `${this.state.title || ""}`,
        link: `/music/${this.props.albumId}/`
      },
      {
        text: "Manage playlist"
      }
    ];
    return (
      <div>
        <AlbumNavigation
          rightContent={
            <Modal title={"Delete playlist"}>
              <div className="">
                <div className={"delete-album"}>
                  <i className="zmdi zmdi-delete zmdi-hc-lg" /> Delete playlist
                  <label htmlFor={"imageDnd"} />
                </div>
              </div>
              <ConfirmingForm
                body={<p>Are you sure you want to delete this playlist?</p>}
                confirmText={"Delete playlist"}
                onConfirm={this.onAlbumDelete}
              />
            </Modal>
          }
          onUpload={this.onUpload}
          breadCrumbs={breadCrumbs}
        />
        <input
          value={""}
          id={"playlist-add-cover"}
          onChange={e => this.onCoverUpload(e)}
          className={"photos-upload-input"}
          type="file"
        />
        <div className={"edit-album-wrap"}>
          <div className={"edit-album-wrap__cover"}>
            <div className={"edit-album_wrap__label"}>
              Use as playlist cover
            </div>
            {coverPreview ? (
              <div
                className={`edit-playlist-wrap__image`}
                style={{
                  backgroundImage: `url(${coverPreview})`
                }}
              >
                <div onClick={this.onCoverDelete} className={"album-change"}>
                  <i className="zmdi zmdi-close" />
                </div>
              </div>
            ) : (
              <div className={`edit-playlist-wrap__image placeholder`}>
                <i className="zmdi zmdi-plus" />{" "}
                <label className={"uploadBtn"} htmlFor={"playlist-add-cover"} />
              </div>
            )}
          </div>
          <div className="edit-album-wrap__form">
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
          </div>
        </div>
      </div>
    );
  }
}

const mapMethodToProps = service => {
  return {
    changePlaylist: service.changePlaylist,
    deletePlaylist: service.deletePlaylist,
    getPlaylistInfo: service.getPlaylistInfo,
    deletePlaylistCover: service.deletePlaylistCover,
    setPlaylistCover: service.setPlaylistCover
  };
};

export default withApiService(mapMethodToProps)(EditPlaylistPage);
