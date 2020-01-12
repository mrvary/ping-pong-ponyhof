const fs = require('fs');

function createDirectorySync(directory) {
  try {
    fs.statSync(directory);
  } catch (e) {
    fs.mkdirSync(directory);
  }
}

module.exports = {
  createDirectorySync
};
