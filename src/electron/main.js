/**
 * @author Marco Goebel
 */

const { app, ipcMain, Menu } = require("electron");
const http = require("http");
const path = require("path");

// electron reload
require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "../node_modules/.bin/electron")
});

// browser windows
const uiActions = require("./actions/uiActions");
const mainMenu = require("./menu/main-menu");
const createWindow = require("./window");

// configuration
const config = require("./config");

// server dependencies
const expressApp = require("../modules/app");
const socketIO = require("socket.io");

// xml import
const { importXML } = require("../modules/import/xml-import");

// models
const { mockedMatches } = require("../assets/mock-data/match.mock.data");
const { STATUS } = require("../modules/models/competition");

// persistence
const fileManager = require("../modules/persistance/file-manager");
const metaStorage = require("../modules/persistance/lowdb/meta-storage");
const competitionStorage = require("../modules/persistance/lowdb/competition-storage");

// ipc communication
const ipcChannels = require("../shared/ipc/ipcChannels");
const socketIOChannels = require("../client/src/shared/socket-io-channels");

// variables
const MAX_AMOUNT_TABLE = 16;
const ALL_POTENTIAL_TABLES = range(1, MAX_AMOUNT_TABLE);

let server = null;
let serverSocket = null;
let connectedClients = new Map();

let competition = null;
let matchTableMap = new Map();
let tableNumber = 1;
let matchStarted = false;

app.on("ready", () => {
  initDevTools();
  initMetaStorage();
  initHTTPServer(config.SERVER_PORT);
  initSocketIO();
  createMainWindow();
});

app.on("before-quit", () => {
  shutdownServer();
});

app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", (event, hasVisibleWindows) => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (!hasVisibleWindows) {
    createWindow();
  }
});

ipcMain.on(ipcChannels.GET_ALL_COMPETITIONS, event => {
  const competitions = metaStorage.getAllCompetitions();
  console.log("Retrieved competitions from database", competitions.length);

  event.sender.send(ipcChannels.GET_ALL_COMPETITIONS, {
    competitions: competitions
  });
});

ipcMain.on(ipcChannels.DELETE_COMPETITION, (event, data) => {
  const { id } = data;

  if (!config.USE_IN_MEMORY_STORAGE) {
    fileManager.deleteTournamentJSONFile(id);
  }

  metaStorage.deleteCompetition(id);

  event.sender.send(ipcChannels.DELETE_COMPETITION);
});

ipcMain.on(ipcChannels.OPEN_IMPORT_DIALOG, event => {
  uiActions.openXMLFile().then(xmlFilePath => {
    event.sender.send(ipcChannels.OPEN_IMPORT_DIALOG_SUCCESS, {
      xmlFilePath: xmlFilePath
    });
  });
});

ipcMain.on(ipcChannels.IMPORT_XML_FILE, (event, args) => {
  try {
    const { xmlFilePath } = args;
    competition = importXML(
      xmlFilePath,
      fileManager,
      metaStorage,
      competitionStorage
    );

    // notify react app that import is ready and was successful
    const arguments = { competitionId: competition.id, message: "success" };
    event.sender.send(ipcChannels.IMPORT_XML_FILE_SUCCESS, arguments);
  } catch (err) {
    // notify react app that a error has happend
    console.log(err.message);
    const arguments = { competitionId: "", message: err.message };
    event.sender.send(ipcChannels.IMPORT_XML_FILE_SUCCESS, arguments);
  }
});

ipcMain.on(ipcChannels.GET_MATCHES_BY_COMPETITON_ID, (event, args) => {
  const { id } = args;

  // map matches to tables
  let matchesWithPlayers = [];
  if (matchTableMap.size === 0) {
    // get meta data of competition
    competition = metaStorage.getCompetition(id);

    // open competition storage
    const filePath = fileManager.getCompetitionFilePath(id);
    competitionStorage.open(filePath);

    // get players and matches by round
    const matches = competitionStorage.getMatchesByIds(
      competition.round_matchIds
    );
    const players = competitionStorage.getAllPlayers();

    matchesWithPlayers = mapPlayersToMatches(matches, players);
    initCurrentRound(matchesWithPlayers);
  } else {
    // loop over values
    for (let matchWithPlayers of matchTableMap.values()) {
      matchesWithPlayers.push(matchWithPlayers);
    }
  }

  // init competition status
  if (competition.status === STATUS.COMPETITION_START) {
    competition.status = STATUS.ROUND_STARTED;
    metaStorage.updateCompetition(competition);
    matchStarted = true;

    sendBroadcast(socketIOChannels.START_ROUND, null);
  } else if (competition.status === STATUS.ROUND_STARTED) {
    matchStarted = true;
  }

  event.sender.send(ipcChannels.GET_MATCHES_BY_COMPETITON_ID, {
    matchesWithPlayers: matchesWithPlayers
  });
});

