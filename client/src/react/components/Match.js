import React from 'react';

import ConnectionStatus from './ConnectionStatus';
import Title from './Title';

function Match({
  appTitle,
  isConnected,
  message,
  sendMessage,
  messageChanged
}) {
  return (
    <div>
      <Title title={appTitle} />
      <ConnectionStatus isConnected={isConnected} />
      <form className="submit" onSubmit={sendMessage}>
        Message
        <input
          type="text"
          value={message}
          placeholder="Type here"
          onChange={messageChanged}
        />
        <button type="submit">Senden</button>
      </form>
    </div>
  );
}

export default Match;
