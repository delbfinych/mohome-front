import React, { Component } from "react";
import "./video.css";
import NotAvailable from "../_temp-not-available-page";

export default class Video extends Component {
  render() {
    return (
      <div className="main-container container bg-white">
        <NotAvailable />
      </div>
    );
  }
}
