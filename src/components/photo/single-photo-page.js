import React, { Component } from "react";
import { withApiService } from "../hoc";

class SinglePhotoPage extends Component {
  state = {
    isLoading: false,
    photosName: "",
    notFound: false
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    const { getPhoto, photoName } = this.props;
    console.log(Date.now());
    getPhoto(photoName)
      .then(res => {
        console.log(Date.now());
        this.setState({
          photo: `data:${res.data.response.imageType};base64,${
            res.data.response.image
          }`
        });
      })
      .catch(err => this.setState({ notFound: true }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { photo, isLoading, notFound } = this.state;
    const { albumId, history } = this.props;
    const redirectLink = albumId ? `/albums/${albumId}/` : `/albums/`;
    return (
      <div className={"single-photo-page-wrap"}>
        <div
          className={`single-photo-page-wrap-btn`}
          onClick={() => history.push(redirectLink)}
        >
          {albumId ? `Go to ${albumId} album` : `Go to albums page`}
        </div>
        {isLoading && <div>loading</div>}
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
