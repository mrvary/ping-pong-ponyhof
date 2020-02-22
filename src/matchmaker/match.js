// TODO: use hash?
let matchId = 0;

// createMatches : [{player1: Player, player2: Player}] -> [Match]
function createMatches(pairings) {
  let remainingPairings = [...pairings];

  let matches = [];
  while (remainingPairings.length > 0) {
    const match = createMatch(remainingPairings.shift());
    matches.push(match);
  }

  return matches;
}

// createMatch : {player1: Player, player2: Player} -> Match
function createMatch({ player1, player2 }) {
  const match = {
    id: matchId,
    player1: player1,
    player2: player2,
    sets: [
      {
        player1: 0,
        player2: 0
      }
    ]
  };

  matchId++;
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
  let player1Wins = [
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

  let player2Wins = [
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

  //decide wich player will win --> 0 for p1, 1 for p2
  let rnd = Math.floor(Math.random() * 2);

  if (match.player1 === "FreeTicket") {
    match.sets = player2Wins;
  } else if (match.player2 === "FreeTicket") {
    match.sets = player1Wins;
  } else {
    //no freeticket player in match -> random player wins
    match.sets = rnd === 0 ? player1Wins : player2Wins;
  }

  return match;
}

// getMatchWinner : match -> id
// id = id of playerWon or if noone has won so far id = "0"
function getMatchWinner(match) {
  let player1SetsWon = 0;
  let player2SetsWon = 0;

  match.sets.forEach(e => {
    //the first set is init. with 0:0
    //in this case e.player1 = e.player2 and noone gets setWon++

    //player1 has more points
    if (e.player1 > e.player2) {
      player1SetsWon++;
    }
    //player2 has more points
    if (e.player1 < e.player2) {
      player2SetsWon++;
    }
  });

  if (player1SetsWon === 3) return match.player1;

  if (player2SetsWon === 3) return match.player2;

  return "0";
}

module.exports = {
  createMatch,
  createMatches,
  simulateMatches,
  simulateMatch,
  getMatchWinner
};
