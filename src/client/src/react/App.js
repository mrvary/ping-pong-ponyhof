import React, { useState } from "react";
import "./App.css";
import { isMatchFinished } from "./lib";

// import shared
import io from "socket.io-client";
import socketIOMessages from "../shared/socketIOMessages";

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
  const [localMatch, setLocalMatch] = useState(null);
  const [waitingMessage, setWaitingMessage] = useState("");

  const content = () => {
    if (view === "LOGIN") {
      return (
        <LoginView
          availableTables={availableTables}
          tableNumber={tableNumber}
          sendTableNumber={sendTableNumber}
          tableNumberChanged={handleTableNumberChange}
        />
      );
    }

    if (view === "NO_COMP") {
      return (
        <div>
          <Title title="No competition started yet, please wait."></Title>
        </div>
      );
    }

    if (view === "NEXT_PLAYERS" || view === "MATCH") {
      return (
        <MatchView
          onlyShowNextPlayers={view === "NEXT_PLAYERS"}
          match={localMatch}
          sendSets={sendSets}
        />
      );
    }

    if (view === "WAITING") {
      return <WaitingView message={waitingMessage} />;
    }

    // render nothing if none of the above states
    return <></>;
  };

  const sendTableNumber = event => {
    event.preventDefault();
    console.info("CLIENT->SERVER: LOGIN_REQUEST");
    socket.emit(socketIOMessages.LOGIN_REQUEST, { tableNumber });
    setWaitingMessage("waiting for server response");
    setView("WAITING");
  };

  const sendSets = match => event => {
    const finished = isMatchFinished(match);
    const data = {
      sets: match.sets,
      finished,
      tableNumber
    };

    console.info("CLIENT->SERVER: UPDATE_SETS_REQUEST");
    socket.emit(socketIOMessages.UPDATE_SETS_REQUEST, data);

    if (finished) {
      localMatch(null);
      setWaitingMessage("waiting for next round");
      setView("WAITING");
    }
  };

  const handleTableNumberChange = event => {
    const tableNumber = Number(event.target.value);
    setTableNumber(tableNumber);
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

      const { roundStarted, match, message } = data;

      // present, when something went wrong
      if (message) {
        setView("LOGIN");
        alert(message);
        return;
      }

      setIsConnected(true);
      setLocalMatch(match);

      if (match && isMatchFinished(match)) {
        console.info("match is finished");
        setWaitingMessage("waiting for next round to start");
        setView("WAITING");
        return;
      }

      if (match && roundStarted) {
        console.info("round is started");
        setView("MATCH");
        return;
      }

      if (match) {
        console.info("round is started");
        setView("NEXT_PLAYERS");
        return;
      }

      setView("NO_COMP");
    });

    connection.on(socketIOMessages.NEXT_ROUND, data => {
      console.info("SERVER->CLIENT: NEXT_ROUND");

      if (view !== "WAITING" || view !== "NO_COMP") {
        return;
      }
      const { matchesWithPlayers } = data;
      const match = matchesWithPlayers.find(
        match => match.tableNumber === tableNumber
      );

      if (!match) {
        console.error(`No match for table number ${tableNumber}`);
        return;
      }

      setLocalMatch(match);
      match.roundStarted ? setView("MATCH") : setView("NEXT_PLAYERS");
    });

    connection.on(socketIOMessages.START_ROUND, () => {
      console.info("SERVER->CLIENT: START_ROUND");

      if (view !== "NEXT_PLAYERS") {
        console.error("Wrong view, could not start round");
        return;
      }

      setView("MATCH");
    });

    connection.on(socketIOMessages.CANCEL_ROUND, () => {
      console.info("SERVER->CLIENT: CANCEL_ROUND");

      if (view === "LOGIN") {
        return;
      }

      setWaitingMessage("Round was cancelled, waiting for new round.");
      setView("WAITING");
    });

    connection.on(socketIOMessages.UPDATE_SETS_RESPONSE, () => {
      console.info("SERVER->CLIENT: UPDATE_SETS_RESPONSE");

      console.info("Could not send sets, trying again in 1000 ms.");
      const { sets } = localMatch;
      setInterval(
        () =>
          socket.emit(socketIOMessages.UPDATE_SETS_REQUEST, {
            tableNumber,
            sets
          }),
        1000
      );
    });

    connection.on(socketIOMessages.COMPETITION_CANCELED, () => {
      console.info("SERVER->CLIENT: COMPETITION_CANCELED");

      if (view === "LOGIN") {
        return;
      }

      setView("NO_COMP");
    });

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
