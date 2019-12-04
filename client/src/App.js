import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";

function ConnectionStatus({ connected }) {
  const value = connected ? "connected" : "disconnected";
  return <div>Connection Status: {value}</div>;
}

function TableNumber({
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
      table number:
      <input type="number" value={tableNumber} onChange={tableNumberChanged} />
      <button onClick={sendTableNumber}>Anmelden</button>
    </div>
  );
}

function Message({ connected, message, sendMessage, messageChanged }) {
  if (!connected) {
    return null;
  }

  return (
    <form className="submit" onSubmit={sendMessage}>
      Message
      <input
        type="text"
        value={message}
        placeholder="Type here"
        onChange={messageChanged}
      />
      <button type="submit">Senden</button>
    </form>
  );
}

function App() {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [tableNumber, setTableNumber] = useState(1);
  const [message, setMessage] = useState("");

  const sendTableNumber = event => {
    event.preventDefault();
    if (tableNumber >= 1) {
      socket.emit("add-device", { tableNumber });
    }
  };

  const handleTableNumberChange = event => {
    setTableNumber(event.target.value);
  };

  const sendMessage = event => {
    event.preventDefault();
    socket.emit("new-message", message);
  };

  const handleMessageChange = event => {
    setMessage(event.target.value);
  };

  if (!socket) {
    const connection = io("http://localhost:4000");
    connection.on("login", data => {
      console.log(data.deviceNumber);
      setConnected(true);
    });
    connection.on("login-error", data => {
      const { tableNumber } = data;
      alert(`a device with the table number ${tableNumber} is connected`);
    });
    setSocket(connection);
  }

  return (
    <div>
      <h1>TTRace</h1>
      <ConnectionStatus connected={connected} />
      <TableNumber
        connected={connected}
        tableNumber={tableNumber}
        sendTableNumber={sendTableNumber}
        tableNumberChanged={handleTableNumberChange}
      />
      <Message
        connected={connected}
        message={message}
        sendMessage={sendMessage}
        messageChanged={handleMessageChange}
      />
    </div>
  );
}

export default App;
