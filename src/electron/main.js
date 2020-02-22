/**
 * @author Marco Goebel
 */

const { app, ipcMain, Menu } = require("electron");
const path = require("path");

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "../node_modules/.bin/electron")
});

const config = require("./config");
const uiActions = require("./actions/uiActions");
const menu = require("./menu/main-menu");
const ipcChannels = require("../shared/ipc/ipcChannels");
const createWindow = require("./window");

// server dependencies
const server = require("../modules/server");

// methods
const { importXML } = require("../modules/import/xml-import");

// persistence
const fileManager = require("../modules/persistance/file-manager");
const metaStorage = require("../modules/persistance/lowdb/file-storage");
const competitionStorage = require("../modules/persistance/lowdb/competition-storage");

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

app.on("ready", () => {
  initDevTools();

  // init competition database
  const filePath = fileManager.getCompetitionDatabasePath();
  metaStorage.open(filePath);

  // init http express server
  server.setupHTTPServer(config.SERVER_PORT);
  server.setupSocketIO();

  // create the browser window ...
  createWindow();

  // set custom application menu
  Menu.setApplicationMenu(menu);
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

app.on('activate', (event, hasVisibleWindows) => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (!hasVisibleWindows) { createWindow(); }
});

ipcMain.on(ipcChannels.START_ROUND, () => {
  server.sendStartRoundBroadcast();
});

ipcMain.on(ipcChannels.OPEN_IMPORT_DIALOG, event => {
  uiActions.openXMLFile().then((xmlFilePath) => {
    event.sender.send(ipcChannels.OPEN_IMPORT_DIALOG_SUCCESS, { xmlFilePath: xmlFilePath })
  });
});

ipcMain.on(ipcChannels.IMPORT_XML_FILE, (event, args) => {
  try {
    const { xmlFilePath } = args;
    const { competitionId, matches, players } = importXML(xmlFilePath, fileManager, metaStorage, competitionStorage);
    const matchesWithPlayers = initCurrentRound(matches, players);

    // notify react app that import is ready and was successful
    const arguments = { competitionId: competitionId,
                        matchesWithPlayers: matchesWithPlayers,
                        message: "success" };
    event.sender.send(ipcChannels.IMPORT_XML_FILE_SUCCESS, arguments);
  } catch (err) {
    // notify react app that a error has happend
    const arguments = { competitionId: '',
                        matchesWithPlayers: [],
                        message: err.message };
    event.sender.send(ipcChannels.IMPORT_XML_FILE_SUCCESS, arguments)
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

ipcMain.on(ipcChannels.GET_MATCHES_BY_COMPETITON_ID, (event, args) => {
  const { id } = args;

  const matchTableMap = server.getMatchTableMap();

  let matchesWithPlayers = [];
  if (matchTableMap.size > 0) {
    // loop over values
    for (let matchWithPlayers of matchTableMap.values()) {
      console.log(matchWithPlayers);
      matchesWithPlayers.push(matchWithPlayers);
    }
  } else {
    // open competition storage
    const filePath = fileManager.getCompetitionFilePath(id);
    competitionStorage.open(filePath);

    // TODO: Get Round and get match id of current round

    // get players and matches by round
    matches = competitionStorage.getMatchesByIds();
    players = competitionStorage.getAllPlayers();

    matchesWithPlayers = initCurrentRound(matches, players);
  }

  event.sender.send(ipcChannels.GET_MATCHES_BY_COMPETITON_ID, { matchesWithPlayers: matchesWithPlayers })
});

ipcMain.on(ipcChannels.OPEN_NEW_WINDOW, (event, args) => {
  const { route } = args;
  createWindow(route);
});

function initCurrentRound(matches, players) {
  // map match and players together
  const matchesWithPlayers = [];
  matches.forEach(match => {
    const player1 = players.find(player => player.id === match.player1);
    const player2 = players.find(player => player.id === match.player2);

    const matchWithPlayers = {match: match, player1: player1, player2: player2};
    matchesWithPlayers.push(matchWithPlayers);
  });

  server.setMatchesToTables(matchesWithPlayers);
  console.log('Ready to play');

  return matchesWithPlayers;
}

