// Required Modules
const mariadb = require("mariadb");

// Initialize Pool
const pool = mariadb.createPool({
    host: process.env.MDB_HOST,
    user: process.env.MDB_USER,
    password: process.env.MDB_PASS,
    database: process.env.MDB_DB,
    connectionLimit: 100,
});

exports.pool = pool;