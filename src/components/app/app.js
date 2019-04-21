import React, { Component } from 'react';
import NavBar from '../navbar';
import Home from '../home';
import Photo from '../photo';
import Video from '../video';
import Music from '../music';
import './app.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <NavBar/>
                    <Route path="/" component={Home} exact />
                    <Route path="/photo" component={Photo}/>
                    <Route path="/video" component={Video}/>
                    <Route path="/music" component={Music}/>
                </div>
            </Router>
    );
    }
}
