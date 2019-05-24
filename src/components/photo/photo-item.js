import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withApiService } from "../hoc";
import compose from "../../utils/compose";
import { ConfirmingForm } from "../forms";
import Modal from "../modal";

class PhotoItem extends Component {
  onOpen = (currPhoto, photos, index) => {
    this.props.history.push(`photo/${currPhoto.name}`, {
      modal: true,
      photos: photos.reduce((acc, el) => {
        acc.push(el.name);
        return acc;
      }, []),
      currentName: currPhoto.name,
      index
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
      photo,
      photos,
      index,
      children,
      isSelecting,
      onSelect,
      onCloseModal,
      isEditing
    } = this.props;

    const style = {
      backgroundImage: `url(${photo.image})`,
      borderRadius: `${!isEditing ? "5px 5px 5px 5px" : "5px 5px 0 0"} `
    };

    return (
      <div className="col-2 album-photo">
        {isSelecting ? null : (
          <Modal title={"Delete photo"}>
            <div className={"album-change"}>
              <i className="zmdi zmdi-close" />
            </div>
            <ConfirmingForm
              body={<p>Are you sure you want to delete this photo?</p>}
              confirmText={"Delete photo"}
              onConfirm={() => this.onPhotoDelete(photo.name)}
            />
          </Modal>
        )}

        <div className="ratio">
          <div
            onClick={() => {
              if (isSelecting) {
                onSelect(photo.name);
                onCloseModal();
              } else {
                this.onOpen(photo, photos, index);
              }
            }}
            className={`ratio__content album-photo-item`}
            style={style}
          />
        </div>
        {children}
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
