/**
 * Template for the other OS (Windows and Linux)
 * @author Marco Goebel
 */

const MENU_ACTIONS = require("../menu-actions");

module.exports = (app, window, actions) => {
  const openClient = () => {
    const action = actions.get(MENU_ACTIONS.OPEN_CLIENT);
    if (action) {
      action();
    }
  };

  const showRepo = () => {
    const action = actions.get(MENU_ACTIONS.SHOW_REPO);
    if (action) {
      action();
    }
  };

  const exportCompetition = () => {
    const action = actions.get(MENU_ACTIONS.EXPORT_XML);
    if (action) {
      action();
    }
  };

  const reload = (item, focusedWindow) => {
    if (focusedWindow) {
      focusedWindow.reload();
    }
  };

  const toggleFullScreen = (item, focusedWindow) => {
    if (focusedWindow) {
      focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
    }
  };

  const toggleDevTools = (item, focusedWindow) => {
    if (focusedWindow) {
      focusedWindow.webContents.toggleDevTools();
    }
  };

  let menu = [
    {
      label: app.name,
      submenu: [
        {
          label: "Client öffnen",
          click: openClient
        },
        {
          label: "Turnier exportieren",
          click: exportCompetition
        },
        {
          type: "separator"
        },
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
          role: "togglefullscreen",
          click: toggleFullScreen
        }
      ]
    },
    {
      label: "Entwickler",
      submenu: [
        {
          label: "Entwicklertools",
          accelerator: "Ctrl+Shift+I",
          click: toggleDevTools
        }
      ]
    },
    {
      label: "Hilfe",
      submenu: [
        {
          label: "GitHub",
          click: showRepo
        }
      ]
    }
  ];

  return menu;
};
