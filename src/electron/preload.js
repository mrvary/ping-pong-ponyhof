/**
 * @author Marco Goebel
 */

const { ipcRenderer } = require('electron');
const log = require('electron-log');

window.electron = {};
window.electron.ipcRenderer = ipcRenderer;
window.electron.log = log;