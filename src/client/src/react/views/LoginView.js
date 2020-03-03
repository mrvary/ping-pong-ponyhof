import React, { useState, useEffect } from "react";
import "./LoginView.css";

function LoginView({ sendTableNumber, availableTables }) {
  const [tableNumber, setTableNumber] = useState(-1);

  useEffect(() => {
    const numberNotSetYet = tableNumber < 1;
    const numberNotAvailable = !availableTables.find(
      number => number === tableNumber
    );

    if (numberNotSetYet || numberNotAvailable) {
      // pick first available number
      setTableNumber(availableTables[0]);
    }
  }, [availableTables, tableNumber]);

  return (
    <>
      <div className="login">
        <form className="login-form">
          <label htmlFor="login-input-field" className="login-text">
            Tischnummer
          </label>
          <select
            className="login-select"
            onChange={event => setTableNumber(Number(event.target.value))}
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
          <button
            className="login-button"
            onClick={sendTableNumber(tableNumber)}
          >
            OK
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginView;
