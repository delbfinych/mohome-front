import React from "react";
import PhotoItem from "./photo-item";
import PhotoEditor from "./photo-editor";
import { withApiService } from "../hoc";

class PhotoList extends React.PureComponent {
  state = {
    photos: []
  };
  componentDidMount() {
    const { photos } = this.props;
    console.log(photos);
    this.getPhotosByOrder(photos);
  }
  componentDidUpdate(prevProps) {
    const { photos } = this.props;
    if (prevProps.photos.length !== photos.length) {
      console.log(photos);
      this.setState(
        () => {
          return {
            photos: []
          };
        },
        () => {
          this.getPhotosByOrder(photos);
        }
      );
    }
  }
  getPhotosByOrder = async photos => {
    console.log(photos);
    if (photos.length)
      for (let i = 0; i < photos.length; i++)
        await this.props.getPhoto(photos[i].name).then(res => {
          const image = res.data.response;
          const obj = {
            image: `data:${image.imageType};base64,${image.image}`,
            name: photos[i].name,
            created: image.created,
            description: image.description
          };

          this.setState(prevState => {
            return {
              photos: [...prevState.photos, obj]
            };
          });
        });
  };
  render() {
    const {
      isEditing = false,
      isSelecting = false,
      onSelect,
      onCloseModal
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
                      photos={photos}
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
                    <div className={"ratio__content"}>No photos found.</div>
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
