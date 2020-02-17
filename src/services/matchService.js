const matches0 = [
  {
    id: 0,
    player1: 'Thomas Krause',
    player2: 'Max Müller',
    sets: [],
    freeTicket: false,
    compId: 0
  },
  {
    id: 1,
    player1: 'Janis Huss',
    player2: 'Gerald Knut',
    sets: [],
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

const matches1 = [
  {
    id: 3,
    player1: 'Samuel Geiger',
    player2: 'Marius Bach',
    sets: [
      [11, 13],
      [4, 11]
    ],
    freeTicket: false,
    compId: 1
  },
  {
    id: 4,
    player1: 'Edith Finch',
    player2: 'Finch Assozial',
    sets: [
      [13, 15],
      [14, 16]
    ],
    freeTicket: false,
    compId: 1
  }
];

function getMatchesByCompetition(compId) {
  if (compId === 0) return matches0;
  else return matches1;
}

module.exports = {
  getMatchesByCompetition
};
