<template>
  <div>
    <div>

      <div class="center">
        <div class="items-trs-wrap">

          <!-- <div :class="{itemTrWrap:(item.lists).length>1?true:false,itemTrWrapOne:(item.lists).length>1?false:true}"  v-for="item in items"> -->
          <div :class="itemChildrenArrLen(item)" v-for="item in items">
            <div class="item-wrap">
              <div class="sub-title-wrap">
                <div class="nav-marker"></div>
                <div class="sub-title">{{item.name.parentModuleCnName}}</div>
              </div>
              <div class="lists-wrap">
                <div :class="listsLength(item.lists)" v-for="(list,index) in item.lists" @mouseout="mouseout" @mouseover="mouseover">
                  <div class="list-img" :style="{backgroundImage:'url('+list.imgUrl+')',backgroundRepeat:'no-repeat',backgroundPosition:'center center',backgroundSize:'cover'}" @click="showModal(list)">
                    <div class="info-wrap">
                      <div class="info-font">{{list.imgInfo}}</div>
                    </div>
                  </div>

                  <div class="list-title">{{list.title}}</div>
                  <div class="list-marker-wrap">
                    <div class="view-wrap icon-text-wrap-com">
                      <div class="view-icon icon-wrap-com" src=""></div>
                      <div class="view-count text-wrap-com">{{list.viewCount}}</div>
                    </div>
                    <div class="comment-wrap icon-text-wrap-com">
                      <div class="comment-icon icon-wrap-com" src=""></div>
                      <div class="comment-count text-wrap-com">{{list.commentCount}}</div>
                    </div>
                    <div class="likes-wrap icon-text-wrap-com">
                      <div class=" icon-wrap-com" :class="{'likesIcon':!list.likeActive,'likesIconActive':list.likeActive}" @click="toggleLike(list)" src=""></div>
                      <div class="likes-count text-wrap-com">{{list.likesCount}}</div>
                    </div>
                  </div>
                </div>
                <div class="clearfloat" style="clear:both;height:0;font-size: 1px;line-height: 0px;"></div>
              </div>
            </div>

          </div>

        </div>

        <!-- <div v-show="isShow" class="modal-wrap" ><div @click="closeModal">×</div></div> -->
      </div>

    </div>
    <div class="mymodal" v-show="isShow">
      <!-- 父组件传一个点击事件@hidden="hiddenShow"-->
      <my-modal @toggleLike="toggleLike" @hidden="hiddenShow" :moduleEnName="moduleEnName" :moduleCnName="moduleCnName " :isShow="isShow " ref="c1" :clickListData="clickListData"></my-modal>
    </div>
  </div>
</template>

<script>
import myHeader from "../../common/header";
import myFooter from "../../common/foot";
import myModal from "./modal";
import { mapActions, mapState, mapMutations } from "vuex";
var moduleEnName = "",
  parentModule = "";
