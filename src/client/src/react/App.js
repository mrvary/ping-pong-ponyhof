import React, { useReducer } from "react";
import "./App.css";
import { isMatchFinished } from "../shared/lib";

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

const VIEW = {
  LOGIN: "login",
  WAITING: "waiting",
  MATCH: "match",
  NEXT_PLAYERS: "next-players"
};

const ACTION_TYPE = {
  // SET_TABLE_NUMBER: "set-table-number",
  LOGGED_IN: "logged-in",
  TABLES_AVAILABLE: "tables-available",
  ROUND_CANCELED: "round-canceled",
  ROUND_STARTED: "round-started",
  ROUND_AVAILABLE: "round-available",
  COMPETITION_CANCELED: "competition-canceled",
  MATCH_SEND_RESPONSE: "match-send-request",
  MATCH_FINISHED: "match-finished",
  SETS_UPDATED: "sets-updated",
  ADD_SET: "add-set",
  UPDATE_SETS_RESPONSE: "update-sets-response"
};

const initialState = {
  view: VIEW.LOGIN,
  isConnected: false,
  availableTables: [],
  match: undefined,
  confirmedTableNumber: -1,
  message: "",
  roundStarted: false
};

//
//
// ----- REDUCER
//
//

const reducer = (state, action) => {
  if (isNotLoggedIn(state, action)) {
    return state;
  }

  switch (action.type) {
    case ACTION_TYPE.LOGGED_IN:
      return loggedIn(state, action);

    case ACTION_TYPE.TABLES_AVAILABLE:
      return {
        ...state,
        availableTables: action.availableTables
      };

    case ACTION_TYPE.ROUND_CANCELED:
      return switchToWaiting(state, "Runde abgebrochen, kleinen Moment bitte!");

    case ACTION_TYPE.ROUND_STARTED:
      return roundStarted(state, action);

    case ACTION_TYPE.ROUND_AVAILABLE:
      return roundAvailable(state, action);

    case ACTION_TYPE.COMPETITION_CANCELED:
      return switchToWaiting(
        state,
        "Turnier abgebrochen, kleinen Moment bitte!"
      );

    case ACTION_TYPE.UPDATE_SETS_RESPONSE:
      return updateSetsResponse(state, action);

    case ACTION_TYPE.SETS_UPDATED:
      return { ...state, match: { ...state.match, sets: action.sets } };

    case ACTION_TYPE.ADD_SET:
      const newSet = { player1: 0, player2: 0 };
      return {
        ...state,
        match: { ...state.match, sets: [...state.match.sets, newSet] }
      };

    default:
      return state;
  }
};

function loggedIn(state, action) {
  const { match, roundStarted, message, tableNumber } = action.data;

  if (message) {
    console.error(message);
    return { ...state, message };
  }

  const newState = {
    ...state,
    isConnected: !message,
    roundStarted,
    message,
    confirmedTableNumber: tableNumber
  };

  if (match && isMatchFinished(match)) {
    console.info("match is finished");
    return {
      ...newState,
      match: filterAllUnplayedSetsExceptOne(match),
      message: "Spiel beendet. Warten auf die nächste Runde.",
      view: VIEW.WAITING
    };
  }

  if (match && roundStarted) {
    console.info("round is started");
    return {
      ...newState,
      match: filterAllUnplayedSetsExceptOne(match),
      view: VIEW.MATCH
    };
  }

  if (match) {
    console.info("round is available");
    return {
      ...newState,
      match: filterAllUnplayedSetsExceptOne(match),
      view: VIEW.NEXT_PLAYERS
    };
  }

  return {
    ...newState,
    message: "Kein laufendes Turnier.",
    view: VIEW.WAITING
  };
}

function switchToWaiting(state, message) {
  return {
    ...state,
    match: undefined,
    roundStarted: false,
    message,
    view: VIEW.WAITING
  };
}

function isNotLoggedIn(state, action) {
  return (
    state.view === VIEW.LOGIN &&
    action.type !== ACTION_TYPE.LOGGED_IN &&
    action.type !== ACTION_TYPE.TABLES_AVAILABLE
  );
}

function updateSetsResponse(state, action) {
  if (action.message === "success") {
    console.info("Sets successfully sent");
    return state;
  }

  if (action.message === "finished") {
    console.info("Sets successfully sent. Match is finished.");
    return switchToWaiting(state, "Runde beendet. Demnächst geht es weiter.");
  }

  console.info("Could not send sets");
  return { ...state, message: action.message };
}

function roundStarted(state, action) {
  if (!action.matchesWithPlayers) {
    return { ...state, view: VIEW.MATCH };
  }

  const newState = roundAvailable(state, action);
  return { ...newState, view: VIEW.MATCH };
}

