const { pool } = require('../db');

exports.getSelectedHanja = async (searching_include, org, tier, sub_tier) => {
    let conn = await pool.getConnection();
    let sql = '';

    if (searching_include) {
        sql = `SELECT h.* FROM 
        tb_hanja h, 
        tb_org_tier_hanja o
        WHERE o.org_id = ?
        AND o.tier >= ?
        AND o.sub_tier <= ?
        AND o.hanja_id = h.hanja_id
        order by h.sound asc
  `
    } else {
        sql = `SELECT h.* FROM 
    tb_hanja h, 
    tb_org_tier_hanja o
    WHERE o.org_id = ?
    AND o.tier = ?
    AND o.sub_tier = ?
    AND o.hanja_id = h.hanja_id
    order by h.sound asc
    `
    }

    const hanjas = await conn.query(sql, [org, tier, sub_tier]);
    conn.end();
    return hanjas;
}

exports.getHanjaDetail = async (hanja_id) => {
    let conn = await pool.getConnection();
    let sql = '';
    sql = `
    SELECT 
        h.letter, 
        h.meaning, 
        h.sound
    FROM 
        tb_hanja h
    WHERE h.hanja_id = ?
    `;
    const hanjas = await conn.query(sql, [hanja_id]);

    if (hanjas.length < 1) {
        throw Error("해당 한자에 대한 정보가 없습니다.")
    }

    const hanja = hanjas[0];

    sql = `
    SELECT 
	c.code_name as org_name, 
    c.code_id as org_id,
	o.tier, 
	o.sub_tier
    FROM 
        tb_org_tier_hanja o,
        tb_common_code c
    WHERE o.hanja_id = ?
    AND c.code_id = o.org_id
    `;
    const org = await conn.query(sql, [hanja_id]);

    conn.end();

    return { ...hanja, org }
}