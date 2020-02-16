/**
 * @author Marco Goebel
 */

const tables = require("../config");

const fields = {
  id: "id",
  round: "round",
  player_A: "player_A",
  player_B: "player_B",
  set_A_1: "set_A_1",
  set_B_1: "set_B_1",
  set_A_2: "set_A_2",
  set_B_2: "set_B_2",
  set_A_3: "set_A_3",
  set_B_3: "set_B_3",
  set_A_4: "set_A_4",
  set_B_4: "set_B_4",
  set_A_5: "set_A_5",
  set_B_6: "set_B_5"
};

function createTable(dao) {
  const sql = `CREATE TABLE IF NOT EXISTS ${tables.matches} (
              ${fields.id} INTEGER,
              ${fields.round} INTEGER,
              ${fields.player_A} INTEGER,
              ${fields.player_B} INTEGER,
              ${fields.set_A_1} INTEGER,
              ${fields.set_B_1} INTEGER,
              ${fields.set_A_2} INTEGER,
              ${fields.set_B_2} INTEGER,
              ${fields.set_A_3} INTEGER,
              ${fields.set_B_3} INTEGER,
              ${fields.set_A_4} INTEGER,
              ${fields.set_B_4} INTEGER,
              ${fields.set_A_5} INTEGER,
              ${fields.set_B_5} INTEGER

  )`;

  return dao.run(sql);
}

module.exports = {
  createTable
};
