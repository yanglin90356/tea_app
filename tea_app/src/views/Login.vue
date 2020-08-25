<template>
  <div class="Login">
    <div class="login-header">
      <van-nav-bar title="登录" @click-left="login_left" left-arrow />
    </div>
    <div class="logo_img">
      <img src="../assets/login.png" alt />
    </div>
    <div class="login-content">
      <van-form>
        <div class="login-account">
          <van-field v-model="account" name="账号" label="账号" placeholder="请输入手机号" />
        </div>
        <div class="login-pass">
          <van-field
            v-model="loginPassword"
            type="password"
            name="密码"
            label="密码"
            placeholder="请输入密码"
          />
        </div>
        <div class="content-foot">
          <van-checkbox v-model="checkbox" shape="square">记住账号</van-checkbox>
          <span>忘记密码?</span>
        </div>
        <div class="login-btn" style="margin: 16px;">
          <van-button round block type="info" native-type="submit" @touchstart="login">提交</van-button>
        </div>
        <div class="no-account">
          <router-link to="/sign">没有账号？立即注册</router-link>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 保存登录时用户传入的手机号
      account: "",
      // 保存登录时用户传入的密码
      loginPassword: "",
      checkbox: false,
    };
  },
  methods: {
    login() {
      this.axios
        .post(
          "/user/login",
          "phone=" + this.account + "&upwd=" + this.loginPassword
        )
        .then((res) => {
          if (res.data.code == 1) {
            let obj = {
              phone: res.data.result.phone,
              uid: res.data.result.uid,
            };
            this.$store.commit("login_mutation", obj);
            localStorage.setItem("isLogin", true);
            localStorage.setItem("uid", res.data.result.uid);
            localStorage.setItem("phone", res.data.result.phone);
            this.$router.push("/");
          } else {
            this.$toast("用户名或者密码错误");
          }
        });
    },
    login_affirm() {
      this.login_show = false;
    },
    login_left() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.Login {
  width: 100%;
}
.Login .login-header .van-nav-bar .van-icon {
  color: #999 !important;
}
.Login .login-header .van-nav-bar {
  background-color: #fff;
}
.logo_img {
  width: 100%;
  margin-top: 20px;
  text-align: center;
}
.login-content {
  width: 100%;
  margin-top: 50px;
}
.van-field__label {
  margin-right: -40px;
}
.login-account,
.login-pass {
  width: 258px;
  border: 1px solid #404040;
  margin-bottom: 10px;
  margin: 0 auto;
}
.login-pass {
  margin-top: 10px;
}
.content-foot {
  width: 258px;
  margin: 10px auto;
  display: flex;
  font-size: 14px;
  color: #a6a6a5;
  justify-content: space-between;
}
.van-checkbox__label {
  color: #a6a6a5;
}
.Login .login-content .login-btn .van-button--round {
  width: 258px;
  margin: 20px auto;
  border-radius: 0;
  background-color: #b70101;
  border: none;
}
.no-account {
  width: 258px;
  margin: 0 auto;
  text-align: center;
}
.no-account a {
  font-size: 14px;
  color: #bbbbbb;
}
</style>