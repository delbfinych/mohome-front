import React, { Component } from 'react';
import NavBar from '../navbar';
import MainPage from '../main-page';
import './app.css';

class App extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <MainPage/>
            </div>
    );
    }
}

export default App;