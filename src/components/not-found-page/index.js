import React from "react";

const NotFoundPage = ({ history }) => {
  return <div>not found: {history.location.pathname}</div>;
};

export default NotFoundPage;
