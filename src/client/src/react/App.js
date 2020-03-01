import React, { useEffect, useState, useReducer } from "react";
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

const TITLE = "TTRace";

let socket;
const isDev = true;

const getServerURL = () => {
  // for development: the requested server is the webserver
  //                  from the electron app and not the
  //                  development server of the react app
  // for production:  the requested server is the one and only
  const url = isDev ? "localhost:4000" : document.location.host;
  console.info("Requested server: ", url);
  return url;
};

const CLIENT_STATE = {
  LOGIN: "login",
  WAITING: "waiting",
  MATCH: "match",
  NEXT_PLAYERS: "next-players"
};

const initialState = {
  view: CLIENT_STATE.LOGIN,
  isConnected: false,
  availableTables: [],
  match: undefined,
  tableNumber: undefined,
  message: ""
  // roundStarted: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setTableNumber":
      return { ...state, tableNumber: action.tableNumber };

    case "loggedIn":
      return loggedIn(state, action);

    case "tablesAvailable":
      return {
        ...state,
        availableTables: action.availableTables,
        tableNumber: setTableNumber(state.tableNumber, action.availableTables)
      };

    case "roundCanceled":
      return state;

    case "roundStarted":
      return state;

    case "roundAvailable":
      return state;

    case "competitionCanceled":
      return state;

    default:
      return state;
  }
};

function loggedIn(state, action) {
  const { isConnected, match, roundStarted, message } = action;
  const newState = { ...state, isConnected, match, roundStarted, message };

  if (message) {
    console.error(message);
    return { ...state, message };
  }

  if (match && isMatchFinished(match)) {
    console.info("match is finished");
    return {
      ...newState,
      message: "Spiel beendet. Warten auf die nächste Runde.",
      view: CLIENT_STATE.WAITING
    };
  }

  if (match && roundStarted) {
    console.info("round is started");
    return { ...newState, view: CLIENT_STATE.MATCH };
  }

  if (match) {
    console.info("round is started");
    return { ...newState, view: CLIENT_STATE.NEXT_PLAYERS };
  }

  return {
    ...newState,
    message: "Kein laufendes Turnier.",
    view: CLIENT_STATE.WAITING
  };
}

