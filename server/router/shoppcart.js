const express = require('express');
const pool = require('../pool.js');
const { off } = require('process');
const { query } = require('express');
const router = express.Router();

// 查询购物车的商品
router.get('/shoppcart', (req, res) => {
  let sid = req.query.sid;
  let sql = 'select tea_shoppcart.pid,tea_shoppcart.shoppcount,tea_shoppcart.sid,tea_products.pic,tea_products.title,tea_products.price,tea_products.stock from tea_products,tea_shoppcart where tea_products.pid = tea_shoppcart.pid and tea_shoppcart.sid = ?';
  pool.query(sql, [sid], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

// 删除购物车的商品
router.get('/delete', (req, res) => {
  let pid = req.query.pid;
  let sid = req.query.sid;
  let sql = 'delete from tea_shoppcart where pid= ? and sid=?';
  pool.query(sql, [pid, sid], (err, result) => {
    if (err) throw err;
    res.send(result)
  })
})

module.exports = router;