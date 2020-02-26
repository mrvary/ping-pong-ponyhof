import React from "react";
import "./Login.css";

import ConnectionStatus from "../components/ConnectionStatus/ConnectionStatus";
import Title from "../components/Title";

function Login({
  appTitle,
  isConnected,
  tableNumber,
  sendTableNumber,
  tableNumberChanged,
  availableTables
}) {
  return (
    <div>
      <Title title={appTitle} />
      <ConnectionStatus isConnected={isConnected} />
      <div className="login">
        <form className="login-form">
          <datalist id="table-numbers">
            <option value="0" />
            <option value="1" />
            <option value="2" />
            <option value="3" />
            <option value="4" />
          </datalist>
          <label htmlFor="login-input-field" className="login-text">
            Tischnummer
          </label>
          <select
            className="login-select"
            onChange={tableNumberChanged}
            value={tableNumber}
          >
            {availableTables.map(n => {
              const number = parseInt(n, 10);
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
    </div>
  );
}

export default Login;
