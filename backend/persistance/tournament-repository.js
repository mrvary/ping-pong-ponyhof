function createTable(dao) {
  const sql = `CREATE TABLE IF NOT EXISTS tournaments (
                  id TEXT PRIMARY KEY,
                  name TEXT, 
                  city TEXT,
                  start_date TEXT,
                  end_date TEXT 
                )`;
  return dao.run(sql);
}

function create(dao, tournament) {
  const sql =
    'INSERT INTO tournaments (id, name, city, start_date, end_date) VALUES (?,?,?,?,?)';

  return dao.run(sql, [
    tournament.tournament_id,
    tournament.name,
    tournament.city,
    tournament.start_date,
    tournament.end_date
  ]);
}

function remove(dao, id) {
  const sql = 'DELETE FROM tournaments WHERE id = ?';
  return dao.run(sql, [id]);
}

function getById(dao, id) {
  const sql = `SELECT * FROM tournaments WHERE id = ?`;
  return dao.get(sql, [id]);
}

function getAll(dao) {
  const sql = `SELECT * FROM tournaments`;
  return dao.all(sql);
}

function getCompetitions(dao, tournament_id) {
  const sql = `SELECT * FROM competitions WHERE tournament_id = ?`;
  return this.dao.all(sql, [tournament_id]);
}

module.exports = {
  createTable,
  create,
  remove,
  getById,
  getAll,
  getCompetitions
};
