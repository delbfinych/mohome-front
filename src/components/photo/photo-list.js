import React from "react";
import PhotoItem from "./photo-item";

class PhotoList extends React.PureComponent {
  render() {
    const { photos } = this.props;
    return (
      <div className="albums-container">
        <div className="albums-panel">
          {photos.length > 0 ? (
            <div className={"container"}>
              <div className={"row"}>
                {photos.map((e, i) => (
                  <PhotoItem
                    key={e.name}
                    src={`data:${e.imageType};base64,${e.image}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className={"container"}>
              <div className={"row"}>
                <div className={"col-2 album-photo-empty"}>
                  <div className="ratio">
                    <div className={"ratio__content"}>No photos found ...</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default PhotoList;
