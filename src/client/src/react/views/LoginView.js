/**
 * @author Felix Breitenbach
 */
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
    <div className="login__form">
      <div className="login__circle-container">
        <div className="login__content">
          <label htmlFor="login__input-field" className="login__text">
            Tischnummer
          </label>
          <select className="login__select">
            onChange={event => setTableNumber(Number(event.target.value))}
            value={tableNumber}>
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
            className="login__button"
            onClick={sendTableNumber(tableNumber)}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
