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
        </div>
        <!-- <div class="form-item" style="margin-top: 20px">
          <input
            v-model="username"
            type="text"
            name="username"
            placeholder="请输入姓名"
          />
        </div> -->
        <!-- <div class="form-item" style="margin-top: 20px">
          <input
            v-model="code"
            type="password"
            name="code"
            placeholder="请输入密码"
            :oninput="code = (code.length > 6 ? code.slice(0, 6) : code)"
          />
        </div> -->
        <van-button class="submit_view" block type="info" @click="commit">登录</van-button>
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
      isShowWechat: true,
      wxcode: '',
      username: '',
      openid: ''
    };
  },
  activated() {},
  mounted() {
    this.isWechat();
  },
  methods: {
    getUrlCode() {
      // 截取url中的code方法
      var url = location.search;
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      console.log(theRequest);
      return theRequest;
    },
    isWechat() {
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/micromessenger/i) == 'micromessenger') {
        console.log('微信浏览器');
        this.isShowWechat = true;
        let appid = "wx838527cc11066732"; //微信APPid
        let wxcode = this.getUrlCode().code; //是否存在code
        // let local = 'https://lisalarm.coyotebio-lab.com/index.html';
        let local = window.location.href
        if (wxcode == null || wxcode === "") {
          //不存在就打开上面的地址进行授权
          window.location.href =
            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
            appid +
            "&redirect_uri=" +
            encodeURIComponent(local) +
            "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";

            // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx838527cc11066732&redirect_uri=https://lisalarm.coyotebio-lab.com/paiban/index.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect

        } else {
          this.wxcode = wxcode;
          this.getAutoLogin();
        }
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
      // } else if (this.username == "") {
      //   Toast('请输入姓名')
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
        // 登录接口
        // http://lisalarm.coyotebio-lab.com/lis_alarm/conveyLogin/login.hn?openid=111&user_name=宋彦睿&user_phone=18763278000
        getLogin({
          openid: this.openid,
          user_phone: this.phone,
          // user_name: this.username
        }).then((res) => {
          console.log(res)
          if (res.data.success) {
            Toast(res.data.msg)
            this.$router.push({
                path: "/instrumentList",
                query:{name: res.data.user_name,userId: res.data.userId}
            });
          } else {
            Toast(res.data.msg)
          }
        });
      }
    },
    getAutoLogin(){
        getAutoLogin({
          code: this.wxcode
        }).then((res) => {
          console.log(res)
          if (res.data.success) {
            if(res.data.code==200){
              this.openid = res.data.openid;
              Toast(res.data.msg)

              this.$router.push({
                path: "/instrumentList",
                query:{name: res.data.user_name,userId: res.data.userId}
              });
            }else{
              this.openid = res.data.openid;
              Toast(res.data.msg)
            }
          } else {
            Toast(res.data.msg)
          }
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
</style>