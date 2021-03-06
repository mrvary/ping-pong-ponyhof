const inputPlayers = [
  {
    type: "single",
    id: "PLAYER1",
    person: {
      "licence-nr": "311062281",
      lastname: "Acker",
      "club-name": "ESV SF Neuaubing",
      sex: "1",
      "ttr-match-count": "25",
      region: "Oberbayern-Mitte",
      "club-federation-nickname": "ByTTV",
      ttr: "1415",
      "internal-nr": "NU2099417",
      "foreigner-eq-state": "false",
      firstname: "Gerhard",
      nationality: "DE",
      "club-nr": "311062",
      birthyear: "1971",
      "sub-region": ""
    }
  },
  {
    type: "single",
    id: "PLAYER2",
    person: {
      "licence-nr": "311006257",
      lastname: "Amthor",
      "club-name": "SC Baldham-Vaterstetten ",
      sex: "1",
      "ttr-match-count": "1566",
      region: "Oberbayern-Mitte",
      "club-federation-nickname": "ByTTV",
      ttr: "1251",
      "internal-nr": "NU1012534",
      "foreigner-eq-state": "false",
      firstname: "Achim",
      nationality: "DE",
      "club-nr": "311006",
      birthyear: "1971",
      "sub-region": ""
    }
  },
  {
    type: "single",
    id: "PLAYER3",
    person: {
      "licence-nr": "309036278",
      lastname: "Dietzel",
      "club-name": "TTC Friedberg ",
      sex: "1",
      "ttr-match-count": "1499",
      region: "Schwaben-Nord",
      "club-federation-nickname": "ByTTV",
      ttr: "1111",
      "internal-nr": "NU1535004",
      "foreigner-eq-state": "false",
      firstname: "Ulrich",
      nationality: "DE",
      "club-nr": "309036",
      birthyear: "1980",
      "sub-region": ""
    }
  }
];

const cleanedUpPlayers = [
  {
    id: "PLAYER1",
    firstname: "Gerhard",
    lastname: "Acker",
    clubname: "ESV SF Neuaubing",
    gamesWon: 3,
    matchIds: [],
    qttr: 1415,
    quitInRound: 0
  },
  {
    id: "PLAYER2",
    firstname: "Achim",
    lastname: "Amthor",
    clubname: "SC Baldham-Vaterstetten ",
    gamesWon: 5,
    matchIds: [],
    qttr: 1251,
    quitInRound: 0
  },
  {
    id: "PLAYER3",
    firstname: "Ulrich",
    lastname: "Dietzel",
    clubname: "TTC Friedberg ",
    gamesWon: 1,
    matchIds: [],
    qttr: 1111,
    quitInRound: 0
  }
];

