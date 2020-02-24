import React from "react";
import "./Button.css";

function Button({ text, onClick, mode, disableProp }) {

  const css =
    "button " + (mode === "primary" ? "button--primary" : "button--secondary");

  return (
    <button className={css} onClick={onClick} disabled={disableProp}>
      {text}
    </button>
  );
}
export default Button;
