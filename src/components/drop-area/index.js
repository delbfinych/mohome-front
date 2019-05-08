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
      this.props.onUpload(files);
      this.forceUpdate();
    }
  };
  preventDefaults = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  onUpload = e => {
    const files = e.target.files;
    if (files.length) {
      this.props.onUpload(files);
      this.forceUpdate();
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
    const { id, title, accept, onUpload } = this.props;
    return (
      <div className="drop-area-wrap">
        <div className="drop-area">
          <span>{title}</span>
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
