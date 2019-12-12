import React, { useState } from "react";
import "./App.css";

// import shared
import io from "socket.io-client";
import { clientChannels } from "../shared/client-channels";

// import components
import Login from "./components/Login";
import ConnectionStatus from "./components/ConnectionStatus";
import WaitForRound from "./components/WaitForRound";

// temporarily inside here
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
  const BASE_URL = "http://localhost:4000";

  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [matchStarted, setMatchStarted] = useState(false);
  const [tableNumber, setTableNumber] = useState(1);
  const [message, setMessage] = useState("");

  const sendTableNumber = event => {
    event.preventDefault();
    if (tableNumber >= 1) {
      socket.emit(clientChannels.LOGIN_TABLE, { tableNumber });
    }
  };

  const handleTableNumberChange = event => {
    setTableNumber(event.target.value);
  };

  const sendMessage = event => {
    event.preventDefault();
    socket.emit(clientChannels.SEND_MESSAGE, message);
    setMessage('');
    setMatchStarted(false)
  };

  const handleMessageChange = event => {
    setMessage(event.target.value);
  };

  if (!socket) {
    const connection = io(BASE_URL);

    connection.on(clientChannels.LOGIN_TABLE, data => {
      console.log(data.deviceNumber);
      setConnected(true);

      connection.on(clientChannels.START_ROUND, data => {
        setMatchStarted(true);
      })
    });

    connection.on(clientChannels.LOGIN_ERROR, data => {
      const { tableNumber } = data;
      alert(`A device is already connected with the table ${tableNumber} or all slots are busy`);
    });

    setSocket(connection);
  }

  return (
    <div className="client-container">
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
