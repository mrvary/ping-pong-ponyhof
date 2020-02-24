// message for the client-server communication used by socket io
module.exports = {
  // client -> server messages
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  LOGIN_REQUEST: "login-request",
  UPDATE_SETS: "send-set-to-server",

  // server -> client messages
  AVAILABLE_TABLES: "available-tables",
  START_ROUND: "start-round",
  NEXT_ROUND: "next-round",
  LOGIN_RESPONSE: "login-response",
  COMPETITION_CANCELED: "competition-canceled"
};
