/**
 * @author Marco Goebel
 */

const { app, ipcMain } = require("electron");
const path = require("path");

// electron reload
require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "../node_modules/.bin/electron")
});

// browser windows
const uiActions = require("./actions/uiActions");
const createMenu = require("./menu/main-menu");
const createWindow = require("./window");

// configuration
const config = require("./config");

// xml import
const { importXML } = require("../modules/import/xml-import");

// models
const { mockedMatches } = require("../assets/mock-data/match.mock.data");
const { setCompetitionStatus } = require("../modules/models/competition");

// persistence
const fileManager = require("../modules/persistance/file-manager");
const metaStorage = require("../modules/persistance/lowdb/meta-storage");
const competitionStorage = require("../modules/persistance/lowdb/competition-storage");

// communication
const server = require("../modules/server/server");
const socketIOChannels = require("../client/src/shared/socket-io-channels");
const ipcChannels = require("../shared/ipc/ipcChannels");

let competition = null;
let matchTableMap = new Map();
let tableNumber = 1;

app.on("ready", () => {
  initDevTools();

  // initialize modules
  initMetaStorage();
  initHTTPServer(config.SERVER_PORT);

  // create GUI
  createWindow();
  createMenu();
});

app.on("before-quit", () => {
  server.shutdownServer();
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

ipcMain.on(ipcChannels.START_ROUND, () => {
  server.sendStartRoundBroadcast();
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
    competitionStorage.open(filePath, config.USE_IN_MEMORY_STORAGE);

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

  // set competition status
  setCompetitionStatus(competition, false, false);
  metaStorage.updateCompetition(competition);

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
  metaStorage.open(filePath, config.USE_IN_MEMORY_STORAGE);
}

function initHTTPServer(port) {
  server.initHTTPServer(port);

  server.SocketIOInputEmitter.on(socketIOChannels.GET_MATCH, args => {
    const { tableNumber } = args;
    const matchWithPlayers = getMatchByTableNumber(tableNumber);
    console.log(`Table ${tableNumber} execute get match`, matchWithPlayers);
    server.SocketIOOutputEmitter.emit(socketIOChannels.SEND_MATCH, { matchWithPlayers });
  });
}

function getMatchByTableNumber(tableNumber) {
  // use mocked match as default
  let matchWithPlayers = {};
  if (matchTableMap.size > 0) {
    matchWithPlayers = matchTableMap.get(tableNumber);
  }

  return matchWithPlayers;
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
    matchTableMap.set(tableNumber, matchWithPlayers);
    console.log(
      `Table ${tableNumber} - ${matchWithPlayers.match.player1} VS. ${matchWithPlayers.match.player2}`
    );
    tableNumber++;
  });
}