function roundAvailable(state, action) {
  const matchForTable = action.matchesWithPlayers.find(
    match => match.tableNumber === state.confirmedTableNumber
  );

  if (matchForTable) {
    return {
      ...state,
      match: filterAllUnplayedSetsExceptOne(matchForTable.match),
      view: VIEW.NEXT_PLAYERS,
      message: ""
    };
  }

  console.error(
    `Couldn't start round. No match for table ${state.tableNumber}`
  );

  return state;
}

function filterAllUnplayedSetsExceptOne(match) {
  const allPlayedSets = match.sets.filter(
    set => set.player1 !== 0 || set.player2 !== 0
  );
  const updatedSets = [...allPlayedSets, { player1: 0, player2: 0 }];

  return { ...match, sets: updatedSets };
}

function padSetArrayWithEmptySets(sets) {
  const paddedArray = [...sets];
  while (paddedArray.length < 5) {
    paddedArray.push({ player1: 0, player2: 0 });
  }

  return sets;
}

//
//
// ----- APP COMPONENT
//
//

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const sendTableNumber = tableNumber => event => {
    event.preventDefault();
    console.info("CLIENT->SERVER: LOGIN_REQUEST");
    socket.emit(socketIOMessages.LOGIN_REQUEST, { tableNumber });
  };

  const sendSets = match => event => {
    event.preventDefault();

    const requestData = {
      sets: padSetArrayWithEmptySets(match.sets),
      finished: isMatchFinished(match),
      tableNumber: state.confirmedTableNumber
    };

    console.info("CLIENT->SERVER: UPDATE_SETS_REQUEST");
    socket.emit(socketIOMessages.UPDATE_SETS_REQUEST, requestData);
  };

  const updateSets = match => player => setIndex => event => {
    const newSets = match.sets.map((set, index) => {
      if (setIndex === index) {
        set[player] = parseInt(event.target.value, 10);
        return set;
      }
      return set;
    });

    dispatch({ type: ACTION_TYPE.SETS_UPDATED, sets: newSets });
  };

  const addSet = () => {
    dispatch({ type: ACTION_TYPE.ADD_SET });
  };

  //
  //
  // ----- SOCKETS
  //
  //

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

      dispatch({ type: ACTION_TYPE.LOGGED_IN, data });
    });

    connection.on(socketIOMessages.NEXT_ROUND, data => {
      console.info("SERVER->CLIENT: NEXT_ROUND");

      dispatch({
        type: ACTION_TYPE.ROUND_AVAILABLE,
        matchesWithPlayers: data.matchesWithPlayers
      });
    });

    connection.on(socketIOMessages.START_ROUND, data => {
      console.info("SERVER->CLIENT: START_ROUND");

      data
        ? dispatch({
            type: ACTION_TYPE.ROUND_STARTED,
            matchesWithPlayers: data.matchesWithPlayers
          })
        : dispatch({ type: ACTION_TYPE.ROUND_STARTED });
    });

    connection.on(socketIOMessages.CANCEL_ROUND, () => {
      console.info("SERVER->CLIENT: CANCEL_ROUND");

      dispatch({ type: ACTION_TYPE.ROUND_CANCELED });
    });

    connection.on(socketIOMessages.UPDATE_SETS_RESPONSE, data => {
      console.info("SERVER->CLIENT: UPDATE_SETS_RESPONSE");

      if (!data) {
        console.error("No data in UPDATE_SETS_RESPONSE");
      }

      dispatch({
        type: ACTION_TYPE.UPDATE_SETS_RESPONSE,
        message: data ? data.message || "" : ""
      });
    });

    connection.on(socketIOMessages.CANCEL_COMPETITION, () => {
      console.info("SERVER->CLIENT: COMPETITION_CANCELED");

      dispatch({ type: ACTION_TYPE.COMPETITION_CANCELED });
    });

    socket = connection;
  }

  // const liink =
  //   'Ein Turnier wartet auf dich -> <a href="http://192.168.2.182:4000"><a>';
  // const link = `whatsapp://send?text=${encodeURIComponent(liink)}`;

  //
  //
  // ----- VIEW
  //
  //

  const content = () => {
    if (state.view === VIEW.LOGIN) {
      return (
        <LoginView
          availableTables={state.availableTables}
          sendTableNumber={sendTableNumber}
        />
      );
    }

    if (state.view === VIEW.NEXT_PLAYERS || state.view === VIEW.MATCH) {
      return (
        <MatchView
          onlyShowNextPlayers={state.view === VIEW.NEXT_PLAYERS}
          match={state.match}
          sendSets={sendSets}
          updateSets={updateSets}
          addSet={addSet}
        />
      );
    }

    if (state.view === VIEW.WAITING) {
      return <WaitingView message={state.message} />;
    }

    // render nothing if none of the above states
    return <></>;
  };

  return (
    <div className="app__container">
      <div className="app__logo"></div>
      {state.view !== VIEW.LOGIN && (
        <ConnectionStatus
          isConnected={state.isConnected}
          tableNumber={state.confirmedTableNumber}
        />
      )}
      {content()}
      {/* <a href={link}>LINK</a> */}
    </div>
  );
}

export default App;
