import React from "react";
import "./LoginView.css";

function LoginView({
  tableNumber,
  sendTableNumber,
  tableNumberChanged,
  availableTables
}) {
  return (
    <>
      <div className="login">
        <form className="login-form">
          <label htmlFor="login-input-field" className="login-text">
            Tischnummer
          </label>
          <select
            className="login-select"
            onChange={tableNumberChanged}
            value={tableNumber}
          >
            {availableTables.map(table => {
              const number = parseInt(table, 10);
              return (
                <option key={number} value={number}>
                  {number}
                </option>
              );
            })}
          </select>
          <button className="login-button" onClick={sendTableNumber}>
            OK
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginView;
