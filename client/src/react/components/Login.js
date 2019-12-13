import React from 'react';
import './Login.css';

function Login({
  connected,
  tableNumber,
  sendTableNumber,
  tableNumberChanged,
  availableTables
}) {
  if (connected) {
    return null;
  }

  return (
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
  );
}

export default Login;
