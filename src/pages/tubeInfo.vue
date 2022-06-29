<template>
  <div class="child-section">
    <div class="main">
      <div class="dis_setting_view" style="background:#FFFFFF;">
        <form action="/" style="width:100%;">
          <van-search
            v-model="keywordValue"
            show-action
            placeholder="请输入试管条码"
            @search="onSearch"
          >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
          </van-search>
        </form>
      </div>

       <div class="search-list-role">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onDownLoad"
        >
          <div
            v-for="(item, index) in instrumentList"
            :key="index">
            <div class="search-result-view">
              <div class="search-result-view-left">
                <div class="search-result-view-left-title">试管条码：{{ item.box_num }}</div>
              </div>
              <div class="search-result-view-left">
                <div
                  class="search-result-view-left-lable"
                  style="margin-top: 0px;"
                  :style="item.is_receive == 0 ? 'color:red;': 'color:red;'">{{ item.is_receive == 0 ? '超时未转运' : '超时未送样'}}</div>
              </div>
            </div>
          </div>
        </van-list>
</van-pull-refresh>
          
      </div>
      <div class="empty_view"></div>
      

      <div class="view_bottom">
        <div class="view_bottom_left"  @click="handleTitleBack">返回</div>
        <!-- <div class="view_bottom_right" @click="scanQRCodeClick">扫描箱码号</div> --> 
      </div>
    </div>

  </div>
</template>

<script>
import Header from "../components/header.vue";
import { getConveyList,getCheckedUserId } from "../request/api";
import { Notify,Toast,Button,Dialog } from "vant";
export default {
  name: "",
  components: {
    Header,
    [Dialog.Component.name]: Dialog.Component, //Dialog.Component写成这样才生效
    [Button.name]: Button,
  },
  data() {
    return {
      page: 1, //第几页
      limit: 30, //每页限制
      instrumentList: [],
      loading: false,
      finished: false,
      refreshing: false,
      roleId: 1,  
      isShow: false,
      roleName:'',
      userId: '',
      keywordValue: "",
      currentDateText: '',
      currentDate: new Date(),
      maxDate: new Date(),
      isShowDateTime: false,
      boxnum: "",
    };
  },
  activated() {
    this.roleId = this.$route.query.id;
    this.roleName = this.$route.query.name;
    this.userId = this.$route.query.userId;
    this.boxnum = this.$route.query.boxnum;
    console.log(this.roleId)
    console.log(this.roleName)
    console.log(this.userId)

    this.currentDateText = this.timeFormat1(this.currentDate);

    this.page = 1;
    this.instrumentList = [];
    this.getConveyList();
  },
  mounted() {
  },
  methods: {
    handleTitleBack() {
      this.$router.back();
    },
    getConveyList() {
      if (this.refreshing) {
          this.refreshing = false;
        }

      let that = this;
      getConveyList({
        page: this.page,
        limit: this.limit,
        userId: this.userId
      }).then((res) => {
        if (res.data.success) {
          let instrumentList = that.instrumentList;
					instrumentList = that.page == 1 ? res.data.msg : instrumentList.concat(res.data.msg)

          that.loading = false;

          if(res && res.data && res.data.msg.length > 0){
            that.page = that.page + 1;
          }else{
             that.finished = true;
          }
          
          that.instrumentList = instrumentList;
        } else {
            Toast(res.data.msg)
        }
      });
    },
    
    onDownLoad(){
      console.log(this.page)
      if(this.page > 1){
        this.getConveyList();
      }
    },
    onRefresh(){
      // 清空列表数据
      this.finished = false;
      this.page = 1;
      this.instrumentList = [];
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.getConveyList();
    },
    
    
    onSearch() {
        console.log(this.keywordValue)
        
        this.page = 1;
        this.instrumentList = [];
        this.getConveyList();
    },
    clickDateTime(){
      this.isShowDateTime = true;
    },
    dateTimeCancel(){
      this.isShowDateTime = false;
    },
    dateTimeConfirm(){
      this.currentDateText = this.timeFormat1(this.currentDate);
      console.log(this.currentDateText)
      this.isShowDateTime = false;

      this.page = 1;
      this.instrumentList = [];
      this.getConveyList();
    },
    timeFormat1(time) { // 时间格式化 2019-09-08
     let year = time.getFullYear();
     let month = time.getMonth() + 1;
      if(month<10){
        month = '0'+month;
      }
     let day = time.getDate();
      if(day<10){
        day = '0'+day;
      }

    return year + '-' + month + '-' + day + '';
     },
  },
};
</script>
<style scoped lang="scss">
.icon_logo {
  width: 40px;
  height: 40px;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // padding-top: 30px;
}

.flex-between{
  display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
}

