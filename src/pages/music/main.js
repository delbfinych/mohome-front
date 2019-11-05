import React, { Component } from "react";
import "./main.css";
import PlaylistItem from "./playlist-item";
import { withApiService } from "../../components/hoc";
import AlbumNavigation from "../../components/photo/album-navigation";
import Modal from "../../components/modal";
import { CreateAlbumForm } from "../../components/forms";
import NotAvailable from "../../components/_temp-not-available-section";

class Main extends Component {
  state = {
    playlists: [],
    photos: [],
    albumCovers: {},
    isExpanded: false
  };

  onExpandToggle = () => {
    this.setState(state => {
      return { isExpanded: !state.isExpanded };
    });
  };

  componentDidMount() {
    this._updatePlaylists();
  }

  _updatePlaylists = () => {
    const { getPlaylists } = this.props;

    getPlaylists().then(res => {
      this.setState({ playlists: res.data.response });
    });
  };

  render() {
    const {
      playlists,
      isExpanded,
      photos,
      photoCount,
      albumCovers
    } = this.state;
    const breadCrumbs = [
      {
        text: `My playlists ${playlists.length}`,
        link: "/music/"
      }
    ];

    return (
      <div className="main-container container bg-white">
        <NotAvailable />
      </div>
    );
  }
}
const mapMethodToProps = service => {
  return {
    getPlaylists: service.getPlaylists,
    createPlaylist: service.createPlaylist
  };
};

export default withApiService(mapMethodToProps)(Main);
