<template>
  <div class="child-section">
    
    <div class="main">

      <div class="search-list-role-from">
        <div class="search-list-role-from-a">
          <div class="search-list-role-from-c">
            <div class="s_center_t_item" style="width: 30%">姓名</div>
            <div class="select-item input-item">
              <input
                v-model="real_name"
                type="text"
                name="real_name"
                placeholder="请输入姓名"
                maxlength="30"
              />
            </div>
          </div>

          <div class="search-list-role-from-c">
            <div class="s_center_t_item" style="width: 30%">手机号</div>
            <div class="select-item input-item">
              <input
                v-model="real_phone"
                type="number"
                name="real_phone"
                placeholder="请输入手机号"
                maxlength="11"
              />
              <!-- <div class="clear_1" @click="clearPhone" v-if="sampling_member_phone">
                <img class="icon_clear" src="../assets/images/deleteTest.png" />
              </div> -->
            </div>
          </div>

          <div class="search-list-role-from-c">
            <div class="s_center_t_item" style="width: 30%">密码</div>
            <div class="select-item input-item">
              <input
                v-model="password"
                type="password"
                name="password"
                placeholder="请输入密码"
                maxlength="6"
              />
            </div>
          </div>

          <div class="search-list-role-from-c" style="border-bottom:none;">
            <div class="s_center_t_item" style="width: 30%">确认密码</div>
            <div class="select-item input-item">
              <input
                v-model="repassword"
                type="password"
                name="repassword"
                placeholder="请再次输入密码"
                maxlength="6"
              />
              <!-- <div class="clear_1" @click="clearAccountPhone" v-if="registrant_member_phone">
                <img class="icon_clear" src="../assets/images/deleteTest.png" />
              </div> -->
            </div>
          </div>
          
        </div>
      </div>

      <div class="empty_view"></div>

      <div class="view_bottom">
        <div class="view_bottom_left" @click="clickSubmit">注册</div>

        <div class="view_bottom_right" @click="onClickLeft">返回</div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  Toast,
  Button,
  Dialog,
} from "vant";
import { writeRegistrantInfo } from "../request/api";

export default {
  name: "",
  components: {
    [Dialog.Component.name]: Dialog.Component, //Dialog.Component写成这样才生效
    [Button.name]: Button,
  },
  data() {
    return {
      real_name:"",
      real_phone:"",
      password:"",
      repassword:"",
    };
  },
  activated() {

    document.title = '注册';

  },
  mounted() {
  },
  methods: {
    onClickLeft() {
      this.$router.back();
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
    /**
     * 保存
     */
    clickSubmit() {
      let that = this;

      if(that.real_name == ''){
        Toast('请输入姓名');
        return;
      }

      if(that.real_phone == ''){
        Toast('请输入手机号');
        return;
      }

      if (!that.checkPhone(that.real_phone)) {
        Toast('手机号有误')
        return;
      } 

      if(that.password == ''){
        Toast('请输入密码');
        return;
      }

      if(that.repassword == ''){
        Toast('请再次输入密码');
        return;
      }

      if (that.password != that.repassword) {
        console.log(that.password,that.repassword)
        Toast('两次输入密码不一致!')
        return;
      } 

      let params = {
        real_name: that.real_name,
        real_phone: that.real_phone,
        password: that.password,
      }

      console.log("---->:", params);
      return

      // writeRegistrantInfo(params).then((res) => {
      //   if (res.data.success) {
      //     Toast(res.data.msg)
      //     that.$router.back();
      //   } else {
      //     Toast(res.data.msg)
      //   }
      // });
      
    },
    clearPhone() {
      this.real_phone = "";
    },
    clearAccountPhone(){
      this.repassword = "";
    }
  },
};
</script>
<style scoped lang="scss">
.child-section {
  background-color: #f5f5f5;
  height: 100%;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // padding-top: 30px;
}



.dis_setting_item {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px 20px;
  background: #ffffff;
  border-radius: 20px;
  margin-top: 20px;
}

.dis_setting_item_1{
  font-size: 32px;
  color: #333333;
}
.dis_setting_item_2{
  font-size: 28px;
  margin-top: 16px;
  color: #E0694D;
}




.s_center_t_item {
  font-size: 28px;
}


.select-item {
  width: 70%;
}


.input-item {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  input {
    width: 100%;
    height: 80px;
    background: #ffffff;
    border-radius: 12px;
    border: none;
    outline: none;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    padding-left: 20px;
  }


}

.search-list-role {
  // height: 1110px;
  border: 0 none;
  // background-color: #FFFFFF;
  width: 100%;
  padding: 0px 30px;

     .search-result-view {
      display: flex;
      //   align-items: center;
      // justify-content: space-between;
      padding: 30px 30px;
  background-color: #FFFFFF;
  border-radius: 10px;
  margin-top: 30px;
  flex-direction: column;


  .search-result-view-item{
    width: 100%;
      display: flex;
    // justify-content: space-between;
    // align-items: center;
    padding: 10px 0px;
  

.search-result-view-left{
  width: 25%;
  font-size: 30px;
  color: #999999;
}

.search-result-view-right{
  width: 75%;
  font-size: 30px;
}
  }
     }
}

.empty_view {
  height: 80px;
  width: 100%;
}

.view_bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  // position: fixed;
  // bottom: 50px;
  z-index: 9;
}

.view_bottom_left {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 690px;
  height: 78px;

background: #307FF5;
  border-radius: 16px;
  border: 1px solid #307FF5;
  font-size: 32px;
  color: #ffffff;
}

.view_bottom_right {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 690px;
  height: 78px;
margin-top: 20px;
background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #307FF5;
  font-size: 32px;
  color: #307FF5;
}

.search-list-role-from {
  // height: 1110px;
  border: 0 none;
  width: 100%;
  padding: 0px 30px;
  margin-top: 30px;
  border-radius: 20px;

  .search-list-role-from-a {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    background: #ffffff;
    border-radius: 20px;

    .search-list-role-from-b {
      padding-top: 10px;
      font-size: 32px;
    }

    .search-list-role-from-c {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      padding: 10px 0px;
      border-bottom: 1px solid #dddddd;
    }

    .search-list-role-from-g{
      width: 100%;
      display: flex;
      justify-content: space-between;
      background: #ffffff;
      padding: 10px 0px;
      border-bottom: 1px solid #dddddd;

      
    }
  }
}



.clear_1 {
  position: absolute;
  padding: 16px;
  right: 0px;
  font-size: 32px;
}

.icon_clear {
  width: 32px;
  height: 32px;
}

</style>