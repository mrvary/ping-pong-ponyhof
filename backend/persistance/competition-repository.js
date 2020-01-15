function createTable(dao) {
  const sql = `CREATE TABLE IF NOT EXISTS competitions (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  playmode TEXT, 
                  age_group TEXT,
                  type TEXT,
                  start_date TEXT,
                  tournamentId TEXT,
                  CONSTRAINT competitions_fk_tournamentId FOREIGN KEY (tournamentId)
                    REFERENCES tournaments(id)
                    ON UPDATE NO ACTION
                    ON DELETE CASCADE
                )`;
  return dao.run(sql);
}

function create(dao, competition, tournament_id) {
  const sql = `INSERT INTO competitions (
                  playmode,
                  age_group,
                  type,
                  start_date,
                  tournamentId
                ) VALUES (?,?,?,?,?)`;
  return dao.run(sql, [
    competition.playmode,
    competition.age_group,
    competition.type,
    competition.start_date,
    tournament_id
  ]);
}

function remove(dao, id) {
  const sql = `DELETE FROM competitions WHERE id = ?`;
  return dao.run(sql, [id]);
}

function getById(dao, id) {
  const sql = `SELECT * FROM competitions WHERE id = ?`;
  return dao.get(sql, [id]);
}

function getAll(dao) {
  const sql = `SELECT * FROM competitions`;
  return dao.all(sql);
}

module.exports = {
  createTable,
  create,
  remove,
  getById,
  getAll
};
