import React from "react";
import ReactDOM from "react-dom";
import { ThroughProvider } from "react-through";
import App from "./components/app";

import { ApiServiceProvider } from "./components/api-service-context";
import { MohomeApiService } from "./services";
import { BrowserRouter as Router } from "react-router-dom";
const apiService = new MohomeApiService();

ReactDOM.render(
  <ApiServiceProvider value={apiService}>
    <Router>
      <ThroughProvider>
        <App />
      </ThroughProvider>
    </Router>
  </ApiServiceProvider>,
  document.getElementById("root")
);
