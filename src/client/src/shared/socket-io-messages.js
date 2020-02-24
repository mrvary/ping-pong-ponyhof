// message for the client-server communication used by socket io
module.exports = {
  // generic
  SEND_MESSAGE: "send-message",

  // client -> server messages
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  LOGIN_REQUEST: "login-request",
  MATCH_REQUEST: "get-match-by-tablenumber",
  MATCH_RESPONSE: "send-match-to-client",
  UPDATE_SETS: "send-set-to-server",

  // server -> client messages
  AVAILABLE_TABLES: "available-tables",
  START_ROUND: "start-round",
  LOGIN_ERROR: "login-error",
  NEXT_ROUND: "next-round",
  LOGIN_RESPONSE: "login-response"
};
