const matchWithResult_13 = {
  id: 1,
  player1: "PLAYER1",
  player2: "PLAYER2",
  sets: [
    {
      player1: 8,
      player2: 11
    },
    {
      player1: 11,
      player2: 13
    },
    {
      player1: 11,
      player2: 0
    },
    {
      player1: 4,
      player2: 11
    }
  ]
};

const matchWithResult_12 = {
  id: 1,
  player1: "PLAYER1",
  player2: "PLAYER2",
  sets: [
    {
      player1: 11,
      player2: 13
    },
    {
      player1: 11,
      player2: 5
    },
    {
      player1: 4,
      player2: 11
    }
  ]
};

const matchWithResult_10 = {
  id: 1,
  player1: "PLAYER1",
  player2: "PLAYER2",
  sets: [
    {
      player1: 11,
      player2: 2
    }
  ]
};

const matchWithWrongSets = {
  id: 1,
  player1: "PLAYER1",
  player2: "PLAYER2",
  sets: [
    {
      player1: 11,
      player2: 10
    },
    {
      player1: 2,
      player2: 2
    },
    {
      player1: 0,
      player2: 0
    },
    {
      player1: 5,
      player2: 6
    }
  ]
};

const twoPlayers = [
  {
    id: "PingPong",
    firstname: "Pony",
    lastname: "Hof",
    clubname: "Einhornhausen",
    gamesWon: 9000,
    matchIds: [],
    opponentIds: [],
    qttr: 2020,
    active: true
  },
  {
    id: "PLAYER1",
    firstname: "Gerhard",
    lastname: "Acker",
    clubname: "ESV SF Neuaubing",
    gamesWon: 0,
    matchIds: [],
    opponentIds: [],
    qttr: 1415,
    active: true
  }
];

const matchesToUpdate = [
  {
    id: 1,
    player1: "PingPong",
    player2: "PLAYER1",
    sets: [
      {
        player1: 11,
        player2: 0
      }
    ]
  },
  {
    id: 11,
    player1: "Player1",
    player2: "",
    sets: [
      {
        player1: 0,
        player2: 11
      }
    ]
  }
];

module.exports = {
  matchWithResult_13,
  matchWithResult_12,
  matchWithResult_10,
  matchWithWrongSets,
  twoPlayers,
  matchesToUpdate
};
