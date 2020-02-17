/**
 * @author Marco Goebel
 */

const tables = require("../config");

const fields = {
  // person fields
  internal_nr: "internal_nr",
  firstname: "firstname",
  lastname: "lastname",
  birthyear: "birthyear",
  licence_nr: "licence_nr",
  sex: "sex",

  // club fields
  club_nr: "club_nr",
  club_name: "club_name",
  club_nickname: "club_nickname",
  region: "region",
  sub_region: "sub_region"

  // ttr fehlt ist pro competition unterschiedlich
};

function createTable(dao) {
  const sql = `CREATE TABLE IF NOT EXISTS ${tables.persons} (
                ${fields.internal_nr} TEXT PRIMARY KEY,
                ${fields.firstname} TEXT,
                ${fields.lastname} TEXT,
                ${fields.birthyear} INTEGER,
                ${fields.licence_nr} INTEGER,
                ${fields.sex} INTEGER,

                ${fields.club_nr} INTEGER,
                ${fields.club_name} TEXT,
                ${fields.club_nickname} TEXT,
                ${fields.region} TEXT,
                ${fields.sub_region} TEXT
              )`;
  return dao.run(sql);
}

module.exports = {
  createTable
};
