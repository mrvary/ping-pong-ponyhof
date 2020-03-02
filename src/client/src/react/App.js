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

const ACTION_TYPE = {
  SET_TABLE_NUMBER: "set-table-number",
  LOGGED_IN: "logged-in",
  TABLES_AVAILABLE: "tables-available",
  ROUND_CANCELED: "round-canceled",
  ROUND_STARTED: "round-started",
  ROUND_AVAILABLE: "round-available",
  COMPETITION_CANCELED: "competition-canceled",
  MATCH_SEND_RESPONSE: "match-send-request",
  MATCH_FINISHED: "match-finished"
};

const initialState = {
  view: CLIENT_STATE.LOGIN,
  isConnected: false,
  availableTables: [],
  match: undefined,
  tableNumber: undefined,
  message: "",
  roundStarted: false
};

const reducer = (state, action) => {
  if (isNotLoggedIn(state, action)) {
    return state;
  }

  switch (action.type) {
    case ACTION_TYPE.SET_TABLE_NUMBER:
      return { ...state, tableNumber: action.tableNumber };

    case ACTION_TYPE.LOGGED_IN:
      return loggedIn(state, action);

    case ACTION_TYPE.TABLES_AVAILABLE:
      return {
        ...state,
        availableTables: action.availableTables,
        tableNumber: setTableNumber(state.tableNumber, action.availableTables)
      };

    case ACTION_TYPE.ROUND_CANCELED:
      return switchToWaiting(state, "Runde abgebrochen, kleinen Moment bitte!");

    case ACTION_TYPE.ROUND_STARTED:
      return { ...state, view: CLIENT_STATE.MATCH };

    case ACTION_TYPE.ROUND_AVAILABLE:
      return roundAvailable(state, action);

    case ACTION_TYPE.COMPETITION_CANCELED:
      return switchToWaiting(
        state,
        "Turnier abgebrochen, kleinen Moment bitte!"
      );

    case ACTION_TYPE.MATCH_FINISHED:
      const newStateWithoutMatch = switchToWaiting(
        state,
        "Runde beendet. Demnächst geht es weiter."
      );
      return { newStateWithoutMatch, match: action.match };

    case ACTION_TYPE.UPDATE_SETS_RESPONSE:
      return updateSetsResponse(state, action);

    default:
      return state;
  }
};

function switchToWaiting(state, message) {
  return {
    ...state,
    match: undefined,
    roundStarted: false,
    message,
    view: CLIENT_STATE.WAITING
  };
}

function isNotLoggedIn(state, action) {
  return (
    state.view === CLIENT_STATE.LOGIN &&
    action.type !== ACTION_TYPE.LOGGED_IN &&
    action.type !== ACTION_TYPE.SET_TABLE_NUMBER &&
    action.type !== ACTION_TYPE.TABLES_AVAILABLE
  );
}

function updateSetsResponse(state, action) {
  if (action.message === "SUCCESS") {
    console.info("Sets successfully sent");
    return { ...state, match: undefined };
  }
  console.info("Could not send sets, trying again in 1000 ms.");
  setTimeout(App.sendSets(state.match), 1000);
}

function roundAvailable(state, action) {
  const matchForTable = action.matches.find(
    match => match.tableNumber === state.tableNumber
  );

  if (matchForTable) {
    const { match, player1, player2 } = matchForTable;
    return {
      ...state,
      match: {
        ...match,
        player1,
        player2
      },
      view: CLIENT_STATE.NEXT_PLAYERS,
      message: ""
    };
  }
  console.error(
    "Couldn't start round. No match found for table " + state.tableNumber
  );
  return state;
}

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
          sendSets={sendSets}
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
  };

  const sendSets = match => event => {
    event.preventDefault();
    const finished = isMatchFinished(match);
    const data = {
      sets: match.sets,
      finished,
      tableNumber: match.tableNumber
    };

    console.info("CLIENT->SERVER: UPDATE_SETS_REQUEST");
    socket.emit(socketIOMessages.UPDATE_SETS_REQUEST, data);

    if (finished) {
      dispatch({ type: ACTION_TYPE.MATCH_FINISHED, match });
    }
  };

  const handleTableNumberChange = event => {
    const newTableNumber = parseInt(event.target.value, 10);

    dispatch({
      type: ACTION_TYPE.SET_TABLE_NUMBER,
      tableNumber: newTableNumber
    });
  };

  // register sockets for client - server communication
  if (!socket) {
    const base_url = getServerURL();
    const connection = io(base_url);

    connection.on(socketIOMessages.AVAILABLE_TABLES, tables => {
      console.info("SERVER->CLIENT: AVAILABLE_TABLES");

      dispatch({ type: ACTION_TYPE.TABLES_AVAILABLE, availableTables: tables });
    });

    connection.on(socketIOMessages.LOGIN_RESPONSE, data => {
      console.info("SERVER->CLIENT: LOGIN_RESPONSE");

      const { roundStarted, match, message } = data;
      dispatch({
        type: ACTION_TYPE.LOGGED_IN,
        message,
        match,
        isConnected: !message,
        roundStarted
      });
    });

    connection.on(socketIOMessages.NEXT_ROUND, data => {
      console.info("SERVER->CLIENT: NEXT_ROUND");

      dispatch({
        type: ACTION_TYPE.ROUND_AVAILABLE,
        matches: data.matchesWithPlayers
      });
    });

    connection.on(socketIOMessages.START_ROUND, () => {
      console.info("SERVER->CLIENT: START_ROUND");

      dispatch({ type: ACTION_TYPE.ROUND_STARTED });
    });

    connection.on(socketIOMessages.CANCEL_ROUND, () => {
      console.info("SERVER->CLIENT: CANCEL_ROUND");

      dispatch({ type: ACTION_TYPE.ROUND_CANCELED });
    });

    connection.on(socketIOMessages.UPDATE_SETS_RESPONSE, data => {
      console.info("SERVER->CLIENT: UPDATE_SETS_RESPONSE");

      if (!data) {
        console.error("Missing data in UPDATE_SETS_RESPONSE");
      }

      dispatch({
        type: ACTION_TYPE.UPDATE_SETS_RESPONSE,
        message: data.message || ""
      });
    });

    connection.on(socketIOMessages.CANCEL_COMPETITION, () => {
      console.info("SERVER->CLIENT: COMPETITION_CANCELED");

      dispatch({ type: ACTION_TYPE.COMPETITION_CANCELED });
    });

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
