/**
 * @author Marco Goebel
 */

const http = require("http");
const socketIO = require("socket.io");
const EventEmitter = require("events");

// server application
const expressApp = require("../server/app");
const socketIOMessages = require("../../client/src/shared/socket-io-messages");
const { COMPETITION_STATE } = require("../models/competition");

// constants
const MAX_AMOUNT_TABLE = 8;
const ALL_POTENTIAL_TABLES = range(1, MAX_AMOUNT_TABLE + 1);
const connectedClients = new Map();

const SocketIOInputEmitter = new EventEmitter();
const SocketIOOutputEmitter = new EventEmitter();

const SERVER_MESSAGES = {
  UPDATE_CONNECTION_STATUS: "update-connection-status"
};

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
  clientSocket.on(socketIOMessages.LOGIN_REQUEST, ({ tableNumber }) => {
    clientLogin(clientSocket, tableNumber);
  });

  // TODO: remove
  // event fired when a start round is triggered
  // clientSocket.on(socketIOMessages.UPDATE_SETS, data => {
  //   SocketIOOutputEmitter.once(socketIOMessages.UPDATE_SETS, data => {
  //     clientSocket.emit(socketIOMessages.UPDATE_SETS, data);
  //   });
  //   SocketIOInputEmitter.emit(socketIOMessages.UPDATE_SETS, data);
  // });

  // event fired when a client disconnects, remove it from the list
  clientSocket.on(socketIOMessages.DISCONNECT, () => {
    clientLogout(clientSocket);
  });

  clientSocket.on(socketIOMessages.UPDATE_SETS_REQUEST, data =>
    updateSets(clientSocket, data)
  );
}

// CLIENT -> SERVER COMMUNICATION

function updateSets(clientSocket, data) {
  const { sets, tableNumber, finished } = data;
  // todo
  if ("error") {
    clientSocket.emit(socketIOMessages.UPDATE_SETS_RESPONSE, {
      message: "something went wrong."
    });
    return;
  }
  // update match in memory
  // emit message to app: new ranking / new match data
  // save to DB

  clientSocket.emit(socketIOMessages.UPDATE_SETS_RESPONSE, {
    message: "🎉 ???"
  });
}

function getConnectedDeviceByTableNumber(tableNumber) {
  const clientId = getKeyByValue(connectedClients, tableNumber);
  return clientId ? clientId : null;
}

function sendAvailableTablesToClient() {
  sendBroadcast(socketIOMessages.AVAILABLE_TABLES, getAvailableTables());
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

function clientLogin(clientSocket, tableNumber) {
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

  // send available tables to clients
  sendAvailableTablesToClient();

  notifyConnectionStatusToMainIPC(clientSocket.id, tableNumber);

  console.info(`Client login [id=${clientSocket.id}] [table=${tableNumber}]`);

  // send login response to client with his table number
  clientSocket.emit(
    socketIOMessages.LOGIN_RESPONSE,
    createLoginResponseData(tableNumber)
  );
}

function mapHasValue(inputMap, searchedValue) {
  const values = Array.from(inputMap.entries());
  return values.some(([_, value]) => value === searchedValue);
}

function createLoginResponseData(tableNumber) {
  const state = "TODO";

  if (
    state === COMPETITION_STATE.COMP_ACTIVE_ROUND_READY ||
    state === COMPETITION_STATE.COMP_ACTIVE_ROUND_ACTIVE
  ) {
    return {
      roundAvailable: false,
      tableNumber,
      match: {}
    };
  }

  return {
    roundAvailable: false,
    tableNumber
  };
}

function notifyConnectionStatusToMainIPC(connectedDevice, tableNumber) {
  console.log(connectedDevice);
  SocketIOInputEmitter.emit(SERVER_MESSAGES.UPDATE_CONNECTION_STATUS, {
    connectedDevice,
    tableNumber
  });
}

function clientLogout(clientSocket) {
  // check if client is logged in
  if (connectedClients.has(clientSocket.id)) {
    // delete client from active connections and notify renderer
    const tableNumber = connectedClients.get(clientSocket.id);
    connectedClients.delete(clientSocket.id);
    notifyConnectionStatusToMainIPC(null, tableNumber);
    console.info(`Client logout [id=${clientSocket.id}]`);

    // update clients with available tables
    sendAvailableTablesToClient();
  }

  console.log(`Client gone [id=${clientSocket.id}]`);
}

// SERVER -> CLIENT COMMUNICATION

function sendNextRoundBroadcast() {
  // send match to each client
  const data = { matches: [] };

  sendBroadcast(socketIOMessages.NEXT_ROUND, data);
}

function sendCompetitionCanceledBroadcast() {
  sendBroadcast(socketIOMessages.COMPETITION_CANCELED);
}

function sendCancelRoundBroadcast() {
  sendBroadcast(socketIOMessages.CANCEL_ROUND);
}

function sendStartRoundBroadcast() {
  if (matchStarted) {
    return;
  }

  matchStarted = true;
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
  SERVER_MESSAGES,
  SocketIOInputEmitter,
  SocketIOOutputEmitter,

  initHTTPServer,
  shutdownServer,

  getConnectedDeviceByTableNumber,

  sendStartRoundBroadcast
};
