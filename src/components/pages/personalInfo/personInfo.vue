<template>
  <div class="body-style">
    <div class="title-wrap">
      <div class="nav-marker"></div>
      <div class="sub-title">我的个人信息</div>
    </div>

    <div class="content-wrap">
      <div class="content-top-wrap">
        <div class="top-left-wrap">
          <div class="font1">基本信息</div>
          <div>
            <div class="item" v-for="(base,index) in baseInfo"><div class="key-wrap"><div class="float-right">{{base.label}} :</div></div><div class="value-wrap" :class="{colorRed:base.value=='待审核',colorGreen:base.value=='审核通过'}">{{base.value}}</div></div>
            <!-- <span class="" v-for="(base,index) in baseInfo"><span>{{base}}</span></span> -->
          </div>
        </div>
        <div class="top-right-wrap">
          <el-button type="primary" icon="el-icon-edit" round>修改</el-button>
        </div>
      </div>
      <div class="content-bottom-wrap">
        <div  class="font1">详细信息</div>
        <div>
          <div class="item2" v-for="(detail,index) in detailInfo"><div class="key-wrap"><div class="float-right">{{detail.label}} :</div></div><div class="value-wrap">{{detail.value}}</div></div>
        </div>
      </div>
    </div>

    <div class="clearfloat" style="clear:both;height:0;font-size: 1px;line-height: 0px;"></div>
  </div>
</template>


<script>
import { mapState } from "vuex"; //为获取用户名
export default {
  data() {
    return {
      baseInfo: [],
      detailInfo: [],
    };
  },
  mounted() {
    this.getPersonInfo();
  },
  computed: {
    ...mapState(["UserToken"]) //为获取用户名
  },
  methods: {
    getPersonInfo() {
      let account = this.UserToken.Account; //为获取用户名
      if (account == "readearth") {
        alert("请登录！");
        return;
      }
      let self = this;
      this.axios
        .get("UserManager.svc/GetPersonInfo", {
          params: {
            account: account //  "1184058205@qq.com"测试用    待处理
          }
        })
        .then(response => {
          let resData = eval("(" + response.data + ")");
          //基本信息
          let baseInfoArr = [];
          //详细信息
          let detailInfoArr = [];
          resData.map((element, index) => {
            if (element.infoType === "0") {
              let baseInfoObj = {
                label: element.label,
                value: element.value
              };
              baseInfoArr.push(baseInfoObj);
              
            } else if (element.infoType === "1") {
              let detailInfoObj = {
                label: element.label,
                value: element.value
              };
              detailInfoArr.push(detailInfoObj);
            }
          });

          self.baseInfo = baseInfoArr;
          self.detailInfo = detailInfoArr;
        })
        .catch(response => {
          console.log(response.data);
        });
    }
  }
};
</script>

<style scoped>
.body-style {
  background-color: white;
  width: 90%;
  margin-top: 2%;
  margin-bottom: 2%;
}
.title-wrap {
  padding-left: 2%;
  padding-top: 1%;
  padding-bottom: 1%;
  width: 98%;
  height: 2.5vh;
  border-bottom: solid #808080c2;
  border-bottom-width: 0.5px;
}
.nav-marker {
  float: left;
  width: 0.5vw;
  height: 2.5vh;
  background-color: #1bbf9d;
}
.sub-title {
  float: left;
  margin-left: 0.8vw;
  font-size: 1vw;
  font-weight: bold;
}
.content-wrap{
      padding-left: 7%;
    padding-top: 1%;
    padding-bottom: 2%;
    padding-right: 2%;
}
.content-top-wrap{
  height: auto;
    float: left;
    width: 100%;
    padding-bottom: 1.5%;
}
.top-left-wrap{
      float: left;
    width: 90%;
}
.top-right-wrap{
      float: left;
    width: 9%;
}
.content-bottom-wrap{
    float: left;
    padding-bottom: 2%;
    width: 90%;
}
.font1{
      font-size: 1.3em;
    font-weight: bold;
}
.item{
  padding-bottom:1%;
}
.item2{
  padding-bottom:1%;
}
/* .item:nth-child(2) .value-wrap{
  color:red;
} */
.colorRed{
  color:red;
}
.colorGreen{
  color:green;
}
.key-wrap{
    float: left;
    width: 20%;
    padding-bottom: 1%;
}
.float-right{
      float: right;
}
.value-wrap{
    float: left;
    width: 77%;
    padding-left: 1%;
    padding-bottom: 1%;
}
</style>

