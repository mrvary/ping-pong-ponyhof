// message for the client-server communication used by socket io
module.exports = {
  SEND_MESSAGE: "send-message",
  CONNECTION: "connection",
  DISCONNECT: "disconnect",

  LOGIN_TABLE: "login-table",
  LOGIN_ERROR: "login-error",

  GET_MATCH: "get-match-by-tablenumber",
  SEND_MATCH: "send-match-to-client",
  SEND_SET: "send-set-to-server",

  AVAILABLE_TABLES: "available-tables",
  START_ROUND: "start-round",
  NEXT_ROUND: "next-round"
};
