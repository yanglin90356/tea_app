const express = require('express');
// 引入连接池模块
const pool = require('../pool.js');
// 创建路由器对象
const router = express.Router();


// 查询热卖推荐
router.get('/saleval', (req, res) => {
  pool.query('SELECT tpic,tprice,Ttitle2 FROM tea_Trends', (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send(result);
    }
  })
})


// 商品详情
router.get('/details', (req, res) => {
  let pid = req.query.pid;
  let sql = 'select * from tea_products where pid=?';
  pool.query(sql, [pid], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

// 添加购物车
router.get('/addcart', (req, res) => {
  let pid = req.query.pid;
  let count = req.query.count;
  let sid=req.query.sid
  pool.query('select pid from tea_shoppcart where pid = ?', [pid], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      pool.query('update tea_shoppcart set shoppcount=shoppcount+? where pid = ? ', [count, pid], (err, result) => {
        if (err) throw err;
        res.send({ code: 0, result });
      });
    } else {
      let sql = 'insert into  tea_shoppcart(pid,shoppcount,sid) values(?,?,?) ';
      pool.query(sql, [pid, count,sid], (err, result) => {
        if (err) throw err;
        res.send({ code: 1, result });
      })

    }
  });

})

// 路由器对象导出
module.exports = router;