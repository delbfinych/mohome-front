import React, { Component } from "react";
import DropArea from "../drop-area";
import { withRouter } from "react-router-dom";
import BreadCrumbs from "./breadcrumbs";
import dropUploadImg from "../../img/drop_upload.png"

// import "./main.css";

class AlbumNavigation extends Component {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { rightContent, breadCrumbs, onUpload } = this.props;

    return (
      <div className="albums-bar  left-right-bar">
        <DropArea
          id={"imageDnd"}
          title={"Upload photos"}
          imageUrl={dropUploadImg}
          onUpload={onUpload}
          accept={"image/*"}
        />

        <div className="albums-bar-left">
          <BreadCrumbs breadCrumbs={breadCrumbs} />
        </div>
        <div className="albums-bar-right">{rightContent}</div>
      </div>
    );
  }
}

export default withRouter(AlbumNavigation);
