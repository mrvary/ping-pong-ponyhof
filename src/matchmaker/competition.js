// INIT
function createPlayersFromJSON(json) {
  // players are deeply nested in the input json
  const players = json.tournament.competition.players.player;

  return players.map(_createPlayer);
}

function _createPlayer(dataFromJSON) {
  const { id, person } = dataFromJSON;
  const { firstname, lastname, ttr } = person;
  const clubname = person["club-name"];

  return {
    id,
    firstname,
    lastname,
    clubname,
    gamesWon: 0,
    matchIds: [],
    qttr: parseInt(ttr, 10),
    active: true,
    hasFreeTicket: false
  };
}

// DRAW ROUNDS
function drawRound({ players }) {
  const isLaterRound = players[0].matchIds.length > 0;

  if (!isLaterRound) {
    return _drawLaterRound(players);
  }

  return _drawFirstRound(players);
}

function _drawFirstRound({ players }) {
  // 1. sort players by qttr
  const sortedPlayers = _sortPlayersBy(players, "qttr");

  // 2. separate top and bottom players
  const { top, bottom } = _separateTopFromBottomPlayers(sortedPlayers);

  // 3. pair players together
  const pairings = _pairPlayers({ top, bottom });

  // 4. create matches
  const newMatches = _createMatches(pairings);

  // -> update players?

  return { players, matches: newMatches };
}

function _drawLaterRound({ players }) {}

function _createMatches({ pairings }) {
  let matches = [];
  let remainingPairings = pairings;

  while (remainingPairings) {
    const match = _createMatch(remainingPairings.shift());
    matches.push(match);
  }

  return matches;
}

function _createMatch({ player1, player2 }, round, matchId) {
  // early return when no second player
  if (!player2) {
    const freeTicketMatch = {
      id: matchId,
      player1: { ...player1, matchIds: player1.matchIds.concat(matchId) },
      round,
      result: [],
      sets: [],
      freeTicket: true
    };
    return freeTicketMatch;
  }

  const match = {
    id: matchId,
    player1: { ...player1, matchIds: player1.matchIds.concat(matchId) },
    player2: { ...player2, matchIds: player2.matchIds.concat(matchId) },
    round,
    result: [],
    sets: [],
    freeTicket: false
  };

  return match;
}

function _pairPlayers({ top, bottom }) {
  let bottomPlayers = bottom;
  let topPlayers = top;
  let pairings = [];

  while (bottomPlayers.length !== 0) {
    const randomTopPlayer =
      topPlayers[Math.floor(Math.random() * topPlayers.length)];
    const randomBottomPlayer =
      bottomPlayers[Math.floor(Math.random() * bottomPlayers.length)];

    //remove chosen players
    topPlayers = topPlayers.filter(player => player !== randomTopPlayer);
    bottomPlayers = bottomPlayers.filter(
      player => player !== randomBottomPlayer
    );

    pairings.push({ player1: randomTopPlayer, player2: randomBottomPlayer });
  }

  // pair last player when odd number of players
  if (topPlayers[0]) {
    pairings.push({ player1: topPlayers[0] });
  }

  return pairings;
}

function _separateTopFromBottomPlayers(players) {
  const sortedPlayers = _sortPlayersBy(players, "qttr");
  const top = sortedPlayers.slice(0, Math.ceil(sortedPlayers.length / 2));
  const bottom = sortedPlayers.slice(Math.ceil(sortedPlayers.length / 2));

  return { top, bottom };
}

// UTILITY FUNCTIONS
function _sortPlayersBy(players, selector) {
  return players.sort((playerA, playerB) => {
    return playerB[selector] - playerA[selector];
  });
}

function _shuffle(array) {
  const TIMES = array.length;
  for (let i = 0; i < TIMES; i++) {
    const first = Math.floor(Math.random() * array.length);
    const second = Math.floor(Math.random() * array.length);
    [array[first], array[second]] = [array[second], array[first]];
  }
  return array;
}

module.exports = {
  // pubic
  createPlayersFromJSON,
  drawRound,

  // private
  _createPlayer,
  _drawFirstRound,
  _drawLaterRound,
  _pairPlayers,
  _sortPlayersBy,
  _separateTopFromBottomPlayers,
  _shuffle
};
