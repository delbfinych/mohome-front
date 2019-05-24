import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";

import { ApiServiceProvider } from "./components/api-service-context";
import { MohomeApiService } from "./services";
import { Route, BrowserRouter as Router } from "react-router-dom";
const apiService = new MohomeApiService();

ReactDOM.render(
  <ApiServiceProvider value={apiService}>
    <Router>
      <Route component={App} />
    </Router>
  </ApiServiceProvider>,
  document.getElementById("root")
);
