<template>
  <div class="My-Center">
    <div class="MyCenter-Header">
      <ul>
        <li v-if="!$store.state.isLogin"></li>
        <li v-else>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-share_icon" />
          </svg>
        </li>
        <li>
          <van-icon name="close" size="22" color="#ffffff" @click="logout" />
        </li>
      </ul>
      <div class="Personal">
        <div class="head-portrait"></div>
        <div v-if="!$store.state.isLogin">
          <router-link class="welcome" to="/login">登录</router-link>
          <router-link class="welcome" to="/sign">注册</router-link>
          <img class="ToLoginAndSign" src="../assets/kz.png" alt />
        </div>
        <div class="welcome" v-else>欢迎您:{{$store.state.phone}}</div>
        <div class="view-more">查看更多>></div>
      </div>
    </div>
    <div class="order">
      <div class="order-container">
        <div class="indent">
          <div class="My-order">我的订单</div>
          <div class="All-orders">
            全部订单
            <img src="../assets/kz.png" alt />
          </div>
        </div>
        <div class="order-status">
          <ul>
            <li v-for="(order,index) of orderStatus" :key="index">
              <img :src="order.path" alt />
              <p>{{order.name}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="item-container">
      <div class="My-inner">
        <ul>
          <li v-for="(center,index) of PersonalCcenter" :key="index">
            <span v-text="center.title"></span>
            <img :src="center.img_path" alt />
          </li>
        </ul>
      </div>
    </div>
    <div class="telephone">
      <div>
        <span>客服电话</span>
        <img src="../assets/kz.png" alt />
      </div>
    </div>
    <foot :active="'me'"></foot>
  </div>
</template>

<script>
import foot from "../components/foot";
export default {
  data() {
    return {
      orderStatus: [
        {
          path: require("../assets/payment.png"),
          name: "待付款",
        },
        {
          path: require("../assets/sendGoods.png"),
          name: "待发货",
        },
        {
          path: require("../assets/confirmed.png"),
          name: "待确认",
        },
        {
          path: require("../assets/completed.png"),
          name: "已完成",
        },
      ],
      PersonalCcenter: [
        {
          title: "我的钱包",
          img_path: require("../assets/kz.png"),
        },
        {
          title: "我的积分",
          img_path: require("../assets/kz.png"),
        },
        {
          title: "我的收藏",
          img_path: require("../assets/kz.png"),
        },
        {
          title: "我的团队",
          img_path: require("../assets/kz.png"),
        },
        {
          title: "我的收益",
          img_path: require("../assets/kz.png"),
        },
        {
          title: "退款及申诉",
          img_path: require("../assets/kz.png"),
        },
      ],
    };
  },
  methods: {
    logout() {
      this.$store.commit("login_out");
    },
  },
  components: {
    foot,
  },
};
</script>

<style >
.My-Center {
  width: 100%;
  height: 100vh;
  background: #f0f0f0;
}
.My-Center .MyCenter-Header {
  background: #be2a2b;
  padding: 10px 12px 5px 12px;
}
.My-Center .MyCenter-Header ul {
  display: flex;
  justify-content: space-between;
}
.My-Center .MyCenter-Header ul li svg {
  width: 20px;
  height: 20px;
}
.My-Center .MyCenter-Header .Personal {
  display: flex;
  position: relative;
  margin-bottom: 50px;
}
.My-Center .MyCenter-Header .Personal .head-portrait {
  margin-top: 8px;
  width: 58px;
  height: 58px;
  background-image: url(../assets/man.png);
  box-sizing: border-box;
  border-radius: 50%;
  background-color: #ccc;
  background-repeat: no-repeat;
  background-size: auto 65%;
  background-position: center;
}
.My-Center .MyCenter-Header .Personal .welcome {
  margin-left: 10px;
  line-height: 66px;
  font-size: 14px;
  color: #fff;
}
.My-Center .MyCenter-Header .Personal .view-more {
  position: absolute;
  bottom: 0;
  right: 10px;
  font-size: 12px;
  color: #fff;
}
.My-Center .order .order-container {
  width: 100%;
  background: #fff;
  padding: 0 12px;
  box-sizing: border-box;
  box-shadow: 1px 1px 5px #cfced3;
  border-radius: 5px;
  margin-top: -40px;
}
.order {
  width: 94%;
  margin: 0 auto;
}
.order .order-container .indent {
  display: flex;
  justify-content: space-between;
  line-height: 36px;
  border-bottom: 1px solid #f0f0f0;
}
.order .order-container .indent .My-order {
  font-size: 14px;
  color: #b32829;
}
.order .order-container .indent .All-orders {
  font-size: 12px;
  color: #666;
}
.order .order-container .indent .All-orders img {
  width: 10px;
  height: 10px;
  margin-left: 2px;
}
.order-status ul {
  display: flex;
  justify-content: space-around;
  padding: 10px 0 20px 0;
}
.order-status ul li {
  text-align: center;
}
.order-status ul li img {
  width: 35px;
  height: 35px;
}
.order-status ul li p {
  margin: 0;
  color: #4c4c4c;
  font-size: 12px;
}
.item-container {
  width: 100%;
  background: #fff;
  padding: 0 18px;
  box-sizing: border-box;
}
.My-inner {
  margin-top: 12px;
}
.item-container .My-inner ul li {
  position: relative;
  line-height: 38px;
  font-size: 14px;
  color: #404040;
  border-bottom: solid 1px #f0f0f0;
}
.item-container .My-inner ul li:last-child {
  border: none;
}
.item-container .My-inner ul li img {
  width: 10px;
  height: 10px;
  position: absolute;
  right: 2px;
  top: 10px;
}
.telephone {
  background: #fff;
  margin-top: 12px;
  box-sizing: border-box;
}
.telephone div {
  position: relative;
  line-height: 38px;
  font-size: 14px;
  color: #404040;
  padding: 0 18px;
}
.telephone div img {
  width: 10px;
  height: 10px;
  position: absolute;
  right: 20px;
  top: 10px;
}
.ToLoginAndSign {
  width: 13px;
  height: 10px;
  margin-left: 3px;
}
</style>