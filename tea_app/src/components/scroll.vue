<template>
  <div class="BackTop">
    <div class="goto-Top" v-show="backtop">
      <a href="javascript:;" @click="BACKTop">
        <van-icon name="back-top" size="24" color="#fff" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backtop: false,
    };
  },
  methods: {
    BACKTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    scrollTop() {
      const that = this;
      let scrollTop =
        window.pageXOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      // 判断距离顶部的距离是否大于430,如果大于430
      if (that.scrollTop > 430) {
        // 就让其显示
        that.backtop = true;
      } else {
        // 否则就让其隐藏
        that.backtop = false;
      }
    },
  },
  mounted() {
    // 此处true需要加上,如果不加上的话滚动事件可能绑定不成功
    window.addEventListener("scroll", this.scrollTop, true);
  },
};
</script>

<style scoped>
.goto-Top {
  position: fixed;
  right: 30px;
  bottom: 70px;
}
.goto-Top a {
  display: block;
  width: 35px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.4);
}
.BackTop .goto-Top a .van-icon {
  margin-top: 5px;
}
</style>