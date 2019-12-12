const express = require('express');

const io = require('socket.io');
const { clientChannels } = require('../client/src/shared/client-channels');

const isDev = require('electron-is-dev');
const log = require('electron-log');

const path = require('path');

const PORT = 4000;
const MAX_AMOUNT_TABLE = 4;
const ALL_POTENTIAL_TABLES = range(1, MAX_AMOUNT_TABLE);

let serverSocket = null;
let connectedClients = new Map();

function createServer() {
  let server = setupExpressApp();
  if (!server) {
    log.info('Could not start web server');
    return null;
  }

  setupSocketIO(server);

  return server;
}

function setupExpressApp() {
  // create a express application
  const serverApp = express();

  if (isDev) {
    // redirect to the development server of the react client app
    serverApp.get('*', (request, response) => {
      const clientUrl = process.env.CLIENT_START_URL || 'http://localhost:3001';
      response.redirect(clientUrl);
    });
  } else {
    // Serve the static files from the react client app
    serverApp.use(express.static(path.join(__dirname, '../client/build')));

    // Handles any requests that don't match the ones above
    serverApp.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  }

  // start web server
  return serverApp.listen(PORT, () => {
    log.info(`Server is running on port ${PORT}`);
  });
}

function setupSocketIO(server) {
  // open server socket
  serverSocket = io(server);

  // event fired every time a new client connects (Browser window was opened)
  serverSocket.on(clientChannels.CONNECTION, clientSocket => {
    let addedDevice = false;
    console.info(`Client connected [id=${clientSocket.id}]`);

    // send available tables
    clientSocket.emit(clientChannels.AVAILABLE_TABLES, availableTables());

    // event fired every time a client sends a table number
    clientSocket.on(clientChannels.LOGIN_TABLE, data => {
      const { tableNumber } = data;

      // verify if max amount of connected devices/table is reached
      if (connectedClients.size === MAX_AMOUNT_TABLE) {
        clientSocket.emit(clientChannels.LOGIN_ERROR, data);
        return;
      }

      // verify if a client is already connected to a table
      if (connectedClients.has(tableNumber)) {
        clientSocket.emit(clientChannels.LOGIN_ERROR, data);
        return;
      }

      // add client to connection list, update available tables
      connectedClients.set(clientSocket.id, tableNumber);
      sendBroadcast(clientChannels.AVAILABLE_TABLES, availableTables());
      addedDevice = true;
      console.info(
        `Client login [id=${clientSocket.id}] [table=${tableNumber}]`
      );

      // send data to client
      clientSocket.emit(clientChannels.LOGIN_TABLE, data);
    });

    // event fired when the client sends a message
    clientSocket.on(clientChannels.SEND_MESSAGE, data => {
      console.log(`${clientSocket.id} -> ${data}`);
    });

    // event fired when a client disconnects, remove it from the list
    clientSocket.on(clientChannels.DISCONNECT, data => {
      if (addedDevice) {
        connectedClients.delete(clientSocket.id);
        sendBroadcast(clientChannels.AVAILABLE_TABLES, availableTables());
        console.info(`Client logout [id=${clientSocket.id}]`);
      }
      console.log(`Client gone [id=${clientSocket.id}]`);
    });
  });
}

function sendStartRoundBroadcast() {
  sendBroadcast(clientChannels.START_ROUND);
}

// this method is used to submit a broadcast event to all clients
function sendBroadcast(eventName, data) {
  if (serverSocket) {
    serverSocket.sockets.emit(eventName, data);
    console.log(`server emit broadcast: ${eventName}`);
    console.log(`--- data was ${data}`);
  }
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

function range(start, exclusiveEnd) {
  return [...Array(exclusiveEnd).keys()].slice(start);
}

module.exports = {
  SERVER_PORT: PORT,
  createServer,
  sendStartRoundBroadcast
};
