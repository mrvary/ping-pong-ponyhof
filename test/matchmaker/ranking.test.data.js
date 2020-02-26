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
    gamesWon: 1,
    matchIds: [4, 5, 6, 7],
    opponentIds: ["PLAYER1"],
    qttr: 2020,
    active: true
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
    gamesWon: 4,
    matchIds: [6, 10, 16, 24],
    opponentIds: ["FreeTicket", "PLAYER7", "PLAYER5", "PLAYER8"],
    qttr: 1833,
    active: true
  },
  {
    id: "PLAYER14",
    firstname: "Gerald",
    lastname: "Scheer",
    clubname: "TSV Alteglofsheim",
    gamesWon: 1,
    matchIds: [0, 15, 22, 31],
    opponentIds: ["PLAYER7", "PLAYER9", "PLAYER13", "FreeTicket"],
    qttr: 1688,
    active: true
  },
  {
    id: "PLAYER15",
    firstname: "Matthias",
    lastname: "Vaupel",
    clubname: "SV Helfendorf",
    gamesWon: 3,
    matchIds: [5, 11, 17, 27],
    opponentIds: ["PLAYER3", "PLAYER4", "PLAYER8", "PLAYER5"],
    qttr: 1670,
    active: true
  },
  {
    id: "PLAYER9",
    firstname: "Ali",
    lastname: "Niemczyk",
    clubname: "TSC München-Maxvorstadt",
    gamesWon: 1,
    matchIds: [3, 15, 20, 29],
    opponentIds: ["PLAYER1", "PLAYER14", "PLAYER4", "PLAYER11"],
    qttr: 1634,
    active: true
  },
  {
    id: "PLAYER6",
    firstname: "Georg",
    lastname: "Enser",
    clubname: "MTV München von 1879",
    gamesWon: 2,
    matchIds: [1, 13, 18, 26],
    opponentIds: ["PLAYER8", "PLAYER13", "PLAYER2", "PLAYER7"],
    qttr: 1622,
    active: true
  },
  {
    id: "PLAYER13",
    firstname: "Michael",
    lastname: "Rothermich",
    clubname: "TTC Perlach",
    gamesWon: 1,
    matchIds: [2, 13, 22, 30],
    opponentIds: ["PLAYER5", "PLAYER6", "PLAYER14", "PLAYER12"],
    qttr: 1610,
    active: true
  },
  {
    id: "PLAYER11",
    firstname: "Michael",
    lastname: "Popp",
    clubname: "Gautinger SC ",
    gamesWon: 2,
    matchIds: [7, 9, 19, 29],
    opponentIds: ["PLAYER2", "PLAYER5", "PLAYER7", "PLAYER9"],
    qttr: 1601,
    active: true
  },
  {
    id: "PLAYER12",
    firstname: "Adel",
    lastname: "Rosenberger",
    clubname: "TSV Zorneding 1920",
    gamesWon: 2,
    matchIds: [4, 14, 23, 30],
    opponentIds: ["PLAYER4", "PLAYER3", "FreeTicket", "PLAYER13"],
    qttr: 1554,
    active: true
  },
  {
    id: "PLAYER5",
    firstname: "Hermann",
    lastname: "Dubon",
    clubname: "TuS Bad Aibling",
    gamesWon: 2,
    matchIds: [2, 9, 16, 27],
    opponentIds: ["PLAYER13", "PLAYER11", "PLAYER10", "PLAYER15"],
    qttr: 1521,
    active: true
  },
  {
    id: "PLAYER8",
    firstname: "Robert",
    lastname: "Müller",
    clubname: "FT München-Blumenau 1966",
    gamesWon: 3,
    matchIds: [1, 8, 17, 24],
    opponentIds: ["PLAYER6", "PLAYER1", "PLAYER15", "PLAYER10"],
    qttr: 1489,
    active: true
  },
  {
    id: "PLAYER7",
    firstname: "Udo",
    lastname: "Krause",
    clubname: "TSV Waldtrudering ",
    gamesWon: 3,
    matchIds: [0, 10, 19, 26],
    opponentIds: ["PLAYER14", "PLAYER10", "PLAYER11", "PLAYER6"],
    qttr: 1467,
    active: true
  },
  {
    id: "PLAYER1",
    firstname: "Gerhard",
    lastname: "Acker",
    clubname: "ESV SF Neuaubing",
    gamesWon: 1,
    matchIds: [3, 8, 21, 28],
    opponentIds: ["PLAYER9", "PLAYER8", "PLAYER3", "PLAYER2"],
    qttr: 1415,
    active: true
  },
  {
    id: "PLAYER4",
    firstname: "Jonas Karl",
    lastname: "Dill",
    clubname: "TTC Perlach",
    gamesWon: 2,
    matchIds: [4, 11, 20, 25],
    opponentIds: ["PLAYER12", "PLAYER15", "PLAYER9", "PLAYER3"],
    qttr: 1356,
    active: true
  },
  {
    id: "PLAYER2",
    firstname: "Achim",
    lastname: "Amthor",
    clubname: "SC Baldham-Vaterstetten ",
    gamesWon: 2,
    matchIds: [7, 12, 18, 28],
    opponentIds: ["PLAYER11", "FreeTicket", "PLAYER6", "PLAYER1"],
    qttr: 1251,
    active: true
  },
  {
    id: "PLAYER3",
    firstname: "Ulrich",
    lastname: "Dietzel",
    clubname: "TTC Friedberg ",
    gamesWon: 3,
    matchIds: [5, 14, 21, 25],
    opponentIds: ["PLAYER15", "PLAYER12", "PLAYER1", "PLAYER4"],
    qttr: 1111,
    active: true
  },
  {
    id: "FreeTicket",
    gamesWon: 0,
    lastname: "FREILOS",
    matchIds: [6, 12, 23, 31],
    opponentIds: ["PLAYER10", "PLAYER2", "PLAYER12", "PLAYER14"],
    qttr: 0
  }
];

