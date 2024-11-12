/**
 * Instanciate knex and export it
 */
const CONFIG = require("./config");

const config = {
  client: "mysql",
  connection: {
    host: CONFIG.DATABASE.MYSQL_HOST,
    user: CONFIG.DATABASE.MYSQL_USER,
    password: CONFIG.DATABASE.MYSQL_PASSWORD,
    database: CONFIG.DATABASE.MYSQL_DATABASE,
  },
  debug: true,
};

const knex = require("knex")(config);

module.exports = knex;
