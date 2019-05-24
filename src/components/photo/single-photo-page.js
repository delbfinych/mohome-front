import React, { Component } from "react";
import { withApiService } from "../hoc";
import Spinner from "../spinner";

class SinglePhotoPage extends Component {
  state = {
    isLoading: false,
    photosName: "",
    notFound: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const { getPhoto, photoName } = this.props;
    getPhoto(photoName)
      .then(res => {
        this.setState({
          photo: `data:${res.data.response.imageType};base64,${
            res.data.response.image
          }`
        });
      })
      .catch(err => this.setState({ notFound: true }))
      .finally(() => this.setState({ isLoading: false }));
  }

  onPhotoDelete = name => {
    const { deletePhoto } = this.props;
    deletePhoto(name)
      .then(() => {
        this.setState({ notFound: true });
      })
      .catch(err => console.log(err.response));
  };

  render() {
    const { photo, isLoading, notFound } = this.state;
    const { albumId, history, photoName } = this.props;
    const redirectLink = albumId ? `/albums/${albumId}/` : `/albums/`;

    return (
      <div className={"single-photo-page-wrap"}>
        <div className="single-photo-wrap__btns">
          <div
            className={`single-photo-page-wrap-btn`}
            onClick={() => history.push(redirectLink)}
          >
            {albumId ? `Go to ${albumId} album` : `Go to albums page`}
          </div>
          <div
            className={`single-photo-page-wrap-btn`}
            onClick={() => this.onPhotoDelete(photoName)}
          >
            Delete photo
          </div>
        </div>
        {isLoading && <Spinner />}
        {notFound ? <div>Not found</div> : <img src={photo} alt="" />}
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

export default withApiService(mapMethodToProps)(SinglePhotoPage);
