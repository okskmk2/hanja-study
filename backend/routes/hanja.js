var express = require('express');
var router = express.Router();
const hanja_service = require('../services/hanja.service');

router.get('/', async function (req, res, next) {
  let { org, tier, sub_tier, searching_include } = req.query;
  tier = parseInt(tier);
  sub_tier = parseInt(sub_tier);
  searching_include = searching_include === 'true';
  const hanjas = await hanja_service.getSelectedHanja(searching_include, org, tier, sub_tier);
  res.json(Array.from(hanjas));
});

router.get('/:hanja_id', async function (req, res, next) {
  try {
    const hanja = await hanja_service.getHanjaDetail(req.params.hanja_id);
    res.json(hanja);
    console.log(hanja);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/', async function (req, res, next) {
  const { org, tier, letter, meaning, sound } = req.body;
  let conn = await pool.getConnection();
  let sql = '';
  let hanja_id, hanjas;

  // 먼저 이미 있는 지 확인한다.
  sql = `select hanja_id from tb_hanja where letter = ? and sound = ? and meaning = ?`;
  hanjas = await conn.query(sql, [letter, sound, meaning]);

  // 없으면 추가한다.
  if (hanjas.length < 1) {
    console.log("없다.")
    // 추가하고
    sql = `insert into tb_hanja (letter, meaning, sound ) values ( ?, ?, ?)`;
    await conn.query(sql, [letter, meaning, sound]);
    // 생성된 한자아이디를 가져온다.
    sql = `select hanja_id from tb_hanja where letter = ? and sound = ? and meaning = ?`;
    hanjas = await conn.query(sql, [letter, sound, meaning]);
  }

  hanja_id = hanjas[0].hanja_id;

  try {
    sql = `insert into tb_org_tier_hanja (org_id, hanja_id, tier, sub_tier ) values ( ?, ?, ?, ?)`;
    await conn.query(sql, [org, hanja_id, tier.tier, tier.sub_tier]);
    conn.end();
    res.sendStatus(201);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({
      message: error.message
    });
  }
});

module.exports = router;