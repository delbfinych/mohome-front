import React, { Component } from 'react';
import './home.css';
import NotAvailable from '../../components/_temp-not-available-section';
export default class Home extends Component {
  render() {
    return (
      <div className="centered main-container container bg-white">
        <NotAvailable />
      </div>
    );
  }
}
