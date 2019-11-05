import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = (props) => {
  return Cookies.get("id_token") ? (
    <Route {...props} />
  ) : (
    <Redirect to={"/sign-in"} />
  );
};

export default PrivateRoute;
