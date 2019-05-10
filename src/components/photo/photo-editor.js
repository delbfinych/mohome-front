import React, { Component } from "react";
import { withApiService } from "../hoc";

class PhotoEditor extends Component {
  state = {
    description: ""
  };
  onChange = e => {
    e.preventDefault();
    this.setState({ description: e.target.value });
    const { changePhotoDescription, photoName } = this.props;
    const { description } = this.state;
    changePhotoDescription({ photoName, description })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <input
        onChange={this.onChange}
        type="text"
        value={this.state.description}
        placeholder={"description"}
      />
    );
  }
}

const mapMethodToProps = service => {
  return {
    changePhotoDescription: service.changePhotoDescription
  };
};

export default withApiService(mapMethodToProps)(PhotoEditor);
