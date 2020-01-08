import React from "react";
import "./Button.css";

function Button({ text, onClick, mode }) {
    const css =
      "start-competition-button " +
      (mode === "primary"
        ? "start-competition-button--primary"
        : "start-competition-button--secondary");
  
    return (
      <button className={css} onClick={onClick}>
        {text}
      </button>
    );
}
export default Button;