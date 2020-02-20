/**
 * @author Marco Goebel
 */

// createTournamentFromJSON: tournamentFromJSON -> Tournament
function createTournamentFromJSON(dataFromJSON) {
  return {
    id: dataFromJSON["tournament-id"],
    name: dataFromJSON["name"],
    city: dataFromJSON["tournament-location"].city,
    start_date: dataFromJSON["start-date"],
    end_date: dataFromJSON["end-date"]
  };
}

module.exports = {
  createTournamentFromJSON
};
