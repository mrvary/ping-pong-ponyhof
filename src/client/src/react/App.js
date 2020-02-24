import React, { useState } from "react";
import "./App.css";

// import shared
import io from "socket.io-client";
import socketIOChannels from "../shared/socket-io-channels";

// import routing components
import Login from "./pages/Login/Login";
import WaitForRound from "./pages/WaitForRound/WaitForRound";
import Match from "./pages/Match";

const appTitle = "TTRace";

// for development: the requested server is the webserver
//                  from the electron app and not the
//                  development server of the react app
// for production:  the requested server is the one and only
const isDev = true;
const getServerURL = () => {
  let url = isDev ? "localhost:4000" : document.location.host;
  console.log("Requested server: ", url);
  return url;
};

function App() {
  const [socket, setSocket] = useState(null);
  const [page, setPage] = useState("login");
  const [isConnected, setIsConnected] = useState(false);

  const [availableTables, setAvailableTables] = useState([]);
  const [tableNumber, setTableNumber] = useState(-1);
  const [match, setMatch] = useState(null);

  const toPage = page => {
    setPage(page);
  };

  const content = () => {
    if (page === "login") {
      return (
        <Login
          appTitle={appTitle}
          isConnected={isConnected}
          availableTables={availableTables}
          tableNumber={tableNumber}
          sendTableNumber={sendTableNumber}
          tableNumberChanged={handleTableNumberChange}
        />
      );
    } else if (page === "wait") {
      return <WaitForRound appTitle={appTitle} isConnected={isConnected} />;
    } else if (page === "match") {
      return (
        <Match appTitle={appTitle} isConnected={isConnected} match={match} />
      );
    }
  };

  const sendTableNumber = event => {
    event.preventDefault();
    if (tableNumber >= 1) {
      socket.emit(socketIOChannels.LOGIN_TABLE, { tableNumber });
    }
  };

  const handleTableNumberChange = event => {
    setTableNumber(event.target.value);
  };

  if (!socket) {
    const base_url = getServerURL();
    const connection = io(base_url);

    connection.on(socketIOChannels.AVAILABLE_TABLES, tables => {
      console.log(tables);

      setAvailableTables(tables);
      setTableNumber(tables[0]);
    });

    connection.on(socketIOChannels.LOGIN_TABLE, data => {
      const { tableNumber, matchStarted } = data;
      console.log(data);
      setIsConnected(true);

      console.log("matchStart ->", matchStarted);
      matchStarted
        ? connection.emit(socketIOChannels.GET_MATCH, { tableNumber })
        : toPage("wait");

      connection.on(socketIOChannels.START_ROUND, () => {
        connection.emit(socketIOChannels.GET_MATCH, { tableNumber });
      });

      connection.on(socketIOChannels.SEND_MATCH, data => {
        const { match } = data;
        setMatch(match);

        toPage("match");
      });
    });

    connection.on(socketIOChannels.LOGIN_ERROR, data => {
      const { tableNumber } = data;
      alert(
        `A device is already connected with the table ${tableNumber} or all slots are busy`
      );
    });

    setSocket(connection);
  }

  return <div className="client-container">{content()}</div>;
}

export default App;
