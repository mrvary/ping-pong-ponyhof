const io = require('socket.io');
const { clientChannels } = require('../client/src/shared/client-channels');

const { createMatches } = require('../src/matchmaker/match');

const MAX_AMOUNT_TABLE = 4;
const ALL_POTENTIAL_TABLES = range(1, MAX_AMOUNT_TABLE);

let serverSocket = null;
let connectedClients = new Map();
let matchTableMap = null;

let matchStarted = false;

function setupSocketIO(server) {
  // open server socket
  serverSocket = io(server);

  // event fired every time a new client connects (Browser window was opened)
  serverSocket.on(clientChannels.CONNECTION, clientSocket => {
    console.info(`Client connected [id=${clientSocket.id}]`);

    // send current server state to clients
    clientSocket.emit(clientChannels.AVAILABLE_TABLES, availableTables());

    // event fired every time a client sends a table number
    clientSocket.on(clientChannels.LOGIN_TABLE, data => {
      clientLogin(clientSocket, data);
    });

    // event fired when a start round is triggered
    clientSocket.on(clientChannels.GET_MATCH, data => {
      sendMatchToClient(clientSocket, data);
    });

    // event fired when a client disconnects, remove it from the list
    clientSocket.on(clientChannels.DISCONNECT, data => {
      clientLogout(clientSocket);
    });
  });
}

function sendStartRoundBroadcast() {
  if (matchStarted) return;

  matchStarted = true;
  sendBroadcast(clientChannels.START_ROUND, null);
}

function clientLogin(clientSocket, data) {
  const { tableNumber } = data;

  // verify if max amount of connected devices/table is reached
  if (connectedClients.size === MAX_AMOUNT_TABLE) {
    clientSocket.emit(clientChannels.LOGIN_ERROR, data);
    return;
  }

  // verify if a client is already connected to a table
  if (mapHasValue(connectedClients, tableNumber)) {
    clientSocket.emit(clientChannels.LOGIN_ERROR, data);
    return;
  }

  // login client
  connectedClients.set(clientSocket.id, tableNumber);
  console.info(`Client login [id=${clientSocket.id}] [table=${tableNumber}]`);

  // send current server state to clients
  sendBroadcast(clientChannels.AVAILABLE_TABLES, availableTables());

  // send data to client
  clientSocket.emit(clientChannels.LOGIN_TABLE, {
    tableNumber: tableNumber,
    matchStarted: matchStarted
  });
}

function clientLogout(clientSocket) {
  if (connectedClients.has(clientSocket.id)) {
    connectedClients.delete(clientSocket.id);
    console.info(`Client logout [id=${clientSocket.id}]`);

    sendBroadcast(clientChannels.AVAILABLE_TABLES, availableTables());
  }
  console.log(`Client gone [id=${clientSocket.id}]`);
}

function scrubleMatches(players) {
  const matches = createDummyMatches(players);
  
  // map matches to tables
  matchTableMap = new Map();
  matchTableMap.set(1, matches[0]);
  matchTableMap.set(2, matches[1]);
  matchTableMap.set(3, matches[2]);
}

function createDummyMatches(players) {
  const pairings = [
    { player1: players[0], player2: players[1] },
    { player1: players[2], player2: players[3] },
    { player1: players[4], player2: players[5] },
    { player1: players[6], player2: players[7] }
  ];

  // use imported players without matchmaker
  return createMatches(pairings);
}

function sendMatchToClient(clientSocket, data) {
  const { tableNumber } = data;

  const match = matchTableMap.get(tableNumber);

  /*const match = {
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
  };*/

  clientSocket.emit(clientChannels.SEND_MATCH, { match });
}

function availableTables() {
  const takenTables = Array.from(connectedClients.values()).map(x =>
    parseInt(x, 10)
  );
  const availableTables = ALL_POTENTIAL_TABLES.filter(
    key => !takenTables.includes(key)
  );
  return availableTables;
}

// this method is used to submit a broadcast event to all clients
function sendBroadcast(eventName, data) {
  if (serverSocket) {
    serverSocket.sockets.emit(eventName, data);
    console.log(`server emit broadcast: ${eventName}`);
    console.log(`--- data was ${data}`);
  }
}

function mapHasValue(inputMap, searchedValue) {
  const values = Array.from(inputMap.entries());
  return values.some(([_, value]) => value === searchedValue);
}

function range(start, exclusiveEnd) {
  return [...Array(exclusiveEnd).keys()].slice(start);
}

module.exports = {
  setupSocketIO,
  scrubleMatches,
  sendStartRoundBroadcast
};
