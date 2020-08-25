/*设置客户端连接服务器端编码为UTF8*/
SET
	NAMES utf8;

/*丢弃数据库 如果存在*/
DROP DATABASE IF EXISTS tea;

/*创建一个新的数据库,设置它的存储编码为UTF8*/
CREATE DATABASE tea CHARSET = UTF8;

/*进入创建的数据库*/
USE tea;

/*用户信息表*/
CREATE TABLE tea_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	#用户编号
	phone VARCHAR(32),
	#用户手机
	upwd VARCHAR(32) #用户密码
);

/*商品信息表*/
CREATE TABLE tea_products(
	id INT PRIMARY KEY AUTO_INCREMENT,
	pid INT,
	#商品id
	price DECIMAL(7, 2),
	#商品价格
	stock INT,
	#库存
	title VARCHAR(20),
	#商品标题
	pic CHAR(64),
	#大图主图
	details CHAR(64),
	#商品详情图
	masterpic VARCHAR(220),
	#小图主图
	title2 VARCHAR(64),
	salesvolume INT,
	tid INT #茶客 活动 茶多分
);

CREATE TABLE banner(path VARCHAR(220));

/*专区分类*/
CREATE TABLE tea_zone(
	id INT PRIMARY KEY AUTO_INCREMENT,
	tid INT,
	#专区分类,
	tname VARCHAR(32) #茶客 活动 茶多分
);

/*广告表*/
CREATE TABLE tea_adv(advimg VARCHAR(220));

/*热卖推荐*/
CREATE TABLE tea_Trends(
	tid INT PRIMARY KEY AUTO_INCREMENT,
	tpid INT,
	#商品id
	tprice DECIMAL(7, 2),
	#商品价格
	tstock INT,
	#库存
	Ttitle VARCHAR(20),
	#商品标题
	tpic CHAR(64),
	#大图主图
	tdetails CHAR(64),
	#商品详情图
	tmasterpic VARCHAR(220),
	#小图主图
	Ttitle2 VARCHAR(64),
	tsalesvolume INT
);

CREATE TABLE tea_shoppcart(
	shoppid INT PRIMARY KEY AUTO_INCREMENT,
	#购物车id
	sid INT,
	#用户id
	pid INT,
	#商品id
	shoppcount INT #商品数量
);

/*商家分类*/
CREATE TABLE tea_spencer(
	spencerId INT PRIMARY KEY AUTO_INCREMENT,
	spencerImg VARCHAR(220),
	spencerName VARCHAR(32)
);

/*插入数据*/
INSERT INTO
	tea_products
