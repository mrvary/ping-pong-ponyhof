/**
 * @author Marco Goebel
 */

const http = require("http");
const socketIO = require("socket.io");
const EventEmitter = require("events");

// server application
const expressApp = require("../server/app");
const socketIOMessages = require("../../client/src/shared/socket-io-messages");

// constants
const MAX_AMOUNT_TABLE = 8;
const ALL_POTENTIAL_TABLES = range(1, MAX_AMOUNT_TABLE + 1);
const connectedClients = new Map();

const SocketIOInputEmitter = new EventEmitter();
const SocketIOOutputEmitter = new EventEmitter();

// server variables
let server = null;
let serverSocket = null;

let matchStarted = false;

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
    sendAvailableTablesToClient();
    listenToClientEvent(clientSocket);
  });
}

function listenToClientEvent(clientSocket) {
  // event fired every time a client sends a table number
  clientSocket.on(socketIOMessages.LOGIN_TABLE, data => {
    clientLogin(clientSocket, data);
  });

  // event fired when a start round is triggered
  clientSocket.on(socketIOMessages.GET_MATCH, data => {
    SocketIOOutputEmitter.once(socketIOMessages.SEND_MATCH, data => {
      clientSocket.emit(socketIOMessages.SEND_MATCH, data);
    });
    SocketIOInputEmitter.emit(socketIOMessages.GET_MATCH, data);
  });

  // event fired when a client disconnects, remove it from the list
  clientSocket.on(socketIOMessages.DISCONNECT, () => {
    clientLogout(clientSocket);
  });
}

function sendStartRoundBroadcast() {
  if (matchStarted) {
    return;
  }

  matchStarted = true;
  sendBroadcast(socketIOMessages.START_ROUND, null);
}

function sendAvailableTablesToClient() {
  sendBroadcast(socketIOMessages.AVAILABLE_TABLES, getAvailableTables());
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

function clientLogin(clientSocket, data) {
  const { tableNumber } = data;

  // verify if max amount of connected devices/table is reached
  if (connectedClients.size === MAX_AMOUNT_TABLE) {
    clientSocket.emit(socketIOMessages.LOGIN_ERROR, data);
    return;
  }

  // verify if a client is already connected to a table
  if (mapHasValue(connectedClients, tableNumber)) {
    clientSocket.emit(socketIOMessages.LOGIN_ERROR, data);
    return;
  }

  // save client socket
  connectedClients.set(clientSocket.id, tableNumber);
  console.info(`Client login [id=${clientSocket.id}] [table=${tableNumber}]`);

  // send login response to client with his table number
  clientSocket.emit(socketIOMessages.LOGIN_TABLE, {
    tableNumber: tableNumber,
    matchStarted: matchStarted
  });

  // send available tables to clients
  sendAvailableTablesToClient();
}

function clientLogout(clientSocket) {
  // check if client is logged in
  if (connectedClients.has(clientSocket.id)) {
    // delete client from active connections
    connectedClients.delete(clientSocket.id);
    console.info(`Client logout [id=${clientSocket.id}]`);

    // update clients with available tables
    sendAvailableTablesToClient();
  }
  console.log(`Client gone [id=${clientSocket.id}]`);
}

function getAvailableTables() {
  const takenTables = Array.from(connectedClients.values()).map(x =>
    parseInt(x, 10)
  );

  const availableTables = ALL_POTENTIAL_TABLES.filter(
    key => !takenTables.includes(key)
  );

  return availableTables;
}

function mapHasValue(inputMap, searchedValue) {
  const values = Array.from(inputMap.entries());
  return values.some(([_, value]) => value === searchedValue);
}

function range(start, exclusiveEnd) {
  return [...Array(exclusiveEnd).keys()].slice(start);
}

module.exports = {
  SocketIOInputEmitter,
  SocketIOOutputEmitter,

  initHTTPServer,
  shutdownServer,

  sendStartRoundBroadcast
};
