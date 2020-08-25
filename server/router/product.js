const express = require('express');
const pool = require('../pool.js');
const { off } = require('process');
const router = express.Router();

// 查询热卖推荐
router.get('/nominate', (req, res) => {
  pool.query('SELECT tpic,tprice,Ttitle2 FROM tea_Trends', (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send(result);
    }
  })
})

// 查询商品以及分页
// router.get('/productlist', (req, res) => {
//   let $obj = req.query;
//   // 获取得到的参数 页数 和 关键词
//   let page = $obj.page;
//   let $kw = $obj.ptype;
//   // 设置每页得到多少条数据
//   let pagesize = 5;
//   let offset = (page - 1) * pagesize;
//   let sql = `select count(title) as count from tea_products where title like '%${$kw}%'`;
//   // 得到的商品数量有可能不够分页,会导致页码不够,传过来是空值,所有当page不等于空的时候,才做分页
//   if (page != null && $kw !== '全部') {
//     pool.query(sql, (err, result) => {
//       let rowCount = result[0].count;
//       let pageCount = Math.ceil(rowCount / pagesize);
//       pool.query(`select * from tea_products where title like '%${$kw}%' limit ${offset},${pagesize}`, (err, result) => {
//         if (err) throw err;
//         res.send({ result: result, pageCount: pageCount })
//       })
//     })
//   } else {
//     pool.query('select count(title) as count from tea_products', (err, result) => {
//       let rowCount = result[0].count;
//       let pageCount = Math.ceil(rowCount / pagesize);
//       pool.query(`select * from tea_products limit ${offset},${pagesize}`, (err, result) => {
//         if (err) throw err;
//         res.send({ result: result, pageCount: pageCount })
//       })
//     })
//   }
// })

router.get('/prolist', (req, res) => {
  let $obj = req.query;
  let $kw = $obj.ptype;
  if ($kw == '全部' || $kw==undefined) {
    pool.query('select * from tea_products', (err, result) => {
      if (err) throw err;
      res.send({ result: result });
    })
  } else {
    pool.query(`select * from tea_products where title like '%${$kw}%'`, (err, result) => {
      if (err) throw err;
      res.send({ result: result });
    })
  }
})


// 查询所有商品

module.exports = router;