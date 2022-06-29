<template>
  <div class="login-section">
    <div v-if="isShowWechat">
      <div class="root_header">
        <img class="icon_logo" src="../../assets/images/icon_logo.png" alt="" />
        <div class="icon_login_text">样本箱转运系统</div>
      </div>

      <div class="main">
        <div class="form-item">
          <input
            v-model="phone"
            type="tel"
            name="phone"
            :oninput="phone = (phone.length > 11 ? phone.slice(0, 11) : phone)"
            placeholder="请输入手机号码"
          />
          <!-- <div class="get_code" @click="btnClick">
            {{ codeRestTime ? `${codeRestTime}S` : "获取验证码" }}
          </div> -->
        </div>
        <div class="form-item" style="margin-top: 20px">
          <input
            v-model="code"
            type="password"
            name="code"
            placeholder="请输入密码"
            :oninput="code = (code.length > 6 ? code.slice(0, 6) : code)"
          />
        </div>
        <!-- <div class="submit_view" @click="commit">登录</div> -->
        <van-button class="submit_view" block type="info" @click="commit">登录</van-button>
      </div>

       <div class="view_bottom">
        <div class="icon_login_content"  @click="clickRes">注册账号</div>
      </div>
    </div>

    <div class="login-section" v-else>
      <div class="icon_login_content">普通浏览器,请在手机微信浏览器打开此页面</div>
    </div>
  </div>
  
</template>

<script>
import { getLogin,getAutoLogin } from "../../request/api";
import { Notify,Toast } from 'vant';

export default {
  name: "",
  components: {},
  data() {
    return {
      code: "", // 用户姓名
      phone: "", // 联系电话
      codeRestTime: 0,
      restTime: 60,
      phoneCode: ["", ""], //正确的 手机号 和 验证码
      phoneSub: "",
      codeSub: "",
      isShowWechat: true
    };
  },
  activated() {},
  mounted() {
    // this.isWechat();
    // this.getAutoLogin();
  },
  methods: {
    isWechat() {
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/micromessenger/i) == 'micromessenger') {
        console.log('微信浏览器');
        this.isShowWechat = true;
        this.getAutoLogin();
        return true;
      } else {
        this.isShowWechat = false;
        console.log('普通浏览器,请在手机微信浏览器打开此页面');
        return false;
      }
    },
    checkPhone(phone) {
      var phoneReg = /^1\d{10}$/;
      if (phone.length != 11) {
        return false;
      } else if (!phoneReg.test(phone)) {
        return false;
      } else {
        return true;
      }
    },
    btnClick() {
      let that = this;
      if (this.phone == "") {
        Toast('请填写手机号')
          // Notify({ type: 'danger', message: '请填写手机号'});
        // alert("请填写手机号");
      } else if (!this.checkPhone(this.phone)) {
        Toast('手机号有误')
          // Notify({ type: 'danger', message: '手机号有误'});
        // alert("手机号有误");
      } else {
        this.codeRestTime = this.restTime;
        let timer = setInterval(() => {
          --this.codeRestTime;
          if (!this.codeRestTime) {
            clearInterval(timer);
            timer = null;
          }
        }, 1000);

        getVerification({
          phone: this.phone,
        }).then((res) => {
          if (res.data.success) {
              console.log(res.data.msg)
              that.phoneSub = res.data.phone;
              that.codeSub = res.data.msg;
            // that.phoneCode[(that.phone, res.msg)];
          } else {
            // alert("验证码发送失败");
            Toast(res.data.msg)
            // Notify({ type: 'primary', message:  res.msg});
          }
        });
      }
    },
    commit() {
      if (this.phone == "") {
        Toast('请填写手机号')
          //  Notify({ type: 'danger', message: '请填写手机号'});
        return;
      } else if (!this.checkPhone(this.phone)) {
        Toast('手机号有误')
          // Notify({ type: 'danger', message: '手机号有误'});
        return;
      // } else if (this.code == "") {
      //   Toast('请填写验证码')
      //     // Notify({ type: 'danger', message: '请填写验证码'});
      //   return;
      // } else if (this.phoneSub == "") {
      //   Toast('请获取验证码')
      //   // Notify({ type: 'danger', message: '请获取验证码'});
      //   return;
      // } else if (this.phoneSub != this.phone) {
      //   Toast('验证码过期')
      //     // Notify({ type: 'danger', message: '验证码过期'});
      //   return;
      // } else if (this.codeSub != this.code) {
      //   Toast('验证码错误')
      //     // Notify({ type: 'danger', message: '验证码错误'});
      //   return;
      } else {
        getLogin({
          phone: this.phone,
          password: this.code
        }).then((res) => {
          console.log(res)
          if (res.data.success) {
            Toast(res.data.msg)
            localStorage.setItem('conveyPhone',this.phone);
            localStorage.setItem('conveyPassword',this.code)
            this.$router.push({
                path: "/instrumentList",
                query:{id: res.data.roleId,name: res.data.name,userId: res.data.userId}
            });
          } else {
            Toast(res.data.msg)
          }
        });
      }
    },
    handleLogin() {
      this.$router.push({
        path: "/instrumentList",
        query:{id: 1 || res.data.roleId}
      });
    },
    getAutoLogin(){
      let phone = localStorage.getItem('conveyPhone');
      let password = localStorage.getItem('conveyPassword');
      if(phone && password){
        this.phone = phone;
        this.code = password;
        getAutoLogin({
          phone: phone,
          password: password
        }).then((res) => {
          console.log(res)
          if (res.data.success) {
            this.phone = '';
            this.code = '';
            Toast(res.data.msg)
            this.$router.push({
                path: "/instrumentList",
                query:{id: res.data.roleId,name: res.data.name,userId: res.data.userId}
            });
          } else {
            Toast(res.data.msg)
          }
        });
      }
    },
    clickRes(){
      this.$router.push({
        path: "/lisInfoCustom",
        query:{}
      });
    }
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/style/variable.scss";
.login-section {
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  margin-top: 200px;
  // @include flexCenter;
  .submit-btn {
    width: 500px;
  }
  .root_header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // padding-top: 200px;
  }

  .icon_logo {
    width: 172px;
    height: 146px;
  }

  .icon_login_text {
    font-size: 48px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 33px;
    margin-top: 60px;
  }

  .icon_login_content{
    font-size: 32px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 33px;
    margin-top: 60px;
  }

  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
  }
  .form-item {
    display: flex;
    height: 100px;
    position: relative;
    align-items: center;

    input {
      height: 100px;
      border: none;
      outline: none;
      width: 600px;
      border-bottom: 1px solid #dddddd;
      font-size: 36px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
    //   padding: 0px 50px;
    }
  }

  .submit_view {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
    width: 500px;
    background: #307ff5;
    border-radius: 6px;
    color: #ffffff;
    font-size: 44px;
  }

  .get_code {
    position: absolute;
    right: 25px;
    font-size: 36px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #307ff5;
    line-height: 25px;
  }
}

.view_bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  margin-top: 30px;
}

.view_bottom_left {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 326px;
  height: 88px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #307ff5;
  font-size: 34px;
  color: #307ff5;
}
</style>