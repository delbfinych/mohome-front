import React from "react";
import PhotoItem from "./photo-item";
import PhotoEditor from "./photo-editor";
import { withApiService } from "../hoc";

class PhotoList extends React.PureComponent {
  state = {
    photos: []
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    const { photos } = this.props;
    if(photos) this.setState({ photos });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    const { photos } = this.props;
    if (prevProps.photos.length !== photos.length) {
      if(photos) this.setState({ photos });
    }
  }


  onPhotoDelete = name => {
    const idx = this.state.photos.findIndex(item => item.name === name);
    const newPhotos = [
      ...this.state.photos.slice(0, idx),
      ...this.state.photos.slice(idx + 1)
    ];
    this.setState({ photos: newPhotos });
    if (this.props.onPhotoDeleted) this.props.onPhotoDeleted();
  };

  render() {
    const {
      isEditing = false,
      isSelecting = false,
      onSelect,
      onCloseModal,
      photos: photosLinks,
      albumId
    } = this.props;
    const { photos } = this.state.photos.length > 0 ? this.state : this.props;
    return (
      <div className="albums-container">
        <div className="albums-panel">
          {photos.length > 0 ? (
            <div className={"container"}>
              <div className={"row"}>
                {photos.map((e, i) => (
                  <React.Fragment key={e.name}>
                    <PhotoItem
                      onCloseModal={onCloseModal}
                      isSelecting={isSelecting}
                      onSelect={onSelect}
                      index={i}
                      photo={e}
                      photos={photosLinks}
                      isEditing={isEditing}
                      onDelete={this.onPhotoDelete}
                      albumId={albumId}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
          ) : (
            <div className={"container"}>
              <div className={"row"}>
                <div className={"col-2 album-photo-empty"}>
                  <div className="ratio">
                    <div className={"ratio__content"}>
                      No photos here yet...
                    </div>
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

const mapMethodToProps = service => {
  return {
    getPhoto: service.getPhoto
  };
};

export default withApiService(mapMethodToProps)(PhotoList);
