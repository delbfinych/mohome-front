import { withRouter } from "react-router-dom";
import React from "react";
import placeholder from "../../img/music_placeholder.svg";

const PlaylistItem = ({ title, count, preview, id, history }) => {
  const style = {
    backgroundImage: `url(${
      preview
        ? `data:${preview.imageType};base64,${preview.image}`
        : placeholder
    })`
  };

  return (
    <div
      onClick={() => history.push(`${id}/`)}
      className="col-2 album playlist"
    >
      <div
        onClick={e => {
          e.stopPropagation();
          history.push(`${id}/edit`);
        }}
        className="playlist__change"
      >
        <i className="zmdi zmdi-edit" />
      </div>

      <div className="ratio ratio1x1">
        <div
          style={style}
          className={`ratio__content playlist__item  ${
            preview ? "" : "photos_album_no_cover"
          }`}
        >
          <div className={"centered-block playlist__play"}>
            <i className="zmdi zmdi-play" />
          </div>
          <div className="playlist__count">
            <i className="zmdi zmdi-playlist-audio" /> {count}
          </div>
        </div>
      </div>
      <div className={"playlist-info"}>{title}</div>
    </div>
  );
};
export default withRouter(PlaylistItem);
