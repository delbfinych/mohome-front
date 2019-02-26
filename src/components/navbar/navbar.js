import React from 'react';
import {Link} from 'react-router-dom';
import  LeftNavBar from './left-navbar';
import  RightNavBar from './right-navbar';
import'./navbar.css';


const NavBar = () => {
    return (
        <nav className="navbar navbar-dark navbar-expand-md bg-primary justify-content-between">
            <div className="container">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <LeftNavBar/>

                <Link to="/" className="mx-auto d-block text-center order-0 order-md-1 w-25">
                    <img src="/temp_content/brand.png" className="logo" alt="Mo home"/>
                </Link>

                <RightNavBar/>
            </div>
        </nav>
    );
};

export default NavBar