/**
 * @author Marco Goebel
 */

const { BrowserWindow } = require("electron");
const path = require("path");

const config = require("./config");

// resources
const appIconPath = path.join(
  __dirname,
  "../assets/icons/png/app-icon/app-icon_16x16.png"
);
const preload = path.join(__dirname, "./preload.js");

// windows
const windows = new Set();

/**
 * Creates new electron browser window
 * @param route - react route which should load in the new browser window
 * @returns {Electron.BrowserWindow}
 */
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
    width: 1200,
    height: 900,
    icon: appIconPath,
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
