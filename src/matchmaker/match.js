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

  matches.forEach(e => {
    //decide wich player will win
    let rnd = Math.floor(Math.random() * 2);

    if (matches.player1 === "FreeTicket") {
      matches.sets = player2Wins;
    } else if (matches.player2 === "FreeTicket") {
      matches.sets = player1Wins;
    } else {
      //no freeticket player in match -> random player wins
      matches.sets = rnd === 0 ? player1Wins : player2Wins;
    }
  });
}

module.exports = {
  createMatch,
  createMatches,
  simulateMatches
};
