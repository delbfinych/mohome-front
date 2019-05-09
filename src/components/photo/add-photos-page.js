import React, { Component } from "react";

import AlbumNavigation from "./album-navigation";

class AddPhotosPage extends Component {
  render() {
    const breadCrumbs = [
      {
        text: `My photos`,
        link: "/albums/"
      },
      {
        text: `Add photos`
      }
    ];
    return (
      <div>
        <AlbumNavigation breadCrumbs={breadCrumbs} />
      </div>
    );
  }
}

export default AddPhotosPage;
