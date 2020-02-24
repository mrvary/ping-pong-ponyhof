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
    console.log("CLIENT->SERVER: LOGIN_REQUEST");
    socket.emit(socketIOMessages.LOGIN_REQUEST, { tableNumber });
    setPage("WAITING");
  };

  const sendFinishedMatch = match => event => {
    // todo -> { sets: [], finished: true }
    // console.log("CLIENT->SERVER: UPDATE_SETS (FINISHED) ");
    // socket.emit(socketIOMessages.UPDATE_SETS { match });
    setPage("WAITING");
  };

  const sendSets = sets => event => {
    // todo -> { sets: [], finished: false }
    console.log("CLIENT->SERVER: UPDATE_SETS");
    socket.emit(socketIOMessages.UPDATE_SETS, { tableNumber, sets });
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

    connection.on(socketIOMessages.LOGIN_RESPONSE, data => {
      console.log("SERVER->CLIENT: LOGIN_RESPONSE");
      // check message for error
      // response: { tableNumber, roundStarted, match, message }
      // if (match && match finished) WAITING
      // if (roundStarted && match) MATCH;
      // if (match) NEXT_PLAYERS
      // NO_COMP

      console.log("data: ");
      console.log(data);
      setIsConnected(true);
    });

    connection.on(socketIOMessages.NEXT_ROUND, () => {
      if (page === "MATCH" || page === "LOGIN") {
        return;
      }
      console.log("SERVER->CLIENT: NEXT_ROUND");
      setMatchWithPlayers(matchWithPlayers);

      // roundStarted ? setPage("MATCH") : setPage("NEXT_PLAYERS");
      setPage("NEXT_PLAYERS");
    });

    connection.on(socketIOMessages.START_ROUND, () => {
      console.log("SERVER->CLIENT: START_ROUND");
      setPage("MATCH");
    });

    connection.on(socketIOMessages.CANCEL_ROUND, () => {
      console.log("SERVER->CLIENT: CANCEL_ROUND");
      // page -> WAITING
    });

    connection.on(socketIOMessages.COMPETITION_CANCELED, () => {
      console.log("SERVER->CLIENT: COMPETITION_CANCELED");
      // page -> NO-COMP
    });
    // remove
    // connection.on(socketIOMessages.UPDATE_SETS, data => {
    //   console.log("SERVER->CLIENT: UPDATE_SETS");
    //   const { matchWithPlayers, roundStarted } = data;
    //   console.log(matchWithPlayers);
    //   console.log(data);

    // });

    // remove
    // connection.on(socketIOMessages.LOGIN_ERROR, data => {
    //   console.log("SERVER->CLIENT: LOGIN_ERROR");
    //   const { tableNumber } = data;
    //   alert(
    //     `A device is already connected with the table ${tableNumber} or all slots are busy`
    //   );
    // });

    setSocket(connection);
  }

  return <div className="client-container">{content()}</div>;
}

export default App;
