import React from "react";
import { Link } from "react-router-dom";
const PhotoItem = ({ photos, index }) => {
  const currPhoto = photos[index];
  const style = {
    backgroundImage: `url(${currPhoto.image})`
  };
  return (
    <Link
      to={{
        pathname: `photo/${currPhoto.name}`,
        state: {
          modal: true,
          photos,
          currentItem: currPhoto,
          index
        }
      }}
      className="col-2 album-photo"
    >
      <div className="ratio">
        <div style={style} className={`ratio__content album-photo-item`} />
      </div>
    </Link>
  );
};

export default PhotoItem;
