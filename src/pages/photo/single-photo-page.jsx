import React, { Component } from "react";
import { withApiService } from "../../components/hoc";
import Spinner from "../../components/spinner";
import { Link } from "react-router-dom";

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
    const { albumId, photoName } = this.props;

    return (
      <div className={"single-photo-page-wrap"}>
        {notFound ? (
          <div className={"centered-block"}>Not found</div>
        ) : (
          <>
            <div className="single-photo-wrap__btns">
              <div className={`single-photo-page-wrap-btn`}>
                <Link to={"/albums/"}>albums</Link>
                {albumId && (
                  <>
                    <span>/</span>
                    <Link to={`/albums/${albumId}/`}>{albumId}</Link>
                  </>
                )}
              </div>
              <div
                className={`single-photo-page-wrap-btn`}
                onClick={() => this.onPhotoDelete(photoName)}
              >
                <span>Delete photo</span>
              </div>
            </div>
            <img src={photo} alt="" />
          </>
        )}
        {isLoading && <Spinner />}
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