const matchesForRanking = [
  {
    id: 0,
    player1: "PLAYER14",
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
      }
    ]
  },
  {
    id: 1,
    player1: "PLAYER6",
    player2: "PLAYER8",
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
      }
    ]
  },
  {
    id: 2,
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
      }
    ]
  },
  {
    id: 3,
    player1: "PLAYER9",
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
      }
    ]
  },
  {
    id: 4,
    player1: "PLAYER12",
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
      }
    ]
  },
  {
    id: 5,
    player1: "PLAYER15",
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
      }
    ]
  },
  {
    id: 6,
    player1: "PLAYER10",
    player2: "FreeTicket",
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
      }
    ]
  },
  {
    id: 7,
    player1: "PLAYER11",
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
      }
    ]
  },
  {
    id: 8,
    player1: "PLAYER8",
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
      }
    ]
  },
  {
    id: 9,
    player1: "PLAYER11",
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
      }
    ]
  },
  {
    id: 10,
    player1: "PLAYER7",
    player2: "PLAYER10",
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
      }
    ]
  },
  {
    id: 11,
    player1: "PLAYER4",
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
      }
    ]
  },
  {
    id: 12,
    player1: "FreeTicket",
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
      }
    ]
  },
  {
    id: 13,
    player1: "PLAYER13",
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
      }
    ]
  },
  {
    id: 14,
    player1: "PLAYER12",
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
      }
    ]
  },
  {
    id: 15,
    player1: "PLAYER14",
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
      }
    ]
  },
  {
    id: 16,
    player1: "PLAYER5",
    player2: "PLAYER10",
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
      }
    ]
  },
  {
    id: 17,
    player1: "PLAYER15",
    player2: "PLAYER8",
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
      }
    ]
  },
  {
    id: 18,
    player1: "PLAYER6",
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
      }
    ]
  },
  {
    id: 19,
    player1: "PLAYER11",
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
      }
    ]
  },
  {
    id: 20,
    player1: "PLAYER4",
    player2: "PLAYER9",
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
      }
    ]
  },
  {
    id: 21,
    player1: "PLAYER3",
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
      }
    ]
  },
  {
    id: 22,
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
      }
    ]
  },
  {
    id: 23,
    player1: "PLAYER12",
    player2: "FreeTicket",
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
      }
    ]
  },
  {
    id: 24,
    player1: "PLAYER8",
    player2: "PLAYER10",
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
      }
    ]
  },
  {
    id: 25,
    player1: "PLAYER3",
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
      }
    ]
  },
  {
    id: 26,
    player1: "PLAYER7",
    player2: "PLAYER6",
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
      }
    ]
  },
  {
    id: 27,
    player1: "PLAYER15",
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
      }
    ]
  },
  {
    id: 28,
    player1: "PLAYER1",
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
      }
    ]
  },
  {
    id: 29,
    player1: "PLAYER11",
    player2: "PLAYER9",
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
      }
    ]
  },
  {
    id: 30,
    player1: "PLAYER12",
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
      }
    ]
  },
  {
    id: 31,
    player1: "PLAYER14",
    player2: "FreeTicket",
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
      }
    ]
  }
];

