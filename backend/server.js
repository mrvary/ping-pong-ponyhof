const app = require('./app');
const http = require('http');

// electron dependencies
const log = require('electron-log');

// communication dependecies
const socketIO = require('./socket');

function createServer(port) {
  const server = http.createServer(app);
  socketIO.setupSocketIO(server);

  return server.listen(port, () => {
    log.info(`Server is running on port ${port}`);
  });
}

function scrubleMatches(players) {
  socketIO.scrubleMatches(players);
}

function sendStartRoundBroadcast() {
  socketIO.sendStartRoundBroadcast();
}

module.exports = {
  createServer,
  scrubleMatches,
  sendStartRoundBroadcast
};
