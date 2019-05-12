import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class PhotoItem extends Component {
  onOpen = (currPhoto, photos, index) => {
    console.log(photos);
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

export default withRouter(PhotoItem);
