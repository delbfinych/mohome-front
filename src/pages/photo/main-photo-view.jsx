import React, { Component } from 'react';
import './main-photo-view.css';
import { withApiService } from '../../components/hoc';
import { CreateAlbumForm } from '../../components/forms';
import Modal from '../../components/modal';
import AlbumItem from '../../components/photo/album-item';
import AlbumNavigation from '../../components/photo/album-navigation';
import PhotoList from '../../components/photo/photo-list';
import InfiniteScroll from 'react-infinite-scroller';
import routes from '../../routes';

class MainView extends Component {
  state = {
    album: [],
    photos: [],
    albumCovers: {},
    isExpanded: false
  };

  _isMounted = false;

  onExpandToggle = () => {
    this.setState(state => {
      return { isExpanded: !state.isExpanded };
    });
  };

  componentDidMount() {
    this._updateAlbums();
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  _updateAlbums = () => {
    const { getAlbums, getPhoto, getPhotosByAlbumId } = this.props;

    getAlbums().then(res => {
      if (this._isMounted) this.setState({ album: res.data.response });
      const albums = this.state.album;

      for (let i = 0; i < albums.length; i++)
        if (albums[i].coverPhotoName)
          getPhoto(albums[i].coverPhotoName, true)
            .then(res => {
              const newCover = { ...this.state.albumCovers };
              newCover[albums[i].albumId] = res.data.response;
              if (this._isMounted) this.setState({ albumCovers: newCover });
            })
            .catch(err => console.log(err));
        else {
          const newCover = { ...this.state.albumCovers };
          newCover[albums[i].albumId] = null;
          if (this._isMounted) this.setState({ albumCovers: newCover });
        }
    });
    getPhotosByAlbumId(null, 0)
      .then(res => {
        if (this._isMounted)
          this.setState({
            photoCount: res.data.response.length,
            photos: res.data.response
          });
      })
      .catch(err => console.log(err));
  };

  onUpload = async files => {
    const { history } = this.props;

    history.push(routes.app.photo.upload.relativePath, {
      files,
      breadCrumbs: [
        {
          text: `My photos`,
          link: routes.app.photo.main.path
        },
        {
          text: 'Add photos'
        }
      ]
    });
  };

  render() {
    const { album, isExpanded, photos, photoCount, albumCovers } = this.state;
    const breadCrumbs = [
      {
        text: `My albums ${album.length}`,
        link: routes.app.photo.main.path
      }
    ];

    return (
      <div>
        <AlbumNavigation
          onUpload={this.onUpload}
          breadCrumbs={breadCrumbs}
          rightContent={
            <React.Fragment>
              <Modal title={'New album'}>
                <div className="add-album-button">
                  <i className="zmdi zmdi-collection-folder-image zmdi-hc-lg" /> New album
                </div>
                <CreateAlbumForm
                  submitBtn={'Create album'}
                  createAlbum={this.props.createAlbum}
                  onUpdateAlbum={this._updateAlbums}
                />
              </Modal>
              <div className="add-photos-button">
                <i className="zmdi zmdi-camera-add zmdi-hc-lg" /> Add photos
                <label className={'uploadBtn'} htmlFor={'imageDnd'} />
              </div>
            </React.Fragment>
          }
        />
        <div className="albums-container">
          <div className={`albums-panel ${album.length > 5 ? 'able-to-expanded' : ''}`}>
            {album.length > 0 ? (
              <div className="container">
                <div className="row">
                  {album.slice(0, 5).map((e, i) => (
                    <AlbumItem
                      key={e.albumId}
                      title={e.name}
                      preview={albumCovers[e.albumId]}
                      id={e.albumId}
                      count={e.photoCount}
                      description={e.description}
                    />
                  ))}
                  {isExpanded
                    ? album
                        .slice(5)
                        .map((e, i) => (
                          <AlbumItem
                            key={e.albumId}
                            title={e.name}
                            preview={albumCovers[e.albumId]}
                            id={e.albumId}
                            count={e.photoCount}
                            description={e.description}
                          />
                        ))
                    : null}
                </div>
              </div>
            ) : (
              <div className={'container'}>
                <div className={'row'}>
                  <div className={'col-2 album-photo-empty'}>
                    <div className="ratio" />
                  </div>
                  <div className={'centered-block'}>No albums here yet...</div>
                </div>
              </div>
            )}
          </div>
          {album.length > 5 ? (
            <div
              onClick={this.onExpandToggle}
              title={isExpanded ? 'Hide' : 'Expand'}
              className="album-expand-btn"
            >
              <span className={'expand-text'}>
                {isExpanded ? <div>Show less</div> : <div>Show more</div>}
              </span>
            </div>
          ) : null}
        </div>

        <div className="left-right-bar">
          <div className="albums-bar-left">My photos {photoCount}</div>
        </div>
        <PhotoList onPhotoDeleted={this._updateAlbums} photos={photos} />
      </div>
    );
  }
}

const mapMethodToProps = service => {
  return {
    getAlbums: service.getAlbums,
    createAlbum: service.createAlbum,
    getPhoto: service.getPhoto,
    uploadPhoto: service.uploadPhoto,
    getPhotosByAlbumId: service.getPhotosByAlbumId,
    deletePhoto: service.deletePhoto
  };
};

export default withApiService(mapMethodToProps)(MainView);
