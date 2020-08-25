<template>
  <div class="search">
    <!-- 头部搜索框 -->
    <van-sticky>
      <div>
        <van-search v-model="kw" show-action shape="round" placeholder="搜索商品" @search="ononSearch">
          <template #left>
            <router-link to="/Classify">
              <van-icon name="arrow-left" color="#000" size="25" />
            </router-link>
          </template>
          <template #action class="cart">
            <router-link to="/shoppcart">
              <van-icon name="shopping-cart-o" color="#252525" size="25" />
            </router-link>
          </template>
        </van-search>
      </div>
    </van-sticky>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kw: "",
    };
  },
  methods: {
    ononSearch() {
      if (this.kw !== "") {
        if(window.location.href.indexOf("prolist")==-1){

          this.$router.push("/prolist/" + this.kw);
        }else{
          this.$emit("kwkw",this.kw)
        }
      }
    },
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
</style>