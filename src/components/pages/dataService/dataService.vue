<template>
  <div>
    <div class="center">
      <div class="items-trs-wrap">

        <div class="item-tr-wrap" v-for="item in items">
          <div class="item-wrap">
            <div class="sub-title-wrap">
              <div class="nav-marker"></div>
              <div class="sub-title">{{item.name}}</div>
            </div>
            <div class="lists-wrap">
              <div class="list-wrap" v-for="(list,index) in item.lists" @mouseout="mouseout" @mouseover="mouseover">
                <div class="list-img" :style="{backgroundImage:'url('+list.imgurl+')',backgroundRepeat:'no-repeat',backgroundPosition:'center center',backgroundSize:'cover'}" @mouseover="showContent(list)" @click="showModal(list)">
                  <div class="info-wrap"><div class="info-font">{{list.imgInfo}}</div></div>
                </div>

                <div class="list-title">{{list.title}}</div>
                <div class="list-marker-wrap">
                  <div class="view-wrap">
                    <div class="view-icon" src=""></div>
                    <div class="view-count">{{list.viewCount}}</div>
                  </div>
                  <div class="comment-wrap">
                    <div class="comment-icon" src=""></div>
                    <div class="comment-count">{{list.commentCount}}</div>
                  </div>
                  <div class="likes-wrap">
                    <div class="likes-icon" src=""></div>
                    <div class="likes-count">{{list.likesCount}}</div>
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
</template>

<script>
import myHeader from "../../common/header";
import myFooter from "../../common/foot";

export default {
  components: {
    myHeader,
    myFooter,
    // myModal
  },
  data() {
    return {
      isShow:false,
      items: [
        {
          name: "地面气象资料",
          lists: [
            {
              imgurl: require("../../../assets/img/dataService/dmqx11.png"),
              title: "中国地面气象站逐小时资料",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379",
              imgInfo: "中国国家级地面站小时值数据,包括气温、气压、相对湿度、水汽压、风、降水量等要素小时观测值。",
              
            },
            {
              imgurl: require("../../../assets/img/dataService/dmqx12.png"),
              title: "中国地面气象资料日值数据集",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379",
              imgInfo: "中国地面气候资料日值数据集（V3.0）包含了中国824个基准、基本气象站1951年1月以来本站气压、气温、降水量、蒸发量、相对湿度、风向风速、日照时数和0cm地温要素的日值数据"
            },
            {
              imgurl: require("../../../assets/img/dataService/dmqx13.png"),
              title: "中国地面气象资料月值数据集",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379",
              imgInfo: "中国地面气候资料月值数据集 包含了中国824个基准、基本气象站1951年1月以来本站气压、气温、降水量、蒸发量、相对湿度、风向风速、日照时数和0cm地温要素的日值数据"
            },
            {
              imgurl: require("../../../assets/img/dataService/dmqx14.png"),
              title: "中国地面气象资料年值数据集",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379",
              imgInfo: "中国地面气候资料年值数据集 包含了中国824个基准、基本气象站1951年1月以来本站气压、气温、降水量、蒸发量、相对湿度、风向风速、日照时数和0cm地温要素的日值数据"
            },
            {
              imgurl: require("../../../assets/img/dataService/dmqx21.png"),
              title: "CIMISS中国地面逐小时资料",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379",
              imgInfo: "CIMISS中国地面逐小时资料"
            },
            {
              imgurl: require("../../../assets/img/dataService/dmqx22.png"),
              title: "CIMISS中国地面日值资料",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379",
              imgInfo: "CIMISS中国地面日值资料"
            },
            {
              imgurl: require("../../../assets/img/dataService/dmqx23.png"),
              title: "CIMISS中国地面月值资料",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379",
              imgInfo: "CIMISS中国地面月值资料"
            },
            {
              imgurl: require("../../../assets/img/dataService/dmqx24.png"),
              title: "CIMISS中国地面年值资料",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379",
              imgInfo: "CIMISS中国地面年值资料"
            }
          ]
        },

        {
          name: "辐射资料",
          lists: [
            {
              imgurl: require("../../../assets/img/dataService/fs11.png"),
              title: "中国辐射日值数据库",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379",
              imgInfo:"中国辐射日值数据库"
            },
            {
              imgurl: require("../../../assets/img/dataService/fs12.png"),
              title: "中国辐射月值数据库",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379",
              imgInfo:"中国辐射月值数据库"
            },
            {
              imgurl: require("../../../assets/img/dataService/fs13.png"),
              title: "中国辐射年值数据库",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379",
              imgInfo:"中国辐射年值数据库"
            }

          ]
        }
      ]
    };
  },
  mounted() {
    // this.clear();
  },
  methods: {
    clear: function() {
      var para1 = this.$refs.splitLine[this.$refs.splitLine.length - 1];
      para1.parentNode.removeChild(para1);
    },
    showContent: function(list) {
      // alert(list);
      // console.log(list);
    },
    mouseout(env) {
      // env.currentTarget.classList.remove("hover");
    },
    mouseover(env) {
      // env.currentTarget.classList.add("hover");
    },
    showModal(list){
      // console.log(list);
      // this.isShow=true;
    },
    closeModal(){
      // this.isShow=false;
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
  padding-top: 4vh;
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
  width: 14.5vw;
  height: 24vh;

  background-color: white;

  opacity: 0; /*不透明度：通过不透明度来实现层的隐藏效果    透明*/
  -webkit-transition: opacity 0.5s ease-in-out;
  -moz-transition: opacity 0.5s ease-in-out;
  -o-transition: opacity 0.5s ease-in-out;
  transition: opacity 0.5s ease-in-out;
}
.info-font{
      text-align: left;
    padding-left: 5%;
    margin-top: 1vh;
    line-height: 1.8;
}
.info-wrap:hover {
  background-color: white;
  opacity: 0.7; /*不透明度：通过不透明度来实现层的显示效果    显示 */
  filter: alpha(opacity=0.7);
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
  background: url("../../../assets/img/dataService/view.png") no-repeat center
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
  background: url("../../../assets/img/dataService/comment.png") no-repeat
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
  background: url("../../../assets/img/dataService/likes.png") no-repeat center
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
.modal-wrap{
width: 1000px;
height: 500px;
background-color:red;
}
</style>