VALUES
	(
		null,
		1,
		960.00,
		1000,
		"沧浪之歌古树熟茶",
		"http://127.0.0.1:9850/img/cl/cl1.jpg",
		"http://127.0.0.1:9850/img/cl/clxq.png",
		"http://127.0.0.1:9850/img/cl/cl1.jpg|http://127.0.0.1:9850/img/cl/cl2.jpg|http://127.0.0.1:9850/img/cl/cl3.jpg|http://127.0.0.1:9850/img/cl/cl4.jpg",
		"沧浪之歌",
		2,
		100
	),
	(
		null,
		2,
		680.00,
		1000,
		"17年高山寨大叶种",
		"http://127.0.0.1:9850/img/gs/gs1.png",
		"http://127.0.0.1:9850/img/gs/gsxq.png",
		"http://127.0.0.1:9850/img/gs/gs1.png|http://127.0.0.1:9850/img/gs/gs2.png|http://127.0.0.1:9850/img/gs/gs3.png|http://127.0.0.1:9850/img/gs/gs4.png",
		"高山寨",
		4,
		100
	),
	(
		null,
		3,
		388.00,
		800,
		"16年百年乔木生茶",
		"http://127.0.0.1:9850/img/bn/bn1.png",
		"http://127.0.0.1:9850/img/bn/bnxq.png",
		"http://127.0.0.1:9850/img/bn/bn1.png|http://127.0.0.1:9850/img/bn/bn2.png|http://127.0.0.1:9850/img/bn/bn3.png|http://127.0.0.1:9850/img/bn/bn4.png",
		"百年乔木",
		6,
		100
	),
	(
		null,
		4,
		650.00,
		200,
		"17年麻黑古树生茶",
		"http://127.0.0.1:9850/img/mh/mh1.png",
		"http://127.0.0.1:9850/img/mh/mhxq.png",
		"http://127.0.0.1:9850/img/mh/mh1.png|http://127.0.0.1:9850/img/mh/mh2.png|http://127.0.0.1:9850/img/mh/mh3.png",
		"麻黑",
		11,
		100
	),
	(
		null,
		5,
		1980.00,
		200,
		"17年弯弓古树生茶",
		"http://127.0.0.1:9850/img/wg/wg1.png",
		"http://127.0.0.1:9850/img/wg/wgxq.png",
		"http://127.0.0.1:9850/img/wg/wg1.png|http://127.0.0.1:9850/img/wg/wg2.png|http://127.0.0.1:9850/img/wg/wg3.png|http://127.0.0.1:9850/img/wg/wg4.png",
		"弯弓",
		7,
		100
	),
	(
		null,
		6,
		388.00,
		150,
		"16年师承听云生茶",
		"http://127.0.0.1:9850/img/ty/ty1.png",
		"http://127.0.0.1:9850/img/ty/tyxq.png",
		"http://127.0.0.1:9850/img/ty/ty1.png",
		"听云（生茶）",
		5,
		200
	),
	(
		null,
		7,
		450.00,
		18,
		"16年师承朝宗生茶",
		"http://127.0.0.1:9850/img/cz/cz1.png",
		"http://127.0.0.1:9850/img/cz/czxq.png",
		"http://127.0.0.1:9850/img/cz/cz1.png|http://127.0.0.1:9850/img/cz/cz2.png|http://127.0.0.1:9850/img/cz/cz3.png|http://127.0.0.1:9850/img/cz/cz4.png",
		"朝宗（生茶）",
		0,
		200
	),
	(
		null,
		8,
		420.00,
		268,
		"乔木普饼（熟茶）",
		"http://127.0.0.1:9850/img/qm/qm1.png",
		"http://127.0.0.1:9850/img/qm/qmxq.png",
		"http://127.0.0.1:9850/img/qm/qm1.png|http://127.0.0.1:9850/img/qm/qm2.png|http://127.0.0.1:9850/img/qm/qm3.png",
		"乔木普饼（熟茶）",
		3,
		200
	),
	(
		null,
		9,
		63,
		450.00,
		"高顶孔雀（生茶）",
		"http://127.0.0.1:9850/img/kq/kq1.png",
		"http://127.0.0.1:9850/img/kq/kqxq.png",
		"http://127.0.0.1:9850/img/kq/kq1.png|http://127.0.0.1:9850/img/kq/kq2.png|http://127.0.0.1:9850/img/kq/kq3.png",
		"高顶孔雀（生茶）",
		25,
		200
	),
	(
		null,
		10,
		136,
		698.00,
		"16珍品尚熟古树熟茶",
		"http://127.0.0.1:9850/img/ps/ps1.png",
		"http://127.0.0.1:9850/img/ps/psxq.png",
		"http://127.0.0.1:9850/img/ps/ps1.png|http://127.0.0.1:9850/img/ps/ps2.png|http://127.0.0.1:9850/img/ps/ps3.png|http://127.0.0.1:9850/img/ps/ps4.png|http://127.0.0.1:9850/img/ps/ps5.png",
		"尚熟（熟茶）",
		11,
		200
	);

/*分区数据*/
INSERT INTO
	tea_zone
VALUES
	(null, 100, "茶客专区"),
	(null, 200, "活动专区"),
	(null, 300, "茶多分专区"),
	(null, 400, "集贸市场"),
	(null, 500, "通知公告");

/*轮播图*/
INSERT INTO
	banner
VALUES
	("http://127.0.0.1:9850/img/banner1.jpg"),
	("http://127.0.0.1:9850/img/banner2.jpg"),
	("http://127.0.0.1:9850/img/banner3.jpg"),
	("http://127.0.0.1:9850/img/banner4.jpg"),
	("http://127.0.0.1:9850/img/banner5.jpg");

