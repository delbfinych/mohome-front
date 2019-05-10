import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./slider.css";

class Slider extends Component {
  state = {
    photos: [],
    currentItem: [],
    currentIndex: 0
  };
  componentDidMount() {
    console.log("as");
    const { photos, currentItem, index } = this.props.location.state;
    console.log(photos);
    this.setState({
      photos,
      currentIndex: index,
      currentItem: currentItem
    });
    window.addEventListener("keyup", this.handleArrowClick);
  }
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleArrowClick);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { photos, currentItem, index } = this.props.location.state;
    if (currentItem.name !== prevState.currentItem.name) {
      this.setState({
        photos,
        currentIndex: index,
        currentItem: currentItem,
        isAllowClick: true
      });
    }
  }

  handleArrowClick = e => {
    if (this.state.isAllowClick) {
      if (e.which === 37) this.goToPrevSlide();
      else if (e.which === 39) this.goToNextSlide();
    }
  };

  goToPrevSlide = () => {
    const { currentIndex, photos } = this.state;
    console.log(currentIndex);
    let newIndex = currentIndex;

    if (currentIndex === 0) newIndex = photos.length - 1;
    else newIndex--;
    this.setState({ isAllowClick: false });
    this.props.history.replace(`${photos[newIndex].name}`, {
      modal: true,
      photos,
      index: newIndex,
      currentItem: photos[newIndex]
    });
  };
  goToNextSlide = () => {
    const { currentIndex, photos } = this.state;
    let newIndex = currentIndex;

    if (currentIndex === photos.length - 1) newIndex = 0;
    else newIndex++;
    console.log(newIndex);
    this.setState({ isAllowClick: false });
    this.props.history.replace(`${photos[newIndex].name}`, {
      modal: true,
      photos,
      index: newIndex,
      currentItem: photos[newIndex]
    });
  };
  render() {
    const { history, location } = this.props;
    const { currentIndex, photos } = this.state;
    const { isLoading } = this.state;
    const style = {
      background: `url(${
        photos[currentIndex] ? photos[currentIndex].image : null
      })`
    };
    return (
      <div className={"slider-wrapper"}>
        <div onClick={history.goBack} className="slider-overlay " />
        <div
          className="slider-arrow slider-arrow__left"
          onClick={() => this.goToPrevSlide()}
        >
          <i className="zmdi zmdi-chevron-left" />
        </div>
        <div
          className="slider-arrow slider-arrow__right"
          onClick={this.goToNextSlide}
        >
          <i className="zmdi zmdi-chevron-right" />
        </div>
        <button className={"slider-close"} onClick={history.goBack}>
          <i className={"zmdi zmdi-close"} />
        </button>

        <img
          className={"slider"}
          src={photos[currentIndex] ? photos[currentIndex].image : null}
          alt=""
        />
      </div>
    );
  }
}

export default Slider;
