import React, { useState } from "react";
import "./App.css";
import io from "socket.io-client";

import Login from "./components/Login";
import ConnectionStatus from "./components/ConnectionStatus";
import WaitForRound from "./components/WaitForRound";

function Message({ matchStarted, message, sendMessage, messageChanged }) {
  if (!matchStarted) {
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
  const [matchStarted, setMatchStarted] = useState(false);
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
    setMessage('');
    setMatchStarted(false)

    setTimeout(() => {
      setMatchStarted(true);
    }, 3000);
  };

  const handleMessageChange = event => {
    setMessage(event.target.value);
  };

  if (!socket) {
    const connection = io("http://localhost:4000");

    connection.on("login", data => {
      console.log(data.deviceNumber);
      setConnected(true);

      setTimeout(() => {
        setMatchStarted(true);
      }, 3000);
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
      <Login
        connected={connected}
        tableNumber={tableNumber}
        sendTableNumber={sendTableNumber}
        tableNumberChanged={handleTableNumberChange}
      />
      <WaitForRound connected={connected} matchStarted={matchStarted} />
      <Message
        matchStarted={matchStarted}
        message={message}
        sendMessage={sendMessage}
        messageChanged={handleMessageChange}
      />
    </div>
  );
}

export default App;
