<template>
  <div>
    <div>

      <div class="center">
        <div class="items-trs-wrap">

          <div class="item-tr-wrap" v-for="(img,index) in imges">
            <div class="item-wrap">
              <div class="sub-title-wrap">
                <div class="nav-marker"></div>
                <div class="sub-title" :nameEn="img.nameAbbr">{{img.name}}</div>
              </div>
              <div class="lists-wrap">
                <div class="list-wrap" v-for="(list,index2) in img.lists" @mouseout="mouseout" @mouseover="mouseover">
                  <div class="list-img" :style="{backgroundImage:'url('+ list.imgurl+')',backgroundRepeat:'no-repeat',backgroundPosition:'center center',backgroundSize:'cover'}" @mouseover="showContent(list)" @click="showModal(img,list,index,index2)">
                    <div class="info-wrap">
                      <div class="info-font">{{imgInfoes[index].lists[index2].imgInfo}}</div>
                    </div>
                  </div>

                  <div class="list-title">{{titles[index].lists[index2].title}}</div>
                  <div class="list-marker-wrap">
                    <div class="view-wrap">
                      <div class="view-icon" src=""></div>
                      <div class="view-count">{{counts[index].lists[index2].viewCount}}</div>
                    </div>
                    <div class="comment-wrap">
                      <div class="comment-icon" src=""></div>
                      <div class="comment-count">{{counts[index].lists[index2].commentCount}}</div>
                    </div>
                    <div class="likes-wrap">
                      <div class="likes-icon" src=""></div>
                      <div class="likes-count">{{counts[index].lists[index2].likesCount}}</div>
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
      <my-modal @hidden="hiddenShow" :modalData="modalData" :famatOptions="famatOptions" :famatValue="famatValue" :timeType="timeType" :timeTypeValue="timeTypeValue" :startTimes="startTimes" :endTimes="endTimes"></my-modal>
    </div>
  </div>
</template>

<script>
import myHeader from "../../common/header";
import myFooter from "../../common/foot";
import myModal from "./modal";

