import React from "react";
import { Dropdown } from "react-bootstrap";
import Cookies from "js-cookie";

const RightNavBar = () => {
  const token = Cookies.get("id_token");
  let payload = token.split(".")[1];
  let username = JSON.parse(atob(payload));
  return (
    <div className="navbar-collapse collapse dual-nav w-50 order-2">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active mr-3">
          <div className="left-inner-addon">
            <i className="zmdi zmdi-search zmdi-hc-lg" />
            <input
              type="text"
              className="form-control-sm"
              placeholder="Search"
            />
          </div>
        </li>
        <Dropdown>
          <Dropdown.Toggle
            className={"drop-down-toggle"}
            variant="success"
            id="dropdown-basic"
          >
            {username.Name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>My profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Help</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item as={"button"} onClick={() => window.logout()}>
              Log out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/*<li className="nav-item">*/}
        {/*    <div className="profile nav-link">*/}
        {/*        <div className="profile-img rounded-circle mr-2"></div>*/}
        {/*        <i className="zmdi zmdi-chevron-down zmdi-hc-lg"> </i>*/}
        {/*    </div>*/}
        {/*</li>*/}
      </ul>
    </div>
  );
};

export default RightNavBar;
