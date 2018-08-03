<template>
  <div>
    <my-header></my-header>
    <div class="center">
      <div class="item-tr-wrap" v-for="item in items">
        <div class="item-wrap">
          <div class="sub-title-wrap">
            <div class="nav-marker"></div>
            <div class="sub-title">{{item.name}}</div>
          </div>
          <div class="lists-wrap">
            <div class="list-wrap" v-for="(list,index) in item.lists" @mouseout="mouseout" @mouseover="mouseover">
              <div class="list-img" :style="{backgroundImage:'url('+list.imgurl+')',backgroundRepeat:'no-repeat',backgroundPosition:'center center',backgroundSize:'cover'}"></div>
              
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
          </div>
        </div>
      </div>

    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import myHeader from "../../common/header";
import myFooter from "../../common/foot";
export default {
  components: {
    myHeader,
    myFooter
  },
  data() {
    return {
      items: [
        {
          name: "地面气象资料",
          lists: [
            {
              imgurl: require("../../../assets/img/dataService/dmqx11.png"),
              title: "中国地面气象站逐小时资料",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379"
            },
            {
              imgurl: require("../../../assets/img/dataService/dmqx12.png"),
              title: "中国地面气象资料日值数据集",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379"
            },
            {
              imgurl: require("../../../assets/img/dataService/dmqx13.png"),
              title: "中国地面气象资料月值数据集",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379"
            },
            {
              imgurl: require("../../../assets/img/dataService/dmqx14.png"),
              title: "中国地面气象资料年值数据集",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379"
            },
            {
              imgurl: require("../../../assets/img/dataService/dmqx21.png"),
              title: "CIMISS中国地面逐小时资料",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379"
            },
            {
              imgurl: require("../../../assets/img/dataService/dmqx22.png"),
              title: "CIMISS中国地面日值资料",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379"
            },
            {
              imgurl: require("../../../assets/img/dataService/dmqx23.png"),
              title: "CIMISS中国地面月值资料",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379"
            },
            {
              imgurl: require("../../../assets/img/dataService/dmqx24.png"),
              title: "CIMISS中国地面年值资料",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379"
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
              likesCount: "379"
            },
            {
              imgurl: require("../../../assets/img/dataService/fs12.png"),
              title: "中国辐射月值数据库",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379"
            },
            {
              imgurl: require("../../../assets/img/dataService/fs13.png"),
              title: "中国辐射年值数据库",
              viewCount: "3688",
              commentCount: "9",
              likesCount: "379"
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
    mouseout(env){
      env.currentTarget.classList.remove('hover');
    },
     mouseover(env){
      env.currentTarget.classList.add('hover');
    }
  }
};
</script>

<style scoped>
.center {
  background-color: #f3f8fc;
  margin-left: 20vw;
  /* width: 80vw; */
}
.item-tr-wrap {
  clear: both;
  padding-top: 4vh;
  margin-left: 1vw;
  height: 45vh;
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
  width: 84vw;
}
.list-wrap {
  float: left;
  width: 16vw;
  height: 34vh;
  margin-right: 2vw;
  /* border: solid 1px; */
  border-radius: 3%;
  box-shadow: 0px 0px 1px 1.5px #80808038;
  background-color: #fffffd;
  margin-top: 3vh;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s;
}
.hover{
  transform: scale(1.08);
}
.list-img {
  /* width: 14.5vw; */
  height: 24vh;
  margin: 4%;
}

.list-title {
  margin-left: 4%;
  text-align: left;
  font-weight: bold;
  margin-bottom: 1vh;
}
.list-marker-wrap {
  margin-left: 4%;
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
  background: url("../../../assets/img/dataService/comment.png") no-repeat center
    center;
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
</style>