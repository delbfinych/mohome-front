import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withApiService } from "../hoc";
import compose from "../../utils/compose";
import { ConfirmingForm } from "../forms";
import Modal from "../modal";
import PhotoEditor from "./photo-editor";
import routes from "../../routes"

class PhotoItem extends Component {
  state = {
    photo: {}
  };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    const { getPhoto, photo } = this.props;

    if (this._isMounted) this.setState({ photo });

    getPhoto(photo.name, true).then(res => {
      const image = res.data.response;
      const newPhoto = {
        image: `data:${image.imageType};base64,${image.image}`,
        name: photo.name,
        created: image.created,
        description: image.description
      };
      if (this._isMounted) this.setState({ photo: newPhoto });
    }).catch((err)=>console.log(err));
  }
  componentWillUnmount() {
    this._isMounted = false;
  }


  shouldComponentUpdate(nextProps, nextState) {
    return this.state.photo !== nextState.photo;
  }

  onOpen = (currPhoto, photos, index, albumId) => {
    const { history } = this.props;

    history.push(`${routes.app.photo.slider.relativePath}/${currPhoto.name}`, {
      modal: true,
      currentName: currPhoto.name,
      index,
      albumId
    });
  };

  onPhotoDelete = name => {
    const { deletePhoto } = this.props;

    deletePhoto(name)
      .then()
      .catch()
      .finally(() => this.props.onDelete(name));
  };
  render() {
    const {
      photos,
      index,
      isSelecting,
      onSelect,
      onCloseModal,
      isEditing,
      albumId
    } = this.props;

    const { image, name, description } = this.state.photo;

    const style = {
      backgroundImage: `url(${image})`,
      borderRadius: `${!isEditing ? "5px 5px 5px 5px" : "5px 5px 0 0"} `
    };

    return (
      <div className="col-2 album">
        {isSelecting ? null : (
          <Modal title={"Delete photo"}>
            <div className={"album-change"}>
              <i className="zmdi zmdi-close" />
            </div>
            <ConfirmingForm
              body={<p>Are you sure you want to delete this photo?</p>}
              confirmText={"Delete photo"}
              onConfirm={() => this.onPhotoDelete(name)}
            />
          </Modal>
        )}

        <div className="ratio">
          <div
            onClick={() => {
              if (isSelecting) {
                onSelect(name);
                onCloseModal();
              } else {
                this.onOpen(this.state.photo, photos, index, albumId);
              }
            }}
            className={`ratio__content album-photo-item`}
            style={style}
          />
        </div>
        {isEditing ? (
          <PhotoEditor
            className={"photo-edit-input"}
            description={description}
            photoName={name}
          />
        ) : null}
      </div>
    );
  }
}

const mapMethodToProps = service => {
  return {
    getPhoto: service.getPhoto,
    deletePhoto: service.deletePhoto
  };
};
export default compose(
  withApiService(mapMethodToProps),
  withRouter
)(PhotoItem);
