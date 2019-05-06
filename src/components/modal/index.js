import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "./modal.css";
class ModalComponent extends Component {
  state = {
    show: false
  };
  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    const { children, title } = this.props;
    const trigger = React.cloneElement(children[0], {
      onClick: this.handleShow
    });
    const body = React.cloneElement(children[1], {
      onCloseModal: this.handleClose
    });
    return (
      <React.Fragment>
        {trigger}
        <Modal centered show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
            <div onClick={this.handleClose} className="modal-close">
              <i className="zmdi zmdi-close" />
            </div>
          </Modal.Header>
          <Modal.Body>{body}</Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ModalComponent;