const tournamentJSON16Players = {
  tournament: {
    "end-date": "2019-05-25",
    "multiple-participations-same-day": "false",
    "winning-sets": "3",
    "multiple-participations-same-time": "false",
    "start-date": "2019-05-25",
    name: "BTTV Bavarian TT-Race",
    "table-count": "8",
    "tournament-id": "d5lK%2BhCCjzbPE4bd9mBdQKIx1P%2FxYXr0",
    "tournament-location": [
      {
        city: "München",
        "zip-code": "München",
        name:
          "Turnhalle Kurt-Eisner-Str., Eingang Feuerwehreinfahrt, gegenüber Haus Nr. 28",
        street: "Bert-Brecht-Allee"
      }
    ],
    competition: {
      "start-date": "2019-05-25 13:00",
      "age-group": "Damen/Herren",
      "age-from": "2004",
      "max-persons": "16",
      sex: "gemischt",
      "age-to": "1898",
      type: "Einzel",
      "entry-fee": "5.0",
      "preliminary-round-playmode": "Schweizer System",
      players: {
        player: [
          {
            type: "single",
            id: "PLAYER1",
            person: {
              "licence-nr": "311062281",
              lastname: "Acker",
              "club-name": "ESV SF Neuaubing",
              sex: "1",
              "ttr-match-count": "25",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1415",
              "internal-nr": "NU2099417",
              "foreigner-eq-state": "false",
              firstname: "Gerhard",
              nationality: "DE",
              "club-nr": "311062",
              birthyear: "1971",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER2",
            person: {
              "licence-nr": "311006257",
              lastname: "Amthor",
              "club-name": "SC Baldham-Vaterstetten ",
              sex: "1",
              "ttr-match-count": "1566",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1251",
              "internal-nr": "NU1012534",
              "foreigner-eq-state": "false",
              firstname: "Achim",
              nationality: "DE",
              "club-nr": "311006",
              birthyear: "1971",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER3",
            person: {
              "licence-nr": "309036278",
              lastname: "Dietzel",
              "club-name": "TTC Friedberg ",
              sex: "1",
              "ttr-match-count": "1499",
              region: "Schwaben-Nord",
              "club-federation-nickname": "ByTTV",
              ttr: "1111",
              "internal-nr": "NU1535004",
              "foreigner-eq-state": "false",
              firstname: "Ulrich",
              nationality: "DE",
              "club-nr": "309036",
              birthyear: "1980",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER4",
            person: {
              "licence-nr": "311066398",
              lastname: "Dill",
              "club-name": "TTC Perlach",
              sex: "1",
              "ttr-match-count": "77",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1356",
              "internal-nr": "NU1831615",
              "foreigner-eq-state": "false",
              firstname: "Jonas Karl",
              nationality: "DE",
              "club-nr": "311066",
              birthyear: "2003",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER5",
            person: {
              "licence-nr": "416006353",
              lastname: "Dubon",
              "club-name": "TuS Bad Aibling",
              sex: "1",
              "ttr-match-count": "274",
              region: "Oberbayern-Ost",
              "club-federation-nickname": "ByTTV",
              ttr: "1521",
              "internal-nr": "NU1620366",
              "foreigner-eq-state": "false",
              firstname: "Hermann",
              nationality: "DE",
              "club-nr": "416006",
              birthyear: "1962",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER6",
            person: {
              "licence-nr": "311050018",
              lastname: "Enser",
              "club-name": "MTV München von 1879",
              sex: "1",
              "ttr-match-count": "70",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1622",
              "internal-nr": "NU1998215",
              "foreigner-eq-state": "false",
              firstname: "Georg",
              nationality: "DE",
              "club-nr": "311050",
              birthyear: "1996",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER7",
            person: {
              "licence-nr": "311082250",
              lastname: "Krause",
              "club-name": "TSV Waldtrudering ",
              sex: "1",
              "ttr-match-count": "359",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1467",
              "internal-nr": "NU1395365",
              "foreigner-eq-state": "false",
              firstname: "Udo",
              nationality: "DE",
              "club-nr": "311082",
              birthyear: "1988",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER8",
            person: {
              "licence-nr": "311052103",
              lastname: "Müller",
              "club-name": "FT München-Blumenau 1966",
              sex: "1",
              "ttr-match-count": "1247",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1489",
              "internal-nr": "NU1034205",
              "foreigner-eq-state": "false",
              firstname: "Robert",
              nationality: "DE",
              "club-nr": "311052",
              birthyear: "1953",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER9",
            person: {
              "licence-nr": "311055215",
              lastname: "Niemczyk",
              "club-name": "TSC München-Maxvorstadt",
              sex: "1",
              "ttr-match-count": "59",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1634",
              "internal-nr": "NU1968031",
              "foreigner-eq-state": "false",
              firstname: "Ali",
              nationality: "DE",
              "club-nr": "311055",
              birthyear: "1977",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER10",
            person: {
              "licence-nr": "311076238",
              lastname: "Nötzold",
              "club-name": "SV-DJK Taufkirchen",
              sex: "1",
              "ttr-match-count": "556",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1833",
              "internal-nr": "NU1045240",
              "foreigner-eq-state": "false",
              firstname: "Silvo",
              nationality: "DE",
              "club-nr": "311076",
              birthyear: "1964",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER11",
            person: {
              "licence-nr": "312020378",
              lastname: "Popp",
              "club-name": "Gautinger SC ",
              sex: "1",
              "ttr-match-count": "975",
              region: "Oberbayern-Süd",
              "club-federation-nickname": "ByTTV",
              ttr: "1601",
              "internal-nr": "NU1579327",
              "foreigner-eq-state": "false",
              firstname: "Michael",
              nationality: "DE",
              "club-nr": "312020",
              birthyear: "1964",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER12",
            person: {
              "licence-nr": "311084231",
              lastname: "Rosenberger",
              "club-name": "TSV Zorneding 1920",
              sex: "1",
              "ttr-match-count": "224",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1554",
              "internal-nr": "NU1052100",
              "foreigner-eq-state": "false",
              firstname: "Adel",
              nationality: "DE",
              "club-nr": "311084",
              birthyear: "1952",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER13",
            person: {
              "licence-nr": "311066243",
              lastname: "Rothermich",
              "club-name": "TTC Perlach",
              sex: "1",
              "ttr-match-count": "1412",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1610",
              "internal-nr": "NU1065390",
              "foreigner-eq-state": "false",
              firstname: "Michael",
              nationality: "DE",
              "club-nr": "311066",
              birthyear: "1984",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER14",
            person: {
              "licence-nr": "413003050",
              lastname: "Scheer",
              "club-name": "TSV Alteglofsheim",
              sex: "1",
              "ttr-match-count": "2666",
              region: "Oberpfalz-Süd",
              "club-federation-nickname": "ByTTV",
              ttr: "1688",
              "internal-nr": "NU1063940",
              "foreigner-eq-state": "false",
              firstname: "Gerald",
              nationality: "DE",
              "club-nr": "413003",
              birthyear: "1974",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER15",
            person: {
              "licence-nr": "311025183",
              lastname: "Vaupel",
              "club-name": "SV Helfendorf",
              sex: "1",
              "ttr-match-count": "110",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1670",
              "internal-nr": "NU1928190",
              "foreigner-eq-state": "false",
              firstname: "Matthias",
              nationality: "DE",
              "club-nr": "311025",
              birthyear: "1981",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER16",
            person: {
              "licence-nr": "413003170",
              lastname: "Viering",
              "club-name": "TSV Alteglofsheim",
              sex: "1",
              "ttr-match-count": "958",
              region: "Oberpfalz-Süd",
              "club-federation-nickname": "ByTTV",
              ttr: "1604",
              "internal-nr": "NU1062931",
              "foreigner-eq-state": "false",
              firstname: "Tino",
              nationality: "DE",
              "club-nr": "413003",
              birthyear: "1993",
              "sub-region": ""
            }
          }
        ]
      }
    }
  }
};

const tournamentJSON15Players = {
  tournament: {
    "end-date": "2019-05-25",
    "multiple-participations-same-day": "false",
    "winning-sets": "3",
    "multiple-participations-same-time": "false",
    "start-date": "2019-05-25",
    name: "BTTV Bavarian TT-Race",
    "table-count": "8",
    "tournament-id": "d5lK%2BhCCjzbPE4bd9mBdQKIx1P%2FxYXr0",
    "tournament-location": [
      {
        city: "München",
        "zip-code": "München",
        name:
          "Turnhalle Kurt-Eisner-Str., Eingang Feuerwehreinfahrt, gegenüber Haus Nr. 28",
        street: "Bert-Brecht-Allee"
      }
    ],
    competition: {
      "start-date": "2019-05-25 13:00",
      "age-group": "Damen/Herren",
      "age-from": "2004",
      "max-persons": "16",
      sex: "gemischt",
      "age-to": "1898",
      type: "Einzel",
      "entry-fee": "5.0",
      "preliminary-round-playmode": "Schweizer System",
      players: {
        player: [
          {
            type: "single",
            id: "PLAYER1",
            person: {
              "licence-nr": "311062281",
              lastname: "Acker",
              "club-name": "ESV SF Neuaubing",
              sex: "1",
              "ttr-match-count": "25",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1415",
              "internal-nr": "NU2099417",
              "foreigner-eq-state": "false",
              firstname: "Gerhard",
              nationality: "DE",
              "club-nr": "311062",
              birthyear: "1971",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER2",
            person: {
              "licence-nr": "311006257",
              lastname: "Amthor",
              "club-name": "SC Baldham-Vaterstetten ",
              sex: "1",
              "ttr-match-count": "1566",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1251",
              "internal-nr": "NU1012534",
              "foreigner-eq-state": "false",
              firstname: "Achim",
              nationality: "DE",
              "club-nr": "311006",
              birthyear: "1971",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER3",
            person: {
              "licence-nr": "309036278",
              lastname: "Dietzel",
              "club-name": "TTC Friedberg ",
              sex: "1",
              "ttr-match-count": "1499",
              region: "Schwaben-Nord",
              "club-federation-nickname": "ByTTV",
              ttr: "1111",
              "internal-nr": "NU1535004",
              "foreigner-eq-state": "false",
              firstname: "Ulrich",
              nationality: "DE",
              "club-nr": "309036",
              birthyear: "1980",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER4",
            person: {
              "licence-nr": "311066398",
              lastname: "Dill",
              "club-name": "TTC Perlach",
              sex: "1",
              "ttr-match-count": "77",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1356",
              "internal-nr": "NU1831615",
              "foreigner-eq-state": "false",
              firstname: "Jonas Karl",
              nationality: "DE",
              "club-nr": "311066",
              birthyear: "2003",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER5",
            person: {
              "licence-nr": "416006353",
              lastname: "Dubon",
              "club-name": "TuS Bad Aibling",
              sex: "1",
              "ttr-match-count": "274",
              region: "Oberbayern-Ost",
              "club-federation-nickname": "ByTTV",
              ttr: "1521",
              "internal-nr": "NU1620366",
              "foreigner-eq-state": "false",
              firstname: "Hermann",
              nationality: "DE",
              "club-nr": "416006",
              birthyear: "1962",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER6",
            person: {
              "licence-nr": "311050018",
              lastname: "Enser",
              "club-name": "MTV München von 1879",
              sex: "1",
              "ttr-match-count": "70",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1622",
              "internal-nr": "NU1998215",
              "foreigner-eq-state": "false",
              firstname: "Georg",
              nationality: "DE",
              "club-nr": "311050",
              birthyear: "1996",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER7",
            person: {
              "licence-nr": "311082250",
              lastname: "Krause",
              "club-name": "TSV Waldtrudering ",
              sex: "1",
              "ttr-match-count": "359",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1467",
              "internal-nr": "NU1395365",
              "foreigner-eq-state": "false",
              firstname: "Udo",
              nationality: "DE",
              "club-nr": "311082",
              birthyear: "1988",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER8",
            person: {
              "licence-nr": "311052103",
              lastname: "Müller",
              "club-name": "FT München-Blumenau 1966",
              sex: "1",
              "ttr-match-count": "1247",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1489",
              "internal-nr": "NU1034205",
              "foreigner-eq-state": "false",
              firstname: "Robert",
              nationality: "DE",
              "club-nr": "311052",
              birthyear: "1953",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER9",
            person: {
              "licence-nr": "311055215",
              lastname: "Niemczyk",
              "club-name": "TSC München-Maxvorstadt",
              sex: "1",
              "ttr-match-count": "59",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1634",
              "internal-nr": "NU1968031",
              "foreigner-eq-state": "false",
              firstname: "Ali",
              nationality: "DE",
              "club-nr": "311055",
              birthyear: "1977",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER10",
            person: {
              "licence-nr": "311076238",
              lastname: "Nötzold",
              "club-name": "SV-DJK Taufkirchen",
              sex: "1",
              "ttr-match-count": "556",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1833",
              "internal-nr": "NU1045240",
              "foreigner-eq-state": "false",
              firstname: "Silvo",
              nationality: "DE",
              "club-nr": "311076",
              birthyear: "1964",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER11",
            person: {
              "licence-nr": "312020378",
              lastname: "Popp",
              "club-name": "Gautinger SC ",
              sex: "1",
              "ttr-match-count": "975",
              region: "Oberbayern-Süd",
              "club-federation-nickname": "ByTTV",
              ttr: "1601",
              "internal-nr": "NU1579327",
              "foreigner-eq-state": "false",
              firstname: "Michael",
              nationality: "DE",
              "club-nr": "312020",
              birthyear: "1964",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER12",
            person: {
              "licence-nr": "311084231",
              lastname: "Rosenberger",
              "club-name": "TSV Zorneding 1920",
              sex: "1",
              "ttr-match-count": "224",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1554",
              "internal-nr": "NU1052100",
              "foreigner-eq-state": "false",
              firstname: "Adel",
              nationality: "DE",
              "club-nr": "311084",
              birthyear: "1952",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER13",
            person: {
              "licence-nr": "311066243",
              lastname: "Rothermich",
              "club-name": "TTC Perlach",
              sex: "1",
              "ttr-match-count": "1412",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1610",
              "internal-nr": "NU1065390",
              "foreigner-eq-state": "false",
              firstname: "Michael",
              nationality: "DE",
              "club-nr": "311066",
              birthyear: "1984",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER14",
            person: {
              "licence-nr": "413003050",
              lastname: "Scheer",
              "club-name": "TSV Alteglofsheim",
              sex: "1",
              "ttr-match-count": "2666",
              region: "Oberpfalz-Süd",
              "club-federation-nickname": "ByTTV",
              ttr: "1688",
              "internal-nr": "NU1063940",
              "foreigner-eq-state": "false",
              firstname: "Gerald",
              nationality: "DE",
              "club-nr": "413003",
              birthyear: "1974",
              "sub-region": ""
            }
          },
          {
            type: "single",
            id: "PLAYER15",
            person: {
              "licence-nr": "311025183",
              lastname: "Vaupel",
              "club-name": "SV Helfendorf",
              sex: "1",
              "ttr-match-count": "110",
              region: "Oberbayern-Mitte",
              "club-federation-nickname": "ByTTV",
              ttr: "1670",
              "internal-nr": "NU1928190",
              "foreigner-eq-state": "false",
              firstname: "Matthias",
              nationality: "DE",
              "club-nr": "311025",
              birthyear: "1981",
              "sub-region": ""
            }
          }
        ]
      }
    }
  }
};

const match_noFreeticket = {
  id: 1,
  player1: "PLAYER1",
  player2: "PLAYER2",
  sets: [
    {
      player1: 0,
      player2: 0
    }
  ]
};

const match_noFreeticket2 = {
  id: 5,
  player1: "PLAYER13",
  player2: "PLAYER8",
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

const match_withFreeticket = {
  id: 1,
  player1: "FreeTicket",
  player2: "PLAYER2",
  sets: [
    {
      player1: 0,
      player2: 0
    }
  ]
};

const match_withFreeticket2 = {
  id: 1,
  player1: "PLAYER9",
  player2: "FreeTicket",
  sets: [
    {
      player1: 11,
      player2: 6
    },
    {
      player1: 6,
      player2: 11
    },
    {
      player1: 5,
      player2: 11
    }
  ]
};

const EXPECTED_PLAYER = {
  id: "PLAYER1",
  firstname: "Gerhard",
  lastname: "Acker",
  clubname: "ESV SF Neuaubing",
  gamesWon: 0,
  matchIds: [],
  opponentIds: [],
  qttr: 1415,
  quitInRound: 0
};

const playersBeforeUpdateDrawing = [
  {
    id: "PLAYER1",
    firstname: "Gerhard",
    lastname: "Acker",
    clubname: "ESV SF Neuaubing",
    gamesWon: 0,
    matchIds: [0],
    opponentIds: ["PLAYER2"],
    qttr: 1415,
    quitInRound: 0
  },
  {
    id: "PLAYER4",
    firstname: "Jonas Karl",
    lastname: "Dill",
    clubname: "TTC Perlach",
    gamesWon: 1,
    matchIds: [1],
    opponentIds: ["PLAYER3"],
    qttr: 1356,
    quitInRound: 0
  },
  {
    id: "PLAYER2",
    firstname: "Achim",
    lastname: "Amthor",
    clubname: "SC Baldham-Vaterstetten ",
    gamesWon: 1,
    matchIds: [0],
    opponentIds: ["PLAYER1"],
    qttr: 1251,
    quitInRound: 0
  },
  {
    id: "PLAYER3",
    firstname: "Ulrich",
    lastname: "Dietzel",
    clubname: "TTC Friedberg ",
    gamesWon: 0,
    matchIds: [1],
    opponentIds: ["PLAYER4"],
    qttr: 1111,
    quitInRound: 0
  }
];

const matchesToPlay = [
  {
    id: 2,
    player1: "PLAYER2",
    player2: "PLAYER4",
    sets: [
      {
        player1: 0,
        player2: 0
      }
    ]
  },
  {
    id: 3,
    player1: "PLAYER1",
    player2: "PLAYER3",
    sets: [
      {
        player1: 0,
        player2: 0
      }
    ]
  }
];

const playersBeforeUpdateWinner = [
  {
    id: "PLAYER1",
    firstname: "Gerhard",
    lastname: "Acker",
    clubname: "ESV SF Neuaubing",
    gamesWon: 0,
    matchIds: [0, 3],
    opponentIds: ["PLAYER2", "PLAYER3"],
    qttr: 1415,
    quitInRound: 0
  },
  {
    id: "PLAYER4",
    firstname: "Jonas Karl",
    lastname: "Dill",
    clubname: "TTC Perlach",
    gamesWon: 1,
    matchIds: [1, 2],
    opponentIds: ["PLAYER3", "PLAYER2"],
    qttr: 1356,
    quitInRound: 0
  },
  {
    id: "PLAYER2",
    firstname: "Achim",
    lastname: "Amthor",
    clubname: "SC Baldham-Vaterstetten ",
    gamesWon: 1,
    matchIds: [0, 2],
    opponentIds: ["PLAYER1", "PLAYER4"],
    qttr: 1251,
    quitInRound: 0
  },
  {
    id: "PLAYER3",
    firstname: "Ulrich",
    lastname: "Dietzel",
    clubname: "TTC Friedberg ",
    gamesWon: 0,
    matchIds: [1, 3],
    opponentIds: ["PLAYER4", "PLAYER1"],
    qttr: 1111,
    quitInRound: 0
  }
];

const matchesToUseForUpdatingWinner = [
  {
    id: 2,
    player1: "PLAYER2",
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
    id: 3,
    player1: "PLAYER1",
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
  }
];

const playersAfterUpdateWinner = [
  {
    id: "PLAYER1",
    firstname: "Gerhard",
    lastname: "Acker",
    clubname: "ESV SF Neuaubing",
    gamesWon: 0,
    matchIds: [0, 3],
    opponentIds: ["PLAYER2", "PLAYER3"],
    qttr: 1415,
    quitInRound: 0
  },
  {
    id: "PLAYER4",
    firstname: "Jonas Karl",
    lastname: "Dill",
    clubname: "TTC Perlach",
    gamesWon: 1,
    matchIds: [1, 2],
    opponentIds: ["PLAYER3", "PLAYER2"],
    qttr: 1356,
    quitInRound: 0
  },
  {
    id: "PLAYER2",
    firstname: "Achim",
    lastname: "Amthor",
    clubname: "SC Baldham-Vaterstetten ",
    gamesWon: 2,
    matchIds: [0, 2],
    opponentIds: ["PLAYER1", "PLAYER4"],
    qttr: 1251,
    quitInRound: 0
  },
  {
    id: "PLAYER3",
    firstname: "Ulrich",
    lastname: "Dietzel",
    clubname: "TTC Friedberg ",
    gamesWon: 1,
    matchIds: [1, 3],
    opponentIds: ["PLAYER4", "PLAYER1"],
    qttr: 1111,
    quitInRound: 0
  }
];

module.exports = {
  inputPlayers,
  cleanedUpPlayers,
  tournamentJSON15Players,
  tournamentJSON16Players,
  EXPECTED_PLAYER,
  match_noFreeticket,
  match_noFreeticket2,
  match_withFreeticket,
  match_withFreeticket2,
  playersBeforeUpdateDrawing,
  matchesToPlay,
  playersBeforeUpdateWinner,
  matchesToUseForUpdatingWinner,
  playersAfterUpdateWinner
};
