import React, { Component } from "react";
import "./home.css";
import NotAvailable from "../../components/_temp-not-available-section";
export default class Home extends Component {
  render() {
    const styles = {
      margin:"0 auto",
      fontSize:"2rem",
      textAlign:"center",
      marginBottom: "150px"
    }
    return (
      <div className="main-container container bg-white">
        <div style={styles}>Welcome to mohome!</div>
        <NotAvailable/>
      </div>
    );
  }
}
