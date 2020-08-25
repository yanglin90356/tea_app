const express=require('express');
// 引入连接池模块
const pool=require('../pool.js');
// 创建路由器对象
const router=express.Router();

// 查询轮播图的图
router.get('/index',(req,res)=>{
	pool.query('select * from banner',(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result);
		}else{
			res.send('0')
		}
	})
});

// 查询广告图片
router.get('/adv',(req,res)=>{
	pool.query('SELECT * FROM tea_adv',(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result);
		}
	})
})

// 查询商品渲染到页面上
router.get('/produ',(req,res)=>{
	pool.query('SELECT * FROM tea_products',(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result);
		}
	})
})

// 移动端商家分类查询
router.get('/spencer',(req,res)=>{
	pool.query('select * from tea_spencer',(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})
// 路由器对象导出
module.exports=router;