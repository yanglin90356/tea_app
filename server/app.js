const express=require('express');
// 引入路由器
const indexRouter=require('./router/index.js');
const userRouter=require('./router/user.js');
const productRouter=require('./router/product.js');
const detailsRouter=require('./router/details.js')
const shoppcartRouter=require('./router/shoppcart.js')

// 引入body-parser中间件
const bodyParser=require('body-parser');
const cors = require('cors');//跨域
const app=express();

app.use(cors({
	origin:"*"
}))
app.listen(9850,()=>{
	console.log("启动成功");
});
// 托管静态资源
app.use( express.static('public'));
// 应用中间件，将post请求的数据解析为对象
app.use(bodyParser.urlencoded({
	extended:false
}));
// 挂载路由，并添加前缀
app.use('/index',indexRouter);
app.use('/pro',productRouter);
app.use('/user',userRouter);
app.use('/deta',detailsRouter);
app.use('/cart',shoppcartRouter);