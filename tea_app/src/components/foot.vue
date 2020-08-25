<template>
  <div class="tabBar">
    <div class="foot">
      <van-tabbar v-model="ab" active-color="#c30000" inactive-color="#3f3f3f" fixed>
        <van-tabbar-item to="/" icon="wap-home-o" name="home">首页</van-tabbar-item>
        <van-tabbar-item to="/Classify" icon="apps-o" name="classify">分类</van-tabbar-item>
        <van-tabbar-item to="/shoppcart" icon="shopping-cart-o" name="shoppcart">购物车</van-tabbar-item>
        <van-tabbar-item to="/me" icon="user-circle-o" name="me">个人中心</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  props: ["active"],
  data() {
    return {
      ab: this.active,
    };
  },
};
</script>

<style scoped>
.van-tabbar--fixed {
    position: fixed;
    bottom: -3px;
    left: 0;
}
.foot {
  margin-top: 50px;
}
.foot::before {
  content: "";
  display: block;
}
</style>