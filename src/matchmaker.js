module.exports = function Matchmaker(participants) {
  let players = initPlayers(participants);

  console.log(players);
  // return matchmacker
  return {
    draw: function() {
      // draw next round
    }
  };
};

function initPlayers(participants) {
  return participants.map(participant => {
    // destructure input
    const { id, person } = participant;
    const { firstname, lastname, ttr } = person;
    const clubname = person["club-name"];

    return {
      id,
      firstname,
      lastname,
      clubname,
      gamesWon: 0,
      // Buchholz-number, number of games that enemies won
      vs: {},
      ttr
    };
  });
}
