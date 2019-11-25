const electron = require('electron');
const log = require('electron-log');
const ipc = electron.ipcRenderer;

function openImportDialog() {
    ipc.send('open-import-dialog');
}

const btnImportXML = document.getElementById("xml-import");
btnImportXML.addEventListener("click", openImportDialog);

ipc.on('opened-import-dialog', (event, players) => {
    log.info(players);
});