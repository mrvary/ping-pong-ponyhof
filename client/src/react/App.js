import React, { useState } from 'react';
import './App.css';

// import shared
import io from 'socket.io-client';
import { clientChannels } from '../shared/client-channels';

// import components
import Login from './components/Login';
import ConnectionStatus from './components/ConnectionStatus';
import WaitForRound from './components/WaitForRound';

// temporarily inside here
function Message({ message, sendMessage, messageChanged }) {
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
  const BASE_URL = 'http://localhost:4000';

  const [socket, setSocket] = useState(null);
  const [page, setPage] = useState('login');
  const [isConnected, setIsConnected] = useState(false);

  const [availableTables, setAvailableTables] = useState([]);
  const [tableNumber, setTableNumber] = useState(1);
  const [message, setMessage] = useState('');

  const toPage = page => {
    setPage(page);
  };

  const content = () => {
    if (page === 'login') {
      return (
        <Login
          availableTables={availableTables}
          tableNumber={tableNumber}
          sendTableNumber={sendTableNumber}
          tableNumberChanged={handleTableNumberChange}
        />
      );
    } else if (page === 'wait') {
      return <WaitForRound />;
    } else if (page === 'match') {
      return (
        <Message
          message={message}
          sendMessage={sendMessage}
          messageChanged={handleMessageChange}
        />
      );
    }
  };

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
  };

  const handleMessageChange = event => {
    setMessage(event.target.value);
  };

  if (!socket) {
    const connection = io(BASE_URL);

    connection.on(clientChannels.AVAILABLE_TABLES, tables => {
      console.log(tables);

      setAvailableTables(tables);
      setTableNumber(tables[0]);
    });

    connection.on(clientChannels.LOGIN_TABLE, data => {
      const { tableNumber, matchStarted } = data;
      console.log(data);
      setIsConnected(true);

      console.log('matchStart ->', matchStarted);
      if (matchStarted) {
        toPage('match');
      } else {
        toPage('wait');
      }

      connection.on(clientChannels.START_ROUND, () => {
        toPage('match');
      });
    });

    connection.on(clientChannels.LOGIN_ERROR, data => {
      const { tableNumber } = data;
      alert(
        `A device is already connected with the table ${tableNumber} or all slots are busy`
      );
    });

    setSocket(connection);
  }

  return (
    <div className="client-container">
      <h1>TTRace</h1>
      <ConnectionStatus isConnected={isConnected} />
      {content()}
    </div>
  );
}

export default App;
