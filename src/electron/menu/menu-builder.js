/**
 * @author Marco Goebel
 */

const { Menu } = require("electron");

// templates
const darwinTemplate = require("./templates/darwin-menu");
const otherTemplate = require("./templates/others-menu");

const platform = process.platform;
const actions = new Map();

/**
 * Sets application menu dependent on OS
 * @param app
 * @param window
 */
function buildMenu(app, window) {
  const menu =
    platform === "darwin"
      ? Menu.buildFromTemplate(darwinTemplate(app, window, actions))
      : Menu.buildFromTemplate(otherTemplate(app, window, actions));

  Menu.setApplicationMenu(menu);
}

/**
 * Register onClick-Handler for menu actions
 * @param name
 * @param func
 */
function registerAction(name, func) {
  actions.set(name, func);
}

module.exports = {
  buildMenu,
  registerAction
};
