const { ipcRenderer } = require('electron');
const log = require('electron-log');

window.ipcRenderer = ipcRenderer;
window.log = log;