/**
 * @author Marco Goebel
 */

const { dialog } = require("electron");

// open file dialog looking for xml
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

function showSaveDialog(defaultFilePath) {
  const options = {
    title: "Turnier exportieren",
    buttonLabel: "Speichern",
    defaultPath: defaultFilePath,
    filter: [{ name: "XML", extensions: ["xml"] }]
  };

  return dialog.showSaveDialog(null, options, path => {
    console.log(path);
  });
}

function showInfoBox(title, message) {
  dialog.showMessageBox({
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
