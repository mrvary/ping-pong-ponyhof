const { BrowserWindow } = require("electron");
const path = require("path");

const config = require("./config");

// Ressources
const appIcon = path.join(
  __dirname,
  "../assets/icons/png/app-icon/app-icon_16x16.png"
);
const preload = path.join(__dirname, "preload.js");

// windows
const windows = new Set();

function createWindow(route) {
  let x, y;

  const currentWindow = BrowserWindow.getFocusedWindow();

  // determine the position of the new window
  if (currentWindow) {
    const [currentWindowX, currentWindowY] = currentWindow.getPosition();
    x = currentWindowX + 10;
    y = currentWindowY + 10;
  }

  // create the browser window ...
  let newWindow = new BrowserWindow({
    x: x,
    y: y,
    width: 800,
    height: 600,
    icon: appIcon,
    webPreferences: {
      nodeIntegration: false,
      preload: preload
    }
  });

  // ...and load the frontend react app
  let url = config.ELECTRON_START_URL;
  if (route) {
    url = url + "#" + route;
  }
  newWindow.loadURL(url);

  // Show the window when it is ready to show
  newWindow.once("ready-to-show", () => {
    newWindow.show();
  });

  // Emitted when the window is closed.
  newWindow.on("close", () => {
    windows.delete(newWindow);
    newWindow = null;
  });

  windows.add(newWindow);
  return newWindow;
}

module.exports = createWindow;
