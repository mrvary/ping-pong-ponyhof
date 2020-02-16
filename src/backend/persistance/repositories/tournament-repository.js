/**
 * @author Marco Goebel
 */

const tables = require("../config");

const fields = {
  id: "id",
  name: "name",
  city: "city",
  start_date: "start_date",
  end_date: "end_date"
};

function createTable(dao) {
  const sql = `CREATE TABLE IF NOT EXISTS ${tables.tournaments} (
                ${fields.id} TEXT PRIMARY KEY,
                ${fields.name} TEXT, 
                ${fields.city} TEXT,
                ${fields.start_date} TEXT,
                ${fields.end_date} TEXT 
              )`;
  return dao.run(sql);
}

function create(dao, tournament) {
  const sql = `INSERT INTO ${tables.tournaments} (
                ${fields.id},
                ${fields.name},
                ${fields.city},
                ${fields.start_date},
                ${fields.end_date} 
              ) VALUES (?,?,?,?,?)`;

  return dao.run(sql, [
    tournament.id,
    tournament.name,
    tournament.city,
    tournament.start_date,
    tournament.end_date
  ]);
}

function remove(dao, id) {
  const sql = `DELETE FROM ${tables.tournaments} 
                WHERE ${fields.id} = ?`;
  return dao.run(sql, [id]);
}

function getById(dao, id) {
  const sql = `SELECT * FROM ${tables.tournaments} 
                WHERE ${fields.id} = ?`;
  return dao.get(sql, [id]);
}

function getAll(dao) {
  const sql = `SELECT * FROM ${tables.tournaments}`;
  return dao.all(sql);
}

module.exports = {
  createTable,
  create,
  remove,
  getById,
  getAll
};
