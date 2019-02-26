import React from 'react';


const RightNavBar = () => {
    return (
        <div className="navbar-collapse collapse dual-nav w-50 order-2">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item active mr-3">
                    <div className="left-inner-addon">
                        <i className="zmdi zmdi-search zmdi-hc-lg"></i>
                        <input type="text" className="form-control-sm" placeholder="Search"/>
                    </div>
                </li>
                <li className="nav-item">
                    <div className="profile nav-link">
                        <div className="profile-img rounded-circle mr-2"></div>
                        <i className="zmdi zmdi-chevron-down zmdi-hc-lg"> </i>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default RightNavBar;