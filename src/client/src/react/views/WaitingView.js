import React from "react";
import "./WaitingView.css";

function WaitingView(props) {
  return (
    <>
      <div className="ball-container">
        <div className="ball"></div>
        <div className="shadow"></div>
      </div>
    </>
  );
}

export default WaitingView;
