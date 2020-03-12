/**
 * @author Marco Goebel
 */

const { dialog } = require("electron");

/**
 * Open file dialog of OS to select an xml file
 * @access public
 * @returns {Promise<string>}
 */
function openXMLFile() {
  return dialog
    .showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "XML", extensions: ["xml"] }]
    })
    .then(result => {
      return result.filePaths[0];
    })
    .catch(err => {
      console.log("Can not get path of file", err);
    });
}

/**
 * Open save dialog of OS to save an xml file
 * @access public
 * @param {string} defaultFilePath
 * @returns {Promise<Electron.SaveDialogReturnValue>}
 */
function showSaveDialog(defaultFilePath) {
  const options = {
    title: "Turnier exportieren",
    buttonLabel: "Speichern",
    defaultPath: defaultFilePath,
    filter: [{ name: "XML", extensions: ["xml"] }]
  };

  return dialog.showSaveDialog(null, options);
}

/**
 * Show a simple dialog box of OS
 * @access public
 * @param title
 * @param message
 * @returns {Promise<Electron.MessageBoxReturnValue>}
 */
function showInfoBox(title, message) {
  return dialog.showMessageBox({
    type: "info",
    title: title,
    message: message
  });
}

module.exports = {
  openXMLFile,
  showSaveDialog,
  showInfoBox
};
