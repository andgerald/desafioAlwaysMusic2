const { Pool } = require("pg");

const config = {
  user: "postgres",
  host: "localhost",
  password: "geraldine19",
  database: "alwaysmusic",
  port: 5432,
};

const pool = new Pool(config);

module.exports = pool;
