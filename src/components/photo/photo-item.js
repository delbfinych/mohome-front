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
      photos,
      index,
      children,
      isSelecting,
      onSelect,
      onCloseModal
    } = this.props;
    const currPhoto = photos[index];
    const style = {
      backgroundImage: `url(${currPhoto.image})`
    };
    return (
      <div className="col-2 album-photo">
        <div className="ratio">
          <div
            onClick={() => {
              if (isSelecting) {
                onSelect(currPhoto.name);
                onCloseModal();
              } else {
                this.onOpen(currPhoto, photos, index);
              }
            }}
            style={style}
            className={`ratio__content album-photo-item`}
          />
        </div>
        {children}
      </div>
    );
  }
}

export default withRouter(PhotoItem);
