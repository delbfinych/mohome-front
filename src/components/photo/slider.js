import React, { Component } from "react";
import PhotoEditor from "./photo-editor";
import { withApiService } from "../hoc";
import { ConfirmingForm } from "../forms";
import Modal from "../modal";
import Spinner from "../spinner";
import { Idle } from "../../utils";

import "./slider.css";

class Slider extends Component {
  state = {
    photos: [],
    currentItem: {},
    currentIndex: 0,
    currentName: "",
    isLoading: false,
    albumId: null,
    isIdle: false
  };

  componentDidMount() {
    const { currentName, index, albumId } = this.props.location.state;
    this.setState(
      {
        currentIndex: index,
        currentName,
        albumId
      },
      async () => {
        await this.props
          .getPhotosByAlbumId(albumId)
          .then(res => {
            this.setState({
              photoCount: res.data.response.length,
              photos: res.data.response
            });
          })
          .catch(err => console.log(err));
        this._updateSlide();
      }
    );
    this.idle = new Idle(
      2,
      () => this.setState({ isIdle: true }),
      () => this.setState({ isIdle: false })
    );
    window.addEventListener("keyup", this.handleArrowClick);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleArrowClick);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { photos, currentName, index } = this.props.location.state;
    if (currentName !== prevProps.location.state.currentName) {
      this.setState(() => {
        return {
          photos,
          currentIndex: index,
          currentName
        };
      }, this._updateSlide);
    }
  }

  _updateSlide = () => {
    const { getPhoto } = this.props;
    const { currentName } = this.state;
    this.setState({ isLoading: true });
    getPhoto(currentName)
      .then(res => {
        this.setState({
          currentItem: res.data.response,
          isAllowedClick: true
        });
      })
      .catch(err => console.log(err))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleArrowClick = e => {
    if (e.which === 37) this.goToPrevSlide();
    else if (e.which === 39) this.goToNextSlide();
  };

  goToPrevSlide = () => {
    if (this.state.isAllowedClick) {
      const { currentIndex, photos } = this.state;
      let newIndex = currentIndex;

      if (currentIndex === 0) newIndex = photos.length - 1;
      else newIndex--;
      this.setState(() => {
        return { isAllowedClick: false };
      });
      this.props.history.replace(`${photos[newIndex].name}`, {
        modal: true,
        photos,
        index: newIndex,
        currentName: photos[newIndex].name
      });
    }
  };

  goToNextSlide = () => {
    if (this.state.isAllowedClick) {
      const { currentIndex, photos } = this.state;
      let newIndex = currentIndex;

      if (currentIndex === photos.length - 1) newIndex = 0;
      else newIndex++;

      this.setState(() => {
        return { isAllowedClick: false };
      });
      this.props.history.replace(`${photos[newIndex].name}`, {
        modal: true,
        photos,
        index: newIndex,
        currentName: photos[newIndex].name
      });
    }
  };

  onPhotoDelete = name => {
    const { deletePhoto, history } = this.props;
    deletePhoto(name)
      .then(() => {
        history.goBack();
      })
      .catch(err => console.log(err));
  };

  render() {
    const { history } = this.props;
    const {
      currentIndex,
      photos,
      currentItem,
      isLoading,
      isAllowedClick,
      currentName,
      isIdle
    } = this.state;
    console.log(currentItem);
    const description = currentItem.description || "";
    const created = currentItem ? currentItem.created : null;
    const name = photos.length ? photos[currentIndex].name : null;
    const idleClassName = isIdle ? "idle" : "";
    return (
      <div className={`slider-wrapper ${isIdle ? "nocursor" : ""}`}>
        <div onClick={history.goBack} className="slider-overlay" />
        <div
          className={`slider-arrow slider-arrow__left ${idleClassName}`}
          onClick={() => this.goToPrevSlide()}
        >
          <i className="zmdi zmdi-chevron-left" />
        </div>
        <div
          className={`slider-arrow slider-arrow__right ${idleClassName}`}
          onClick={this.goToNextSlide}
        >
          <i className="zmdi zmdi-chevron-right" />
        </div>
        <button
          className={`slider-close  ${idleClassName}`}
          onClick={history.goBack}
        >
          <i className={"zmdi zmdi-close"} />
        </button>
        {isLoading ? (
          <Spinner className={"slider"} />
        ) : (
          <img
            className={"slider"}
            src={
              currentItem
                ? `data:${currentItem.imageType};base64,${currentItem.image}`
                : null
            }
            alt=""
          />
        )}

        {isAllowedClick && (
          <div className={`slider-photo-description  ${idleClassName}`}>
            <PhotoEditor
              className={"slide-edit-input"}
              photoName={name}
              description={description}
            />
          </div>
        )}

        {created ? (
          <div className={`slider-photo-created  ${idleClassName}`}>
            {beautifyDate(created)}
          </div>
        ) : null}
        <div
          className={`slider-photo-countOfPhoto  ${idleClassName}`}
        >{`Photo ${currentIndex + 1} of ${photos.length}`}</div>
        <div className="dropdown">
          <button
            type="button"
            className={`dropdown-slider-btn  ${idleClassName}`}
          >
            <i className="zmdi zmdi-more-vert" />
          </button>
          <div className="dropdown-slider-content">
            <Modal title={"Delete photo"}>
              <div className="slider-photo-delete dropdown-item">Delete</div>
              <ConfirmingForm
                body={<p>Are you sure you want to delete this photo?</p>}
                confirmText={"Delete photo"}
                onConfirm={() => this.onPhotoDelete(name)}
              />
            </Modal>
            <a
              href={`data:${currentItem.imageType};base64,${currentItem.image}`}
              download={currentName}
            >
              <div className={"dropdown-item"}>Save as...</div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

function beautifyDate(date) {
  const d = new Date(date);
  return `${d.toLocaleDateString()} at ${d.toLocaleTimeString()}`;
}
const mapMethodToProps = service => {
  return {
    getPhoto: service.getPhoto,
    deletePhoto: service.deletePhoto,
    getPhotosByAlbumId: service.getPhotosByAlbumId
  };
};

export default withApiService(mapMethodToProps)(Slider);
