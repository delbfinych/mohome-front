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
    this.getPhotosByOrder(photos);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    const { photos } = this.props;
    if (prevProps.photos.length !== photos.length) {
      this.getPhotosByOrder(photos);
    }
  }

  getPhotosByOrder = async photos => {
    if (photos.length)
      for (let i = 0; i < photos.length; i++)
        if (
          this.state.photos.findIndex(el => el.name === photos[i].name) === -1
        ) {
          await this.props.getPhoto(photos[i].name, true).then(res => {
            const image = res.data.response;
            const obj = {
              image: `data:${image.imageType};base64,${image.image}`,
              name: photos[i].name,
              created: image.created,
              description: image.description
            };
            if (this._isMounted)
              this.setState(prevState => {
                return {
                  photos: [...prevState.photos, obj]
                };
              });
          });
        }
  };

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
    const { photos } = this.state;

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
                    >
                      {isEditing ? (
                        <PhotoEditor
                          className={"photo-edit-input"}
                          description={e.description}
                          photoName={e.name}
                        />
                      ) : null}
                    </PhotoItem>
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
