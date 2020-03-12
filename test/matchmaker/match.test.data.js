const testPairing = [
  { player1: "PLAYER13", player2: "PLAYER4" },
  { player1: "PLAYER6", player2: "PLAYER5" },
  { player1: "PLAYER11", player2: "PLAYER8" },
  { player1: "PLAYER9", player2: "PLAYER12" },
  { player1: "PLAYER16", player2: "PLAYER7" },
  { player1: "PLAYER14", player2: "PLAYER2" },
  { player1: "PLAYER15", player2: "PLAYER3" },
  { player1: "PLAYER10", player2: "PLAYER1" }
];

const testPairingWithFreeTicket = [
  { player1: "PLAYER15", player2: "PLAYER3" },
  { player1: "PLAYER12", player2: "PLAYER1" },
  { player1: "PLAYER9", player2: "PLAYER4" },
  { player1: "PLAYER14", player2: "PLAYER5" },
  { player1: "PLAYER13", player2: "FreeTicket" },
  { player1: "PLAYER10", player2: "PLAYER2" },
  { player1: "PLAYER6", player2: "PLAYER7" },
  { player1: "PLAYER11", player2: "PLAYER8" }
];

const pairingWithPlayer1BeingFreeTicket = {
  player1: "FreeTicket",
  player2: "PLAYER66"
};

const pairingWithPlayer2BeingFreeTicket = {
  player1: "PLAYER13",
  player2: "FreeTicket"
};

const match_init = {
  id: 1,
  player1: "PLAYER1",
  player2: "PLAYER2",
  sets: [
    {
      player1: 0,
      player2: 0
    },
    {
      player1: 0,
      player2: 0
    },
    {
      player1: 0,
      player2: 0
    },
    {
      player1: 0,
      player2: 0
    },
    {
      player1: 0,
      player2: 0
    }
  ]
};

const match_noWinner = {
  id: 1,
  player1: "PLAYER1",
  player2: "PLAYER2",
  sets: [
    {
      player1: 11,
      player2: 9
    },
    {
      player1: 11,
      player2: 7
    },
    {
      player1: 0,
      player2: 0
    },
    {
      player1: 0,
      player2: 0
    },
    {
      player1: 0,
      player2: 0
    }
  ]
};

const match_noWinner2 = {
  id: 1,
  player1: "PLAYER1",
  player2: "PLAYER2",
  sets: [
    {
      player1: 11,
      player2: 9
    },
    {
      player1: 11,
      player2: 13
    },
    {
      player1: 1,
      player2: 11
    },
    {
      player1: 11,
      player2: 5
    },
    {
      player1: 5,
      player2: 6
    }
  ]
};

const match_player1Wins = {
  id: 1,
  player1: "PLAYER1",
  player2: "PLAYER2",
  sets: [
    {
      player1: 11,
      player2: 6
    },
    {
      player1: 16,
      player2: 14
    },
    {
      player1: 11,
      player2: 0
    },
    {
      player1: 0,
      player2: 0
    },
    {
      player1: 0,
      player2: 0
    }
  ]
};

const match_player1Wins2 = {
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
      player2: 3
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
      player1: 22,
      player2: 20
    }
  ]
};

const match_player2Wins = {
  id: 1,
  player1: "PLAYER1",
  player2: "PLAYER2",
  sets: [
    {
      player1: 8,
      player2: 11
    },
    {
      player1: 13,
      player2: 15
    },
    {
      player1: 1,
      player2: 11
    },
    {
      player1: 0,
      player2: 0
    },
    {
      player1: 0,
      player2: 0
    }
  ]
};

const match_player2Wins2 = {
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
    },
    {
      player1: 0,
      player2: 0
    }
  ]
};

const matchResultPlayer1Won = [
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
  },
  {
    player1: 0,
    player2: 0
  },
  {
    player1: 0,
    player2: 0
  }
];

const matchResultPlayer2Won = [
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
  },
  {
    player1: 0,
    player2: 0
  },
  {
    player1: 0,
    player2: 0
  }
];

module.exports = {
  testPairing,
  testPairingWithFreeTicket,
  match_init,
  match_noWinner,
  match_noWinner2,
  match_player1Wins,
  match_player1Wins2,
  match_player2Wins,
  match_player2Wins2,
  matchResultPlayer1Won,
  matchResultPlayer2Won,
  pairingWithPlayer1BeingFreeTicket,
  pairingWithPlayer2BeingFreeTicket
};
