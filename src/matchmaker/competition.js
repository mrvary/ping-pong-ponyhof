// INIT
function createPlayersFromJSON(json) {
  // players are deeply nested in the input json
  const players = json.tournament.competition.players.player;

  return players.map(_createPlayer);
}

function _createPlayer(dataFromJSON) {
  const { id, person } = dataFromJSON;
  const { firstname, lastname, ttr } = person;
  const clubname = person['club-name'];

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
function drawFirstRound({ players, matches }) {
  // 1. sort players by qttr
  const sortedPlayers = _sortPlayersBy(players, 'qttr');

  // 2. separate top and bottom players
  const { top, bottom } = _separateTopFromBottomPlayers(sortedPlayers);

  // 3. pair players together
  const { pairings, unmatchedPlayer } = _pairPlayers({ top, bottom });

  return { players, pairings };
}

function _createFreeTicketGame({ player, matchId, round }) {
  const updatedPlayer = {
    ...player,
    matchIds: player.matchIds.concat(matchId)
  };

  const freeTicketMatch = {
    id: matchId,
    player1: player,
    round,
    result: [],
    sets: [],
    freeTicket: true
  };

  return { match: freeTicketMatch, player: updatedPlayer };
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

  // will be undefined for an even number of players
  const unmatchedPlayer = topPlayers[0];

  return { pairings, unmatchedPlayer };
}

function _separateTopFromBottomPlayers(players) {
  const sortedPlayers = _sortPlayersBy(players, 'qttr');
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
  _createPlayer,
  createPlayersFromJSON,
  _pairPlayers,
  _sortPlayersBy,
  _separateTopFromBottomPlayers,
  _shuffle
};
