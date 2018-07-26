<template>
  <div>
    <my-header></my-header>
    <div class="user-register">用户注册</div>
    <div>引入图片</div>
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
      <div class="users-register-wrap-center">
        <!--循环-->
        <div class="user" v-for="user in users">
          <div class="img-wrap">{{user.img}}</div>
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
    </div>

  </div>
</template>

<script>
import myHeader from "../common/header.vue";
export default {
  components: {
    myHeader
  },
  data() {
    return {
      users: [
        {
          img: "引用图片路径",
          subtitle: "大气专项用户实名注册",
          content:
            "通过网络在线方式提交申请和注册。大气专项用户可在污染天气大数据平台浏览、查询和下载指定气象数据和产品",
          enter: "立即加入"
        },
        {
          img: "引用图片路径",
          subtitle: "教育科研实名注册",
          content:
            "通过网络在线方式申请和注册。教育科研注册用户可在污染天气大数据平台浏览、查询和下载中国气象最新公布的《基本气象资料和产品开放清单》",
          enter: "立即进入"
        },
        {
          img: "引用图片路径",
          subtitle: "单位实名注册",
          content:
            "通过网络在线方式申请和注册。单位实名祖册用户可在污染天气大数据平台浏览、查询和下载指定气象数据和产品",
          enter: "立即进入"
        }
      ]
    };
  },
  methods: {
    enter: function() {
      var mythis = this;
      console.log(mythis);
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
}
.sub-wrap {
  height: 11vh;
  display: flex;
}
.hr-wrap {
  width: 35%;
}
hr {
  position: relative;
  top: 35%;
  background-color: #03030329;
  color: red;
  border: none;
  height: 1px;
}
.text-wrap {
  width: 30%;
  font-size: 1.8em;
}
.text {
  line-height: 250%;
  color: #808080b3;
}
.users-register-wrap {
  height: 50vh;
  text-align: center;
}
.users-register-wrap-center {
  display: inline-block;
}

.user {
  float: left;
  border: 1px solid #d3d3d3c9;
  width: 42vh;
  height: 49vh;
  cursor: pointer;
  margin-left: 2vw;
  -webkit-transform: scale(0.8);
  -moz-transform: scale(0.8);
  -o-transform: scale(0.8);
  -webkit-transition-duration: 0.5s;
  -moz-transition-duration: 0.5s;
  -o-transition-duration: 0.5s;
  opacity: 0.7;
  margin: 0 10px 5px 0;
}
.user:hover {
  /* transform: scale(1.1); */
  -webkit-transform: scale(
    0.9
  ); /*Webkit: Scale up image to 1.2x original size*/
  -moz-transform: scale(0.9); /*Mozilla scale version*/
  -o-transform: scale(0.9); /*Opera scale version*/
  box-shadow: 0px 0px 20px gray; /*CSS3 shadow: 30px blurred shadow all around image*/
  -webkit-box-shadow: 0px 0px 20px gray; /*Safari shadow version*/
  -moz-box-shadow: 0px 0px 20px gray; /*Mozilla shadow version*/
  opacity: 1;
}
.img-wrap {
  height: 20vh;
}
.subtitle-wrap {
  font-weight: bold;
  font-size: 1.1em;
}
.content-wrap {
  height: 12vh;
}
.content {
  text-indent: 2em;
  margin: 6% 6% 0% 6%;
  font-size: 0.7em;
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
  font-size: 1em;
  line-height: 5vh;
  background-color: rgb(53, 152, 219);
  color: white;
}
</style>