import React, { Component } from "react";
import AlbumNavigation from "./album-navigation";
import CreateBreadCrumbs from "./creareBreadcrumbs";
import { withApiService } from "../hoc";
import placeholder from "../../img/image_big.png";
import PhotoItem from "./photo-item";
import PhotoList from "./photo-list";
import { Link } from "react-router-dom";
class AlbumPage extends Component {
  state = {
    photos: [],
    albumInfo: null,
    photoCount: 0
  };
  componentDidMount() {
    this._updateAlbum();
  }
  getPhotosByOrder = async photos => {
    for (let i = 0; i < photos.length; i++)
      await this.props.getPhoto(photos[i].name).then(res => {
        const obj = { ...res.data.response, created: photos[i].created };
        this.setState(prevState => {
          return {
            photos: [...prevState.photos, obj]
          };
        });
      });
  };
  _updateAlbum = () => {
    this.props
      .getPhotosByAlbumId(this.props.id)
      .then(res => {
        this.setState({
          albumInfo: res.data.response,
          photoCount: res.data.response.length
        });
        this.getPhotosByOrder(this.state.albumInfo);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { photos, photoCount, albumInfo } = this.state;
    const { albumTitle } = this.props;
    const breadCrumbs = [
      {
        text: `My photos`,
        link: "/photo/"
      },
      {
        text: `${albumTitle} ${photoCount}`
      }
    ];

    return (
      <div>
        <AlbumNavigation breadCrumbs={breadCrumbs} />
        <button onClick={() => console.log(this.state.photos)}>asd</button>
        <PhotoList photos={photos} />
      </div>
    );
  }
}

const mapMethodToProps = service => {
  return {
    getPhotosByAlbumId: service.getPhotosByAlbumId,
    getPhoto: service.getPhoto
  };
};

export default withApiService(mapMethodToProps)(AlbumPage);
