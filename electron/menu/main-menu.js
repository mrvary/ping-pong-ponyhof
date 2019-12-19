const { app, ipcMain, Menu, shell } = require('electron');

const config = require('../config');
const uiActions = require('../actions/uiActions');
const server = require('../../backend/server');
const { channels } = require('../../src/shared/channels');

// Event handler
const reload = (item, focusedWindow) => {
  if (focusedWindow) focusedWindow.reload();
};

const toggleDevTools = (item, focusedWindow) => {
  if (focusedWindow) focusedWindow.webContents.toggleDevTools();
};

const openClient = () => {
  shell.openExternal(`http://localhost:${config.SERVER_PORT}`);
};

const openXMLFile = () => {
  uiActions.openXMLFile(players => {
    console.log(players);

    // notify main window
    ipcMain.emit(channels.FILE_IMPORTED, {
      players: players
    });
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
