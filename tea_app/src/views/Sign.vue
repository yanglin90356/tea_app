<template>
  <div class="Sign">
    <div class="header">
      <van-nav-bar
        title="语茶商城"
        right-text="登录"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="input-box">
      <van-form>
        <div class="header-msg">
          <van-field v-model="phone" class="uname" name="用户名" placeholder="请输入您的手机号" />
          <van-field v-model="password" type="password" name="密码" placeholder="登录密码" />
          <van-field v-model="ispassword" type="password" name="确认密码" placeholder="确认密码" />
          <van-field name="推荐人编码" placeholder="推荐人编号" />
        </div>
        <div class="phone-msg">
          <van-field center clearable placeholder="请输入短信验证码">
            <template #button>
              <van-button size="small" type="primary">获取验证码</van-button>
            </template>
          </van-field>
        </div>
        <div class="user-notes">
          <van-checkbox v-model="checked" shape="square"></van-checkbox>我已阅读
          <span>《用户注册及商城服务协议》</span>
        </div>
        <div class="reading">
          <p>
            确认阅读并理解《用户注册及商城服务协议》内容，
            <br />自愿申请成为语茶商城会员
          </p>
        </div>
        <div class="login-submit">
          <van-button round block type="info" @click="submit" class="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 保存手机号
      phone: "",
      // 保存密码
      password: "",
      // 保存确认密码
      ispassword: "",
      checked: "",
    };
  },
  methods: {
    onClickRight() {
      this.$router.push("/login");
    },
    onClickLeft() {
      this.$router.push("/");
    },
    // 验证手机号格式
    checkPhone() {
      let phoneReg = /^1[3-9]\d{9}$/;
      let result = phoneReg.test(this.phone);
      if (result == true) {
        return true;
      }
    },
    // 验证密码格式
    checkPassword() {
      let passwordReg = /^[0-9A-Za-z]{6,12}$/;
      let result = passwordReg.test(this.password);
      if (result == true) {
        return true;
      }
    },
    // 验证两次密码是否输入一致
    checkIspassword() {
      let isPassword = this.ispassword;
      // 判断两次密码是否输入一致
      if (isPassword == this.password) {
        // 如果输入一致就return true
        return true;
      } else if (isPassword == "") {
        //再判断用户输入的是否为空
        this.$toast("请再次输入登录密码");
      } else {
        this.$toast("两次输入不一致");
      }
    },
    submit() {
      let chek1 = this.checkPhone();
      if (chek1) {
        chek1 = this.checkPassword();
      }
      if (chek1) {
        chek1 = this.checkIspassword();
      }
      // 判断用户输入的是否为空,如果为空的话就提示用户
      if (this.phone == "") {
        this.$toast("手机号不能为空");
        // 判断用户输入的密码是否为空,如果为空的话就提示用户
      } else if (this.password == "") {
        this.$toast("请输入登录密码");
      }
      if (chek1) {
        this.axios
          .post("/user/reg", "phone=" + this.phone + "&upwd=" + this.password)
          .then((res) => {
            if (res.data.code == 0) {
              this.$toast("注册失败,用户已存在");
            } else {
              this.$router.push("/login");
            }
          });
      }
    },
  },
};
</script>

<style>
.Sign {
  background: #f5f5f5;
  height: 100vh;
}
.van-nav-bar {
  background: #ef8436;
}
.van-nav-bar .van-icon,
.van-nav-bar__text,
.van-nav-bar__title {
  color: #fff !important;
}
.input-box {
  margin: 14px;
}
.user-notes {
  display: flex;
  padding: 20px 14px 16px 26px;
  color: #666;
  font-size: 16px;
  justify-content: center;
}
.user-notes span {
  color: red;
}
.reading {
  font-size: 12px;
  text-align: center;
  color: #898989;
}
.phone-msg {
  margin-top: 14px;
  border: 1px solid #ddd;
}
.header-msg {
  border: 1px solid #ddd;
}
.submit {
  margin-top: 35px;
}
.van-button--round {
  border-radius: 0;
  background-color: #ef8436;
  border: none;
  width: 345px;
  margin: 30px auto;
}
</style>