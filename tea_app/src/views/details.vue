<template>
  <div class="details">
    <!-- 固定两个icon -->
    <div class="Top-icon">
      <router-link to="/" class="left-icon">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </router-link>
      <router-link to="/shoppcart" class="right-icon">
        <van-icon name="shopping-cart-o" size="20" color="#fff" />
      </router-link>
    </div>
    <!-- 商品轮播图 -->
    <div class="deta-swipe">
      <van-swipe :autoplay="3000" indicator-color="#F60" indicator="#fff">
        <van-swipe-item v-for="(image, index) in image_xs" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 基本信息 -->
    <div>
      <div class="information">
        <div class="container">
          <div class="name">
            <span>{{deetaails.title}}</span>
          </div>
          <div class="price">
            <div class="price-left">
              <span>￥{{deetaails.price}}</span>
            </div>
            <div class="price-right">
              <span>销量：{{deetaails.salesvolume}}</span>
            </div>
          </div>
          <div class="express">
            <span>快递：免运费 卖家承诺48小时之内发货</span>
          </div>
          <div class="number">
            <span>数量：</span>
            <span class="cart-btn cart-minus" @click="miuns"></span>
            <input type="text" v-model="value" />
            <a href="javascript:;" class="cart-btn cart-plus" @click="plus">
              <van-icon name="plus" size="16" />
            </a>
          </div>
        </div>
      </div>
      <!-- 用户评价 -->
      <div class="rate-more">
        <div class="evaluation">
          <div class="evaluation-left">用户评价()</div>
          <div class="evaluation-right">
            <span>查看全部</span>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <!-- 加载成功 -->
      <div class="loading-tip">
        <span>加载成功，没有更多数据</span>
      </div>
      <!-- 详情页 -->
      <div class="Details-page">
        <span>商品详情</span>
      </div>
      <div class="details-img">
        <img :src="deetaails.details" alt />
      </div>
    </div>
    <backTop></backTop>
    <div class="details_foot">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="star-o" text="收藏" />
        <van-goods-action-button color="#be99ff" class="addCart" text="加入购物车" @click="AddToCart" />
        <van-goods-action-button color="#7232dd" class="Shop-Now" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import backTop from "../components/scroll";
export default {
  props: ["pid"],
  data() {
    return {
      value: 1,
      // 保存商品图片数组
      image_xs: [],
      deetaails: {},
    };
  },
  methods: {
    detail() {
      this.axios.get("/deta/details?pid=" + this.pid).then((res) => {
        this.image_xs = res.data[0].masterpic.split("|");
        this.deetaails = res.data[0];
      });
    },
    AddToCart() {
      // 声明变量保存单个商品信息
      let article = {
        Id: this.deetaails.id,
        Img: this.deetaails.pic,
        Title: this.deetaails.title,
        Price: this.deetaails.price,
        count: this.value,
        ssschecked: false,
      };
      // 判断用户是否为登录状态
      if (this.$store.state.isLogin == false) {
        // 如果是未登录状态就跳转到登录页面让用户登录
        this.$router.push("/login");
        //再判断vuex存储的购物车列表是否为空
      } else if (this.$store.state.cart.length == 0) {
        this.$store.commit("updateCart", article);
        this.$toast("加入成功");
      } else {
        let bool = this.$store.state.cart.some((item) => {
          return item.Id == article.Id;
        });
        if (bool) {
          for (let carObj of this.$store.state.cart) {
            if (carObj.Id == article.Id) {
              carObj.count++;
              // this.cart_show = true;
              this.$toast("该商品以存在");
            }
          }
        } else {
          this.$store.commit("updateCart", article);
        }
      }
      let Shop_Cart = JSON.stringify(this.$store.state.cart);
      localStorage.setItem("cart", Shop_Cart);
    },
    // 商品数量-操作
    miuns() {
      if (this.value > 1) {
        this.value--;
      }
    },
    // 商品数量+操作
    plus() {
      if (this.value >= 1 || this.value >= this.deetaails.tstock) {
        this.value++;
      }
    },
    carcar_show() {
      this.cart_show = false;
    },
  },
  mounted() {
    this.detail();
  },
  components: {
    backTop,
  },
};
</script>

<style scoped>
.details {
  background: #f1f1f1;
  width: 100%;
}
.Top-icon {
  display: flex;
  position: relative;
}
.Top-icon .left-icon,
.Top-icon .right-icon {
  display: block;
  width: 33px;
  height: 33px;
  line-height: 33px;
  text-align: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.4);
}
.Top-icon .left-icon {
  position: fixed;
  left: 16px;
  top: 20px;
  z-index: 99;
}
.Top-icon .right-icon {
  position: fixed;
  top: 20px;
  right: 16px;
  z-index: 98;
}
/* 轮播 */
.deta-swipe {
  width: 100%;
}
.deta-swipe img {
  width: 100%;
}
/* 基本信息 */
.information {
  width: 100%;
  background: #fff;
}
.information .container {
  padding: 12px;
}
.information .container .name {
  font-size: 13px;
  color: #404040;
}
.information .container .price {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
.information .container .price .price-left span {
  font-size: 16px;
  color: #a40000;
  font-weight: 700;
}
.information .container .price .price-right span {
  font-size: 14px;
  color: #333;
}
.information .container .express span {
  display: block;
  font-size: 10px;
  color: #b0b0b0;
  margin-top: 10px;
}
.information .container .number {
  margin: 10px 0 10px 0;
  font-size: 14px;
  line-height: 28px;
  color: #333;
  display: flex;
}
/* 用户评价 */
.rate-more {
  width: 100%;
  background: #fff;
  margin-top: 12px;
}
.rate-more .evaluation {
  padding: 12px;
  display: flex;
  justify-content: space-between;
}
.rate-more .evaluation .evaluation-left {
  font-weight: 900;
  font-size: 14px;
}
.rate-more .evaluation .evaluation-right {
  font-size: 14px;
  color: #a0a0a0;
  text-align: center;
}
/* 加载成功 */
.loading-tip {
  width: 100%;
  background: #fff;
  padding: 12px 0 12px 0;
  border-top: 1px solid #f1f1f1;
  text-align: center;
  font-size: 14px;
  color: #ccc;
}
/* 详情页 */
.Details-page {
  height: 40px;
  text-align: center;
  font-size: 12px;
  color: #929292;
  line-height: 40px;
}
.details-img {
  width: 100%;
  padding-bottom: 50px;
  background: #fff;
}
.details-img img {
  width: 100%;
}
.details_foot {
  position: fixed;
}
div.van-goods-action {
  bottom: -3px;
}
</style>
// 样式
<style>
.information .container .number .van-stepper__input {
  background: #fff;
}
.van-stepper__minus,
.van-stepper__plus {
  border-radius: 0;
}
.van-goods-action-button--last,
.van-goods-action-button--first {
  border-radius: 0;
  margin: 0;
}
.Shop-Now {
  background-color: #f76d6d !important;
  height: 100%;
}
.addCart {
  background-color: #fff !important;
  color: #000 !important;
  height: 100%;
}
.number .cart-btn {
  display: inline-block;
  width: 23px;
  height: 23px;
  text-align: center;
  color: #666;
  background-color: transparent;
  border: 1px solid #999;
  border-radius: 2px;
  position: relative;
}
.number .cart-minus::before {
  display: block;
  position: absolute;
  content: "";
  height: 1px;
  width: 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
  margin-top: -1px;
  background-color: #666;
}
.number input {
  width: 23px;
  height: 23px;
  text-align: center;
  border: none;
  font-size: 14px;
  font-family: sans-serif;
  color: #333 !important;
}
</style>