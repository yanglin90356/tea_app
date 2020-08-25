<template>
  <div>
    <search></search>
    <!-- 选择栏 -->
    <div class="sideabr">
      <div class="sideabr—left">
        <van-sidebar v-model="activeKey" class="search">
          <van-sidebar-item title="茶客专区" />
          <van-sidebar-item title="活动专区" />
          <van-sidebar-item title="兑换专区" />
          <van-sidebar-item title="集贸市场" />
        </van-sidebar>
      </div>
      <div class="sideabr—right" v-if="activeKey==0">
        <div>
          <router-link to="/prolist/全部">
            <button class="btn_1">进入茶客专区频道</button>
          </router-link>

          <div class="all">
            <span class="title">普洱茶</span>
          </div>
          <div class="spencer">
            <ul>
              <li v-for="(i,k) of spencer" :key="k">
                <router-link to="/prolist/全部">
                  <img :src="i.spencerImg" alt />
                </router-link>
                <p v-text="i.spencerName"></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="sideabr—right" v-else-if="activeKey==1">
        <div>
          <router-link to="/prolist/全部">
            <button class="btn_1">进入活动专区频道</button>
          </router-link>
          <div class="all">
            <span class="title">茶多分活动</span>
          </div>
          <div class="spencer">
            <ul>
              <li v-for="(i,k) of spencer2" :key="k">
                <router-link to="/prolist/全部">
                  <img :src="i.spencerImg" alt />
                </router-link>
                <p v-text="i.spencerName"></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="sideabr—right" v-else-if="activeKey==2">
        <div>
          <router-link to="/prolist/全部">
            <button class="btn_1">进入兑换专区频道</button>
          </router-link>
          <div class="all">
            <span class="title">茶多分商品</span>
          </div>
          <div class="spencer">
            <ul>
              <li v-for="(i,k) of spencer2" :key="k">
                <router-link to="/prolist/全部">
                  <img :src="i.spencerImg" alt />
                </router-link>
                <p v-text="i.spencerName"></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="sideabr—right" v-else>
        <div>
          <router-link to="/prolist/全部">
            <button class="btn_1">进入集贸市场频道</button>
          </router-link>
        </div>
      </div>
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
      value: "",
      activeKey: 0,
      spencer: [],
      spencer2: [],
    };
  },
  methods: {
    getSpencer() {
      this.axios.get("/index/spencer").then((res) => {
        this.spencer = res.data;
        this.spencer2 = res.data.slice(6, 9);
      });
    },
  },
  mounted() {
    this.getSpencer();
  },
  components: {
    search,
    foot,
  },
};
</script>

<style scoped>
/* 修改右侧购物车图标 */
.van-search__action {
  line-height: 0;
}
/* 修改搜索框内背景颜色 */
.van-search__content {
  background: #efefef;
}
.search {
  border-top: 1px solid #f7f7f7;
}

.van-sidebar-item {
  border-top: 1px solid #fff;
}
.van-sidebar-item--select {
  background: #fff;
  color: red;
}
.van-sidebar-item--select::before {
  width: 2px;
  height: 60px;
}
.sideabr {
  width: 100%;
  display: flex;
  border-top: 1px solid #f7f7f7;
}
.sideabr—left {
  background: #f7f7f7;
  height: 95vh;
  position: fixed;
}
.sideabr—right {
  flex: 1;
  margin-left: 5px;
  padding: 13px 10px 0 85px;
}
.btn_1 {
  width: 100%;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  color: #6e4830;
  background-color: #f4ebe4;
  border: none;
}
.all {
  width: 100%;
  text-align: center;
}
.all span {
  display: block;
  margin-top: 25px;
  font-size: 14px;
  color: #333333;
}
.spencer {
  width: 100%;
}
.spencer ul {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}
.spencer ul li {
  width: 33.3%;
  margin-bottom: 10px;
}
.spencer ul li img {
  width: 100%;
}
.spencer ul li p {
  margin: 0;
  margin-top: 10px;
  font-size: 14px;
  color: #333333;
}
</style>
