import React, { Component } from "react";
import { withApiService } from "../hoc";
import "./modal-create-album-form.css";
class ModalCreateAlbumForm extends Component {
  state = {
    title: "",
    description: "",
    titleOk: true,
    formClosed: false
  };
  onSubmit = e => {
    e.preventDefault();
    const { title, description } = this.state;
    const { onCloseModal, onUpdateAlbum } = this.props;
    if (title.trim()) {
      this.setState({ formClosed: true });
      this.props.createAlbum({ albumName: title, description }).then(() => {
        onUpdateAlbum();
        onCloseModal();
        this.setState({
          title: ""
        });
      });
    } else
      this.setState({ titleOk: false }, () => {
        setTimeout(() => {
          this.setState({ titleOk: true });
        }, 700);
      });
  };

  onChange(e, type) {
    this.setState({
      [type]: e.target.value
    });
  }
  render() {
    const { title, description, titleOk, formClosed } = this.state;
    return (
      <form className={"form"} onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id={"title"}
            className={`form-control ${titleOk ? "" : "is-invalid"}`}
            onChange={e => this.onChange(e, "title")}
            value={title}
            type={"text"}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            rows={4}
            id={"description"}
            className={`form-control`}
            onChange={e => this.onChange(e, "description")}
            value={description}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <button
            className={"ok-btn"}
            type={"submit"}
            data-dismiss={`${formClosed ? "modal" : ""}`}
          >
            Create album
          </button>
          <button className={"cancel-btn"} onClick={this.props.onCloseModal}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

const mapMethodToProps = service => {
  return {
    createAlbum: service.createAlbum
  };
};
export default withApiService(mapMethodToProps)(ModalCreateAlbumForm);