ipcMain.on(ipcChannels.OPEN_NEW_WINDOW, (event, args) => {
  const { route } = args;
  createWindow(route);
});

/**
 *  init react dev tools for electron
 *  @author Felix Breitenbach
 */
function initDevTools() {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS
  } = require("electron-devtools-installer");

  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err));
}

function initMetaStorage() {
  const filePath = fileManager.getMetaStorageDatabasePath();
  metaStorage.open(filePath);
}

function initHTTPServer(port) {
  server = http.createServer(expressApp);
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

function initSocketIO() {
  // open server socket
  serverSocket = socketIO(server);

  // event fired every time a new client connects (Browser window was opened)
  serverSocket.on(socketIOChannels.CONNECTION, clientSocket => {
    console.info(`Client connected [id=${clientSocket.id}]`);

    // send current server state to client
    clientSocket.emit(socketIOChannels.AVAILABLE_TABLES, availableTables());

    // event fired every time a client sends a table number
    clientSocket.on(socketIOChannels.LOGIN_TABLE, data => {
      clientLogin(clientSocket, data);
    });

    // event fired when a start round is triggered
    clientSocket.on(socketIOChannels.GET_MATCH, data => {
      sendMatchToClient(clientSocket, data);
    });

    // event fired when a client disconnects, remove it from the list
    clientSocket.on(socketIOChannels.DISCONNECT, data => {
      clientLogout(clientSocket);
    });
  });
}

function createMainWindow() {
  // create the browser window with menu ...
  createWindow();
  Menu.setApplicationMenu(mainMenu);
}

function clientLogin(clientSocket, data) {
  const { tableNumber } = data;

  // verify if max amount of connected devices/table is reached
  if (connectedClients.size === MAX_AMOUNT_TABLE) {
    clientSocket.emit(socketIOChannels.LOGIN_ERROR, data);
    return;
  }

  // verify if a client is already connected to a table
  if (mapHasValue(connectedClients, tableNumber)) {
    clientSocket.emit(socketIOChannels.LOGIN_ERROR, data);
    return;
  }

  // login client
  connectedClients.set(clientSocket.id, tableNumber);
  console.info(`Client login [id=${clientSocket.id}] [table=${tableNumber}]`);

  // send current server state to clients
  sendBroadcast(socketIOChannels.AVAILABLE_TABLES, availableTables());

  // send data to client
  clientSocket.emit(socketIOChannels.LOGIN_TABLE, {
    tableNumber: tableNumber,
    matchStarted: matchStarted
  });
}

function clientLogout(clientSocket) {
  if (connectedClients.has(clientSocket.id)) {
    connectedClients.delete(clientSocket.id);
    console.info(`Client logout [id=${clientSocket.id}]`);

    sendBroadcast(socketIOChannels.AVAILABLE_TABLES, availableTables());
  }
  console.log(`Client gone [id=${clientSocket.id}]`);
}

function sendMatchToClient(clientSocket, data) {
  const { tableNumber } = data;
  console.log(tableNumber);

  // use mocked match as default
  let match = mockedMatches;
  if (matchTableMap) {
    const matchWithPlayers = matchTableMap.get(tableNumber);
    match = matchWithPlayers.match;
  }

  clientSocket.emit(socketIOChannels.SEND_MATCH, { match });
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

function mapPlayersToMatches(matches, players) {
  const matchesWithPlayers = [];

  matches.forEach(match => {
    const player1 = players.find(player => player.id === match.player1);
    const player2 = players.find(player => player.id === match.player2);

    const matchWithPlayers = {
      match: match,
      player1: player1,
      player2: player2
    };

    matchesWithPlayers.push(matchWithPlayers);
  });

  return matchesWithPlayers;
}

function initCurrentRound(matchesWithPlayers) {
  // map matches to available tables
  console.log(`Map matches to tables`);
  tableNumber = 1;
  matchesWithPlayers.forEach(matchWithPlayers => {
    matchTableMap.set(tableNumber++, matchWithPlayers);
    console.log(
      `Table ${tableNumber} - ${matchWithPlayers.match.player1} VS. ${matchWithPlayers.match.player2}`
    );
  });
  console.log("Ready to play");
}

function mapHasValue(inputMap, searchedValue) {
  const values = Array.from(inputMap.entries());
  return values.some(([_, value]) => value === searchedValue);
}

function range(start, exclusiveEnd) {
  return [...Array(exclusiveEnd).keys()].slice(start);
}
