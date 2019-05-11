import React, { Component } from "react";

const ConfirmingForm = ({ onConfirm, body, confirmText, onCloseModal }) => {
  return (
    <div>
      {body}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <button
          onClick={() => {
            onConfirm();
            onCloseModal();
          }}
          className={"ok-btn"}
          type={"submit"}
        >
          {confirmText}
        </button>
        <button className={"cancel-btn"} onClick={onCloseModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmingForm;
