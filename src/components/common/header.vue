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
          <span style="margin-right: 25px">
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
      <el-col :span="20" :offset="4">
        <el-tabs v-model="page" @tab-click="handleClick($event)">
          <el-tab-pane :label="option.meta.name" :name="option.name" v-for="(option,index) in topbarMenu" :key='index'></el-tab-pane>
        </el-tabs>
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
      inputKey: "",
      options: [
        {
          name: "home",
          path: "/home",
          CName: "首页"
        },
        {
          name: "dataService",
          path: "/dataService",
          CName: "数据服务"
        },
        {
          name: "display",
          path: "/display",
          CName: "在线展示"
        },
        {
          name: "relateResult",
          path: "/relateResult",
          CName: "相关成果"
        },
        {
          name: "userSupport",
          path: "/userSupport",
          CName: "用户支持"
        },
        {
          name: "about",
          path: "/about",
          CName: "关于我们"
        }
      ]
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
  mounted() {
    this.headerInit();
    this.page = this.$router.currentRoute.name;
    this.activeName = this.$router.currentRoute.name;
  },
  methods: {
    ...mapActions(["FETCH_PERMISSION"]),
    ...mapMutations(["SETLOCALCITY"]),
    headerInit() {
      this.temp = "16/23°";
      (this.weather = "多云转晴"),
        this.getLocal(),
        (this.date = this._global.formatDate(new Date(), "yyyy-MM-dd")),
        this.getWeek();
      //console.log(this);
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
      this.page = ev.name;
      //var p = ev.name;
      this.$router.push({ name: this.page });
      //this.$router.push(p);
    },
    register() {
      this.$router.push("/register");
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
}
.header >>> .el-tabs__item.is-active {
  color: white !important;
}
.header >>> .el-tabs__item:hover {
 text-shadow: 1px 3px 5px #00ff78;
}
.header >>> .el-tabs__item {
  color: white;
  font-weight: bold;
  width: 35%;
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
}

.navColor {
  width: 100%;
  height: 50px;
  /* background: linear-gradient(
    to right,
    rgb(195, 220, 240) -6%,
    rgb(1, 152, 217) 29%,
    rgb(195, 220, 240) 126%
  ); */
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
/* .navColorhome {
  width: 100%;
  height: 50px;
  background: linear-gradient(
    to right,
    rgb(68, 120, 155) 5%,
    rgb(1, 152, 217) 85%,
    rgb(195, 220, 240) 98%
  );
  position: absolute;
  top: 110px;
  left: 0;
} */
</style>