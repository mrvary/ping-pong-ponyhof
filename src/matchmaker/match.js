const {
  createMatchResult,
  getParameterByPlayerId,
  countSetsPerPlayer
} = require("./ranking.js");

// createMatches : [{player1: Player, player2: Player}] -> [Match]
function createMatches(pairings, lastMatchId) {
  let remainingPairings = [...pairings];
  let matchId = lastMatchId > 0 ? lastMatchId++ : lastMatchId;

  let matches = [];
  while (remainingPairings.length > 0) {
    const match = createMatch(remainingPairings.shift(), matchId);
    matches.push(match);
    matchId++;
  }

  return matches;
}

// createMatch : {player1: Player, player2: Player} -> Match
function createMatch({ player1, player2 }, matchId) {
  const MAXIMUM_SETS = 5;

  const match = {
    id: matchId,
    player1: player1,
    player2: player2,
    sets: []
  };

  for (let i = 0; i < MAXIMUM_SETS; i++) {
    match.sets.push({
      player1: 0,
      player2: 0
    });
  }

  if (player2 === "FreeTicket") {
    for (let i = 0; i < Math.ceil(MAXIMUM_SETS / 2); i++) {
      match.sets[i].player1 = 11;
    }
  }
  return match;
}

// this function will just be used in our tests
// simulateMatches : [matches] -> [matches]
function simulateMatches(matches) {
  matches.forEach(match => {
    simulateMatch(match);
  });
  return matches;
}

// simulateMatch : match -> match
function simulateMatch(match) {
  //create possible results
  const player1Wins = [
    {
      player1: 11,
      player2: 1
    },
    {
      player1: 11,
      player2: 2
    },
    {
      player1: 11,
      player2: 3
    }
  ];

  const player2Wins = [
    {
      player1: 4,
      player2: 11
    },
    {
      player1: 5,
      player2: 11
    },
    {
      player1: 6,
      player2: 11
    }
  ];

  if (match.player1 === "FreeTicket") {
    match.sets = player2Wins;
  } else if (match.player2 === "FreeTicket") {
    match.sets = player1Wins;
  } else {
    //no freeticket player in match -> random player wins
    match.sets = Math.random() < 0.5 ? player1Wins : player2Wins;
  }

  return match;
}

// getMatchWinner : match -> id
// id = id of playerWon or if noone has won so far id = "0"
function getMatchWinner(match) {
  let player1SetsWon = 0;
  let player2SetsWon = 0;

  match.sets.forEach(set => {
    //player1 has more points
    if (set.player1 - 1 > set.player2) {
      player1SetsWon++;
    }
    //player2 has more points
    if (set.player1 < set.player2 - 1) {
      player2SetsWon++;
    }
  });

  if (player1SetsWon === 3) return match.player1;

  if (player2SetsWon === 3) return match.player2;

  return "0";
}

// createXMLMatch : match, round -> match
function createXMLMatch(match, round) {
  const winner = getMatchWinner(match);
  let matchStateA = 0;
  let matchStateB = 0;
  if (winner === match.player1) matchStateA = 1;
  if (winner === match.player2) matchStateB = 1;

  //get players sets
  const sets = countSetsPerPlayer(match);

  let xmlMatch = {
    group: "Schweizer System (Runde " + round + ")",
    nr: match.id,
    "player-a": match.player1,
    "player-b": match.player2,
    "matches-a": matchStateA,
    "matches-b": matchStateB,
    "sets-a": sets.player1,
    "sets-b": sets.player2,
    "sets-a-1": match.sets[0].player1,
    "sets-b-1": match.sets[0].player2,
    "sets-a-2": match.sets[1].player1,
    "sets-b-2": match.sets[1].player2,
    "sets-a-3": match.sets[2].player1,
    "sets-b-3": match.sets[2].player2,
    "sets-a-4": match.sets[3].player1,
    "sets-b-4": match.sets[3].player2,
    "sets-a-5": match.sets[4].player1,
    "sets-b-5": match.sets[4].player2,
    "sets-a-6": 0,
    "sets-b-6": 0,
    "sets-a-7": 0,
    "sets-b-7": 0,
    "games-a": countPlayersPoints(match, match.player1),
    "games-b": countPlayersPoints(match, match.player2)
  };

  return xmlMatch;
}
// countPlayersPoints : match, id -> Number
function countPlayersPoints(match, playerId) {
  let counter = 0;

  //count player1 points
  if (match.player1 === playerId) {
    match.sets.forEach(set => {
      counter += set.player1;
    });
  }
  //count player2 points
  if (match.player2 === playerId) {
    match.sets.forEach(set => {
      counter += set.player2;
    });
  }

  return counter;
}

function logMatches(matches, players) {
  let log = "";
  matches.forEach(match => {
    const res = createMatchResult(match);
    log +=
      "(" +
      getParameterByPlayerId(match.player1, players, "gamesWon") +
      ")" +
      getParameterByPlayerId(match.player1, players, "lastname") +
      " - " +
      "(" +
      getParameterByPlayerId(match.player2, players, "gamesWon") +
      ")" +
      getParameterByPlayerId(match.player2, players, "lastname") +
      " " +
      res.player1 +
      ":" +
      res.player2 +
      "\n";
  });
  console.log(log);
}

module.exports = {
  createMatch,
  createMatches,
  simulateMatches,
  simulateMatch,
  getMatchWinner,
  logMatches,
  createXMLMatch
};
