const tables = require("../config");

const fields = {
  id: "id",
  playmode: "playmode",
  age_group: "age_group",
  type: "type",
  start_date: "start_date",
  tournament_Id: "tournament_Id"
};

function createTable(dao) {
  const sql = `CREATE TABLE IF NOT EXISTS ${tables.competitions} (
                ${fields.id} INTEGER PRIMARY KEY AUTOINCREMENT,
                ${fields.playmode} TEXT, 
                ${fields.age_group} TEXT,
                ${fields.type} TEXT,
                ${fields.start_date} TEXT,
                ${fields.tournament_Id} TEXT,
                CONSTRAINT competitions_fk_tournamentId 
                FOREIGN KEY (${fields.tournament_Id})
                  REFERENCES tournaments(id)
                  ON UPDATE NO ACTION
                  ON DELETE CASCADE
                )`;
  return dao.run(sql);
}

function create(dao, competition, tournament_id) {
  const sql = `INSERT INTO ${tables.competitions} (
                ${fields.playmode},
                ${fields.age_group},
                ${fields.type},
                ${fields.start_date},
                ${fields.tournament_Id}
                ) 
                VALUES (?,?,?,?,?)`;
  return dao.run(sql, [
    competition.playmode,
    competition.age_group,
    competition.type,
    competition.start_date,
    tournament_id
  ]);
}

function remove(dao, id) {
  const sql = `DELETE FROM ${tables.competitions} 
                WHERE ${fields.id} = ?`;
  return dao.run(sql, [id]);
}

function getById(dao, id) {
  const sql = `SELECT * FROM ${tables.competitions} 
                WHERE ${fields.id} = ?`;
  return dao.get(sql, [id]);
}

function getAll(dao) {
  const sql = `SELECT * FROM ${tables.competitions}`;
  return dao.all(sql);
}

function getCompetitionsByTournamentId(dao, tournament_id) {
  const sql = `SELECT * FROM ${tables.competitions} 
                WHERE ${fields.tournamentId} = ?`;
  return dao.all(sql, [tournament_id]);
}

module.exports = {
  createTable,
  create,
  remove,
  getById,
  getAll,
  getCompetitionsByTournamentId
};
