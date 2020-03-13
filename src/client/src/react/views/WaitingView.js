/**
 * @author Felix Breitenbach
 */
import React from "react";
import "./WaitingView.css";

function WaitingView({ message }) {
  return (
    <>
      <p className="waiting-view__message">{message}</p>
      <div className="waiting-view__ball-container">
        <div className="waiting-view__ball"></div>
        <div className="waiting-view__shadow"></div>
      </div>
    </>
  );
}

export default WaitingView;
