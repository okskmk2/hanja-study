var express = require('express');
const { pool } = require('../db');
var router = express.Router();

router.get('/', async function (req, res, next) {
  const { org, tier } = req.query;
  let conn = await pool.getConnection();
  let sql = `SELECT h.* FROM 
  tb_hanja h, 
  tb_org_tier_hanja o
  WHERE o.org_id = '${org}'
  AND o.tier = ${tier}
  AND o.letter = h.letter`
  console.log(sql);
  const hanjas = await conn.query(sql);
  conn.end();
  res.json(Array.from(hanjas));
});

router.post('/', async function (req, res, next) {
  const { org, tier, letter, meaning, sound } = req.body;
  let conn = await pool.getConnection();
  let sql = '';
  try {
    await conn.beginTransaction();
    sql = `insert into tb_hanja (letter, meaning, sound ) values ( ?, ?, ?)`;
    await conn.query(sql, [letter, meaning, sound]);
    sql = `insert into tb_org_tier_hanja (org_id, letter, tier ) values ( ?, ?, ?)`;
    await conn.query(sql, [org, letter, tier]);
    conn.commit();
  } catch (error) {
    console.log(error.message);
    conn.rollback();
    res.status(400).send({
      message: error.message
    });
  }
  conn.end();
  res.sendStatus(201);
});

module.exports = router;