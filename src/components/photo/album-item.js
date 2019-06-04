import placeholder from "../../img/photo_placeholder.png";
import { withRouter } from "react-router-dom";
import React from "react";

const AlbumItem = ({ title, count, preview, id, history }) => {
  const style = {
    backgroundImage: `url(${
      preview
        ? `data:${preview.imageType};base64,${preview.image}`
        : placeholder
    })`
  };

  return (
    <div onClick={() => history.push(`${id}/`)} className="col-2 album">
      <div
        onClick={e => {
          e.stopPropagation();
          history.push(`${id}/edit`);
        }}
        className="album-change"
      >
        <i className="zmdi zmdi-edit" />
      </div>
      <div className="ratio">
        <div
          style={style}
          className={`ratio__content album-photo-item  ${
            preview ? "" : "photos_album_no_cover"
          }`}
        >
          <div
            className={`album-info ${preview ? "" : "album-info-wo_shadow"}`}
          >
            <span title={title} className={`album-title`}>
              {title}
            </span>
            <span className={"album-count"}>{count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(AlbumItem);
