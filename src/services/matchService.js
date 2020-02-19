const matches1 = [
  {
    id: 0,
    player1: 'Thomas Krause',
    player2: 'Max Müller',
    sets: [
      { player1: 11, player2: 13 },
      { player1: 11, player2: 8 },
      { player1: 11, player2: 2 }
    ],
    freeTicket: false,
    compId: 0
  },
  {
    id: 1,
    player1: 'Janis Huss',
    player2: 'Gerald Knut',
    sets: [
      { player1: 7, player2: 11 },
      { player1: 13, player2: 11 },
      { player1: 19, player2: 21 }
    ],
    freeTicket: false,
    compId: 0
  },
  {
    id: 2,
    player1: 'Jürgen Bach',
    player2: 'Klaus Kraus',
    sets: [],
    freeTicket: false,
    compId: 0
  }
];

const matches0 = [
  {
    id: 3,
    player1: 'Samuel Geiger',
    player2: 'Marius Bach',
    sets: [
      { player1: 11, player2: 13 },
      { player1: 11, player2: 8 },
      { player1: 11, player2: 2 }
    ],
    freeTicket: false,
    compId: 1
  },
  {
    id: 4,
    player1: 'Edith Finch',
    player2: 'Finch Assozial',
    sets: [
      { player1: 11, player2: 13 },
      { player1: 11, player2: 8 },
      { player1: 11, player2: 2 }
    ],
    freeTicket: false,
    compId: 1
  },
  {
    id: 0,
    player1: 'Thomas Krause',
    player2: 'Max Müller',
    sets: [
      { player1: 11, player2: 13 },
      { player1: 11, player2: 8 },
      { player1: 11, player2: 2 }
    ],
    freeTicket: false,
    compId: 0
  },
  {
    id: 1,
    player1: 'Janis Huss',
    player2: 'Gerald Knut',
    sets: [
      { player1: 7, player2: 11 },
      { player1: 13, player2: 11 },
      { player1: 19, player2: 21 },
      { player1: 11, player2: 13 },
      { player1: 11, player2: 8 }
    ],
    freeTicket: false,
    compId: 0
  },
  {
    id: 2,
    player1: 'Jürgen Bach',
    player2: 'Klaus Kraus',
    sets: [],
    freeTicket: false,
    compId: 0
  }
];

function getMatchesByCompetition(compId) {
  if (compId === 0) return matches1;
  else return matches0;
}

module.exports = {
  getMatchesByCompetition
};
