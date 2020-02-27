/**
 * @author Marco Goebel
 */

// messages for redirect incoming events from server to IPC-Main
module.exports = {
  // ********************************
  // ipc-server -> ipc-main
  // ********************************
  UPDATE_CONNECTION_STATUS: "update-connection-status",
  STATE_REQUEST: "state-request",
  UPDATE_SETS_REQUEST: "update-sets-request",

  // ********************************
  // ipc-main -> ipc-server
  // ********************************
  STATE_RESPONSE: "state-response",
  UPDATE_SETS_RESPONSE: "update-sets-response"
};
