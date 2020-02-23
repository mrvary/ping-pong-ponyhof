/**
 * @author Marco Goebel
 */

// Constants
const PLAYMODE = { SCHWEIZER_SYSTEM: "Schweizer System" };

const COMPETITION_STATUS = {
    COMP_CREATED: "comp-created",
    COMP_READY_ROUND_READY: "comp-ready-round-ready",
    COMP_READY_ROUND_ACTIVE: "comp-ready-round-active",
    COMP_ACTIVE_ROUND_READY: "comp-active-round-ready",
    COMP_ACTIVE_ROUND_ACTIVE: "comp-active-round-active",
    COMP_COMPLETED: "comp-completed"
};

/**
 * createCompetitionFromJSON: dataFromJSON -> Competition
 */
 function createCompetitionFromJSON(dataFromJSON) {
     const competition = {
         id: dataFromJSON["tournament-id"],
         name: dataFromJSON["name"],
         date: dataFromJSON["start-date"],
         playmode: dataFromJSON.competition["preliminary-round-playmode"],
         round_matchIds: [],
         status: null
     };
     return setCompetitionStatus(competition);
}

function setCompetitionStatus(competition, userChangedCompetition, isCompleted) {
     if (competition.status === COMPETITION_STATUS.COMP_CREATED) {
         competition.status = COMPETITION_STATUS.COMP_READY_ROUND_READY;
     } else if (competition.status === COMPETITION_STATUS.COMP_READY_ROUND_READY) {
         competition.status = COMPETITION_STATUS.COMP_ACTIVE_ROUND_READY;
     } else if (competition.status === COMPETITION_STATUS.COMP_ACTIVE_ROUND_READY) {
         if (userChangedCompetition) {
             competition.status = COMPETITION_STATUS.COMP_READY_ROUND_READY;
         } else {
             competition.status = COMPETITION_STATUS.COMP_ACTIVE_ROUND_ACTIVE;
         }
     } else if (competition.status === COMPETITION_STATUS.COMP_ACTIVE_ROUND_ACTIVE) {
         if (isCompleted) {
             competition.status = COMPETITION_STATUS.COMP_COMPLETED;
         } else {
             competition.status = COMPETITION_STATUS.COMP_ACTIVE_ROUND_READY;
         }
     } else {
         competition.status = COMPETITION_STATUS.COMP_CREATED;
     }

    return competition;
}

module.exports = {
    PLAYMODE,
    COMPETITION_STATUS,
    createCompetitionFromJSON,
    setCompetitionStatus
};
