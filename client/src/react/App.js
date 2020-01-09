import React, { useState } from 'react';
import './App.css';

// import shared
import io from 'socket.io-client';
import { clientChannels } from '../shared/client-channels';

// import routing components
import Login from './pages/Login/Login';
import WaitForRound from './pages/WaitForRound/WaitForRound';
import Match from './pages/Match';

const appTitle = 'TTRace';

// for development: the requested server is the webserver
//                  from the electron app and not the
//                  development server of the react app
// for production:  the requested server is the one and only
const isDev = true;
const getServerURL = () => {
  let url = isDev ? 'localhost:4000' : document.location.host;
  console.log('Requested server: ', url);
  return url;
};

function App() {
  const [socket, setSocket] = useState(null);
  const [page, setPage] = useState('login');
  const [isConnected, setIsConnected] = useState(false);

  const [availableTables, setAvailableTables] = useState([]);
  const [tableNumber, setTableNumber] = useState(0);
  const [match, setMatch] = useState({
    id: 0,
    player1: {
      id: 'PLAYER20',
      firstname: 'Achim',
      lastname: 'Amthor',
      clubname: 'SC Baldham-Vaterstetten',
      gamesWon: 5,
      matchIds: [0],
      qttr: 1351,
      active: true,
      hasFreeTicket: false
    },
    player2: {
      id: 'PLAYER3',
      firstname: 'Ulrich',
      lastname: 'Dietzel',
      clubname: 'TTC Friedberg',
      gamesWon: 1,
      matchIds: [0],
      qttr: 1111,
      active: true,
      hasFreeTicket: false
    },
    sets: [
      { player1: 11, player2: 8 },
      { player1: 8, player2: 11 },
      { player1: 10, player2: 12 },
      { player1: 15, player2: 13 },
      { player1: 4, player2: 11 }
    ],
    freeTicket: false
  });

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
      return <Match appTitle={appTitle} isConnected={isConnected} match={match} />;
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

  if (!socket) {
    const base_url = getServerURL();
    const connection = io(base_url);

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
};

export default App;
