const { dialog } = require('electron');
const fs = require('fs');

const parser = require('xml2json');

function openXMLFile(callback) {
  // open file dialog looking for xml
  dialog
    .showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'XML', extensions: ['xml'] }]
    })
    .then(result => {
      // read file from disk
      const filePath = result.filePaths[0];
      const fileConent = fs.readFileSync(filePath);

      // convert xml content to json and create json object
      const json = JSON.parse(parser.toJson(fileConent), {
        reversible: false
      });

      const players = json.tournament.competition.players.player;
      callback(players);
    });
}

module.exports = {
  openXMLFile
};
