import React, { Component } from "react";
import { withApiService } from "../hoc";

class SinglePhotoPage extends Component {
  state = {
    isLoading: false,
    photosName: ""
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    const { getPhoto, photoName } = this.props;
    getPhoto(photoName)
      .then(res => {
        console.log(res);
        this.setState({
          photo: `data:${res.data.response.imageType};base64,${
            res.data.response.image
          }`
        });
      })
      .catch(err => console.log(err))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { photo, isLoading } = this.state;
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
        {isLoading ? <div>loading</div> : <img src={photo} alt="" />}
      </div>
    );
  }
}

const mapMethodToProps = service => {
  return {
    getPhoto: service.getPhoto
  };
};

export default withApiService(mapMethodToProps)(SinglePhotoPage);
