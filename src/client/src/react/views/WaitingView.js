import React from "react";
import "./WaitingView.css";

function WaitingView({ message }) {
  return (
    <>
      <p>{message}</p>
      <div className="ball-container">
        <div className="ball"></div>
        <div className="shadow"></div>
      </div>
    </>
  );
}

export default WaitingView;
