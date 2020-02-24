// message for the client-server communication used by socket io
module.exports = {
  // generic
  SEND_MESSAGE: "send-message",

  // client -> server messages
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  LOGIN_TABLE: "login-table",
  GET_MATCH: "get-match-by-tablenumber",
  SEND_MATCH: "send-match-to-client",
  SEND_SET: "send-set-to-server",

  // server -> client messages
  AVAILABLE_TABLES: "available-tables",
  START_ROUND: "start-round",
  LOGIN_ERROR: "login-error",
  NEXT_ROUND: "next-round"
};
