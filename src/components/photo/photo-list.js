import React from "react";
import PhotoItem from "./photo-item";
import PhotoEditor from "./photo-editor";

class PhotoList extends React.PureComponent {
  render() {
    const { photos, isEditing = false } = this.props;

    return (
      <div className="albums-container">
        <div className="albums-panel">
          {photos.length > 0 ? (
            <div className={"container"}>
              <div className={"row"}>
                {photos.map((e, i) => (
                  <React.Fragment key={e.name}>
                    <PhotoItem index={i} photos={photos} />
                    {isEditing ? <PhotoEditor photoName={e.name} /> : null}
                  </React.Fragment>
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
