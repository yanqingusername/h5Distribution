<template>
  <div class="child-section">
    <!-- <Header>
      <div class="header-content">
        <div class="header-title">采样管收集管理</div>
        <div class="header-back">
          <div class="back" @click="handleTitleBack">
            <i class="iconfont icon-arrowthin" style="color: #999999;"></i>
          </div>
        </div>
      </div>
    </Header> -->
    <div class="main">
      <!-- <div class="seach-form-item">
        <img style="width:18px;height:18px;" src="../assets/images/search.png" alt="" />
        <input
          v-model="keywordValue"
          type="text"
          name="keywordValue"
          placeholder="请输入仪器序列号"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          autofocus
          ref="searchInput"
          spellcheck="false"
          @click="changeInput"
          @keyup="clickSearch"
        />
        <img v-if="keywordValue" @click="clearSearchValue" style="width:18px;height:18px;position:absolute;right:15px;" src="../assets/images/deleteTest.png" alt="" />
      </div> -->
      <div class="dis_setting_view" style="background:#FFFFFF;">
        <form action="/" style="width:100%;">
          <van-search
            v-model="keywordValue"
            show-action
            placeholder="请输入箱码"
            @search="onSearch"
          >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
          </van-search>
        </form>
      </div>

      <!-- 暂时注释 -->
      <!-- <div class="dis_item_center">
        <div class="dis_item_center_1" @click="clickDateTime">
          <div class="dis_item_center_2">日期: {{currentDateText}}</div>
          <van-icon name="arrow-down" size="16"/>
        </div>
        <div class="item_center" @click.stop="clickPDF">样本箱转运系统使用说明</div>
      </div> -->

      <div class="dis_item_center">
        <div class="dis_item_center_1" @click="clickDateTime">
          <div class="dis_item_center_2">日期: {{currentDateText}}</div>
          <van-icon name="arrow-down" size="16"/>
        </div>
        <div class="item_center" @click.stop="clickWait">待转运箱</div>
      </div>

<div class="dis_item_center">
      <div class="item_center_new" @click.stop="clickPDF">样本箱转运系统使用说明</div>
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
            :key="index" @click="clickTubeInfo(item.box_num)">
            <div class="search-result-view">
              <div class="search-result-view-left">
                <div class="search-result-view-left-title">箱码号：{{ item.box_num }}</div>
                <div class="search-result-view-left-title" style="color:red;">管数：{{ item.system_sum }}</div>
                <div class="search-result-view-left-title">转运时间：{{ item.convey_time }}</div>
                <div class="search-result-view-left-title">采样点：{{ item.channel_name }}</div>
                <div class="search-result-view-left-title">接收时间：{{ item.receive_time }}</div>
                <div class="search-result-view-left-title">接收人：{{ '测试数据' }}</div>
              </div>
              <div class="search-result-view-left">
                <div
                  class="search-result-view-left-lable"
                  style="margin-top: 0px;"
                  :style="item.is_receive == 0 ? 'color:red;': 'color:#999999;'">{{ item.is_receive == 0 ? '转运中' : '已接收'}}</div>
              </div>
            </div>
          </div>
        </van-list>
</van-pull-refresh>
          
      </div>
      <div class="empty_view"></div>
      

      <div class="view_bottom">
        <div class="view_bottom_left"  @click="inputClick">输入箱码号</div>
        <div class="view_bottom_right" @click="scanQRCodeClick">扫描箱码号</div>
      </div>
    </div>

    <van-dialog
      v-model="isShow"
      :beforeClose="beforeClose"
      confirmButtonColor='#307FF5'
    >
    <div class="dialog_item">
        <div class="dialog_item_title">箱码号信息</div>
        <div class="flex-between">
          <div class="dialog_item_lable" style="width:30%;text-align: end;">箱码号：</div>
          <div class="dialog_item_lable" style="width:60%;">{{bindInfo.box_num}}</div>
        </div>
        <div class="flex-between">
          <div class="dialog_item_lable" style="width:30%;text-align: end;">管数：</div>
          <div class="dialog_item_lable" style="width:60%;">{{bindInfo.system_sum}}</div>
        </div>
        <div class="flex-between">
          <div class="dialog_item_lable" style="width:30%;text-align: end;">采样点：</div>
          <div class="dialog_item_lable" style="width:60%;">{{bindInfo.channel_name}}</div>
        </div>
        <div class="flex-between">
          <div class="dialog_item_lable" style="width:30%;text-align: end;">状态：</div>
          <div class="dialog_item_lable" style="width:60%;">{{bindInfo.is_receive == 0 ? '转运中' : '已接收'}}</div>
        </div>
        <div class="flex-between">
          <div class="dialog_item_lable" style="width:30%;text-align: end;">转运人员：</div>
          <div class="dialog_item_lable" style="width:60%;">{{roleName}}</div>
        </div>
    </div>
    </van-dialog>

    <van-dialog
      v-model="isInput"
      showCancelButton
      :beforeClose="beforeClose1"
      confirmButtonColor='#307FF5'
    >
    <div class="dialog_item">
        <div class="dialog_item_title">箱码号信息</div>
        <div class="bind_main_item">
          <div class="form-item">
            <div class="icon_login_text">箱码号：</div>
            <div class="select-item input-item">
              <input
                v-model="boxCodeNumber"
                type="text"
                name="boxCodeNumber"
                placeholder="请输入箱码号"
                :onkeyup="boxCodeNumber=boxCodeNumber.replace(/[^\w\.\/]/ig,'')"
              />
            </div>
          </div>
        </div>
    </div>
    </van-dialog>

     <van-popup v-model="isShowDateTime" round position="bottom">
     
     <van-datetime-picker
  v-model="currentDate"
  type="date"
  title="选择年月日"
  @cancel="dateTimeCancel" 
  @confirm="dateTimeConfirm"
  :max-date="maxDate"
