import React from "react";

const NotFoundPage = ({ history }) => {
  return <div>
    <div>404</div>
    <div>not found: {history.location.pathname}</div>
  </div>;
};

export default NotFoundPage;
