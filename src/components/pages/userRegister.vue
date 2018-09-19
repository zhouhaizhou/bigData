<template>
  <div>
    <my-header></my-header>
    <div class="user-register">用户注册</div>
    <div class="sub-img-wrap" style="">
      <div class="sub-img"></div>
    </div>
    <div class="sub-wrap">
      <div class="hr-wrap">
        <hr>
      </div>
      <div class="text-wrap">
        <div class="text">
          U&nbsp;S&nbsp;E&nbsp;R&nbsp;&nbsp; R&nbsp;E&nbsp;G&nbsp;I&nbsp;S&nbsp;T&nbsp;R&nbsp;A&nbsp;T&nbsp;I&nbsp;O&nbsp;N</div>
      </div>
      <div class="hr-wrap">
        <hr>
      </div>
    </div>
    <div class="users-register-wrap">

      <!--循环-->
      <div class="user" v-for="user in users" @mouseover="mouseOver(user)" @mouseout="mouseOut(user)">
        <div class="img-wrap" :style="{background:'url('+user.img+ ') no-repeat center center'}"></div>
        <div class="subtitle-wrap">
          {{user.subtitle}}
        </div>
        <div class="content-wrap">
          <div class="content">
            {{user.content}}
          </div>
        </div>
        <div class="enter-wrap" @click="enter()">
          <div class="enter">
            {{user.enter}}
          </div>
        </div>

      </div>

    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import myHeader from "../common/header.vue";
let img1 = "";
import myFooter from "../common/foot.vue";
export default {
  components: {
    myHeader,
    myFooter
  },
  data() {
    
    return {
      users: [
        {
          // img: "../../../src/assets/img/dqzxsmzc-n.png",
          // img1: require("../../assets/img/dqzxsmzc-n.png"),
          img: require("../../assets/img/dqzxsmzc-n.png"),
          imgHover: require("../../assets/img/dqzxsmzc-d.png"),
          subtitle: "大气专项用户实名注册",
          content:
            "通过网络在线方式提交申请和注册。大气专项用户可在污染天气大数据平台浏览、查询和下载指定气象数据和产品",
          enter: "立即加入"
        },
        {
          img: require("../../assets/img/jykysmzc-n.png"),
          imgHover: require("../../assets/img/jykysmzc-d.png"),
          subtitle: "教育科研实名注册",
          content:
            "通过网络在线方式申请和注册。教育科研注册用户可在污染天气大数据平台浏览、查询和下载中国气象最新公布的《基本气象资料和产品开放清单》",
          enter: "立即加入"
        },
        {
          img: require("../../assets/img/dwsmzc-n.png"),
          imgHover: require("../../assets/img/dwsmzc-d.png"),
          subtitle: "单位实名注册",
          content:
            "通过网络在线方式申请和注册。单位实名祖册用户可在污染天气大数据平台浏览、查询和下载指定气象数据和产品",
          enter: "立即加入"
        }
      ]
    };
  },
  methods: {
    enter: function() {
      var mythis = this;
      console.log(mythis);
    },
    mouseOver: function(u) {
      img1 = u.img;
      u.img = u.imgHover;
    },
    mouseOut(u) {
      u.img = img1;
    },
    defalutBg: function(user) {
      user.img = user.img;
    }
  }
};
</script>

<style scoped>
.user-register {
  margin-top: 3vh;
  height: 5vh;
  font-weight: bold;
  font-size: 1.8em;
  text-align: center;
}
.sub-img-wrap {
  width: 99vw;
  height: 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sub-img {
  background: url("../../assets/img/sub-img.png") no-repeat center center;
  width: 99vw;
  height: 1vh;
}
.sub-wrap {
  height: 7vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hr-wrap {
  width: 35%;
  /* display: flex;
justify-content: center;
align-items: center; */
}

.text-wrap {
  width: 30%;
  font-size: 1.8em;
  text-align: center;
}
.text {
  line-height: 250%;
  color: #808080b3;
}
.users-register-wrap {
  height: 54vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2vh;
}
.users-register-wrap-center {
  display: inline-block;
}

.user {
  float: left;
  border: 1px solid #d3d3d3c9;
  width: 22vw;
  height: 60vh;
  cursor: pointer;

  -webkit-transform: scale(0.8);
  -moz-transform: scale(0.8);
  -o-transform: scale(0.8);
  -webkit-transition-duration: 0.2s;
  -moz-transition-duration: 0.2s;
  -o-transition-duration: 0.2s;
  opacity: 0.7;
}
.user:hover {
  /* transform: scale(1.1); */
  -webkit-transform: scale(
    0.85
  ); /*Webkit: Scale up image to 1.2x original size*/
  -moz-transform: scale(0.85); /*Mozilla scale version*/
  -o-transform: scale(0.85); /*Opera scale version*/
  box-shadow: 0px 0px 20px gray; /*CSS3 shadow: 30px blurred shadow all around image*/
  -webkit-box-shadow: 0px 0px 20px gray; /*Safari shadow version*/
  -moz-box-shadow: 0px 0px 20px gray; /*Mozilla shadow version*/
  opacity: 1;
}
.img-wrap {
  height: 22vh;
}
.subtitle-wrap {
  font-weight: bold;
  font-size: 1.6em;
}
.content-wrap {
  height: 20vh;
}
.content {
  text-indent: 2em;
  margin: 6% 6% 0% 6%;
  font-size: 1.1em;
  text-align: left;
  line-height: 2;
}
.enter-wrap {
  height: 10vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.enter {
  width: 8vw;
  height: 5vh;
  font-size: 1.2em;
  line-height: 5vh;
  background-color: rgb(53, 152, 219);
  color: white;
}
</style>