/>
    </van-popup>


  </div>
</template>

<script>
import Header from "../components/header.vue";
import { getJSSDKHELP,getConveyList,conveyScan,getCheckedUserId } from "../request/api";
import { Notify,Toast,List,Button,Dialog } from "vant";
import wx from 'jweixin-module';
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
      isFocus: false,
      loading: false,
      finished: false,
      refreshing: false,
      roleId: 1,  
      isShow: false,
      bindInfo:'',
      isInput: false,
      boxCodeNumber: '',
      roleName:'',
      userId: '',
      keywordValue: "",
      currentDateText: '',
      currentDate: new Date(),
      maxDate: new Date(),
      isShowDateTime: false,
    };
  },
  activated() {
    this.roleId = this.$route.query.id;
    this.roleName = this.$route.query.name;
    this.userId = this.$route.query.userId;
    console.log(this.roleId)
    console.log(this.roleName)
    console.log(this.userId)

    this.currentDateText = this.timeFormat1(this.currentDate);

    this.page = 1;
    this.instrumentList = [];
    this.getCheckedUserId(1);
  },
  mounted() {
    this.isWechat();
  },
  methods: {
    clickPDF() {
      this.$router.push({
        path: "/instrumentPDF"
      });
      return;
    },
    getCheckedUserId(typeNumber){
        let that = this;
        getCheckedUserId({
          userId: this.userId
        }).then((res) => {
          console.log(res)
          if (res.data.success) {
            if(typeNumber == 1){
              that.getConveyList();
            }else if(typeNumber == 2){
              that.getScanQRCodeClick();
            } else if (typeNumber == 3){
              that.isInput = true;
            }
          } else {
            localStorage.clear();
            Toast(res.data.msg);
            setTimeout(()=>{
              that.$router.back();
            },1200)
          }
        });
    },
    isWechat() {
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/micromessenger/i) == 'micromessenger') {
        // return true;
        console.log('微信浏览器');
        this.scanQRJssdk();
      } else {
        console.log('普通浏览器,请在手机微信浏览器打开此页面');
        return false;
      }
    },
    // 初始化sdk配置
    async scanQRJssdk() {
      // alert(`url链接:${window.location.href}`);
	  const u = navigator.userAgent;
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // Android
      const isIOS = navigator.platform.indexOf('iPhone') != -1;//ios
       let url = '';
      if (isAndroid) {
        url = location.href;
      }
      if (isIOS) {
        url = location.href.split('#')[0]; // hash模式下,#后面的部分如果带上ios中config会不对
      }
      const api = [];
      // 'qrCode','barCode'
      api.push('qrCode');
      api.push('barCode');
      // alert(url);
      const resData = await getJSSDKHELP({ url });	// 根据接口返回appId，timestamp等数据
      console.log('获取微信配置结果', resData);
      if (resData) {
        // alert(JSON.stringify(resData.data));
        wx.config({
          // beta: true,
          debug: false,
          appId: resData.data.appId,
          timestamp: resData.data.timestamp,
          nonceStr: resData.data.nonceStr,
          signature: resData.data.signature,
          jsApiList: ['checkJsApi', 'scanQRCode']
        });
        wx.ready(() => {
          wx.checkJsApi({
            jsApiList: ['scanQRCode'],
            success(res) {
              console.log('aaaa', res);
            }
          });
        });
        wx.error((res) => {
          alert(`出错了：${res.errMsg}`);// 这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然		后根据微信文档查询即可。
        });
      }
    },
   // 扫描
   scanQRCodeClick() {
     this.getCheckedUserId(2);
   },
    getScanQRCodeClick() {	// 点击的时候调起扫一扫功能呢
      const that = this;
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success(res) {
          const resultStrArr = res.resultStr.split(',');		
          // 转为数组时为了避免扫描一维码是返回CODE_128,20180528前面会添加一个CODE_128所以转为数组获		取最后一条就行了
          console.log(resultStrArr[resultStrArr.length - 1]); // 输出扫码信息
          that.result = resultStrArr[resultStrArr.length - 1];
          let boxCodeNumber = resultStrArr[resultStrArr.length - 1];
          if(boxCodeNumber){
            that.getBindSearch(boxCodeNumber);
          }
        },
        fail(res) {
          console.log('err', res);
        }
      });
    },
    /**
     * 
     */
    getBindSearch(boxCodeNumber) {
      let that = this;
      conveyScan({
        box_num: boxCodeNumber,
        userId: this.userId
      }).then((res) => {
        if (res.data.success) {
          that.bindInfo = {
            box_num: res.data.box_num,
            system_sum: res.data.system_sum,
            channel_name: res.data.channel_name,
            is_receive: res.data.is_receive,
          }
          that.isShow = true;
        } else {
            Toast(res.data.msg)
        }
      });
    },
    beforeClose(action, done) {
      let that = this;
      if(action === 'confirm') {
        that.isShow = false;
        that.page = 1;
        that.instrumentList = [];
        that.getCheckedUserId(1);
        done()
      } else if(action === 'cancel') {
        that.bindInfo = '';
        that.isShow = false;
        done() //关闭
      }
    },
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
    changeInput() {
      //单击搜索框时获取焦点
      this.isFocus = true;
    },
    clearSearchValue() {
      //清空输入的查询条件
      if (this.keywordValue) {
        this.keywordValue = ""; //搜索关键字
        this.page = 1;
        this.instrumentList = [];
        this.getCheckedUserId(1);
        this.$refs.searchInput.focus(); //输入查询条件清空后获取焦点
      }
    },
    clickSearch() {
      //查询
      if (event.code == "ArrowDown" || event.code == "ArrowUp") {
        //上下键
        return;
      }
      // if (this.keywordValue.trim()) {
            this.page = 1;
            this.instrumentList = [];
            this.getCheckedUserId(1);
      // } else {
        this.$refs.searchInput.focus(); //没有输入查询条件焦点不应该失去
      // }
    },
    onDownLoad(){
      console.log(this.page)
      if(this.page > 1){
        this.getCheckedUserId(1);
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
      this.getCheckedUserId(1);
    },
    inputClick(){
      this.getCheckedUserId(3);
    },
    beforeClose1(action, done) {
      let that = this;
      
        if(action === 'confirm') {
          if(that.boxCodeNumber){
            conveyScan({
              box_num: that.boxCodeNumber,
              userId: this.userId
            }).then((res) => {
              if (res.data.success) {
                that.isInput = false;
                that.boxCodeNumber = "";
                done();

                that.bindInfo = {
                  box_num: res.data.box_num,
                  system_sum: res.data.system_sum,
                  channel_name: res.data.channel_name,
                  is_receive: res.data.is_receive,
                }
                that.isShow = true;
              } else {
                  Toast(res.data.msg)
                  return done(false);//阻止关闭
              }
            });
          }else{
            Toast('请输入箱码号')
            return done(false);//阻止关闭
          }
        } else if(action === 'cancel') {
          that.bindInfo = '';
          that.boxCodeNumber = "";
          that.isInput = false;
          done() //关闭
        }
      
    },
    onSearch() {
        console.log(this.keywordValue)
        
        this.page = 1;
        this.instrumentList = [];
        this.getCheckedUserId(1);
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
      this.getCheckedUserId(1);
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
    clickWait(){
      this.$router.push({
                path: "/waitDistribution",
                query:{id: this.roleId,name: this.roleName,userId: this.userId}
            });
    },
    clickTubeInfo(boxnum){
      console.log('---->:',boxnum)
      this.$router.push({
        path: "/tubeInfo",
        query:{id: this.roleId,name: this.roleName,userId: this.userId,boxnum: boxnum}
      });
    }
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

.item_center_new{
  font-size: 32px;
  padding: 0px 0px 0px 30px;
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
      //   align-items: center;
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
      //   align-items: center;
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