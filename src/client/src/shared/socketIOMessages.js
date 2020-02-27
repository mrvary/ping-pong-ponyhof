// message for the client-server communication used by socket io
module.exports = {
  // ********************************
  // client -> server
  // ********************************
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  LOGIN_REQUEST: "login-request",
  UPDATE_SETS_REQUEST: "send-set-to-server",

  // ********************************
  // server -> client
  // ********************************
  AVAILABLE_TABLES: "available-tables",
  CANCEL_ROUND: "cancel-round",
  COMPETITION_CANCELED: "competition-canceled",
  NEXT_ROUND: "next-round",
  LOGIN_RESPONSE: "login-response",
  START_ROUND: "start-round",
  UPDATE_SETS_RESPONSE: "send-set-to-server"
};
