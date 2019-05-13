import React, { Component } from "react";
import DropArea from "../drop-area";
import { withRouter } from "react-router-dom";
import { withApiService } from "../hoc";
import CreateBreadCrumbs from "./creareBreadcrumbs";
import "./main.css";

class AlbumNavigation extends Component {
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { rightContent, breadCrumbs } = this.props;
    return (
      <div className="albums-bar  left-right-bar">
        <DropArea
          id={"imageDnd"}
          title={"Upload photos"}
          onUpload={this.props.onUpload}
          accept={"image/*"}
        />

        <div className="albums-bar-left">
          <CreateBreadCrumbs breadCrumbs={breadCrumbs} />
        </div>
        <div className="albums-bar-right">{rightContent}</div>
      </div>
    );
  }
}

const mapMethodToProps = service => {
  return {
    uploadPhoto: service.uploadPhoto
  };
};

export default withApiService(mapMethodToProps)(withRouter(AlbumNavigation));