export default {
  components: {
    myHeader,
    myFooter,
    myModal
  },
  data() {
    return {
      isShow: false,

      imges: null,
      titles: null,
      counts: null,
      imgInfoes: null,

      //将请求到的生成modal弹框的数据通过属性标签传给子组件，子组件通过props接收数据
      modalData: null,
      famatOptions: null,
      famatValue: null,
      timeType: null,
      timeTypeValue: null,
      startTimes: null,
      endTimes: null
    };
  },
  mounted() {
    this.getAllData();
  },
  watch: {
    //监听路由变化

    $route(to, from) {
      console.log(to, from);

      //  to , from 分别表示从哪跳转到哪，都是一个对象

      // to.path   ( 表示的是要跳转到的路由的地址 eg:  /home );
    }
  },
  methods: {
    clear: function() {
      var para1 = this.$refs.splitLine[this.$refs.splitLine.length - 1];
      para1.parentNode.removeChild(para1);
    },
    showContent: function(list) {
      //鼠标悬浮图片时显示的文字内容，不悬浮时，不请求显示
      // alert(list);
      // console.log(list);
    },
    mouseout(env) {
      // env.currentTarget.classList.remove("hover");
    },
    mouseover(env) {
      // env.currentTarget.classList.add("hover");
    },
    getAllData() {
      //初始加载和路由监听事件时，执行此方法
      var self = this;
      //获取当前路由的父名称
      let pName = self.$route.meta.parentEntityName; //当点击左侧子路由时，获取父路由名称给后台
      // console.log(list);

      this.axios({
        //.get("./static/modalData.json")
        method: "get",
        baseURL: "",
        url: "./static/dataDownLoad.json"
      })
        .then(response => {
          // let data = eval("(" + response.data + ")");
          let data = response.data;
          for (let index = 0; index < data.imges.length; index++) {
            let lists=data.imges[index].lists;
            for (let i = 0; i < lists.length; i++) {
              lists[i].imgurl =require("../../../assets/img"+lists[i].imgurl);
              //lists[i].imgurl =require("../../../assets/img/dataDownLoad/dmqx11.png");
            }
          }
          self.imges = data.imges;
          //this.proData(self.imges);

          self.titles = data.titles;
          self.counts = data.counts;
          self.imgInfoes = data.imgInfoes;
        })
        .catch(response => {
          console.log(response);
        });
    },
    // proData(data) {
    //   for (var key in data) {
    //     let val = data[key];
    //     if (key == "imgurl") {
    //       val = require("../../../assets/img/" + val + "");
    //      // val = val.default;
    //     }
    //     data[key] = typeof val === "object" ? this.proData(val) : val;
    //   }
    // },
    showModal(img, list, index, index2) {
      var self = this;
      //获取当前路由的父名称
      let pName = self.$route.meta.parentEntityName;
      //获取当前图片属于哪个子路由
      // let ptitle=img.nameAbbr;
      //获取当前点击的是哪个图片
      // let thisIndex=index2;//先用数组中的索引  如果后台指定了每个图片的唯一标识（例如，数据下载-地面气象资料下的小时图片），就获取图片标识传给后台进行请求
      console.log(index);
      console.log(index2);
      // console.log(list);
      self
        .axios({
          //.get("./static/modalData.json")
          method: "get",
          baseURL: "",
          url: "./static/modalData.json"
        })
        .then(function(response) {
          //获取当前点击

          self.isShow = true; //显示弹出框
          // var data = eval("(" + response.data + ")");
          var data = response.data;
          self.modalData = data.modalData;
          self.famatOptions = data.famatOptions;

          self.famatValue = data.famatValue;
          self.timeType = data.timeType;
          self.timeTypeValue = data.timeTypeValue;
          self.startTimes = data.startTimes;
          self.endTimes = data.endTimes;
        })
        .catch(function(response) {
          console.log(response); //发生错误时执行的代码
        });
    },
    hiddenShow() {
      //更改modal弹出框隐藏（传给子组件一个点击事件）
      let that = this; //为了避免this指向出现歧义，把vue实例的this赋值给另一个变量再使用
      that.isShow = false;
    }
  }
};
</script>

<style scoped>
.center {
  background-color: #f3f8fc;
  /* margin-left: 20vw; */
  /* width: 80vw; */
}
.items-trs-wrap {
  padding-bottom: 3vh;
}
.item-tr-wrap {
  clear: both;
  padding-top: 2vh;
  margin-left: 1vw;
  /* height: 45vh; */
}
.item-wrap {
  /* height: 40vh; */
}
.sub-title-wrap {
}
.item-tr-wrap .list-wrap:last-child {
  margin-bottom: 3vh;
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
.lists-wrap {
  clear: both;
  text-align: center;
  width: 100%;
}
.list-wrap {
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
  width: 14.1vw;
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
  font-weight: bold;
  margin-bottom: 1vh;
  font-size: 1em;
}
.list-marker-wrap {
  margin-left: 6%;
  text-align: left;
  color: #bbbbbb;
}
.view-wrap {
  float: left;
  width: 5vw;
}
.view-icon {
  background: url("../../../assets/img/dataDownLoad/view.png") no-repeat center
    center;
  width: 1.5vw;
  height: 2vh;
  float: left;
}
.view-count {
}
.comment-wrap {
  float: left;
  width: 3vw;
}
.comment-icon {
  background: url("../../../assets/img/dataDownLoad/comment.png") no-repeat
    center center;
  width: 1.5vw;
  height: 2vh;
  float: left;
}
.comment-count {
}
.likes-wrap {
  float: left;
  width: 5vw;
}
.likes-icon {
  background: url("../../../assets/img/dataDownLoad/likes.png") no-repeat center
    center;
  width: 1.5vw;
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
}
</style>