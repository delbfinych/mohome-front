import React, { Component } from "react";
import AlbumNavigation from "../photo/album-navigation";
import { withApiService } from "../hoc";

class PlaylistPage extends Component {
  state = {
    music: [],
    playlistInfo: null,
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
    const { getMusicByPlaylistId, getPlaylistInfo, playlistId } = this.props;
    // getMusicByPlaylistId(playlistId)
    // .then(res => {
    //   if (this._isMounted)
    //     this.setState({
    //       playlistInfo: res.data.response,
    //       musicCount: res.data.response.length,
    //       music: res.data.response
    //     });
    // })
    // .catch(err => console.log(err));

    getPlaylistInfo(playlistId)
      .then(res => {
        const { name, description, musicCount } = res.data.response;
        console.log(res.data.response);
        if (this._isMounted)
          this.setState({
            playlistTitle: name,
            description: description,
            musicCount
          });
      })
      .catch(err => console.log(err));
  };

  onUpload = async files => {
    const { playlistId, history } = this.props;

    history.push("upload", {
      playlistId,
      files,
      breadCrumbs: [
        {
          text: `My playlists`,
          link: "/music/"
        },
        {
          text: `${this.state.playlistTitle}`,
          link: `/music/${playlistId}/`
        },
        {
          text: "Add photos"
        }
      ]
    });
  };
  render() {
    const { playlistId } = this.props;
    const { music, musicCount, playlistTitle, description } = this.state;
    const breadCrumbs = [
      {
        text: `My playlists`,
        link: "/music/"
      },
      {
        text: `${playlistTitle || ""} ${musicCount ? musicCount : ""}`
      }
    ];

    return (
      <div>
        <AlbumNavigation
          // rightContent={
          //   <div className="add-photos-button">
          //     <i className="zmdi zmdi-camera-add zmdi-hc-lg" /> Add photos
          //     <label htmlFor={"imageDnd"} />
          //   </div>
          // }
          onUpload={this.onUpload}
          breadCrumbs={breadCrumbs}
        />
        <div className="photos_album_intro">
          <div className={"photos_album_intro__title"}>{playlistTitle}</div>
          <div className={"photos_album_intro__description"}>{description}</div>
          <div className={"photos_album_intro__photo-count"}>
            {musicCount} audios
          </div>
        </div>
      </div>
    );
  }
}

const mapMethodToProps = service => {
  return {
    getMusicByPlaylistId: service.getMusicByPlaylistId,
    getPlaylistInfo: service.getPlaylistInfo
  };
};

export default withApiService(mapMethodToProps)(PlaylistPage);
