/**
 * @author Marco Goebel
 */

// database config
const USE_IN_MEMORY = true;

/** Tables */
const tables = {
  tournaments: "tournaments",
  competitions: "competitions",
  persons: "persons",
  competition_person: "competition_person",
  matches: "matches"
};

module.exports = {
  USE_IN_MEMORY,
  tables
};
