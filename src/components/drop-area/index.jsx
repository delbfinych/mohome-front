import React, { Component } from "react";
import "./drop-area.css";
class DropArea extends Component {
  highlight = e => {
    this.dropArea.classList.add("highlight");
  };
  unhighlight = () => {
    this.dropArea.classList.remove("highlight");
  };
  handleDrop = e => {
    let dt = e.dataTransfer;
    let files = dt.files;
    if (files.length) {
      files = Array.from(files);
      files = files.filter(el => /image\/\w*/.test(el.type));
      this.props.onUpload(files);
    }
  };
  preventDefaults = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  onUpload = e => {
    let files = e.target.files;
    if (files.length) {
      files = Array.from(files);
      files = files.filter(el => /image\/\w*/.test(el.type));
      this.props.onUpload(files);
    }
  };

  componentDidMount() {
    this.dropArea = document.querySelector(".drop-area-wrap");
    ["dragenter", "dragover", "drop"].forEach(eventName => {
      document.addEventListener(
        eventName,
        e => {
          this.preventDefaults(e);
        },
        false
      );
    });
    ["dragenter", "dragover"].forEach(eventName => {
      document.addEventListener(
        eventName,
        () => {
          this.highlight();
        },
        false
      );
    });
    ["drop"].forEach(eventName => {
      document.addEventListener(
        eventName,
        () => {
          console.log(eventName);
          this.unhighlight();
        },
        false
      );
    });
    this.dropArea.addEventListener(
      "drop",
      e => {
        this.handleDrop(e);
      },
      false
    );
  }

  render() {
    const { id, title, accept, imageUrl } = this.props;
    return (
      <div className="drop-area-wrap">
        <div className="drop-area">
          <div className="content">
            <img src={imageUrl} alt="" />
            <span>{title}</span>
          </div>
          <input
            id={id}
            value={""}
            multiple
            onChange={e => this.onUpload(e)}
            accept={accept}
            className={"photos-upload-input"}
            type="file"
          />
        </div>
      </div>
    );
  }
}

export default DropArea;
