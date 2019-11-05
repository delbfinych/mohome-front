import React, { Component } from "react";
import ProcessingSpinner from "./_temp-processing-spinner";

export default class Home extends Component {
  render() {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        flexDirection: "column"
    }}>
        <div>This section is not available.</div>
        <div>We are working on it.</div>
        <ProcessingSpinner />
      </div>
    );
  }
}
