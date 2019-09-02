import React, { Component } from "react";
import { withApiService } from "../hoc";

class PhotoEditor extends Component {
  state = {
    description: "",
    isFocused: false
  };

  componentDidMount() {
    const { description } = this.props;
    if (description)
      this.setState({ description });
  }

  componentDidUpdate(prevProps) {
    const { description } = this.props;
    if (description != prevProps.description) this.setState({ description });
  }

  onChange = e => {
    e.preventDefault();
    if (e.target.value.length > 100) return;
    this.setState({ description: e.target.value });
    const { changePhotoDescription, photoName } = this.props;
    changePhotoDescription(photoName, { description: e.target.value })
      .then(res => {
        this.forceUpdate();
      })
      .catch(err => console.log(err.response));
  };

  render() {
    const { description, isFocused } = this.state;

    return (
      <React.Fragment>
        <input
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={() => this.setState({ isFocused: false })}
          className={this.props.className}
          onChange={this.onChange}
          type="text"
          value={description}
          placeholder={"Add a description..."}
          size={description.length}
        />
        {isFocused ? (
          <div
            style={{ textAlign: "center" }}
          >{`${description.length} of 100 symbols`}</div>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapMethodToProps = service => {
  return {
    changePhotoDescription: service.changePhotoDescription
  };
};

export default withApiService(mapMethodToProps)(PhotoEditor);
