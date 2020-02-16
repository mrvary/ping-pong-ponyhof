const { app, ipcMain, Menu, shell } = require('electron');

const config = require('../config');
const uiActions = require('../actions/uiActions');
const server = require('../../backend/server');
const { channels } = require('../../shared/channels');

// Event handler
const reload = (item, focusedWindow) => {
  if (focusedWindow) focusedWindow.reload();
};

const toggleDevTools = (item, focusedWindow) => {
  if (focusedWindow) focusedWindow.webContents.toggleDevTools();
};

const openClient = () => {
  const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;
  shell.openExternal(url);
};

const showURL = () => {
  const url = `http://${config.SERVER_HOST}:${config.SERVER_PORT}`;
  uiActions.showInfoBox('URL-Info', `URL: ${url}`);
};

const openXMLFile = () => {
  uiActions.openXMLFile(json => {
    console.log(json);

    // notify main window
    ipcMain.emit(channels.FILE_IMPORTED, json);
  });
};

const startRound = () => {
  server.sendStartRoundBroadcast();
};

// main menu template
const template = [
  {
    label: 'Turnier',
    submenu: [
      {
        label: 'XML importieren',
        click: openXMLFile
      },
      {
        label: 'Runde starten',
        click: startRound
      }
    ]
  },
  {
    label: 'Bearbeiten',
    submenu: [
      {
        label: 'Rückgängig',
        role: 'undo'
      },
      {
        label: 'Wiederholen',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Ausschneiden',
        role: 'cut'
      },
      {
        label: 'Kopieren',
        role: 'copy'
      },
      {
        label: 'Einfügen',
        role: 'paste'
      },
      {
        label: 'Löschen',
        role: 'delete'
      },
      {
        type: 'separator'
      },
      {
        label: 'Alle auswählen',
        role: 'selectall'
      }
    ]
  },
  {
    label: 'Ansicht',
    submenu: [
      {
        label: 'Neu laden',
        accelerator: 'CmdOrCtrl+R',
        click: reload
      },
      {
        type: 'separator'
      },
      {
        label: 'Zoom zurücksetzen',
        role: 'resetzoom'
      },
      {
        label: 'Vergrößern',
        role: 'zoomin'
      },
      {
        label: 'Verkleinern',
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        label: 'Vollbild-Modus',
        role: 'togglefullscreen'
      }
    ]
  },
  {
    label: 'Entwickler',
    submenu: [
      {
        label: 'Entwicklertools',
        accelerator:
          process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click: toggleDevTools
      },
      {
        type: 'separator'
      },
      {
        label: 'Client öffnen',
        click: openClient
      },
      {
        label: 'Server URL anzeigen',
        click: showURL
      }
    ]
  },
  {
    label: 'Fenster',
    submenu: [
      {
        label: 'Minimieren',
        role: 'minimize'
      },
      {
        label: 'Schließen',
        role: 'close'
      }
    ]
  },
  {
    label: 'Hilfe',
    submenu: [
      {
        label: `Über ${app.name}`
      }
    ]
  }
];

module.exports = Menu.buildFromTemplate(template);
