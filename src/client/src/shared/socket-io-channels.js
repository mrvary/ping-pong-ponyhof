// channels for the client-server communication used by socket io
module.exports = {
    // io channels
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',

    // custom channels
    LOGIN_TABLE: 'login-table',
    LOGIN_ERROR: 'login-error',
    SEND_MESSAGE: 'send-message',
    AVAILABLE_TABLES: 'available-tables',

    GET_MATCH: 'get-match-by-tablenumber',
    SEND_MATCH: 'send-match-to-client',

    // broadcast channels
    START_ROUND: 'start-round'
};