export default {
  components: {
    myHeader,
    myFooter,
    myModal
  },
  data() {
    return {
      isShow: false,

      items: [],

      //将请求到的生成modal弹框的数据通过属性标签传给子组件，子组件通过props接收数据
      modalData: null,
      famatOptions: null,
      famatValue: null,
      timeType: null,
      timeTypeValue: null,
      startTimes: null,
      endTimes: null,
      moduleCnName: "",
      moduleEnName: "",
      one: false,
      clickListData:{}//将当前点击模块的list数据传给子组件   控制子组件收藏的变化
    };
  },
  mounted() {
    this.getAllData();
  },
  computed: {
    ...mapState(["UserToken", "anchorTimer"])
  },
  watch: {
    //监听路由变化

    $route(to) {
      console.log(to);
      this.goAnchor(to);
    }
  },
  methods: {
    ...mapActions(["scrollAnchor"]),
    ...mapMutations(["SETFUNRETURN"]),
    ...mapState(["UserToken"]),
    /**
     * toggle效果
     */
    toggleLike(list) {
      list.likeActive = !list.likeActive;
      //获取向后台传的变量
      let account = this.UserToken.Account;
      if (account == "readearth") {
        alert("请登录后再点击收藏！");
        return;
      }
      var data = this.getNowFormatDate();
      var nowTime = data.toString();
      if (list.likeActive == true) {
        //增   向数据库的表中增加收藏记录  并返回统计的条数
        this.axios
          .get("DataService.svc/insertLikeData", {
            params: {
              moduleEnName: list.moduleEnName,
              account: account,
              insertTime: nowTime + ""
            }
          })
          .then(res => {
            let data = res.data;
            console.log(data);
            let strArr=data.split(",")
            if(strArr[0]>0){
              alert("收藏成功！")
            }else{
              alert("收藏失败！")
              return;
            }

            //更新收藏量
            list.likesCount=strArr[1];
          })
          .catch(res => {
            console.log(res);
          });
      } else {
        //删
        this.axios
          .get("DataService.svc/deleteLikeData", {
            params: {
              moduleEnName: list.moduleEnName,
              account: account
            }
          })
          .then(res => {
            let data = res.data;
            console.log(data);
            let strArr=data.split(",")
            if(strArr[0]>0){
              alert("取消收藏！")
            }else{
              alert("取消收藏失败！")
              return;
            }

            //更新收藏量
            list.likesCount=strArr[1];
          })
          .catch(res => {
            console.log(res);
          });
      }
    },
    itemChildrenArrLen(item) {
      let p = item.name.parentModule;

      if (item.lists.length == 1) {
        // this.one=false;
        return "itemTrWrapOne " + p;
      } else {
        // this.one=true;
        return "itemTrWrap " + p;
      }
    },
    listsLength(listsArr) {
      if (listsArr.length == 1) {
        return { listWrapOne: true, p: true };
      } else {
        return { listWrap: true, p: true };
      }
    },
    stop() {
      clearInterval(this.anchorTimer);
    },
    goAnchor(val) {
      this.stop();
      //this.SETFUNRETURN(true);//停止上次还未完成的动画
      let entityName = val.meta.entityName;
      let toObj = document.querySelector("." + entityName);
      let top = document.documentElement.scrollTop;
      this.scrollAnchor({ top: top, obj: toObj, isScroll: true });
    },
    clear: function() {
      var para1 = this.$refs.splitLine[this.$refs.splitLine.length - 1];
      para1.parentNode.removeChild(para1);
    },
    mouseout(env) {
      // env.currentTarget.classList.remove("hover");
    },
    mouseover(env) {
      // env.currentTarget.classList.add("hover");
    },
    getAllData() {
      //初始加载和路由监听事件时，执行此方法
      let self = this;
      //获取当前路由的父名称
      let pName = self.$route.meta.parentEntityName; //当点击左侧子路由时，获取父路由名称给后台
      // console.log(list);
      let roldId = this.UserToken.RoleID;
      let account = this.UserToken.Account;
      this.axios
        .get("DataService.svc/GetModuleByParentModule", {
          params: {
            parentModule: "dataDownLoad",
            roldId: roldId,//默认传2，即，以游客的方式进入
            account:account
          }
        })
        .then(response => {
          let data = eval("(" + response.data + ")");
          var itemsArr = [];
          for (var i = 0; i < data.length; i++) {
            itemsArr[i] = {
              name: "",
              lists: ""
            };
            itemsArr[i].name = {
              parentModuleCnName: data[i].parentModuleCnName,
              parentModule: data[i].parentModule
            };

            var listData = data[i].listData;
            var listsArr = [];
            for (var j = 0; j < listData.length; j++) {
              listsArr[j] = {
                moduleEnName: "",
                moduleCnName: "",
                parentModule: "",
                imgUrl: "",
                title: "",
                viewCount: "",
                commentCount: "",
                likesCount: "",
                imgInfo: "",
                likeActive: ""
              };
              listsArr[j].moduleEnName = listData[j].moduleEnName;
              listsArr[j].moduleCnName = listData[j].moduleCnName;
              listsArr[j].parentModule = listData[j].parentModule;

              listData[j].imgUrl = require("../../../assets/img" +
                listData[j].imgUrl);
              listsArr[j].imgUrl = listData[j].imgUrl;
              listsArr[j].title = listData[j].moduleCnName;
              listsArr[j].viewCount = listData[j].viewCount;
              listsArr[j].commentCount = listData[j].commentCount;
              listsArr[j].likesCount = listData[j].likesCount;
              listsArr[j].imgInfo = listData[j].content;
              //后台的likeActive非true项处理成false
              listsArr[j].likeActive = listData[j].likeActive=='true'?true:false;
            }
            itemsArr[i].lists = listsArr; //将解析过的数据赋值给items
          }

          self.items = itemsArr;

          this.$nextTick(() => {
            this.goAnchor(this.$route);
          });
        })
        .catch(response => {
          console.log(response);
        });
    },

    showModal(list, img, index) {
      var self = this;
      //获取当前路由的父名称
      let pName = self.$route.meta.parentEntityName; //将此

      this.moduleEnName = list.moduleEnName;
      this.moduleCnName = list.moduleCnName; //作为标题名
      //将当前点击的list数据传给子组件
      this.clickListData=list;
      self.isShow = true; //显示弹出框
      document.querySelector("html").style.overflow = "hidden";
    },
    hiddenShow() {
      //更改modal弹出框隐藏（传给子组件一个点击事件）
      let that = this; //为了避免this指向出现歧义，把vue实例的this赋值给另一个变量再使用
      that.isShow = false;
      that.moduleEnName = ""; //将moduleEnName恢复至初始状态  防止重复点击时，watch监听不到moduleEnName变化
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;

      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }

      var strHour = date.getHours();
      if (strHour >= 0 && strHour <= 9) {
        strHour = "0" + strHour;
      }

      var strMin = date.getMinutes();
      if (strMin >= 0 && strMin <= 9) {
        strMin = "0" + strMin;
      }

      var strSec = date.getSeconds();
      if (strSec >= 0 && strSec <= 9) {
        strSec = "0" + strSec;
      }

      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        strHour +
        seperator2 +
        strMin +
        seperator2 +
        strSec;
      return currentdate;
    }
  }
};
</script>

