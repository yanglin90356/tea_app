<template>
  <div class="product">
    <search @kwkw="searchSearch"></search>
    <div class="sort">
      <ul @click="sort">
        <li>
          <span>
            人气
            <i></i>
          </span>
        </li>
        <li>
          <span>
            销量
            <i></i>
          </span>
        </li>
        <li>
          <span>
            价格
            <i></i>
          </span>
        </li>
        <li>
          <span>
            上架时间
            <i></i>
          </span>
        </li>
      </ul>
    </div>
    <div class="propro">
      <ul>
        <li v-for="(item,index) of prolist" :key="index">
          <router-link :to="`/details/${item.pid}`">
            <img v-lazy="item.pic" alt />
          </router-link>
          <span class="pro_title" v-text="item.title"></span>
          <div class="buttom">
            <div>
              <span>￥</span>
              <span>{{item.price.toFixed(2)}}</span>
            </div>
            <span>月销{{item.salesvolume}}件</span>
          </div>
        </li>
      </ul>
    </div>
    <foot :active="'classify'"></foot>
  </div>
</template>

<script>
import search from "../components/search";
import foot from "../components/foot";
export default {
  data() {
    return {
      page: 1,
      pagecount: 0,
      prolist: [],
      kw: "",
    };
  },
  methods: {
    // 排序
    sort(e) {
      if (e.target.nodeName == "SPAN") {
        e.target.style.color = "#333";
        let i = e.target.children[0];
        if (i.className == "") {
          let is = e.target.parentNode.parentNode.getElementsByTagName("i");
          for (let ele of is) {
            if (ele != i) {
              ele.className = "";
              ele.parentNode.style.color = "";
            }
          }
        }
        if (i.className == "" || i.className == "sortbg_1") {
          i.className = "sortbg";
        } else {
          i.className = "sortbg_1";
        }
      }
    },
    // 查询所有商品
    proList() {
      this.axios
        .get("/pro/prolist", {
          params: {
            ptype: this.kw,
          },
        })
        .then((res) => {
          this.prolist = res.data.result;
        });
    },
    searchSearch(value) {
      this.kw = value;
    },
  },
  mounted() {
    this.kw = this.$route.params.kw;
    this.proList();
  },
  watch: {
    $route() {
      this.kw = this.$route.params.kw;
    },
    // 并且监听地址栏,如果一旦改变,就需要重新请求axios
    kw() {
      this.proList();
    },
  },
  components: {
    search,
    foot,
  },
};
</script>

<style scoped>
.product {
  width: 100%;
  height: 100vh;
  background: #f3f3f3;
}
.product .sort {
  background: #fff;
  width: 100%;
  height: 33px;
  border-top: 1px solid #f6f6f6;
  border-bottom: solid 1px #f6f6f6;
}
.product .sort ul {
  display: flex;
  width: 90%;
  height: 33px;

  margin: 0 auto;
  justify-content: space-around;
  font-size: 14px;
}
.product .sort ul li {
  width: 25%;
  position: relative;
  text-align: center;
}
.product .sort ul li span {
  display: inline-block;
  line-height: 33px;
  width: 100%;
  color: #7e7e7e;
}

.product .sort ul li span i {
  display: inline-block;
  width: 10px;
  height: 8px;
  background-size: 100%;
  margin-left: 5px;
  position: absolute;
  top: 30%;
}
.sortbg {
  background: url(../assets/sx.png) no-repeat;
}
.sortbg_1 {
  background: url(../assets/jx.png) no-repeat;
}
/* 商品 */
.product .propro {
  width: 100%;
  background: #f3f3f3;
  margin-bottom: 47px;
}
.product .propro ul {
  display: flex;
  padding: 0 5px 0 5px;
  flex-wrap: wrap;
  justify-content: space-between;
}
.product .propro ul li {
  width: 49%;
  margin-top: 10px;
  background: #fff;
}
.product .propro ul li img {
  width: 100%;
}
.product .propro ul li .pro_title {
  display: block;
  font-size: 14px;
  margin: 5px 0 0 3px;
  color: #333333;
}
.product .propro ul li .buttom {
  display: flex;
  justify-content: space-between;
  padding: 0 5px 0 5px;
  margin: 10px 0 10px 0;
}
.product .propro ul li .buttom div span:first-child {
  font-size: 12px;
  color: #fe013e;
}
.product .propro ul li .buttom div span:last-child {
  font-size: 18px;
  color: #fe013e;
}
.product .propro ul li .buttom span:last-child {
  color: #787878;
  font-size: 12px;
}
</style>