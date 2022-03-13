var express = require('express');
const { pool } = require('../db');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  let conn = await pool.getConnection();
  const hanjas = await conn.query("select * from tb_hanja");
  conn.end();
  res.json(Array.from(hanjas));
});

module.exports = router;