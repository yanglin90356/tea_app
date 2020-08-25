<template>
  <div class="index">
    <!-- 顶部搜索 -->
    <div class="nav-search">
      <form action="/">
        <van-search
          v-model="kw"
          shape="square"
          background="#be2a2a"
          placeholder="搜索商品"
          class="search"
          @search="onSearch"
        >
          <template #left>
            <img src="../assets/logo.png" class="logo" />
          </template>
        </van-search>
      </form>
    </div>
    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red">
        <van-swipe-item v-for="(item,index) of banner_img" :key="index">
          <img :src="item.path" alt />
        </van-swipe-item>
      </van-swipe>
      <img src="../assets/white.png" alt />
    </div>
    <!-- 二级导航 -->
    <div class="nav-main">
      <ul>
        <li v-for="(nav,index) of nav_main" :key="index">
          <router-link to>
            <img v-lazy="nav.img" alt />
            <p>{{nav.name}}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 公告资讯 -->
    <div class="info">
      <div class="news">
        <div>
          <img src="../assets/info.jpg" alt />
        </div>
        <ul>
          <li>
            <label>公告</label>
            <span>语茶商城支付通道升级公告</span>
            <span>12-24</span>
          </li>
          <li>
            <label>公告</label>
            <span>《岁月知味•明春》在茶多分专区正式上线</span>
            <span>12-07</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 茶客专区 -->
    <div class="friends">
      <ul>
        <li class="friends-left">
          <img src="../assets/dan.jpg" alt />
          <span>茶客专区</span>
          <img src="../assets/dan.jpg" alt />
        </li>
        <li class="friends-left-right">
          <router-link to="/prolist/全部">
            <span>更多</span>
          </router-link>
          <img class="kz" src="../assets/kz.png" alt />
        </li>
      </ul>
      <div class="product">
        <div v-for="(pro,index) of prductArr1" :key="index">
          <router-link :to="`/details/${pro.pid}`">
            <img v-lazy="pro.pic" alt />
          </router-link>
          <p class="price">
            <span>￥</span>
            <span>{{pro.price.toFixed(2)}}</span>
          </p>
          <span class="title">{{pro.title2}}</span>
          <p class="title-2">{{pro.title}}</p>
        </div>
      </div>
    </div>
    <!-- 活动专区 -->
    <div class="friends">
      <ul>
        <li class="friends-left">
          <img src="../assets/dan.jpg" alt />
          <span>活动专区</span>
          <img src="../assets/dan.jpg" alt />
        </li>
        <li class="friends-left-right">
          <router-link to="/prolist/全部">
            <span>更多</span>
          </router-link>
          <img class="kz" src="../assets/kz.png" alt />
        </li>
      </ul>
      <div class="product">
        <div v-for="(pro1,index) of prductArr2" :key="index">
          <router-link :to="`/details/${pro1.pid}`">
            <img v-lazy="pro1.pic" alt />
          </router-link>
          <p class="price">
            <span>￥</span>
            <span>{{pro1.price.toFixed(2)}}</span>
          </p>
          <span class="title">{{pro1.title2}}</span>
          <p class="title-2">{{pro1.title}}</p>
        </div>
      </div>
    </div>
    <!-- 兑换专区 -->
    <div class="friends">
      <ul>
        <li class="friends-left">
          <img src="../assets/dan.jpg" alt />
          <span>兑换专区</span>
          <img src="../assets/dan.jpg" alt />
        </li>
        <li class="friends-left-right">
          <router-link to="/prolist/全部">
            <span>更多</span>
          </router-link>
          <img class="kz" src="../assets/kz.png" alt />
        </li>
      </ul>
      <div class="product">
        <div v-for="(pro2,index) of prductArr3" :key="index">
          <router-link :to="`/details/${pro2.pid}`">
            <img v-lazy="pro2.pic" alt />
          </router-link>
          <p class="price">
            <span>￥</span>
            <span>{{pro2.price.toFixed(2)}}</span>
          </p>
          <span class="title">{{pro2.title2}}</span>
          <p class="title-2">{{pro2.title}}</p>
        </div>
      </div>
    </div>
    <foot :active="'home'"></foot>
  </div>
</template>

