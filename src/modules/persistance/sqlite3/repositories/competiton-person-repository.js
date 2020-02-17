/**
 * @author Marco Goebel
 */

const tables = require("../config");

const fields = {
  competition_id: "competition_id",
  person_id: "person_id",
  ttr: "ttr"
};

function createTable(dao) {
  const sql = `CREATE TABLE IF NOT EXISTS ${tables.competition_person} (
              ${fields.competition_id} INTEGER,
              ${fields.person_id} INTEGER,
              ${fields.ttr} INTEGER,
              PRIMARY KEY (${fields.competition_id}, ${fields.person_id})
            )`;
  return dao.run(sql);
}

module.exports = {
  createTable
};
