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
    },
    {
      player1: 0,
      player2: 0
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

const matchWithResult_10 = {
  id: 1,
  player1: "PLAYER1",
  player2: "PLAYER2",
  sets: [
    {
      player1: 11,
      player2: 2
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
    },
    {
      player1: 0,
      player2: 0
    }
  ]
};

const twoPlayers = [
  {
    id: "PingPong",
    firstname: "Pony",
    lastname: "Hof",
    clubname: "Einhornhausen",
    gamesWon: 1,
    matchIds: [4, 5, 6, 7],
    opponentIds: ["PLAYER1"],
    qttr: 2020,
    quitInRound: 0
  },
  {
    id: "PLAYER1",
    firstname: "Gerhard",
    lastname: "Acker",
    clubname: "ESV SF Neuaubing",
    gamesWon: 0,
    matchIds: [1, 4, 9],
    opponentIds: ["PingPong"],
    qttr: 1960,
    quitInRound: 0
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
  },
  {
    id: 11,
    player1: "Player1",
    player2: "",
    sets: [
      {
        player1: 0,
        player2: 11
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
  }
];

const dummyMatches = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  },
  {
    id: 4
  },
  {
    id: 5
  },
  {
    id: 6
  },
  {
    id: 7
  },
  {
    id: 8
  },
  {
    id: 9
  },
  {
    id: 10
  }
];

const playersForRanking = [
  {
    id: "PLAYER10",
    firstname: "Silvo",
    lastname: "Nötzold",
    clubname: "SV-DJK Taufkirchen",
    gamesWon: 3,
    matchIds: [7, 14, 18, 28, 38, 46],
    opponentIds: [
      "PLAYER2",
      "PLAYER13",
      "PLAYER1",
      "PLAYER12",
      "PLAYER3",
      "PLAYER8"
    ],
    qttr: 1833,
    quitInRound: 0
  },
  {
    id: "PLAYER14",
    firstname: "Gerald",
    lastname: "Scheer",
    clubname: "TSV Alteglofsheim",
    gamesWon: 2,
    matchIds: [2, 15, 23, 31, 39, 45],
    opponentIds: [
      "PLAYER1",
      "PLAYER15",
      "PLAYER13",
      "PLAYER3",
      "PLAYER8",
      "PLAYER12"
    ],
    qttr: 1688,
    quitInRound: 0
  },
  {
    id: "PLAYER15",
    firstname: "Matthias",
    lastname: "Vaupel",
    clubname: "SV Helfendorf",
    gamesWon: 3,
    matchIds: [4, 15, 21, 27, 37, 42],
    opponentIds: [
      "PLAYER12",
      "PLAYER14",
      "PLAYER8",
      "PLAYER1",
      "PLAYER13",
      "PLAYER16"
    ],
    qttr: 1670,
    quitInRound: 0
  },
  {
    id: "PLAYER9",
    firstname: "Ali",
    lastname: "Niemczyk",
    clubname: "TSC München-Maxvorstadt",
    gamesWon: 3,
    matchIds: [1, 10, 16, 25, 36, 41],
    opponentIds: [
      "PLAYER3",
      "PLAYER1",
      "PLAYER6",
      "PLAYER7",
      "PLAYER12",
      "PLAYER5"
    ],
    qttr: 1634,
    quitInRound: 0
  },
  {
    id: "PLAYER6",
    firstname: "Georg",
    lastname: "Enser",
    clubname: "MTV München von 1879",
    gamesWon: 6,
    matchIds: [0, 11, 16, 24, 32, 40],
    opponentIds: [
      "PLAYER8",
      "PLAYER5",
      "PLAYER9",
      "PLAYER16",
      "PLAYER1",
      "PLAYER7"
    ],
    qttr: 1622,
    quitInRound: 0
  },
  {
    id: "PLAYER13",
    firstname: "Michael",
    lastname: "Rothermich",
    clubname: "TTC Perlach",
    gamesWon: 1,
    matchIds: [3, 14, 23, 30, 37, 47],
    opponentIds: [
      "PLAYER5",
      "PLAYER10",
      "PLAYER14",
      "PLAYER4",
      "PLAYER15",
      "PLAYER3"
    ],
    qttr: 1610,
    quitInRound: 0
  },
  {
    id: "PLAYER16",
    firstname: "Tino",
    lastname: "Viering",
    clubname: "TSV Alteglofsheim",
    gamesWon: 4,
    matchIds: [5, 9, 17, 24, 33, 42],
    opponentIds: [
      "PLAYER4",
      "PLAYER12",
      "PLAYER11",
      "PLAYER6",
      "PLAYER7",
      "PLAYER15"
    ],
    qttr: 1604,
    quitInRound: 0
  },
  {
    id: "PLAYER11",
    firstname: "Michael",
    lastname: "Popp",
    clubname: "Gautinger SC ",
    gamesWon: 3,
    matchIds: [6, 8, 17, 26, 34, 43],
    opponentIds: [
      "PLAYER7",
      "PLAYER2",
      "PLAYER16",
      "PLAYER5",
      "PLAYER4",
      "PLAYER1"
    ],
    qttr: 1601,
    quitInRound: 0
  },
  {
    id: "PLAYER12",
    firstname: "Adel",
    lastname: "Rosenberger",
    clubname: "TSV Zorneding 1920",
    gamesWon: 2,
    matchIds: [4, 9, 20, 28, 36, 45],
    opponentIds: [
      "PLAYER15",
      "PLAYER16",
      "PLAYER5",
      "PLAYER10",
      "PLAYER9",
      "PLAYER14"
    ],
    qttr: 1554,
    quitInRound: 0
  },
  {
    id: "PLAYER5",
    firstname: "Hermann",
    lastname: "Dubon",
    clubname: "TuS Bad Aibling",
    gamesWon: 4,
    matchIds: [3, 11, 20, 26, 35, 41],
    opponentIds: [
      "PLAYER13",
      "PLAYER6",
      "PLAYER12",
      "PLAYER11",
      "PLAYER2",
      "PLAYER9"
    ],
    qttr: 1521,
    quitInRound: 0
  },
  {
    id: "PLAYER8",
    firstname: "Robert",
    lastname: "Müller",
    clubname: "FT München-Blumenau 1966",
    gamesWon: 1,
    matchIds: [0, 13, 21, 29, 39, 46],
    opponentIds: [
      "PLAYER6",
      "PLAYER4",
      "PLAYER15",
      "PLAYER2",
      "PLAYER14",
      "PLAYER10"
    ],
    qttr: 1489,
    quitInRound: 0
  },
  {
    id: "PLAYER7",
    firstname: "Udo",
    lastname: "Krause",
    clubname: "TSV Waldtrudering ",
    gamesWon: 4,
    matchIds: [6, 12, 19, 25, 33, 40],
    opponentIds: [
      "PLAYER11",
      "PLAYER3",
      "PLAYER2",
      "PLAYER9",
      "PLAYER16",
      "PLAYER6"
    ],
    qttr: 1467,
    quitInRound: 0
  },
  {
    id: "PLAYER1",
    firstname: "Gerhard",
    lastname: "Acker",
    clubname: "ESV SF Neuaubing",
    gamesWon: 4,
    matchIds: [2, 10, 18, 27, 32, 43],
    opponentIds: [
      "PLAYER14",
      "PLAYER9",
      "PLAYER10",
      "PLAYER15",
      "PLAYER6",
      "PLAYER11"
    ],
    qttr: 1415,
    quitInRound: 0
  },
  {
    id: "PLAYER4",
    firstname: "Jonas Karl",
    lastname: "Dill",
    clubname: "TTC Perlach",
    gamesWon: 4,
    matchIds: [5, 13, 22, 30, 34, 44],
    opponentIds: [
      "PLAYER16",
      "PLAYER8",
      "PLAYER3",
      "PLAYER13",
      "PLAYER11",
      "PLAYER2"
    ],
    qttr: 1356,
    quitInRound: 0
  },
  {
    id: "PLAYER2",
    firstname: "Achim",
    lastname: "Amthor",
    clubname: "SC Baldham-Vaterstetten ",
    gamesWon: 2,
    matchIds: [7, 8, 19, 29, 35, 44],
    opponentIds: [
      "PLAYER10",
      "PLAYER11",
      "PLAYER7",
      "PLAYER8",
      "PLAYER5",
      "PLAYER4"
    ],
    qttr: 1251,
    quitInRound: 0
  },
  {
    id: "PLAYER3",
    firstname: "Ulrich",
    lastname: "Dietzel",
    clubname: "TTC Friedberg ",
    gamesWon: 2,
    matchIds: [1, 12, 22, 31, 38, 47],
    opponentIds: [
      "PLAYER9",
      "PLAYER7",
      "PLAYER4",
      "PLAYER14",
      "PLAYER10",
      "PLAYER13"
    ],
    qttr: 1111,
    quitInRound: 0
  }
];

const matchesForRanking = [
  {
    id: 0,
    player1: "PLAYER6",
    player2: "PLAYER8",
    sets: [
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
    ]
  },
  {
    id: 1,
    player1: "PLAYER9",
    player2: "PLAYER3",
    sets: [
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
    ]
  },
  {
    id: 2,
    player1: "PLAYER14",
    player2: "PLAYER1",
    sets: [
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
    ]
  },
  {
    id: 3,
    player1: "PLAYER13",
    player2: "PLAYER5",
    sets: [
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
    ]
  },
  {
    id: 4,
    player1: "PLAYER15",
    player2: "PLAYER12",
    sets: [
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
    ]
  },
  {
    id: 5,
    player1: "PLAYER16",
    player2: "PLAYER4",
    sets: [
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
    ]
  },
  {
    id: 6,
    player1: "PLAYER11",
    player2: "PLAYER7",
    sets: [
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
    ]
  },
  {
    id: 7,
    player1: "PLAYER10",
    player2: "PLAYER2",
    sets: [
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
    ]
  },
  {
    id: 8,
    player1: "PLAYER2",
    player2: "PLAYER11",
    sets: [
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
    ]
  },
  {
    id: 9,
    player1: "PLAYER16",
    player2: "PLAYER12",
    sets: [
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
    ]
  },
  {
    id: 10,
    player1: "PLAYER1",
    player2: "PLAYER9",
    sets: [
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
    ]
  },
  {
    id: 11,
    player1: "PLAYER6",
    player2: "PLAYER5",
    sets: [
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
    ]
  },
  {
    id: 12,
    player1: "PLAYER7",
    player2: "PLAYER3",
    sets: [
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
    ]
  },
  {
    id: 13,
    player1: "PLAYER8",
    player2: "PLAYER4",
    sets: [
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
    ]
  },
  {
    id: 14,
    player1: "PLAYER10",
    player2: "PLAYER13",
    sets: [
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
    ]
  },
  {
    id: 15,
    player1: "PLAYER15",
    player2: "PLAYER14",
    sets: [
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
    ]
  },
  {
    id: 16,
    player1: "PLAYER9",
    player2: "PLAYER6",
    sets: [
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
    ]
  },
  {
    id: 17,
    player1: "PLAYER11",
    player2: "PLAYER16",
    sets: [
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
    ]
  },
  {
    id: 18,
    player1: "PLAYER1",
    player2: "PLAYER10",
    sets: [
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
    ]
  },
  {
    id: 19,
    player1: "PLAYER7",
    player2: "PLAYER2",
    sets: [
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
    ]
  },
  {
    id: 20,
    player1: "PLAYER12",
    player2: "PLAYER5",
    sets: [
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
    ]
  },
  {
    id: 21,
    player1: "PLAYER8",
    player2: "PLAYER15",
    sets: [
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
    ]
  },
  {
    id: 22,
    player1: "PLAYER4",
    player2: "PLAYER3",
    sets: [
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
    ]
  },
  {
    id: 23,
    player1: "PLAYER13",
    player2: "PLAYER14",
    sets: [
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
    ]
  },
  {
    id: 24,
    player1: "PLAYER16",
    player2: "PLAYER6",
    sets: [
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
    ]
  },
  {
    id: 25,
    player1: "PLAYER9",
    player2: "PLAYER7",
    sets: [
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
    ]
  },
  {
    id: 26,
    player1: "PLAYER5",
    player2: "PLAYER11",
    sets: [
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
    ]
  },
  {
    id: 27,
    player1: "PLAYER15",
    player2: "PLAYER1",
    sets: [
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
    ]
  },
  {
    id: 28,
    player1: "PLAYER10",
    player2: "PLAYER12",
    sets: [
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
    ]
  },
  {
    id: 29,
    player1: "PLAYER8",
    player2: "PLAYER2",
    sets: [
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
    ]
  },
  {
    id: 30,
    player1: "PLAYER13",
    player2: "PLAYER4",
    sets: [
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
    ]
  },
  {
    id: 31,
    player1: "PLAYER14",
    player2: "PLAYER3",
    sets: [
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
    ]
  },
  {
    id: 32,
    player1: "PLAYER6",
    player2: "PLAYER1",
    sets: [
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
    ]
  },
  {
    id: 33,
    player1: "PLAYER7",
    player2: "PLAYER16",
    sets: [
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
    ]
  },
  {
    id: 34,
    player1: "PLAYER11",
    player2: "PLAYER4",
    sets: [
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
    ]
  },
  {
    id: 35,
    player1: "PLAYER2",
    player2: "PLAYER5",
    sets: [
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
    ]
  },
  {
    id: 36,
    player1: "PLAYER9",
    player2: "PLAYER12",
    sets: [
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
    ]
  },
  {
    id: 37,
    player1: "PLAYER15",
    player2: "PLAYER13",
    sets: [
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
    ]
  },
  {
    id: 38,
    player1: "PLAYER10",
    player2: "PLAYER3",
    sets: [
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
    ]
  },
  {
    id: 39,
    player1: "PLAYER8",
    player2: "PLAYER14",
    sets: [
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
    ]
  },
  {
    id: 40,
    player1: "PLAYER6",
    player2: "PLAYER7",
    sets: [
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
    ]
  },
  {
    id: 41,
    player1: "PLAYER9",
    player2: "PLAYER5",
    sets: [
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
    ]
  },
  {
    id: 42,
    player1: "PLAYER15",
    player2: "PLAYER16",
    sets: [
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
    ]
  },
  {
    id: 43,
    player1: "PLAYER11",
    player2: "PLAYER1",
    sets: [
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
    ]
  },
  {
    id: 44,
    player1: "PLAYER4",
    player2: "PLAYER2",
    sets: [
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
    ]
  },
  {
    id: 45,
    player1: "PLAYER12",
    player2: "PLAYER14",
    sets: [
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
    ]
  },
  {
    id: 46,
    player1: "PLAYER10",
    player2: "PLAYER8",
    sets: [
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
    ]
  },
  {
    id: 47,
    player1: "PLAYER13",
    player2: "PLAYER3",
    sets: [
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
    ]
  }
];

const expectedRanking = [
  {
    place: 1,
    id: "PLAYER6",
    firstname: "Georg",
    lastname: "Enser",
    clubname: "MTV München von 1879",
    gamesWon: 6,
    gamesLost: 0,
    bhz: 20,
    qttr: 1622,
    ttr_now: 1644,
    ttr_diff: 22,
    matches: [
      {
        opponentFirstname: "Robert",
        opponentLastname: "Müller",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Hermann",
        opponentLastname: "Dubon",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Ali",
        opponentLastname: "Niemczyk",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Tino",
        opponentLastname: "Viering",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Gerhard",
        opponentLastname: "Acker",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Udo",
        opponentLastname: "Krause",
        ownSets: 3,
        opponentSets: 0
      }
    ]
  },
  {
    place: 2,
    id: "PLAYER16",
    firstname: "Tino",
    lastname: "Viering",
    clubname: "TSV Alteglofsheim",
    gamesWon: 4,
    gamesLost: 2,
    bhz: 22,
    qttr: 1604,
    ttr_now: 1608,
    ttr_diff: 4,
    matches: [
      {
        opponentFirstname: "Jonas Karl",
        opponentLastname: "Dill",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Adel",
        opponentLastname: "Rosenberger",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Michael",
        opponentLastname: "Popp",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Georg",
        opponentLastname: "Enser",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Udo",
        opponentLastname: "Krause",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Matthias",
        opponentLastname: "Vaupel",
        ownSets: 3,
        opponentSets: 0
      }
    ]
  },
  {
    place: 3,
    id: "PLAYER1",
    firstname: "Gerhard",
    lastname: "Acker",
    clubname: "ESV SF Neuaubing",
    gamesWon: 4,
    gamesLost: 2,
    bhz: 20,
    qttr: 1415,
    ttr_now: 1476,
    ttr_diff: 61,
    matches: [
      {
        opponentFirstname: "Gerald",
        opponentLastname: "Scheer",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Ali",
        opponentLastname: "Niemczyk",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Silvo",
        opponentLastname: "Nötzold",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Matthias",
        opponentLastname: "Vaupel",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Georg",
        opponentLastname: "Enser",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Michael",
        opponentLastname: "Popp",
        ownSets: 3,
        opponentSets: 0
      }
    ]
  },
  {
    place: 4,
    id: "PLAYER7",
    firstname: "Udo",
    lastname: "Krause",
    clubname: "TSV Waldtrudering ",
    gamesWon: 4,
    gamesLost: 2,
    bhz: 20,
    qttr: 1467,
    ttr_now: 1494,
    ttr_diff: 27,
    matches: [
      {
        opponentFirstname: "Michael",
        opponentLastname: "Popp",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Ulrich",
        opponentLastname: "Dietzel",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Achim",
        opponentLastname: "Amthor",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Ali",
        opponentLastname: "Niemczyk",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Tino",
        opponentLastname: "Viering",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Georg",
        opponentLastname: "Enser",
        ownSets: 0,
        opponentSets: 3
      }
    ]
  },
  {
    place: 5,
    id: "PLAYER5",
    firstname: "Hermann",
    lastname: "Dubon",
    clubname: "TuS Bad Aibling",
    gamesWon: 4,
    gamesLost: 2,
    bhz: 17,
    qttr: 1521,
    ttr_now: 1551,
    ttr_diff: 30,
    matches: [
      {
        opponentFirstname: "Michael",
        opponentLastname: "Rothermich",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Georg",
        opponentLastname: "Enser",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Adel",
        opponentLastname: "Rosenberger",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Michael",
        opponentLastname: "Popp",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Achim",
        opponentLastname: "Amthor",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Ali",
        opponentLastname: "Niemczyk",
        ownSets: 3,
        opponentSets: 0
      }
    ]
  },
  {
    place: 6,
    id: "PLAYER4",
    firstname: "Jonas Karl",
    lastname: "Dill",
    clubname: "TTC Perlach",
    gamesWon: 4,
    gamesLost: 2,
    bhz: 13,
    qttr: 1356,
    ttr_now: 1388,
    ttr_diff: 32,
    matches: [
      {
        opponentFirstname: "Tino",
        opponentLastname: "Viering",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Robert",
        opponentLastname: "Müller",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Ulrich",
        opponentLastname: "Dietzel",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Michael",
        opponentLastname: "Rothermich",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Michael",
        opponentLastname: "Popp",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Achim",
        opponentLastname: "Amthor",
        ownSets: 3,
        opponentSets: 0
      }
    ]
  },
  {
    place: 7,
    id: "PLAYER9",
    firstname: "Ali",
    lastname: "Niemczyk",
    clubname: "TSC München-Maxvorstadt",
    gamesWon: 3,
    gamesLost: 3,
    bhz: 22,
    qttr: 1634,
    ttr_now: 1601,
    ttr_diff: -33,
    matches: [
      {
        opponentFirstname: "Ulrich",
        opponentLastname: "Dietzel",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Gerhard",
        opponentLastname: "Acker",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Georg",
        opponentLastname: "Enser",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Udo",
        opponentLastname: "Krause",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Adel",
        opponentLastname: "Rosenberger",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Hermann",
        opponentLastname: "Dubon",
        ownSets: 0,
        opponentSets: 3
      }
    ]
  },
  {
    place: 8,
    id: "PLAYER11",
    firstname: "Michael",
    lastname: "Popp",
    clubname: "Gautinger SC ",
    gamesWon: 3,
    gamesLost: 3,
    bhz: 22,
    qttr: 1601,
    ttr_now: 1568,
    ttr_diff: -33,
    matches: [
      {
        opponentFirstname: "Udo",
        opponentLastname: "Krause",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Achim",
        opponentLastname: "Amthor",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Tino",
        opponentLastname: "Viering",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Hermann",
        opponentLastname: "Dubon",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Jonas Karl",
        opponentLastname: "Dill",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Gerhard",
        opponentLastname: "Acker",
        ownSets: 0,
        opponentSets: 3
      }
    ]
  },
  {
    place: 9,
    id: "PLAYER15",
    firstname: "Matthias",
    lastname: "Vaupel",
    clubname: "SV Helfendorf",
    gamesWon: 3,
    gamesLost: 3,
    bhz: 14,
    qttr: 1670,
    ttr_now: 1643,
    ttr_diff: -27,
    matches: [
      {
        opponentFirstname: "Adel",
        opponentLastname: "Rosenberger",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Gerald",
        opponentLastname: "Scheer",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Robert",
        opponentLastname: "Müller",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Gerhard",
        opponentLastname: "Acker",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Michael",
        opponentLastname: "Rothermich",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Tino",
        opponentLastname: "Viering",
        ownSets: 0,
        opponentSets: 3
      }
    ]
  },
  {
    place: 10,
    id: "PLAYER10",
    firstname: "Silvo",
    lastname: "Nötzold",
    clubname: "SV-DJK Taufkirchen",
    gamesWon: 3,
    gamesLost: 3,
    bhz: 12,
    qttr: 1833,
    ttr_now: 1786,
    ttr_diff: -47,
    matches: [
      {
        opponentFirstname: "Achim",
        opponentLastname: "Amthor",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Michael",
        opponentLastname: "Rothermich",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Gerhard",
        opponentLastname: "Acker",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Adel",
        opponentLastname: "Rosenberger",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Ulrich",
        opponentLastname: "Dietzel",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Robert",
        opponentLastname: "Müller",
        ownSets: 3,
        opponentSets: 0
      }
    ]
  },
  {
    place: 11,
    id: "PLAYER12",
    firstname: "Adel",
    lastname: "Rosenberger",
    clubname: "TSV Zorneding 1920",
    gamesWon: 2,
    gamesLost: 4,
    bhz: 19,
    qttr: 1554,
    ttr_now: 1563,
    ttr_diff: 9,
    matches: [
      {
        opponentFirstname: "Matthias",
        opponentLastname: "Vaupel",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Tino",
        opponentLastname: "Viering",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Hermann",
        opponentLastname: "Dubon",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Silvo",
        opponentLastname: "Nötzold",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Ali",
        opponentLastname: "Niemczyk",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Gerald",
        opponentLastname: "Scheer",
        ownSets: 0,
        opponentSets: 3
      }
    ]
  },
  {
    place: 12,
    id: "PLAYER2",
    firstname: "Achim",
    lastname: "Amthor",
    clubname: "SC Baldham-Vaterstetten ",
    gamesWon: 2,
    gamesLost: 4,
    bhz: 19,
    qttr: 1251,
    ttr_now: 1279,
    ttr_diff: 28,
    matches: [
      {
        opponentFirstname: "Silvo",
        opponentLastname: "Nötzold",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Michael",
        opponentLastname: "Popp",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Udo",
        opponentLastname: "Krause",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Robert",
        opponentLastname: "Müller",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Hermann",
        opponentLastname: "Dubon",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Jonas Karl",
        opponentLastname: "Dill",
        ownSets: 0,
        opponentSets: 3
      }
    ]
  },
  {
    place: 13,
    id: "PLAYER3",
    firstname: "Ulrich",
    lastname: "Dietzel",
    clubname: "TTC Friedberg ",
    gamesWon: 2,
    gamesLost: 4,
    bhz: 17,
    qttr: 1111,
    ttr_now: 1143,
    ttr_diff: 32,
    matches: [
      {
        opponentFirstname: "Ali",
        opponentLastname: "Niemczyk",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Udo",
        opponentLastname: "Krause",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Jonas Karl",
        opponentLastname: "Dill",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Gerald",
        opponentLastname: "Scheer",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Silvo",
        opponentLastname: "Nötzold",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Michael",
        opponentLastname: "Rothermich",
        ownSets: 3,
        opponentSets: 0
      }
    ]
  },
  {
    place: 14,
    id: "PLAYER14",
    firstname: "Gerald",
    lastname: "Scheer",
    clubname: "TSV Alteglofsheim",
    gamesWon: 2,
    gamesLost: 4,
    bhz: 13,
    qttr: 1688,
    ttr_now: 1637,
    ttr_diff: -51,
    matches: [
      {
        opponentFirstname: "Gerhard",
        opponentLastname: "Acker",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Matthias",
        opponentLastname: "Vaupel",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Michael",
        opponentLastname: "Rothermich",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Ulrich",
        opponentLastname: "Dietzel",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Robert",
        opponentLastname: "Müller",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Adel",
        opponentLastname: "Rosenberger",
        ownSets: 3,
        opponentSets: 0
      }
    ]
  },
  {
    place: 15,
    id: "PLAYER8",
    firstname: "Robert",
    lastname: "Müller",
    clubname: "FT München-Blumenau 1966",
    gamesWon: 1,
    gamesLost: 5,
    bhz: 20,
    qttr: 1489,
    ttr_now: 1472,
    ttr_diff: -17,
    matches: [
      {
        opponentFirstname: "Georg",
        opponentLastname: "Enser",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Jonas Karl",
        opponentLastname: "Dill",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Matthias",
        opponentLastname: "Vaupel",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Achim",
        opponentLastname: "Amthor",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Gerald",
        opponentLastname: "Scheer",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Silvo",
        opponentLastname: "Nötzold",
        ownSets: 0,
        opponentSets: 3
      }
    ]
  },
  {
    place: 16,
    id: "PLAYER13",
    firstname: "Michael",
    lastname: "Rothermich",
    clubname: "TTC Perlach",
    gamesWon: 1,
    gamesLost: 5,
    bhz: 18,
    qttr: 1610,
    ttr_now: 1573,
    ttr_diff: -37,
    matches: [
      {
        opponentFirstname: "Hermann",
        opponentLastname: "Dubon",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Silvo",
        opponentLastname: "Nötzold",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Gerald",
        opponentLastname: "Scheer",
        ownSets: 3,
        opponentSets: 0
      },
      {
        opponentFirstname: "Jonas Karl",
        opponentLastname: "Dill",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Matthias",
        opponentLastname: "Vaupel",
        ownSets: 0,
        opponentSets: 3
      },
      {
        opponentFirstname: "Ulrich",
        opponentLastname: "Dietzel",
        ownSets: 0,
        opponentSets: 3
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
  matchesToUpdate,
  dummyMatches,
  playersForRanking,
  matchesForRanking,
  expectedRanking
};