<script>
import foot from "../components/foot";
export default {
  data() {
    return {
      // 定义轮播图数组
      banner_img: [],
      prductArr1: [],
      prductArr2: [],
      prductArr3: [],
      kw: "",
      nav_main: [
        {
          name: "茶客专区",
          img: require("../assets/house.png"),
        },
        {
          name: "活动专区",
          img: require("../assets/activity.png"),
        },
        {
          name: "兑换专区",
          img: require("../assets/convert.png"),
        },
        {
          name: "集贸市场",
          img: require("../assets/fair.png"),
        },
      ],
    };
  },
  methods: {
    // 封装轮播图axios请求函数
    banner() {
      this.axios.get("/index/index").then((res) => {
        this.banner_img = res.data;
      });
    },
    // 首页商品axios请求函数
    proList() {
      this.axios.get("index/produ").then((res) => {
        this.prductArr1 = res.data.slice(0, 4);
        this.prductArr2 = res.data.slice(4, 8);
        this.prductArr3 = res.data.slice(8, 10);
      });
    },
    onSearch() {
      if (this.kw !== "") {
        this.$router.push("/prolist/" + this.kw);
      }
    },
  },
  mounted() {
    // 挂载完成调用轮播图axios请求函数
    this.banner();
    // 挂载完成调用首页商品aixos请求函数
    this.proList();
  },
  components: {
    foot,
  },
};
</script>

<style scoped>
* {
  font-family: "Microsoft Yahei", sans-serif, serif;
}
/* logo开始 */
.logo {
  width: 34px;
  margin-right: 10px;
}
.index .nav-search {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
}
/* 轮播图 */
.van-field__control {
  color: #000;
}
.index .banner {
  position: relative;
  margin-top: 54px;
}
.index .banner > img {
  width: 100%;
  position: absolute;
  bottom: 3px;
  left: 0;
}
.index .my-swipe .van-swipe-item {
  margin-top: 1px;
  color: #fff;
  font-size: 20px;
  text-align: center;
}
.index .my-swipe .van-swipe-item img {
  width: 100%;
}
.index .van-swipe__indicators {
  bottom: 30px;
}
/* 二层导航 */
.nav-main ul {
  display: flex;
  justify-content: space-around;
  padding: 10px;
}
.nav-main ul li img {
  width: 49px;
  height: 49px;
}
.nav-main ul li p {
  margin: 0;
  font-size: 14px;
  color: #505050;
}
/* 公告资讯 */
.index > .info {
  background: #eeeeee;
  padding: 13px 0 13px 0;
}
.index > .info > .news {
  background: #fff;
  display: flex;
  padding: 10px;
}
.index > .info > .news > div > img {
  width: 39px;
  height: 39px;
  padding: 5px 0 5px 0;
}
.index > .info > .news > ul {
  width: 100%;
}
.index > .info > .news > ul > li:first-child {
  margin-top: -3px;
}
.index > .info > .news > ul > li:nth-child(2) {
  margin-top: 10px;
}
.index > .info > .news > ul > li > label:first-child {
  float: left;
  color: #af3638;
  border: 1px solid #af3638;
  margin-left: 5px;
  padding: 0 0.03rem;
}
.index > .info > .news > ul > li::after {
  content: "";
  display: block;
  clear: both;
}
.index > .info > .news > ul > li > span:nth-child(2) {
  float: left;
  font-size: 12px;
  margin: 2px 0 0 13px;
}
.index > .info > .news > ul > li > span:nth-child(3) {
  float: right;
  color: #999999;
  font-size: 12px;
}
/* 茶客专区 */
.friends ul {
  margin-top: 10px;
  text-align: center;
}
.friends ul li:last-child {
  float: right;
  padding: 10px;
  margin-top: -33px;
  color: #c0c0c0;
  font-size: 16px;
}
.friends ul li:first-child img {
  width: 22px;
  height: 22px;
  vertical-align: middle;
  padding: 0 15px 0 15px;
}
.friends ul li:last-child img {
  width: 10px;
  height: 10px;
}
/* 商品 */
.product {
  background: #eee;
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
}
.product div {
  width: 49.5%;
  margin: 10px 0 8px 0;
  background: #fff;
  padding: 20px 5px 5px 5px;
  box-sizing: border-box;
}
.product div img {
  width: 100%;
}
.product p {
  margin-bottom: 0;
}
.product .price {
  padding-left: 5px;
  font-size: 14px;
  color: #af3232;
}
.product .title {
  padding-left: 5px;
  font-size: 12px;
  color: #565656;
}
.product .title-2 {
  margin: 0;
  padding: 7px 0 5px 5px;
  color: #999;
  font-size: 12px;
}
.friends-left-right {
  text-align: center;
}
.friends-left-right a span {
  color: #c0c0c0;
}
</style>