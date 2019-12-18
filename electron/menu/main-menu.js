const { app, Menu, shell } = require('electron');

// Event handler
const reload = (item, focusedWindow) => {
  if (focusedWindow) focusedWindow.reload();
};

const toggleDevTools = (item, focusedWindow) => {
  if (focusedWindow) focusedWindow.webContents.toggleDevTools();
};

const openClient = () => {
  shell.openExternal('http://localhost:4000');
}

// main menu template
const template = [
  {
    label: 'Turnier',
    submenu: [
      {
        label: 'XML importieren'
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
    label: 'Tools',
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

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
