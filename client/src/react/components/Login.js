import React from 'react';
import './Login.css';

function Login({
  connected,
  tableNumber,
  sendTableNumber,
  tableNumberChanged
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
        <label for="login-input-field" className="login-text">
          Tischnummer
        </label>
        <break />
        <input
          className="login-input"
          name="login-input-field"
          type="number"
          min="0"
          list="table-numbers"
          value={tableNumber}
          onChange={tableNumberChanged}
        />
        <button className="login-button" onClick={sendTableNumber}>
          OK
        </button>
      </form>
    </div>
  );
}

export default Login;
