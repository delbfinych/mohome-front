import React, { Component } from 'react';
import { Cogs } from '../../constants';
export default class Home extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '2rem',
          flexDirection: 'column',
        }}
      >
        <div style={{ color: '#5779b4' }}>This section is not available.</div>
        <div style={{ color: '#5779b4' }}>We are working on it.</div>
        <img style={{ width: '150px' }} src={Cogs} alt="" />
      </div>
    );
  }
}