<style scoped>
.center {
  background-color: #f3f8fc;
  /* margin-left: 20vw; */
  /* width: 80vw; */
  overflow: hidden;
  padding-bottom: 1.5%;
}
.items-trs-wrap {
  padding-bottom: 3vh;
}
.itemTrWrap {
  clear: both;
  padding-top: 2vh;
  margin-left: 1vw;
}
.itemTrWrapOne {
  padding-top: 2vh;
  margin-left: 1vw;
  width: auto;
  float: left;
  clear: none;
  padding-bottom: 2%;
}
.item-wrap {
  /* height: 40vh; */
}
.sub-title-wrap {
}
.itemTrWrap .listWrap:last-child {
  margin-bottom: 3vh;
}
.nav-marker {
  float: left;
  width: 0.5vw;
  height: 2.6vh;
  background-color: #1bbf9d;
}
.sub-title {
  float: left;
  margin-left: 0.8vw;
  font-size: 1.2vw;
  font-weight: 700;
  line-height: 1.1;
}
.lists-wrap {
  clear: both;
  text-align: center;
  width: 100%;
}
.listWrap {
  float: left;
  width: 20%;
  height: 34vh;
  margin-right: 2vw;
  /* border: solid 1px; */
  border-radius: 3%;
  box-shadow: 0px 0px 1px 1.5px #80808038;
  background-color: #fffffd;
  margin-top: 3vh;
  display: inline-block;

  transition: all 0.3s;
}
.listWrapOne {
  float: left;
  width: 96%;
  height: 34vh;
  margin-right: 2vw;
  /* border: solid 1px; */
  border-radius: 3%;
  box-shadow: 0px 0px 1px 1.5px #80808038;
  background-color: #fffffd;
  margin-top: 3vh;
  display: inline-block;

  transition: all 0.3s;
}
.hover {
  transform: scale(1.08);
}
.list-img {
  width: 14.5vw;
  height: 24vh;
  margin: 4%;
  cursor: pointer;
}

.info-wrap {
  position: absolute;
  width: 14.5vw;
  height: 24vh;

  background-color: white;
  text-indent: 2em;

  opacity: 0; /*不透明度：通过不透明度来实现层的隐藏效果    透明*/
  -webkit-transition: opacity 0.5s ease-in-out;
  -moz-transition: opacity 0.5s ease-in-out;
  -o-transition: opacity 0.5s ease-in-out;
  transition: opacity 0.5s ease-in-out;
}
.info-font {
  text-align: left;
  padding-left: 5%;
  margin-top: 1vh;
  line-height: 1.8;
}
.info-wrap:hover {
  background-color: white;
  opacity: 0.85; /*不透明度：通过不透明度来实现层的显示效果    显示 */
  filter: alpha(opacity=0.7);
  text-indent: 2em;
}
.list-title {
  margin-left: 6%;
  text-align: left;
  /* font-weight: 700; */
  margin-bottom: 1vh;
  font-size: 1.08vw;
}
.list-marker-wrap {
  height: 11%;
  width: 94%;
  margin-left: 6%;
  text-align: left;
  color: #bbbbbb;
}
.icon-text-wrap-com {
  float: left;
  width: 29%;
  display: flex;
  align-items: center;
}
.icon-wrap-com {
  width: 54%;
  cursor: pointer;
}
.text-wrap-com {
  width: 92%;
  padding-left: 0%;
}
.view-wrap {
  float: left;
}
.view-icon {
  background: url("../../../assets/img/dataDownLoad/view.png") no-repeat 20% 20%;

  height: 2vh;
  float: left;
}
.view-count {
}
.comment-wrap {
}
.comment-icon {
  background: url("../../../assets/img/dataDownLoad/comment.png") no-repeat
    center center;

  height: 2vh;
  float: left;
}
.comment-count {
}
.likes-wrap {
}
.likesIcon {
  background: url("../../../assets/img/dataDownLoad/likes.png") no-repeat center
    center;

  height: 2vh;
  float: left;
}
.likesIconActive {
  background: url("../../../assets/img/dataDownLoad/likes-d.png") no-repeat
    center center;

  height: 2vh;
  float: left;
}
.likes-count {
}
.hr-wrap {
  margin-top: 4vh;
  margin-bottom: 2vh;
  clear: both;
}
.hr-self {
}
.modal-wrap {
  width: 1000px;
  height: 500px;
  background-color: red;
}

.mymodal {
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 999;
  height: 100vh;
  overflow: auto;
}
/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
.mymodal::-webkit-scrollbar {
  width: 9px;
  height: 9px;
  background-color: #f5f5f5;
}
/*定义滚动条轨道
 内阴影+圆角*/
.mymodal::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: #f5f5f5;
}
/*定义滑块
 内阴影+圆角*/
.mymodal::-webkit-scrollbar-thumb {
  background-color: #099ad7;
  /* background-image: -webkit-gradient(linear, 40% 0%, 75% 84%, from(rgb(77, 156, 65)), color-stop(0.6, rgb(84, 222, 93)), to(rgb(25, 145, 29))); */
  border-radius: 5px;
}
</style>