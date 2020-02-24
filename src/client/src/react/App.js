import React, { useState } from "react";
import "./App.css";

// import shared
import io from "socket.io-client";
import socketIOMessages from "../shared/socket-io-messages";

// import routing components
import Login from "./pages/Login/Login";
import WaitForRound from "./pages/WaitForRound/WaitForRound";
import Match from "./pages/Match";

import Title from "./components/Title";

const appTitle = "TTRace";

// for development: the requested server is the webserver
//                  from the electron app and not the
//                  development server of the react app
// for production:  the requested server is the one and only
const isDev = true;
const getServerURL = () => {
  const url = isDev ? "localhost:4000" : document.location.host;
  console.log("Requested server: ", url);
  return url;
};

function App() {
  const [socket, setSocket] = useState(null);

  // possibilities: LOGIN | NO_COMP | NEXT_PLAYERS | MATCH | WAITING
  const [page, setPage] = useState("LOGIN");
  const [isConnected, setIsConnected] = useState(false);

  const [availableTables, setAvailableTables] = useState([]);
  const [tableNumber, setTableNumber] = useState(-1);
  const [matchWithPlayers, setMatchWithPlayers] = useState(null);

  const content = () => {
    const currentPage = page;
    if (currentPage === "LOGIN") {
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
    }

    if (currentPage === "NO_COMP") {
      return (
        <div>
          <Title title="No competition started yet, please wait."></Title>
        </div>
      );
    }

    if (currentPage === "NEXT_PLAYERS" || currentPage === "MATCH") {
      return (
        <Match
          appTitle={appTitle}
          isConnected={isConnected}
          onlyShowNextPlayers={currentPage === "NEXT_PLAYERS"}
          matchWithPlayers={matchWithPlayers}
          sendFinishedMatch={sendFinishedMatch}
          sendSets={sendSets}
        />
      );
    }

    if (currentPage === "WAITING") {
      return <WaitForRound appTitle={appTitle} isConnected={isConnected} />;
    }
    return <></>;
  };

  const sendTableNumber = event => {
    event.preventDefault();
    console.log("CLIENT->SERVER: LOGIN_TABLE");
    socket.emit(socketIOMessages.LOGIN_TABLE, { tableNumber });
    setPage("WAITING");
  };

  const sendFinishedMatch = match => event => {
    console.log("CLIENT->SERVER: SEND_MATCH (FINISHED) ");
    socket.emit(socketIOMessages.SEND_MATCH, { match });
    setPage("WAITING");
  };

  const sendSets = sets => event => {
    console.log("CLIENT->SERVER: SEND_SET");
    socket.emit(socketIOMessages.SEND_SET, { tableNumber, sets });
  };

  const handleTableNumberChange = event => {
    setTableNumber(event.target.value);
  };

  if (!socket) {
    const base_url = getServerURL();
    const connection = io(base_url);

    connection.on(socketIOMessages.AVAILABLE_TABLES, tables => {
      console.log("SERVER->CLIENT: AVAILABLE_TABLES");
      console.log(tables);

      setAvailableTables(tables);
      setTableNumber(tables[0]);
    });

    connection.on(socketIOMessages.LOGIN_TABLE, data => {
      console.log("SERVER->CLIENT: LOGIN_TABLE");
      // const { tableNumber, competitionStatus } = data;

      console.log("data: ");
      console.log(data);
      setIsConnected(true);

      // why not also send_match?
      console.log("CLIENT->SERVER: GET_MATCH");
      connection.emit(socketIOMessages.GET_MATCH, { tableNumber });
    });

    connection.on(socketIOMessages.NEXT_ROUND, () => {
      console.log("SERVER->CLIENT: NEXT_ROUND");
      setPage("NEXT_PLAYERS");
    });

    connection.on(socketIOMessages.START_ROUND, () => {
      console.log("SERVER->CLIENT: START_ROUND");
      setPage("MATCH");
    });

    connection.on(socketIOMessages.SEND_MATCH, data => {
      console.log("SERVER->CLIENT: SEND_MATCH");
      const { matchWithPlayers, roundStarted } = data;
      console.log(matchWithPlayers);
      console.log(data);

      setMatchWithPlayers(matchWithPlayers);

      // roundStarted ? setPage("MATCH") : setPage("NEXT_PLAYERS");
    });

    connection.on(socketIOMessages.LOGIN_ERROR, data => {
      console.log("SERVER->CLIENT: LOGIN_ERROR");
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