const expectedRanking = [
    {
      "place": 1,
      "id": "PLAYER10",
      "firstname": "Silvo",
      "lastname": "Nötzold",
      "gamesWon": 4,
      "gamesLost": 0,
      "bhz": 8,
      "qttr": 1833,
      "ttr_beginn": 1833,
      "ttr_now": 1833,
      "ttr_diff": 0,
      "matches": [
        {
          "id": 6,
          "player1": "PLAYER10",
          "player2": "FreeTicket",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Silvo",
          "player1lastname": "Nötzold",
          "player2lastname": "FREILOS",
          "result": {
            "player1": 3,
            "player2": 0
          }
        },
        {
          "id": 10,
          "player1": "PLAYER7",
          "player2": "PLAYER10",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Udo",
          "player2firstname": "Silvo",
          "player1lastname": "Krause",
          "player2lastname": "Nötzold",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 16,
          "player1": "PLAYER5",
          "player2": "PLAYER10",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Hermann",
          "player2firstname": "Silvo",
          "player1lastname": "Dubon",
          "player2lastname": "Nötzold",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 24,
          "player1": "PLAYER8",
          "player2": "PLAYER10",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Robert",
          "player2firstname": "Silvo",
          "player1lastname": "Müller",
          "player2lastname": "Nötzold",
          "result": {
            "player1": 0,
            "player2": 3
          }
        }
      ]
    },
    {
      "place": 2,
      "id": "PLAYER15",
      "firstname": "Matthias",
      "lastname": "Vaupel",
      "gamesWon": 3,
      "gamesLost": 1,
      "bhz": 10,
      "qttr": 1670,
      "ttr_beginn": 1670,
      "ttr_now": 1657,
      "ttr_diff": -13,
      "matches": [
        {
          "id": 5,
          "player1": "PLAYER15",
          "player2": "PLAYER3",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Matthias",
          "player2firstname": "Ulrich",
          "player1lastname": "Vaupel",
          "player2lastname": "Dietzel",
          "result": {
            "player1": 3,
            "player2": 0
          }
        },
        {
          "id": 11,
          "player1": "PLAYER4",
          "player2": "PLAYER15",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Jonas Karl",
          "player2firstname": "Matthias",
          "player1lastname": "Dill",
          "player2lastname": "Vaupel",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 17,
          "player1": "PLAYER15",
          "player2": "PLAYER8",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Matthias",
          "player2firstname": "Robert",
          "player1lastname": "Vaupel",
          "player2lastname": "Müller",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 27,
          "player1": "PLAYER15",
          "player2": "PLAYER5",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Matthias",
          "player2firstname": "Hermann",
          "player1lastname": "Vaupel",
          "player2lastname": "Dubon",
          "result": {
            "player1": 3,
            "player2": 0
          }
        }
      ]
    },
    {
      "place": 3,
      "id": "PLAYER8",
      "firstname": "Robert",
      "lastname": "Müller",
      "gamesWon": 3,
      "gamesLost": 1,
      "bhz": 10,
      "qttr": 1489,
      "ttr_beginn": 1489,
      "ttr_now": 1522,
      "ttr_diff": 33,
      "matches": [
        {
          "id": 1,
          "player1": "PLAYER6",
          "player2": "PLAYER8",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Georg",
          "player2firstname": "Robert",
          "player1lastname": "Enser",
          "player2lastname": "Müller",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 8,
          "player1": "PLAYER8",
          "player2": "PLAYER1",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Robert",
          "player2firstname": "Gerhard",
          "player1lastname": "Müller",
          "player2lastname": "Acker",
          "result": {
            "player1": 3,
            "player2": 0
          }
        },
        {
          "id": 17,
          "player1": "PLAYER15",
          "player2": "PLAYER8",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Matthias",
          "player2firstname": "Robert",
          "player1lastname": "Vaupel",
          "player2lastname": "Müller",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 24,
          "player1": "PLAYER8",
          "player2": "PLAYER10",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Robert",
          "player2firstname": "Silvo",
          "player1lastname": "Müller",
          "player2lastname": "Nötzold",
          "result": {
            "player1": 0,
            "player2": 3
          }
        }
      ]
    },
    {
      "place": 4,
      "id": "PLAYER7",
      "firstname": "Udo",
      "lastname": "Krause",
      "gamesWon": 3,
      "gamesLost": 1,
      "bhz": 9,
      "qttr": 1467,
      "ttr_beginn": 1467,
      "ttr_now": 1511,
      "ttr_diff": 44,
      "matches": [
        {
          "id": 0,
          "player1": "PLAYER14",
          "player2": "PLAYER7",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Gerald",
          "player2firstname": "Udo",
          "player1lastname": "Scheer",
          "player2lastname": "Krause",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 10,
          "player1": "PLAYER7",
          "player2": "PLAYER10",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Udo",
          "player2firstname": "Silvo",
          "player1lastname": "Krause",
          "player2lastname": "Nötzold",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 19,
          "player1": "PLAYER11",
          "player2": "PLAYER7",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Michael",
          "player2firstname": "Udo",
          "player1lastname": "Popp",
          "player2lastname": "Krause",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 26,
          "player1": "PLAYER7",
          "player2": "PLAYER6",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Udo",
          "player2firstname": "Georg",
          "player1lastname": "Krause",
          "player2lastname": "Enser",
          "result": {
            "player1": 3,
            "player2": 0
          }
        }
      ]
    },
    {
      "place": 5,
      "id": "PLAYER3",
      "firstname": "Ulrich",
      "lastname": "Dietzel",
      "gamesWon": 3,
      "gamesLost": 1,
      "bhz": 8,
      "qttr": 1111,
      "ttr_beginn": 1111,
      "ttr_now": 1158,
      "ttr_diff": 47,
      "matches": [
        {
          "id": 5,
          "player1": "PLAYER15",
          "player2": "PLAYER3",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Matthias",
          "player2firstname": "Ulrich",
          "player1lastname": "Vaupel",
          "player2lastname": "Dietzel",
          "result": {
            "player1": 3,
            "player2": 0
          }
        },
        {
          "id": 14,
          "player1": "PLAYER12",
          "player2": "PLAYER3",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Adel",
          "player2firstname": "Ulrich",
          "player1lastname": "Rosenberger",
          "player2lastname": "Dietzel",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 21,
          "player1": "PLAYER3",
          "player2": "PLAYER1",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Ulrich",
          "player2firstname": "Gerhard",
          "player1lastname": "Dietzel",
          "player2lastname": "Acker",
          "result": {
            "player1": 3,
            "player2": 0
          }
        },
        {
          "id": 25,
          "player1": "PLAYER3",
          "player2": "PLAYER4",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Ulrich",
          "player2firstname": "Jonas Karl",
          "player1lastname": "Dietzel",
          "player2lastname": "Dill",
          "result": {
            "player1": 3,
            "player2": 0
          }
        }
      ]
    },
    {
      "place": 6,
      "id": "PLAYER5",
      "firstname": "Hermann",
      "lastname": "Dubon",
      "gamesWon": 2,
      "gamesLost": 2,
      "bhz": 10,
      "qttr": 1521,
      "ttr_beginn": 1521,
      "ttr_now": 1545,
      "ttr_diff": 24,
      "matches": [
        {
          "id": 2,
          "player1": "PLAYER13",
          "player2": "PLAYER5",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Michael",
          "player2firstname": "Hermann",
          "player1lastname": "Rothermich",
          "player2lastname": "Dubon",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 9,
          "player1": "PLAYER11",
          "player2": "PLAYER5",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Michael",
          "player2firstname": "Hermann",
          "player1lastname": "Popp",
          "player2lastname": "Dubon",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 16,
          "player1": "PLAYER5",
          "player2": "PLAYER10",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Hermann",
          "player2firstname": "Silvo",
          "player1lastname": "Dubon",
          "player2lastname": "Nötzold",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 27,
          "player1": "PLAYER15",
          "player2": "PLAYER5",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Matthias",
          "player2firstname": "Hermann",
          "player1lastname": "Vaupel",
          "player2lastname": "Dubon",
          "result": {
            "player1": 3,
            "player2": 0
          }
        }
      ]
    },
    {
      "place": 7,
      "id": "PLAYER6",
      "firstname": "Georg",
      "lastname": "Enser",
      "gamesWon": 2,
      "gamesLost": 2,
      "bhz": 9,
      "qttr": 1622,
      "ttr_beginn": 1622,
      "ttr_now": 1601,
      "ttr_diff": -21,
      "matches": [
        {
          "id": 1,
          "player1": "PLAYER6",
          "player2": "PLAYER8",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Georg",
          "player2firstname": "Robert",
          "player1lastname": "Enser",
          "player2lastname": "Müller",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 13,
          "player1": "PLAYER13",
          "player2": "PLAYER6",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Michael",
          "player2firstname": "Georg",
          "player1lastname": "Rothermich",
          "player2lastname": "Enser",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 18,
          "player1": "PLAYER6",
          "player2": "PLAYER2",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Georg",
          "player2firstname": "Achim",
          "player1lastname": "Enser",
          "player2lastname": "Amthor",
          "result": {
            "player1": 3,
            "player2": 0
          }
        },
        {
          "id": 26,
          "player1": "PLAYER7",
          "player2": "PLAYER6",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Udo",
          "player2firstname": "Georg",
          "player1lastname": "Krause",
          "player2lastname": "Enser",
          "result": {
            "player1": 3,
            "player2": 0
          }
        }
      ]
    },
    {
      "place": 8,
      "id": "PLAYER4",
      "firstname": "Jonas Karl",
      "lastname": "Dill",
      "gamesWon": 2,
      "gamesLost": 2,
      "bhz": 9,
      "qttr": 1356,
      "ttr_beginn": 1356,
      "ttr_now": 1371,
      "ttr_diff": 15,
      "matches": [
        {
          "id": 4,
          "player1": "PLAYER12",
          "player2": "PLAYER4",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Adel",
          "player2firstname": "Jonas Karl",
          "player1lastname": "Rosenberger",
          "player2lastname": "Dill",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 11,
          "player1": "PLAYER4",
          "player2": "PLAYER15",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Jonas Karl",
          "player2firstname": "Matthias",
          "player1lastname": "Dill",
          "player2lastname": "Vaupel",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 20,
          "player1": "PLAYER4",
          "player2": "PLAYER9",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Jonas Karl",
          "player2firstname": "Ali",
          "player1lastname": "Dill",
          "player2lastname": "Niemczyk",
          "result": {
            "player1": 3,
            "player2": 0
          }
        },
        {
          "id": 25,
          "player1": "PLAYER3",
          "player2": "PLAYER4",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Ulrich",
          "player2firstname": "Jonas Karl",
          "player1lastname": "Dietzel",
          "player2lastname": "Dill",
          "result": {
            "player1": 3,
            "player2": 0
          }
        }
      ]
    },
    {
      "place": 9,
      "id": "PLAYER11",
      "firstname": "Michael",
      "lastname": "Popp",
      "gamesWon": 2,
      "gamesLost": 2,
      "bhz": 8,
      "qttr": 1601,
      "ttr_beginn": 1601,
      "ttr_now": 1585,
      "ttr_diff": -16,
      "matches": [
        {
          "id": 7,
          "player1": "PLAYER11",
          "player2": "PLAYER2",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Michael",
          "player2firstname": "Achim",
          "player1lastname": "Popp",
          "player2lastname": "Amthor",
          "result": {
            "player1": 3,
            "player2": 0
          }
        },
        {
          "id": 9,
          "player1": "PLAYER11",
          "player2": "PLAYER5",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Michael",
          "player2firstname": "Hermann",
          "player1lastname": "Popp",
          "player2lastname": "Dubon",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 19,
          "player1": "PLAYER11",
          "player2": "PLAYER7",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Michael",
          "player2firstname": "Udo",
          "player1lastname": "Popp",
          "player2lastname": "Krause",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 29,
          "player1": "PLAYER11",
          "player2": "PLAYER9",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Michael",
          "player2firstname": "Ali",
          "player1lastname": "Popp",
          "player2lastname": "Niemczyk",
          "result": {
            "player1": 3,
            "player2": 0
          }
        }
      ]
    },
    {
      "place": 10,
      "id": "PLAYER12",
      "firstname": "Adel",
      "lastname": "Rosenberger",
      "gamesWon": 2,
      "gamesLost": 2,
      "bhz": 6,
      "qttr": 1554,
      "ttr_beginn": 1554,
      "ttr_now": 1534,
      "ttr_diff": -20,
      "matches": [
        {
          "id": 4,
          "player1": "PLAYER12",
          "player2": "PLAYER4",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Adel",
          "player2firstname": "Jonas Karl",
          "player1lastname": "Rosenberger",
          "player2lastname": "Dill",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 14,
          "player1": "PLAYER12",
          "player2": "PLAYER3",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Adel",
          "player2firstname": "Ulrich",
          "player1lastname": "Rosenberger",
          "player2lastname": "Dietzel",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 23,
          "player1": "PLAYER12",
          "player2": "FreeTicket",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Adel",
          "player1lastname": "Rosenberger",
          "player2lastname": "FREILOS",
          "result": {
            "player1": 3,
            "player2": 0
          }
        },
        {
          "id": 30,
          "player1": "PLAYER12",
          "player2": "PLAYER13",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Adel",
          "player2firstname": "Michael",
          "player1lastname": "Rosenberger",
          "player2lastname": "Rothermich",
          "result": {
            "player1": 3,
            "player2": 0
          }
        }
      ]
    },
    {
      "place": 11,
      "id": "PLAYER2",
      "firstname": "Achim",
      "lastname": "Amthor",
      "gamesWon": 2,
      "gamesLost": 2,
      "bhz": 5,
      "qttr": 1251,
      "ttr_beginn": 1251,
      "ttr_now": 1266,
      "ttr_diff": 15,
      "matches": [
        {
          "id": 7,
          "player1": "PLAYER11",
          "player2": "PLAYER2",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Michael",
          "player2firstname": "Achim",
          "player1lastname": "Popp",
          "player2lastname": "Amthor",
          "result": {
            "player1": 3,
            "player2": 0
          }
        },
        {
          "id": 12,
          "player1": "FreeTicket",
          "player2": "PLAYER2",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player2firstname": "Achim",
          "player1lastname": "FREILOS",
          "player2lastname": "Amthor",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 18,
          "player1": "PLAYER6",
          "player2": "PLAYER2",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Georg",
          "player2firstname": "Achim",
          "player1lastname": "Enser",
          "player2lastname": "Amthor",
          "result": {
            "player1": 3,
            "player2": 0
          }
        },
        {
          "id": 28,
          "player1": "PLAYER1",
          "player2": "PLAYER2",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Gerhard",
          "player2firstname": "Achim",
          "player1lastname": "Acker",
          "player2lastname": "Amthor",
          "result": {
            "player1": 0,
            "player2": 3
          }
        }
      ]
    },
    {
      "place": 12,
      "id": "PLAYER1",
      "firstname": "Gerhard",
      "lastname": "Acker",
      "gamesWon": 1,
      "gamesLost": 3,
      "bhz": 9,
      "qttr": 1415,
      "ttr_beginn": 1415,
      "ttr_now": 1396,
      "ttr_diff": -19,
      "matches": [
        {
          "id": 3,
          "player1": "PLAYER9",
          "player2": "PLAYER1",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Ali",
          "player2firstname": "Gerhard",
          "player1lastname": "Niemczyk",
          "player2lastname": "Acker",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 8,
          "player1": "PLAYER8",
          "player2": "PLAYER1",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Robert",
          "player2firstname": "Gerhard",
          "player1lastname": "Müller",
          "player2lastname": "Acker",
          "result": {
            "player1": 3,
            "player2": 0
          }
        },
        {
          "id": 21,
          "player1": "PLAYER3",
          "player2": "PLAYER1",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Ulrich",
          "player2firstname": "Gerhard",
          "player1lastname": "Dietzel",
          "player2lastname": "Acker",
          "result": {
            "player1": 3,
            "player2": 0
          }
        },
        {
          "id": 28,
          "player1": "PLAYER1",
          "player2": "PLAYER2",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Gerhard",
          "player2firstname": "Achim",
          "player1lastname": "Acker",
          "player2lastname": "Amthor",
          "result": {
            "player1": 0,
            "player2": 3
          }
        }
      ]
    },
    {
      "place": 13,
      "id": "PLAYER13",
      "firstname": "Michael",
      "lastname": "Rothermich",
      "gamesWon": 1,
      "gamesLost": 3,
      "bhz": 7,
      "qttr": 1610,
      "ttr_beginn": 1610,
      "ttr_now": 1591,
      "ttr_diff": -19,
      "matches": [
        {
          "id": 2,
          "player1": "PLAYER13",
          "player2": "PLAYER5",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Michael",
          "player2firstname": "Hermann",
          "player1lastname": "Rothermich",
          "player2lastname": "Dubon",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 13,
          "player1": "PLAYER13",
          "player2": "PLAYER6",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Michael",
          "player2firstname": "Georg",
          "player1lastname": "Rothermich",
          "player2lastname": "Enser",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 22,
          "player1": "PLAYER13",
          "player2": "PLAYER14",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Michael",
          "player2firstname": "Gerald",
          "player1lastname": "Rothermich",
          "player2lastname": "Scheer",
          "result": {
            "player1": 3,
            "player2": 0
          }
        },
        {
          "id": 30,
          "player1": "PLAYER12",
          "player2": "PLAYER13",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Adel",
          "player2firstname": "Michael",
          "player1lastname": "Rosenberger",
          "player2lastname": "Rothermich",
          "result": {
            "player1": 3,
            "player2": 0
          }
        }
      ]
    },
    {
      "place": 14,
      "id": "PLAYER9",
      "firstname": "Ali",
      "lastname": "Niemczyk",
      "gamesWon": 1,
      "gamesLost": 3,
      "bhz": 6,
      "qttr": 1634,
      "ttr_beginn": 1634,
      "ttr_now": 1604,
      "ttr_diff": -30,
      "matches": [
        {
          "id": 3,
          "player1": "PLAYER9",
          "player2": "PLAYER1",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Ali",
          "player2firstname": "Gerhard",
          "player1lastname": "Niemczyk",
          "player2lastname": "Acker",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 15,
          "player1": "PLAYER14",
          "player2": "PLAYER9",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Gerald",
          "player2firstname": "Ali",
          "player1lastname": "Scheer",
          "player2lastname": "Niemczyk",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 20,
          "player1": "PLAYER4",
          "player2": "PLAYER9",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Jonas Karl",
          "player2firstname": "Ali",
          "player1lastname": "Dill",
          "player2lastname": "Niemczyk",
          "result": {
            "player1": 3,
            "player2": 0
          }
        },
        {
          "id": 29,
          "player1": "PLAYER11",
          "player2": "PLAYER9",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Michael",
          "player2firstname": "Ali",
          "player1lastname": "Popp",
          "player2lastname": "Niemczyk",
          "result": {
            "player1": 3,
            "player2": 0
          }
        }
      ]
    },
    {
      "place": 15,
      "id": "PLAYER14",
      "firstname": "Gerald",
      "lastname": "Scheer",
      "gamesWon": 1,
      "gamesLost": 3,
      "bhz": 5,
      "qttr": 1688,
      "ttr_beginn": 1688,
      "ttr_now": 1649,
      "ttr_diff": -39,
      "matches": [
        {
          "id": 0,
          "player1": "PLAYER14",
          "player2": "PLAYER7",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Gerald",
          "player2firstname": "Udo",
          "player1lastname": "Scheer",
          "player2lastname": "Krause",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 15,
          "player1": "PLAYER14",
          "player2": "PLAYER9",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player1firstname": "Gerald",
          "player2firstname": "Ali",
          "player1lastname": "Scheer",
          "player2lastname": "Niemczyk",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 22,
          "player1": "PLAYER13",
          "player2": "PLAYER14",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Michael",
          "player2firstname": "Gerald",
          "player1lastname": "Rothermich",
          "player2lastname": "Scheer",
          "result": {
            "player1": 3,
            "player2": 0
          }
        },
        {
          "id": 31,
          "player1": "PLAYER14",
          "player2": "FreeTicket",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Gerald",
          "player1lastname": "Scheer",
          "player2lastname": "FREILOS",
          "result": {
            "player1": 3,
            "player2": 0
          }
        }
      ]
    },
    {
      "place": 16,
      "id": "FreeTicket",
      "lastname": "FREILOS",
      "gamesWon": 0,
      "gamesLost": 4,
      "bhz": 9,
      "qttr": 0,
      "ttr_beginn": 0,
      "ttr_now": 0,
      "ttr_diff": 0,
      "matches": [
        {
          "id": 6,
          "player1": "PLAYER10",
          "player2": "FreeTicket",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Silvo",
          "player1lastname": "Nötzold",
          "player2lastname": "FREILOS",
          "result": {
            "player1": 3,
            "player2": 0
          }
        },
        {
          "id": 12,
          "player1": "FreeTicket",
          "player2": "PLAYER2",
          "sets": [
            {
              "player1": 4,
              "player2": 11
            },
            {
              "player1": 5,
              "player2": 11
            },
            {
              "player1": 6,
              "player2": 11
            }
          ],
          "player2firstname": "Achim",
          "player1lastname": "FREILOS",
          "player2lastname": "Amthor",
          "result": {
            "player1": 0,
            "player2": 3
          }
        },
        {
          "id": 23,
          "player1": "PLAYER12",
          "player2": "FreeTicket",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Adel",
          "player1lastname": "Rosenberger",
          "player2lastname": "FREILOS",
          "result": {
            "player1": 3,
            "player2": 0
          }
        },
        {
          "id": 31,
          "player1": "PLAYER14",
          "player2": "FreeTicket",
          "sets": [
            {
              "player1": 11,
              "player2": 1
            },
            {
              "player1": 11,
              "player2": 2
            },
            {
              "player1": 11,
              "player2": 3
            }
          ],
          "player1firstname": "Gerald",
          "player1lastname": "Scheer",
          "player2lastname": "FREILOS",
          "result": {
            "player1": 3,
            "player2": 0
          }
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
