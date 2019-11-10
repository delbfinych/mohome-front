import React, { Component } from 'react';
import AlbumNavigation from '../../components/photo/album-navigation';
import { withApiService } from '../../components/hoc';
import PhotoList from '../../components/photo/photo-list';
import { Link } from 'react-router-dom';
import routes from '../../routes';

class PhotoAlbum extends Component {
  state = {
    photos: [],
    albumInfo: null,
    photoCount: 0
  };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    this._updateAlbum();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  _updateAlbum = () => {
    const { getPhotosByAlbumId, getAlbumInfo, albumId } = this.props;
    getPhotosByAlbumId({ albumId: +albumId })
      .then(res => {
        if (this._isMounted)
          this.setState({
            albumInfo: res.data.response,
            photos: res.data.response
          });
      })
      .catch(err => console.log(err));

    getAlbumInfo(albumId)
      .then(res => {
        const { name, description, photoCount } = res.data.response;
        if (this._isMounted)
          this.setState({
            albumTitle: name,
            description: description,
            photoCount
          });
      })
      .catch(err => console.log(err));
  };

  onUpload = async files => {
    const { albumId, history } = this.props;

    history.push(routes.app.photo.upload.relativePath, {
      albumId,
      files,
      breadCrumbs: [
        {
          text: `My photos`,
          link: routes.app.photo.main.path
        },
        {
          text: `${this.state.albumTitle}`,
          link: `${routes.app.photo.main.path}${albumId}/`
        },
        {
          text: 'Add photos'
        }
      ]
    });
  };
  render() {
    const { albumId } = this.props;
    const { photos, photoCount, albumTitle, description } = this.state;
    const breadCrumbs = [
      {
        text: `My photos`,
        link: routes.app.photo.main.path
      },
      {
        text: `${albumTitle} ${photoCount ? photoCount : ''}`
      }
    ];

    return (
      <div>
        <AlbumNavigation
          rightContent={
            <div className="add-photos-button">
              <i className="zmdi zmdi-camera-add zmdi-hc-lg" /> Add photos
              <label htmlFor={'imageDnd'} />
            </div>
          }
          onUpload={this.onUpload}
          breadCrumbs={breadCrumbs}
        />
        <div className="photos_album_intro">
          <div className={'photos_album_intro__title'}>{albumTitle}</div>
          <div className={'photos_album_intro__description'}>{description}</div>
          <div className={'photos_album_intro__photo-count'}>{photoCount} photos</div>
          <div>
            <Link style={{ textAlign: 'center' }} to={routes.app.photo.albums.edit.relativePath}>
              Edit album
            </Link>
          </div>
        </div>
        <PhotoList albumId={albumId} onPhotoDeleted={this._updateAlbum} photos={photos} />
      </div>
    );
  }
}

const mapMethodToProps = service => {
  return {
    getPhotosByAlbumId: service.getPhotosByAlbumId,
    getAlbumInfo: service.getAlbumInfo
  };
};

export default withApiService(mapMethodToProps)(PhotoAlbum);
