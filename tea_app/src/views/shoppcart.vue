<template>
  <div class="shoppCart">
    <div v-if="$store.state.isLogin">
      <div v-if="this.$store.state.cart.length>=1">
        <div class="Cart">
          <div class="cart-header" v-for="(item,index) of this.$store.state.cart" :key="index">
            <div class="cart-left">
              <input
                class="Radio"
                type="checkbox"
                @click="selectSingle(index)"
                :checked="allGoods.indexOf(item.Id)>=0"
              />
            </div>
            <div class="cart-right">
              <div class="right-img">
                <img v-lazy="item.Img" alt />
              </div>
              <div class="cart-information">
                <p class="cart-title">{{item.Title}}</p>
                <p class="cart-price">￥{{item.Price}}</p>
                <div class="cart-stepper">
                  <van-stepper v-model="item.count" disable-input />
                </div>
              </div>
            </div>
            <div class="cart-del">
              <van-icon
                name="delete"
                color="#757575"
                size="22"
                data-del="×"
                :data-i="index"
                @click="deldel"
              />
            </div>
          </div>
        </div>
        <div class="balance_header">
          <van-goods-action>
            <input
              type="checkbox"
              @click="selectAll()"
              class="allSelect"
              :checked="this.$store.state.cart.length==allGoods.length&&this.$store.state.cart.length"
            />
            <van-goods-action-icon text="全不选" v-if="allGoods.length" />
            <van-goods-action-icon text="全选" v-else />
            <van-goods-action-icon text="删除" />
            <ul class="summation">
              <li>合计：</li>
              <li>
                <span class="amount">{{total.toFixed(2)}}</span>
                <span>元</span>
              </li>
            </ul>
            <van-goods-action-button class="balance" text="结算" />
          </van-goods-action>
        </div>
      </div>
      <div class="NoGoods" v-else>
        <div>
          <img src="../assets/cartcarc.png" alt />
          <p>
            暂无商品，
            <router-link to="/">去首页逛逛</router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="notLogin" v-else>
      <div class="NOLOGIN">
        <img src="../assets/login.png" alt />
        <p>请登录后查看哦</p>
        <p>
          <van-icon name="smile" size="48" color="#b70101" />
        </p>
        <button @click="ToLogin">去登录</button>
      </div>
    </div>
    <foot :active="'shoppcart'"></foot>
  </div>
</template>

<script>
import foot from "../components/foot";
export default {
  data() {
    return {
      cart: [],
      // 控制全选
      allChecked: true,
      // 存放被选择的数据
      allGoods: [],
    };
  },
  methods: {
    ToLogin() {
      this.$router.push("/login");
    },
    shoopCart() {
      this.axios
        .get("/cart/shoppcart?sid=" + this.$store.state.uid)
        .then((res) => {
          this.cart = res.data;
        });
    },
    deldel(e) {
      // 绑定自定义属性
      if (e.target.dataset.del == "×") {
        this.$store.state.cart.splice(e.target.dataset.i, 1);
        let cartJson = JSON.stringify(this.$store.state.cart);
        localStorage.setItem("cart", cartJson);
      }
    },
    // 点击全选按钮
    selectAll() {
      //event.currentTarget.checked表示点击完后该选择框的状态
      if (!event.currentTarget.checked) {
        this.allGoods = [];
      } else {
        this.allGoods = []; //先置空，然后再重新添加，不然数组里会有重复！因为有可能点击全选之前已经选择了几个单选按钮。也就是数组里已经添加过了对应的id。
        this.$store.state.cart.forEach((v, k) => {
          this.allGoods.push(v.Id);
        });
      }
      console.log(this.allGoods);
    },
    // 点击单选按钮
    selectSingle(index) {
      if (event.currentTarget.checked) {
        this.allGoods.push(this.$store.state.cart[index].Id);
      } else {
        for (let i = 0; i < this.allGoods.length; i++) {
          if (this.$store.state.cart[index].Id === this.allGoods[i]) {
            this.allGoods.splice(i, 1);
            this.allChecked = false;
            break;
          }
        }
      }
      console.log(this.allGoods);
    },
  },
  mounted() {
    this.shoopCart();
  },
  components: {
    foot,
  },
  computed: {
    total() {
      let sum = 0;
      this.$store.state.cart.forEach((p, k) => {
        if (this.allGoods.indexOf(p.Id) !== -1) {
          sum += p.Price * p.count;
        }
      });
      return sum;
    },
  },
};
</script>

<style scoped>
.shoppCart {
  width: 100%;
  background-color: #f0f0ee;
  height: 100vh;
}
.Cart {
  background-color: #f0f0ee;
  padding-top: 12px;
}
.cart-header {
  display: flex;
  background: #fff;
  position: relative;
}
.cart-header .cart-left {
  margin: 42px 0 0 20px;
}
.right-img {
  width: 72px;
  height: 80px;
  border: 1px solid #f7f7f8;
}
.cart-right {
  display: flex;
  margin: 10px 0px 10px 15px;
}
.right-img img {
  width: 100%;
  height: 100%;
}
.cart-right .cart-information {
  margin-left: 8px;
}
.cart-title {
  font-size: 12px;
  color: #576767;
  margin: 0;
}
.cart-price {
  font-size: 14px;
  color: #1599e5;
  margin: 0;
  margin-top: 7px;
}
.cart-stepper {
  margin: 0;
  margin-top: 9px;
  text-align: center;
  line-height: 33px;
  color: #fff;
}
.cart-del {
  position: absolute;
  top: 67px;
  right: 10px;
}
.summation {
  display: flex;
  position: absolute;
  right: 135px;
  bottom: 11px;
}
.balance_header {
  position: relative;
  font-size: 14px;
  text-align: center;
}
.balance_header .van-goods-action-icon {
  color: #576767;
  font-size: 14px;
}
.balance1 {
  background-color: #1599e5;
}
.check {
  margin: 3px 0 0 15px;
}
.NOLOGIN {
  text-align: center;
  padding-top: 22%;
  font-size: 24px;
}
.notLogin {
  width: 100%;
  height: 100vh;
  background: #fff;
}
.NOLOGIN button {
  width: 257px;
  height: 41px;
  background-color: #b70101;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  color: #fff;
}
div.NoGoods {
  position: relative;
  height: 100vh;
  width: 100vw;
}
div.NoGoods div {
  text-align: center;
  padding-top: 138px;
}

div.NoGoods div img {
  width: 110px;
  height: 110px;
}
div.NoGoods div p {
  font-size: 18px;
  color: #576767;
}
div.NoGoods div p a {
  color: #1599e5;
}
</style>
<style>
.van-stepper__input {
  background: #fff;
}
.van-goods-action {
  position: fixed;
  right: 0;
  bottom: 47px;
}
.van-goods-action-button--last,
.van-goods-action-button--first {
  border-radius: 0;
  margin: 0;
}
.balance {
  width: 129px !important;
  height: 100%;
  flex: 0;
  position: absolute;
  right: 0;
  background-color: #1599e5;
}
.balance::before {
  width: 129px;
}
.balance .van-button__content {
  width: 129px;
  color: #fff;
}
.amount {
  font-size: 18px;
  font-weight: bold;
  color: red;
}

.amount {
  padding-right: 5px;
}

.allSelect {
  margin: 6px 0 0 10px;
}
</style>