import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import routes from '../../routes';

const PrivateRoute = props => {
  return Cookies.get('id_token') ? (
    <Route {...props} />
  ) : (
    <Redirect to={routes.signIn.path} />
  );
};

export default PrivateRoute;
