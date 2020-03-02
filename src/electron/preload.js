/**
 * @author Marco Goebel
 */

const { remote, ipcRenderer } = require('electron');
const log = require('electron-log');

window.electron = {};
window.electron.ipcRenderer = ipcRenderer;
window.electron.remote = remote;
window.electron.log = log;
