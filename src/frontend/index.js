const electron = require('electron');
const log = require('electron-log');
const ipc = electron.ipcRenderer;

const btnOpenClient = document.getElementById('openClient');
btnOpenClient.addEventListener('click', () => ipc.send('open-client'));

const btnImportXML = document.getElementById("xml-import");
btnImportXML.addEventListener("click", () =>ipc.send('open-import-dialog'));

ipc.on('opened-import-dialog', (event, players) => {
    log.info(players);
});