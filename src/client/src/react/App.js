import React, { useState } from "react";
import "./App.css";

// import shared
import io from "socket.io-client";
import socketIOMessages from "../shared/socket-io-messages";

// COMPONENTS
import LoginView from "./views/LoginView";
import WaitingView from "./views/WaitingView";
import MatchView from "./views/MatchView";
import ConnectionStatus from "./components/ConnectionStatus";
import Title from "./components/Title";

const appTitle = "TTRace";

// for development: the requested server is the webserver
//                  from the electron app and not the
//                  development server of the react app
// for production:  the requested server is the one and only
const isDev = true;
const getServerURL = () => {
  const url = isDev ? "localhost:4000" : document.location.host;
  console.info("Requested server: ", url);
  return url;
};

function App() {
  const [socket, setSocket] = useState(null);

  // possibilities: LOGIN | NO_COMP | NEXT_PLAYERS | MATCH | WAITING
  const [view, setView] = useState("LOGIN");
  const [isConnected, setIsConnected] = useState(false);

  const [availableTables, setAvailableTables] = useState([]);
  const [tableNumber, setTableNumber] = useState(-1);
  const [matchWithPlayers, setMatchWithPlayers] = useState(null);

  const content = () => {
    const currentPage = view;
    if (currentPage === "LOGIN") {
      return (
        <LoginView
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
        <MatchView
          onlyShowNextPlayers={currentPage === "NEXT_PLAYERS"}
          matchWithPlayers={matchWithPlayers}
          sendFinishedMatch={sendFinishedMatch}
          sendSets={sendSets}
        />
      );
    }

    if (currentPage === "WAITING") {
      return <WaitingView appTitle={appTitle} isConnected={isConnected} />;
    }

    // render nothing if none of the above states
    return <></>;
  };

  const sendTableNumber = event => {
    event.preventDefault();
    console.info("CLIENT->SERVER: LOGIN_REQUEST");
    socket.emit(socketIOMessages.LOGIN_REQUEST, { tableNumber });
    setView("WAITING");
  };

  const sendFinishedMatch = match => event => {
    // todo -> { sets: [], finished: true }
    // console.info("CLIENT->SERVER: UPDATE_SETS_REQUEST (FINISHED) ");
    // socket.emit(socketIOMessages.UPDATE_SETS_REQUEST { match });
    setView("WAITING");
  };

  const sendSets = sets => event => {
    // todo -> { sets: [], finished: false }
    console.info("CLIENT->SERVER: UPDATE_SETS_REQUEST");
    socket.emit(socketIOMessages.UPDATE_SETS_REQUEST, { tableNumber, sets });
  };

  const handleTableNumberChange = event => {
    setTableNumber(event.target.value);
  };

  // register sockets for client - server communication
  if (!socket) {
    const base_url = getServerURL();
    const connection = io(base_url);

    connection.on(socketIOMessages.AVAILABLE_TABLES, tables => {
      console.info("SERVER->CLIENT: AVAILABLE_TABLES");
      setAvailableTables(tables);
      setTableNumber(tables[0]);
    });

    connection.on(socketIOMessages.LOGIN_RESPONSE, data => {
      console.info("SERVER->CLIENT: LOGIN_RESPONSE");
      // check message for error
      // response: { tableNumber, roundStarted, match, message }
      // if (match && match finished) WAITING
      // if (roundStarted && match) MATCH;
      // if (match) NEXT_PLAYERS
      // NO_COMP

      console.info("data: ");
      console.info(data);
      setIsConnected(true);
    });

    connection.on(socketIOMessages.NEXT_ROUND, () => {
      // todo: get match from matches
      if (view === "MATCH" || view === "LOGIN") {
        return;
      }
      console.info("SERVER->CLIENT: NEXT_ROUND");
      setMatchWithPlayers(matchWithPlayers);

      // roundStarted ? setPage("MATCH") : setPage("NEXT_PLAYERS");
      setView("NEXT_PLAYERS");
    });

    connection.on(socketIOMessages.START_ROUND, () => {
      console.info("SERVER->CLIENT: START_ROUND");
      setView("MATCH");
    });

    connection.on(socketIOMessages.CANCEL_ROUND, () => {
      console.info("SERVER->CLIENT: CANCEL_ROUND");
      // page -> WAITING
    });

    connection.on(socketIOMessages.UPDATE_SETS_RESPONSE, () => {
      console.info("SERVER->CLIENT: UPDATE_SETS_RESPONSE");
      // error handling, probably send sets again
    });

    connection.on(socketIOMessages.COMPETITION_CANCELED, () => {
      console.info("SERVER->CLIENT: COMPETITION_CANCELED");
      // page -> NO-COMP
    });
    // remove
    // connection.on(socketIOMessages.UPDATE_SETS, data => {
    //   console.info("SERVER->CLIENT: UPDATE_SETS");
    //   const { matchWithPlayers, roundStarted } = data;
    //   console.info(matchWithPlayers);
    //   console.info(data);

    // });

    // remove
    // connection.on(socketIOMessages.LOGIN_ERROR, data => {
    //   console.info("SERVER->CLIENT: LOGIN_ERROR");
    //   const { tableNumber } = data;
    //   alert(
    //     `A device is already connected with the table ${tableNumber} or all slots are busy`
    //   );
    // });

    setSocket(connection);
  }

  return (
    <div className="client-container">
      <Title title={appTitle} />
      <ConnectionStatus isConnected={isConnected} />
      {content()}
    </div>
  );
}

export default App;
