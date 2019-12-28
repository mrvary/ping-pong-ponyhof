import React, { useState } from 'react';
import './App.css';

// import shared
import io from 'socket.io-client';
import { clientChannels } from '../shared/client-channels';

// import components
import Login from './components/Login';
import WaitForRound from './components/WaitForRound';
import Match from './components/Match';

function App() {
  const BASE_URL = 'http://localhost:4000';
  const appTitle = 'TTRace';

  const [socket, setSocket] = useState(null);
  const [page, setPage] = useState('match');
  const [isConnected, setIsConnected] = useState(false);

  const [availableTables, setAvailableTables] = useState([]);
  const [tableNumber, setTableNumber] = useState(0);
  const [message, setMessage] = useState('');

  const toPage = page => {
    setPage(page);
  };

  const content = () => {
    if (page === 'login') {
      return (
        <Login
          appTitle={appTitle}
          isConnected={isConnected}
          availableTables={availableTables}
          tableNumber={tableNumber}
          sendTableNumber={sendTableNumber}
          tableNumberChanged={handleTableNumberChange}
        />
      );
    } else if (page === 'wait') {
      return <WaitForRound appTitle={appTitle} isConnected={isConnected} />;
    } else if (page === 'match') {
      return (
        <Match
          appTitle={appTitle}
          isConnected={isConnected}
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
      matchStarted ? toPage('match') : toPage('wait');

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

  return <div className="client-container">{content()}</div>;
}

export default App;
