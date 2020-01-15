import React from "react";
import "./Button.css";

function Button({ text, onClick, mode }) {
    const css =
      "button " +
      (mode === "primary"
        ? "button--primary"
        : "button--secondary");
  
    return (
      <button className={css} onClick={onClick}>
        {text}
      </button>
    );
}
export default Button;