const dbConfig = require("./db.config");

const { Pool } = require('pg');

const db = new Pool({
    user: dbConfig.USER,
    host: dbConfig.HOST,
    password:  dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.port
});


module.exports = db;