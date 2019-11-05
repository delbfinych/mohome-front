import React from "react";
import "./style.css";

const ProcessingSpinner = ({ className = "" }) => {
  return (
    <div className="lds-css ng-scope">
      <div className="lds-gear" style={{ width: "100%", height: "100%" }}>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingSpinner;
