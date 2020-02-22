/**
 * @author Marco Goebel
 */

const http = require('http');
const app = require('./app');

// communication dependecies
const io = require('socket.io');
const { clientChannels } = require('../client/src/shared/client-channels');

// Matchmaker
const { mockedMatch } = require('../assets/mock-data/match.mock.data');

// Variables
const MAX_AMOUNT_TABLE = 4;
const ALL_POTENTIAL_TABLES = range(1, MAX_AMOUNT_TABLE);

let server = null;
let serverSocket = null;
let connectedClients = new Map();

let tableNumber = 1;
let matchTableMap = null;
let matchStarted = false;

function setupHTTPServer(port) {
  server = http.createServer(app);
  server.listen(port, () => {
    console.log(`Server: is running on port ${port}`);
  });
}

function shutdownServer() {
  if (server) {
    console.log("Server: gracefully shutting down...");
    server.kill();
    server = null;
  }
}

function setupSocketIO() {
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

// map matches to tables
function setMatchesToTables(matchesWithPlayers) {
  matchTableMap = new Map();

  console.log(`Map matches to tables`);
  tableNumber = 1;
  matchesWithPlayers.forEach(matchWithPlayers => {
    matchTableMap.set(++tableNumber, matchWithPlayers);
    console.log(`Table ${tableNumber} - ${matchWithPlayers.player1.name} VS. ${matchWithPlayers.player2.name}`)
  });
}

function getMatchTableMap() {
  return matchTableMap;
}


function sendMatchToClient(clientSocket, data) {
  const { tableNumber } = data;

  // use mocked match as default
  let match = mockedMatch;
  if (matchTableMap) {
    match = matchTableMap.get(tableNumber);
  }

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
  setupHTTPServer,
  shutdownServer,
  setupSocketIO,
  setMatchesToTables,
  sendStartRoundBroadcast,
  getMatchTableMap
};
