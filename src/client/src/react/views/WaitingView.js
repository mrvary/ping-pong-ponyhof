import React from "react";
import "./WaitingView.css";

function WaitingView(props) {
  return (
    <div>
      <div className="ball-container">
        <div className="ball"></div>
        <div className="shadow"></div>
      </div>
    </div>
  );
}

export default WaitingView;
