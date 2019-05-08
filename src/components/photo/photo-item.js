import React from "react";

const PhotoItem = ({ src }) => {
  const style = {
    backgroundImage: `url(${src})`
  };
  return (
    <div
      // to={{ pathname: `${id}`, state: { albumTitle: title } }}
      className="col-2 album-photo"
    >
      <div className="ratio">
        <div style={style} className={`ratio__content album-photo-item`} />
      </div>
    </div>
  );
};

export default PhotoItem;