/*广告表插入数据*/
INSERT INTO
	tea_adv
VALUES
	("http://127.0.0.1:9850/img/huodong.png"),
	("http://127.0.0.1:9850/img/chaduof.png"),
	("http://127.0.0.1:9850/img/haocha.png");

/*热卖推荐插入数据*/
INSERT INTO
	tea_Trends
VALUES
	(
		null,
		1,
		688.00,
		500,
		"小青柑壹号（罐装）",
		"http://127.0.0.1:9850/img/remai/1.png",
		"http://127.0.0.1:9850/img/remai/1-xq.png",
		"http://127.0.0.1:9850/img/remai/1.png|http://127.0.0.1:9850/img/remai/1-1.png|http://127.0.0.1:9850/img/remai/1-2.png|http://127.0.0.1:9850/img/remai/1-3.png",
		"小青柑壹号（罐装）",
		2
	),
	(
		null,
		2,
		1018.00,
		300,
		"古普神韵（熟茶）",
		"http://127.0.0.1:9850/img/remai/2.png",
		"http://127.0.0.1:9850/img/remai/2-5.png",
		"http://127.0.0.1:9850/img/remai/2.png|http://127.0.0.1:9850/img/remai/2-1.png|http://127.0.0.1:9850/img/remai/2-2.png|http://127.0.0.1:9850/img/remai/2-3|http://127.0.0.1:9850/img/remai/2-4.png",
		"古普神韵（熟茶）",
		7
	),
	(
		null,
		3,
		880.00,
		76,
		"易武古韵",
		"http://127.0.0.1:9850/img/remai/3.png",
		"http://127.0.0.1:9850/img/remai/3-3.png",
		"http://127.0.0.1:9850/img/remai/3.png|http://127.0.0.1:9850/img/remai/3-1.png|http://127.0.0.1:9850/img/remai/3-2.png",
		"易武古韵",
		3
	),
	(
		null,
		4,
		1350.00,
		13,
		"古普神韵（生茶）",
		"http://127.0.0.1:9850/img/remai/4.png",
		"http://127.0.0.1:9850/img/remai/4-5.png",
		"http://127.0.0.1:9850/img/remai/4.png|http://127.0.0.1:9850/img/remai/4-1.png|http://127.0.0.1:9850/img/remai/4-2.png|http://127.0.0.1:9850/img/remai/4-3.png|http://127.0.0.1:9850/img/remai/4-4.png",
		"古普神韵（生茶）",
		3
	),
	(
		null,
		5,
		656.00,
		37,
		"青柑年华（柑普茶）",
		"http://127.0.0.1:9850/img/remai/5.png",
		"http://127.0.0.1:9850/img/remai/5-5.png",
		"http://127.0.0.1:9850/img/remai/5.png|http://127.0.0.1:9850/img/remai/5-1.png|http://127.0.0.1:9850/img/remai/5-2.png|http://127.0.0.1:9850/img/remai/5-3.png|http://127.0.0.1:9850/img/remai/5-4.png",
		"青柑年华（柑普茶）",
		25
	);

INSERT INTO
	tea_spencer
VALUES
	(
		NULL,
		"http://127.0.0.1:9850/img/syzw.png",
		"岁月知味"
	),
	(
		null,
		"http://127.0.0.1:9850/img/gdgc.png",
		"高顶古茶"
	),
	(null, "http://127.0.0.1:9850/img/cp.png", "陈普"),
	(null, "http://127.0.0.1:9850/img/qy.jpg", "侨一"),
	(null, "http://127.0.0.1:9850/img/gh.jpg", "国皓"),
	(null, "http://127.0.0.1:9850/img/dj.jpg", "斗记"),
	(
		null,
		"http://127.0.0.1:9850/img/zshd.jpg",
		"中山活动"
	),
	(
		null,
		"http://127.0.0.1:9850/img/djrhd.jpg",
		"斗记融活动"
	),
	(
		null,
		"http://127.0.0.1:9850/img/mchd.jpg",
		"明春活动"
	);