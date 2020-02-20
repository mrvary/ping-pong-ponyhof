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

function showInfoBox(title, message) {
  dialog.showMessageBox({
    type: "info",
    title: title,
    message: message
  });
}

module.exports = {
  openXMLFile,
  showInfoBox
};