function setTableNumber(currentNumber, tables) {
  const isNotSet = currentNumber < 1;
  const isNotAvailable = !tables.find(n => n === currentNumber);

  if (isNotSet || isNotAvailable) {
    // pick first available number
    return tables[0];
  }
  return currentNumber;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // set tableNumber when availableTables are non-empty
  // useEffect(() => {
  //   if (state.tableNumber < 0 && state.availableTables.length > 0) {
  //     dispatch({
  //       type: "setTableNumber",
  //       tableNumber: state.availableTables[0]
  //     });
  //   }
  // }, [state]);

  const content = () => {
    if (state.view === CLIENT_STATE.LOGIN) {
      return (
        <LoginView
          availableTables={state.availableTables}
          tableNumber={state.tableNumber}
          sendTableNumber={sendTableNumber(state.tableNumber)}
          tableNumberChanged={handleTableNumberChange}
        />
      );
    }

    if (
      state.view === CLIENT_STATE.NEXT_PLAYERS ||
      state.view === CLIENT_STATE.MATCH
    ) {
      return (
        <MatchView
          onlyShowNextPlayers={state.view === CLIENT_STATE.NEXT_PLAYERS}
          match={state.match}
          // sendSets={sendSets}
        />
      );
    }

    if (state.view === CLIENT_STATE.WAITING) {
      return <WaitingView message={state.message} />;
    }

    // render nothing if none of the above states
    return <></>;
  };

  const sendTableNumber = tableNumber => event => {
    event.preventDefault();
    console.info("CLIENT->SERVER: LOGIN_REQUEST");
    socket.emit(socketIOMessages.LOGIN_REQUEST, { tableNumber });
    // setWaitingMessage("waiting for server response");
    // setView("WAITING");
  };

  // const sendSets = match => event => {
  //   const finished = isMatchFinished(match);
  //   const data = {
  //     sets: match.sets,
  //     finished,
  //     tableNumber: match.tableNumber
  //   };

  //   console.info("CLIENT->SERVER: UPDATE_SETS_REQUEST");
  //   socket.emit(socketIOMessages.UPDATE_SETS_REQUEST, data);

  //   if (finished) {
  //     localMatch(undefined);
  //     setWaitingMessage("waiting for next round");
  //     setView("WAITING");
  //   }
  // };

  const handleTableNumberChange = event => {
    const newTableNumber = parseInt(event.target.value, 10);

    dispatch({
      type: "setTableNumber",
      tableNumber: newTableNumber
    });
  };

  // register sockets for client - server communication
  if (!socket) {
    const base_url = getServerURL();
    const connection = io(base_url);

    connection.on(socketIOMessages.AVAILABLE_TABLES, tables => {
      console.info("SERVER->CLIENT: AVAILABLE_TABLES");
      dispatch({ type: "tablesAvailable", availableTables: tables });
      // todo: siehe unten
      // setTableNumber(tables[0]);
    });

    connection.on(socketIOMessages.LOGIN_RESPONSE, data => {
      console.info("SERVER->CLIENT: LOGIN_RESPONSE");

      const { roundStarted, match, message } = data;
      dispatch({
        type: "loggedIn",
        message,
        match,
        isConnected: !message,
        roundStarted
      });
    });

    // connection.on(socketIOMessages.NEXT_ROUND, data => {
    //   console.info("SERVER->CLIENT: NEXT_ROUND");

    //   const { matchesWithPlayers } = data;
    //   setMatchesWithPlayers(matchesWithPlayers);
    // });

    // connection.on(socketIOMessages.START_ROUND, () => {
    //   console.info("SERVER->CLIENT: START_ROUND");

    //   if (view !== "NEXT_PLAYERS") {
    //     console.error("Wrong view, could not start round");
    //     return;
    //   }

    //   setView("MATCH");
    // });

    // connection.on(socketIOMessages.CANCEL_ROUND, () => {
    //   console.info("SERVER->CLIENT: CANCEL_ROUND");

    //   if (view === "LOGIN") {
    //     return;
    //   }

    //   setWaitingMessage("Round was cancelled, waiting for new round.");
    //   setView("WAITING");
    // });

    // connection.on(socketIOMessages.UPDATE_SETS_RESPONSE, () => {
    //   console.info("SERVER->CLIENT: UPDATE_SETS_RESPONSE");

    //   console.info("Could not send sets, trying again in 1000 ms.");
    //   const { sets } = localMatch;
    //   setInterval(
    //     () =>
    //       socket.emit(socketIOMessages.UPDATE_SETS_REQUEST, {
    //         tableNumber,
    //         sets
    //       }),
    //     1000
    //   );
    // });

    // connection.on(socketIOMessages.COMPETITION_CANCELED, () => {
    //   console.info("SERVER->CLIENT: COMPETITION_CANCELED");

    //   if (view === "LOGIN") {
    //     return;
    //   }

    // setView("NO_COMP");
    // });

    socket = connection;
  }

  return (
    <div className="client-container">
      <Title title={TITLE} />
      <ConnectionStatus isConnected={state.isConnected} />
      {content()}
    </div>
  );
}

export default App;

// useEffect(() => {
//   if (matchesWithPlayers.length < 1) {
//     return;
//   }
//   const matchWithPlayers = matchesWithPlayers.find(
//     matchWithPlayers => matchWithPlayers.tableNumber === tableNumber
//   );

//   if (!matchWithPlayers) {
//     console.error(`No match for table number ${tableNumber}`);
//     return;
//   }

//   const { match, player1, player2 } = matchWithPlayers;
//   setLocalMatch({ ...match, player1, player2 });
// }, [matchesWithPlayers, tableNumber]);

// useEffect(() => {
//   if (!isConnected) {
//     return;
//   }

//   if (localMatch && isMatchFinished(localMatch)) {
//     console.info("match is finished");
//     setWaitingMessage("waiting for next round to start");
//     setView("WAITING");
//     return;
//   }

//   if (localMatch && roundStarted) {
//     console.info("round is started");
//     setView("MATCH");
//     return;
//   }

//   if (localMatch) {
//     console.info("round is started");
//     setView("NEXT_PLAYERS");
//     return;
//   }

//   setView("NO_COMP");
// }, [localMatch, roundStarted, isConnected]);
