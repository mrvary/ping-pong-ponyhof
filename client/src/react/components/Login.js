import React from "react";

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
    <div>
      Tischnummer eingeben:
      <input type="number" value={tableNumber} onChange={tableNumberChanged} />
      <button onClick={sendTableNumber}>OK</button>
    </div>
  );
}

export default Login;