.bind_main_item {
  // width: 670px;
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  // margin-top: 40px;
  padding: 30px;

  .form-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // margin-top: 15px;

    .icon_login_text{
      width: 30%;
    }

    input {
      // margin-top: 5px;
      width: 100%;
      outline: none;
      border: 1px solod #DDDDDD;
      line-height: 35px;
      background-color: #eee;
      border-radius: 5px;
      padding-left: 0px;
    }
    .select-item {
      // display: flex;
      // align-items: center;
      // width: 100%;
      
    }

    .input-item {
      display: flex;
      justify-content: center;
      align-items: center;

      input {
        width: 420px;
         height: 80px;
        background: #ffffff;
        border-radius: 12px;
        border: 1px solid #DDDDDD;
        outline: none;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        padding-left: 20px;
      }

      .icon_scan {
        width: 40px;
        height: 40px;
      }
    }
  }
}


.submit_view {
  display: flex;
  justify-content: center;
  align-items: center;
  //   margin-top: 20px;
  width: 90%;
  height: 88px;
  background: #307ff5;
  border-radius: 12px;
  color: #ffffff;
  font-size: 32px;
}

.empty_view{
  height: 150px;
  width: 100%;
}

.view_bottom {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  position: fixed;
  bottom: 0px;
  z-index: 20;
  height: 120px;
  background: #FFFFFF;
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

.view_bottom_right {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 326px;
  height: 88px;
  background: #307ff5;
  border-radius: 12px;
  border: 1px solid #307ff5;
  font-size: 34px;
  color: #ffffff;
}

.view_bottom_left_1 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 88px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #307ff5;
  font-size: 34px;
  color: #307ff5;
}

.view_bottom_right_1 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 88px;
  background: #307ff5;
  border-radius: 12px;
  border: 1px solid #307ff5;
  font-size: 34px;
  color: #ffffff;
}

.item_center{
  font-size: 32px;
  padding: 20px 40px 20px 0px;
  color: #307ff5;
}

.search-list-role{
  // height: 1110px;
  border: 0 none;
  background-color: #fff;
  width: 100%;
  padding: 0px 40px;
  // .search-result {
  //   height: 100%;
  //   overflow-x: hidden;
  //   overflow-y: auto;

    .search-result-view {
      display: flex;
        align-items: center;
      justify-content: space-between;
      padding: 30px 0px;
      border-bottom: 1px solid #dddddd;

      .search-result-view-left {
        display: flex;
        flex-direction: column;

        .search-result-view-left-title {
          font-size: 34px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
        }

        .search-result-view-left-lable {
          font-size: 28px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #999999;
          margin-top: 20px;
        }
      }
    }

    .result-null {
      margin-top: 100px;
      text-align: center;
      font-size: 40px;
    }
  // }
}

.search-list {
  height: 960px;
  border: 0 none;
  background-color: #fff;
  width: 100%;
  padding: 0px 40px;
  .search-result {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    .search-result-view {
      display: flex;
        align-items: center;
      justify-content: space-between;
      padding: 30px 0px;
      border-bottom: 1px solid #dddddd;

      .search-result-view-left {
        display: flex;
        flex-direction: column;

        .search-result-view-left-title {
          font-size: 34px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
        }

        .search-result-view-left-lable {
          font-size: 28px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #999999;
          margin-top: 20px;
        }
      }
    }

    .result-null {
      margin-top: 100px;
      text-align: center;
      font-size: 40px;
    }
  }
}

.search-result-view-right{
  width: 40px;
  height: 40px;
}

.dialog_item{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 50px 0px;
    }

    .dialog_item_title{
      font-size: 36px;
      color: #333333;
    }

    .dialog_item_lable{
      font-size: 28px;
      color: #666666;
      margin-top: 10px;
    }

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
/*滑动轨道*/
::-webkit-scrollbar-track-piece {
  background-color: transparent;
  -webkit-border-radius: 6px;
}
// 下面是滑块
/*竖向滚动条*/
::-webkit-scrollbar-thumb:vertical {
  height: 5px;
  background-color: #ffffff;
  -webkit-border-radius: 6px;
}
/*横向滚动条*/
::-webkit-scrollbar-thumb:horizontal {
  width: 5px;
  background-color: #ffffff;
  -webkit-border-radius: 6px;
}

.dis_setting_view{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 30px 0px 30px;
}

.van-search{
    width: 100% !important;
    padding: 10px 0px;
  }

  /**
  *
   */

   .dis_item_center{
  width: 100%;
      display: flex;
    justify-content: space-between;
    align-items: center;
    background: #FFFFFF;
}

.dis_item_center_1{
  display: flex;
  padding: 20px 30px;
  align-items: center;
  justify-content: center;
}
.dis_item_center_2{
  font-size: 28px;
}

.seach-form-item {
  display: flex;
    height: 88px;
    position: relative;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    width: 90%;

  input {
    width: 40%;
    height: 80px;
    background: #f5f5f5;
    border-radius: 12px;
    border: none;
    outline: none;
    font-size: 28px;
    font-weight: 400;
    color: #999999;
    // padding: 0px 25px;
  }
}
</style>