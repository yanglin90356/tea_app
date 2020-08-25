const express=require('express');
const pool=require('../pool.js');
const router=express.Router();

router.post('/reg',(req,res)=>{
  // 获取用户提交的电话号码等信息
  let phone=req.body.phone;
  // 以电话号码为条件进行查找,如果用户存在,则产生合法的错误信息
  // 如果用户不存在,则将用户的相关信息写入数据表
  let sql='select * from tea_user where phone=?';
  pool.query(sql,[phone],(err,result)=>{
    if(err) throw err;
    if(result.length==1){
      res.send({message:'注册失败,用户已存在',code:0})
    }else{
      let upwd=req.body.upwd;
      let sql="INSERT INTO tea_user(phone,upwd) VALUES(?,?)";
      pool.query(sql,[phone,upwd],(err,result)=>{
        if(err) throw err;
        res.send({message:'注册成功',code:1})
      })
    }
  })
})

// 登录路由：
router.post('/login',(req,res)=>{
  // 获取用户手机号和密码
  let phone=req.body.phone;
  let upwd=req.body.upwd
  // 以手机号和为条件进行查找,如果未找到,则代表用户登录成功否则登录失败
  let sql='SELECT * FROM tea_user WHERE phone=? AND upwd=?';
  pool.query(sql,[phone,upwd],(err,result)=>{
    // 如果有错误抛出错误
    if(err) throw err;
    if(result.length==1){
      res.send({message:'登录成功',code:1,result:result[0]})
    }else{
      res.send({message:'登录失败',code:0})
    }
  })
})

router.get('/searchPh',(req,res)=>{
  let phone=req.query.phone;
  let sql='select phone from tea_user where phone=?';
  pool.query(sql,[phone],(err,result)=>{
    if(err) throw err;
    if(result.length==1){
      res.send({message:'用户已存在',code:1})
    }else{
      res.send({message:'注册成功',code:0})
    }
  })
})

// 路由器对象导出
module.exports=router;