/**
 * @author Marco Goebel
 */

// messages for the ipc-communication in the electron application
module.exports = {
  // ********************************
  // ipc-renderer -> ipc-main
  // ********************************
  GET_COMPETITIONS_REQUEST: "get-competitions-request",
  DELETE_COMPETITION_REQUEST: "delete-competition-request",

  OPEN_FILE_DIALOG_REQUEST: "open-import-dialog-request",
  GET_COMPETITION_PREVIEW_REQUEST: "get-competition-preview-request",
  IMPORT_XML_FILE_REQUEST: "import-xml-file-request",

  GET_COMPETITION_MATCHES_REQUEST: "get-matches",
  UPDATE_SETS: "update-sets",

  START_COMPETITION: "start-competition",
  CANCEL_COMPETITION: "cancel-competition",
  COMPLETE_COMPETITION: "complete-competition",

  START_ROUND: "start-round",
  NEXT_ROUND: "next-round",
  CANCEL_ROUND: "cancel-round",

  OPEN_NEW_WINDOW: "open-new-window",

  // ********************************
  // ipc-main -> ipc-renderer
  // ********************************
  GET_COMPETITIONS_RESPONSE: "get-competitions-response",
  DELETE_COMPETITION_RESPONSE: "delete-competition-request",

  OPEN_FILE_DIALOG_RESPONSE: "open-import-dialog-response",
  GET_COMPETITION_PREVIEW_RESPONSE: "get-competition-preview-response",
  IMPORT_XML_FILE_RESPONSE: "import-xml-file_response",

  UPDATE_MATCHES: "update-matches"
};
