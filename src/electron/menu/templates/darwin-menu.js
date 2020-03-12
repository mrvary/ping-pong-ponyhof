/**
 * Template for the darwin menu (MAC)
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

  const closeApp = () => {
    app.quit();
  };

  let menu = [
    {
      label: app.name,
      submenu: [
        { label: "Client öffnen", click: openClient },
        { label: "Turnier exportieren", click: exportCompetition },
        { type: "separator" },
        { label: "Verkleinern", acceleration: "Command+H", role: "hide" },
        {
          label: "Vordergrund",
          acceleration: "Command+Shift+H",
          role: "hideothers"
        },
        { label: "Vergrößern", role: "unhide" },
        { type: "separator" },
        { label: "Beenden", acceleration: "Command+Q", click: closeApp }
      ]
    },
    {
      label: "Ansicht",
      submenu: [
        { label: "Neu laden", acceleration: "Command+R", click: reload },
        {
          label: "Vollbild",
          acceleration: "Ctrl+Command+F",
          role: "togglefullscreen",
          click: toggleFullScreen
        },
        { label: "Minimieren", acceleration: "Command+M", role: "minimize" },
        { type: "separator" },
        {
          label: "Entwicklertools",
          acceleration: "Alt+Command+I",
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
