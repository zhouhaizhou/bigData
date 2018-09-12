<template>
  <div class="header">
    <el-row>
      <el-col :span='10' :offset='4' class="left">
        <div class="item">
          <img src="../../assets/img/tianqi.png" style="vertical-align:-1px;" alt="天气">
          <span class="temp">{{temp}}</span>
          <span class="weather">{{weather}}</span>
        </div>
        <div class="item">
          <img src="../../assets/img/location.png" style="vertical-align:-4px;" alt="位置">
          <span ref="LocalCity"></span>
          <span>位置:</span>
          <span class="local">{{localCity}}</span>
        </div>
        <div class="item">
          <img src="../../assets/img/time.png" style="vertical-align:-4px;" alt="时间">
          <span>日期:</span>
          <span class="date">{{date}}</span>
          <span class="week">{{week}}</span>
        </div>
      </el-col>
      <el-col :span='6' class="right" offset='2'>
        <div class="item">
          <span style="margin-right: 25px;cursor:pointer;" @click="goCart">
            <img src="../../assets/img/xiazai.png" style="vertical-align: sub;" alt="">
            <span>我的下载清单</span>
          </span>
          <el-button type="primary" round size="mini" class="btn" @click="register">注册</el-button>
          <el-button round class="btn" size="mini">登录</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset='4' :span='4' class="left">
        <img src="../../assets/img/title.png" style="vertical-align:-25px;margin-left:-24px;" alt="标题">
      </el-col>
      <el-col :span='4' class="right" offset='8'>
        <el-input type='text' v-model="inputKey" placeholder="输入关键字" suffix-icon="el-icon-search"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="21" :offset="2">
        <el-tabs v-model="page" @tab-click="handleClick($event)" :before-leave="brforeLeave" @mouseover.native="mouseover" @mouseout.native="mouseout">
          <el-tab-pane :label="option.meta.name" :name="option.name" v-for="(option,index) in topbarMenu" :key='index'>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="el-tabs__hover-bar"></div>
      </el-col>
    </el-row>
    <el-row :class="nav">
      <el-col :span="24"></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { setDefaultRoute } from "../../utils/recursion-router.js";
export default {
  data() {
    return {
      page: "",
      temp: "",
      weather: "",
      local: "",
      date: "",
      week: "",
      inputKey: ""
    };
  },
  computed: {
    ...mapState(["topbarMenu", "permissionList", "sidebarMenu", "localCity"]),
    nav() {
      if (this.page === "home") {
        return "navColorhome";
      } else {
        return "navColor";
      }
    }
  },
  watch: {
    $route: {
      handler(val) {
          this.page = val.path.split('/')[1];
      },
      deep: true
    }
  },
  mounted() {
    this.headerInit();
    this.page = this.$router.currentRoute.path.split("/")[1];
  },
  methods: {
    ...mapActions(["FETCH_PERMISSION"]),
    ...mapMutations(["SETLOCALCITY"]),
    brforeLeave(activeName, oldActiveName) {
      if (activeName == "statistics") {
        window.open("statistics.html");
        return false;
      } else {
        return true;
      }
    },
    headerInit() {
      this.temp = "16/23°";
      (this.weather = "多云转晴"),
        this.getLocal(),
        (this.date = this._global.formatDate(new Date(), "yyyy-MM-dd")),
        this.getWeek();
      //console.log(this);
    },
    mouseover(evt) {
      let lNum = 20;
      let wNum = 40;
      let obj = evt.target;
      if (obj.id.indexOf(this.page) < 0) {
        document.querySelector(".el-tabs__active-bar").style.opacity = "0";
        document.querySelector(".el-tabs__hover-bar").style.opacity = "1";
      } else {
        document.querySelector(".el-tabs__hover-bar").style.opacity = "0";
        document.querySelector(".el-tabs__active-bar").style.opacity = "1";
      }
      let margetLeft = document.querySelector(".el-tabs").offsetLeft;
      let activeObj = document.querySelector(".el-tabs__active-bar");
      let activeW = activeObj.clientWidth;
      let width = obj.clientWidth;
      let left = obj.offsetLeft + margetLeft;
      let targetObj = document.querySelector(".el-tabs__hover-bar");
      if (obj.id.indexOf("home") > 0) {
        lNum = 0;
      } else {
        lNum = 20;
      }
      if (obj.id.indexOf("about") > 0 || obj.id.indexOf("home") > 0) {
        wNum = 20;
      } else {
        wNum = 40;
      }
      targetObj.style.left = left + lNum + "px";
      targetObj.style.width = width - wNum + "px";
    },
    mouseout(evt) {
      let obj = evt.target;
      document.querySelector(".el-tabs__active-bar").style.opacity = "1";
      document.querySelector(".el-tabs__hover-bar").style.opacity = "0";
    },
    getLocal() {
      if (this.localCity == "") {
        var self = this;
        var Local = this.$refs.LocalCity;
        var map = new BMap.Map(Local);
        function myFun(result) {
          var cityName = result.name;
          map.setCenter(cityName);
          let para = { city: cityName };
          self.SETLOCALCITY(cityName);
          //self.localCity = cityName;
        }
        var myCity = new BMap.LocalCity();
        myCity.get(myFun);
      }
    },
    getWeek() {
      var mydate = new Date();
      var myddy = mydate.getDay(); //获取存储当前日期
      var weekday = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
      this.week = weekday[myddy];
    },
    handleClick(ev) {
      if (ev.$parent.value == this.page) {
        return;
      }
      this.$router.push({ name: this.page });
    },
    register() {
      this.$router.push("/register");
    },
    goCart() {
      this.$router.push("/cart");
    }
  }
};
</script>

<style scoped>
.item {
  float: left;
  margin-left: 30px;
}
.left .item:first-child {
  margin-left: 0;
}
.right .item {
  float: right;
}
.header {
  width: 100%;
  line-height: 40px;
  position: relative;
}
.header >>> .el-tabs__header {
  margin: 0 0 0px;
}
.header .el-row:first-child {
  border-bottom: 1px solid #ccc;
}
.header .el-row:nth-child(2) {
  line-height: 68px;
}
.btn {
  padding-left: 20px;
  padding-right: 20px;
}
.item .el-button + .el-button {
  margin-left: 40px;
}
.header .right >>> .el-input__inner {
  border-radius: 20px;
  height: 30px;
}
.header >>> .el-tabs__nav-wrap::after {
  background-color: none;
  opacity: 0;
}
.header >>> .el-tabs__active-bar {
  background-color: white;
  height: 4px;
  transition: all 0.5s;
}
.header >>> .el-tabs__item.is-active {
  color: white !important;
}
/* .header >>> .el-tabs__item:hover {
  text-shadow: 1px 3px 5px #00ff78;
} */
.header >>> .el-tabs__item {
  color: white;
  font-weight: bold;
  width: 12vw;
  text-align: center;
  height: 51px;
  line-height: 50px;
  font-size: 18px;
}

.navColor {
  width: 100%;
  height: 50px;
  background: url("../../assets/img/title2.png") no-repeat center center;
  background-size: cover;
  position: absolute;
  top: 110px;
  left: 0;
}
.navColorhome {
  width: 100%;
  height: 50px;
  background: url("../../assets/img/title1.png") no-repeat center center;
  background-size: cover;
  position: absolute;
  top: 110px;
  left: 0;
}
.el-tabs__hover-bar {
  background-color: white;
  height: 4px;
  position: absolute;
  bottom: -1px;
  left: 0;
  transition: all 0.5s;
  list-style: none;
  z-index: 1;
}
</style>