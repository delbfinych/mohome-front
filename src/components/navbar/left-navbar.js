import React from 'react';
import {Link} from 'react-router-dom';

const LeftNavBar = () => {
    return (
        <div className="navbar-collapse collapse dual-nav w-50 order-1 order-md-0">
            <ul className="navbar-nav">
                <li className="nav-item active mr-2">
                    <Link className="nav-link pl-0 inline" to="#">
                        <i className="zmdi zmdi-home zmdi-hc-lg"></i> Home
                    </Link>
                </li>
                <li className="nav-item mr-2">
                    <Link className="nav-link" to="#">
                        <i className="zmdi zmdi-image zmdi-hc-lg"></i> Photo
                    </Link>
                </li>
                <li className="nav-item mr-2">
                    <Link className="nav-link" to="#">
                        <i className="zmdi zmdi-movie zmdi-hc-lg"></i> Video
                    </Link>
                </li>
                <li className="nav-item mr-2">
                    <Link className="nav-link" to="#">
                        <i className="zmdi zmdi-audio zmdi-hc-lg"></i> Music
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default LeftNavBar;