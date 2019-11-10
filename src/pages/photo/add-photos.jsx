import React, { Component } from 'react';

import AlbumNavigation from '../../components/photo/album-navigation';
import { withApiService } from '../../components/hoc';
import PhotoList from '../../components/photo/photo-list';

class AddPhotosPage extends Component {
  state = {
    previewPhoto: [],
    photos: [],
    progressBar: 0,
    isLoading: false,
    toLoading: 0
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    const { files } = this.props;
    if (files) this.onUpload(files);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onUpload = async files => {
    const { albumId, uploadPhoto } = this.props;
    if (this._isMounted)
      this.setState({
        progressBar: 0,
        isLoading: true,
        toLoading: files.length
      });
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('Photo', files[i]);
      if (albumId) formData.append('AlbumId', albumId);

      await uploadPhoto(formData)
        .then(res => {
          if (this._isMounted)
            this.setState(prevState => {
              return {
                progressBar: prevState.progressBar + 1,
                isLoading: prevState.progressBar + 1 !== prevState.toLoading,
                photos: [...prevState.photos, { name: res.data.response.fileName }]
              };
            });
        })
        .catch(err => console.log(err.response));
    }
  };

  render() {
    const { isLoading, progressBar, toLoading } = this.state;

    return (
      <div>
        <AlbumNavigation
          rightContent={
            !isLoading ? (
              <div className="add-photos-button">
                <i className="zmdi zmdi-camera-add zmdi-hc-lg" /> Add photos
                <label htmlFor={'imageDnd'} />
              </div>
            ) : (
              <div className="add-photos-button">
                <progress value={progressBar} max={toLoading} />
                <div
                  style={{
                    textAlign: 'center',
                    position: 'absolute',
                    width: '100%',
                    left: '50%',
                    top: '80%',
                    transform: 'translate(-50%, 0)'
                  }}
                >{`${progressBar} of ${toLoading} loaded`}</div>
              </div>
            )
          }
          onUpload={this.onUpload}
          breadCrumbs={this.props.breadCrumbs}
        />
        <PhotoList isEditing photos={this.state.photos} />
      </div>
    );
  }
}

const mapMethodToProps = service => {
  return {
    uploadPhoto: service.uploadPhoto
  };
};

export default withApiService(mapMethodToProps)(AddPhotosPage);
