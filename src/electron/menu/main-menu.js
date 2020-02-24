/**
 * @author Marco Goebel
 */

const { app, Menu, shell } = require("electron");

const config = require("../config");
const uiActions = require("../actions/uiActions");

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
  uiActions.showInfoBox("URL-Info", `URL: ${url}`);
};

// main menu template
const template = [
  {
    label: "Bearbeiten",
    submenu: [
      {
        label: "Rückgängig",
        role: "undo"
      },
      {
        label: "Wiederholen",
        role: "redo"
      },
      {
        type: "separator"
      },
      {
        label: "Ausschneiden",
        role: "cut"
      },
      {
        label: "Kopieren",
        role: "copy"
      },
      {
        label: "Einfügen",
        role: "paste"
      },
      {
        label: "Löschen",
        role: "delete"
      },
      {
        type: "separator"
      },
      {
        label: "Alle auswählen",
        role: "selectall"
      }
    ]
  },
  {
    label: "Ansicht",
    submenu: [
      {
        label: "Neu laden",
        accelerator: "CmdOrCtrl+R",
        click: reload
      },
      {
        type: "separator"
      },
      {
        label: "Zoom zurücksetzen",
        role: "resetzoom"
      },
      {
        label: "Vergrößern",
        role: "zoomin"
      },
      {
        label: "Verkleinern",
        role: "zoomout"
      },
      {
        type: "separator"
      },
      {
        label: "Vollbild-Modus",
        role: "togglefullscreen"
      }
    ]
  },
  {
    label: "Entwickler",
    submenu: [
      {
        label: "Entwicklertools",
        accelerator:
          process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
        click: toggleDevTools
      },
      {
        type: "separator"
      },
      {
        label: "Client öffnen",
        click: openClient
      },
      {
        label: "Server URL anzeigen",
        click: showURL
      }
    ]
  },
  {
    label: "Fenster",
    submenu: [
      {
        label: "Minimieren",
        role: "minimize"
      },
      {
        label: "Schließen",
        role: "close"
      }
    ]
  },
  {
    label: "Hilfe",
    submenu: [
      {
        label: `Über ${app.name}`
      }
    ]
  }
];

if (process.platform === "darwin") {
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        role: "hide"
      },
      {
        role: "hideothers"
      },
      {
        role: "unhide"
      },
      {
        type: "separator"
      },
      {
        role: "quit"
      }
    ]
  });
}

function createMenu() {
  const mainMenu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(mainMenu);
}

module.exports = createMenu;
