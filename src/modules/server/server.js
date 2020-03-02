/**
 * @author Marco Goebel
 */

const http = require("http");
const socketIO = require("socket.io");
const EventEmitter = require("events");

// server application
const expressApp = require("../server/app");
const socketIOMessages = require("../../client/src/shared/socketIOMessages");
const serverMessages = require("./serverMessages");

// models
const { COMPETITION_STATE } = require("../../shared/models/competition");

// constants
const MAX_AMOUNT_TABLE = 8;
const ALL_POTENTIAL_TABLES = range(1, MAX_AMOUNT_TABLE + 1);

const ServerMainIOConnection = new EventEmitter();

let server = null;
let serverSocket = null;

const connectedClients = new Map();

function initHTTPServer(port) {
  // create express server with react client application
  server = http.createServer(expressApp);

  // initialize socket io for client server communication
  initSocketIO();

  // start server
  server.listen(port, () => {
    console.log(`Server: is running on port ${port}`);
  });
}

function shutdownServer() {
  if (!server) {
    return;
  }

  console.log("Server: gracefully shutting down...");
  server.kill();
  server = null;
}

function initSocketIO() {
  // open server socket and init events for communication
  serverSocket = socketIO(server);

  // event fired every time a new client connects (Browser window was opened)
  serverSocket.on(socketIOMessages.CONNECTION, clientSocket => {
    console.info(`Client connected [id=${clientSocket.id}]`);

    sendBroadcast(socketIOMessages.AVAILABLE_TABLES, getAvailableTables());

    listenToClientEvent(clientSocket);
  });
}

// CLIENT -> SERVER COMMUNICATION

function listenToClientEvent(clientSocket) {
  // event fired every time a client sends a table number
  clientSocket.on(socketIOMessages.LOGIN_REQUEST, ({ tableNumber }) => {
    clientLogin(clientSocket, tableNumber);
  });

  // event fired when a client disconnects, remove it from the list
  clientSocket.on(socketIOMessages.DISCONNECT, () => {
    clientLogout(clientSocket);
  });

  // event fired when a client sends new sets
  clientSocket.on(socketIOMessages.UPDATE_SETS_REQUEST, data =>
    updateSets(clientSocket, data)
  );
}

// -----

function clientLogin(clientSocket, tableNumber) {
  ServerMainIOConnection.once(serverMessages.STATE_RESPONSE, data => {
    // send login response to client with his table number
    clientSocket.emit(socketIOMessages.LOGIN_RESPONSE, data);
  });

  // verify if max amount of connected devices/table is reached
  if (connectedClients.size === MAX_AMOUNT_TABLE) {
    clientSocket.emit(socketIOMessages.LOGIN_RESPONSE, {
      message: "No free tables available."
    });
    return;
  }

  // verify if a client is already connected to a table
  if (mapHasValue(connectedClients, tableNumber)) {
    clientSocket.emit(socketIOMessages.LOGIN_RESPONSE, {
      message: `Table ${tableNumber} is already taken.`
    });
    return;
  }

  // save client socket
  connectedClients.set(clientSocket.id, tableNumber);

  // update clients with available tables
  sendBroadcast(socketIOMessages.AVAILABLE_TABLES, getAvailableTables());

  notifyConnectionStatusToMainIPC(clientSocket.id, tableNumber);

  console.info(`Client login [id=${clientSocket.id}] [table=${tableNumber}]`);

  ServerMainIOConnection.emit(serverMessages.STATE_REQUEST, {
    tableNumber
  });
}

// -----

function clientLogout(clientSocket) {
  // check if client is logged in
  if (connectedClients.has(clientSocket.id)) {
    // delete client from active connections and notify renderer
    const tableNumber = connectedClients.get(clientSocket.id);
    connectedClients.delete(clientSocket.id);
    notifyConnectionStatusToMainIPC(null, tableNumber);
    console.info(`Client logout [id=${clientSocket.id}]`);

    // update clients with available tables
    sendBroadcast(socketIOMessages.AVAILABLE_TABLES, getAvailableTables());
  }

  console.log(`Client gone [id=${clientSocket.id}]`);
}

// -----

function updateSets(clientSocket, data) {
  ServerMainIOConnection.once(serverMessages.UPDATE_SETS_RESPONSE, data => {
    // send response to client whether sets were successfully updated
    clientSocket.emit(socketIOMessages.UPDATE_SETS_RESPONSE, data);
  });

  ServerMainIOConnection.emit(serverMessages.UPDATE_SETS, data);
}

// -----

function getAvailableTables() {
  const takenTables = Array.from(connectedClients.values());
  // .map(tableNumber =>
  //   parseInt(tableNumber, 10)
  // );

  const availableTables = ALL_POTENTIAL_TABLES.filter(
    key => !takenTables.includes(key)
  );

  return availableTables;
}

function getConnectedDeviceByTableNumber(tableNumber) {
  const clientId = getKeyByValue(connectedClients, tableNumber);
  return clientId ? clientId : null;
}

function mapHasValue(inputMap, searchedValue) {
  const values = Array.from(inputMap.entries());
  return values.some(([_, value]) => value === searchedValue);
}

function notifyConnectionStatusToMainIPC(connectedDevice, tableNumber) {
  console.log(connectedDevice);
  ServerMainIOConnection.emit(serverMessages.UPDATE_CONNECTION_STATUS, {
    connectedDevice,
    tableNumber
  });
}

// SERVER -> CLIENT COMMUNICATION

function sendNextRoundBroadcast(data) {
  sendBroadcast(socketIOMessages.NEXT_ROUND, data);
}

function sendCancelCompetitionBroadcast() {
  sendBroadcast(socketIOMessages.CANCEL_COMPETITION);
}

function sendCancelRoundBroadcast() {
  sendBroadcast(socketIOMessages.CANCEL_ROUND);
}

function sendStartRoundBroadcast() {
  sendBroadcast(socketIOMessages.START_ROUND);
}

// this method is used to submit a broadcast event to all clients
function sendBroadcast(eventName, data) {
  if (!serverSocket) {
    return;
  }

  serverSocket.sockets.emit(eventName, data);
  console.log(`server emit broadcast: ${eventName}`);
  console.log(`--- data was ${data}`);
}

function getKeyByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) {
      return key;
    }
  }
}

// helper functions
function range(start, exclusiveEnd) {
  return [...Array(exclusiveEnd).keys()].slice(start);
}

module.exports = {
  ServerMainIOConnection,

  initHTTPServer,
  shutdownServer,

  getConnectedDeviceByTableNumber,

  sendStartRoundBroadcast,
  sendNextRoundBroadcast,
  sendCancelRoundBroadcast,

  sendCancelCompetitionBroadcast
};
