<template>
  <div class="header">
    <el-row>
      <el-col :span='10' :offset='4' class="left">
        <div class="item">
          <img src="../../../src/assets/img/tianqi.png" style="vertical-align:-1px;" alt="天气">
          <span class="temp">{{temp}}</span>
          <span class="weather">{{weather}}</span>
        </div>
        <div class="item">
          <img src="../../../src/assets/img/location.png" style="vertical-align:-4px;" alt="位置">
          <span ref="LocalCity"></span>
          <span>位置:</span>
          <span class="local">{{local}}</span>
        </div>
        <div class="item">
          <img src="../../../src/assets/img/time.png" style="vertical-align:-4px;" alt="时间">
          <span>日期:</span>
          <span class="date">{{date}}</span>
          <span class="week">{{week}}</span>
        </div>
      </el-col>
      <el-col :span='4' class="right" offset='2'>
        <div class="item">
          <el-button type="primary" round size="mini" class="btn" @click="register">注册</el-button>
          <el-button round class="btn" size="mini">登录</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset='4' :span='4' class="left">
        <img src="../../../src/assets/img/title.png" style="vertical-align:-25px;margin-left:-24px;" alt="标题">
      </el-col>
      <el-col :span='4' class="right" offset='8'>
        <el-input type='text' v-model="inputKey" placeholder="输入关键字" suffix-icon="el-icon-search"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="4">
        <el-tabs v-model="$route.name" @tab-click="handleClick" >
          <el-tab-pane :label="option.CName" :name="option.name" v-for="option in options" :key='option.name'></el-tab-pane>
          <!-- <el-tab-pane label="数据服务" name="dataService" :name="options.route"></el-tab-pane>
          <el-tab-pane label="在线展示" name="onlineDisplay" :name="options.route"></el-tab-pane>
          <el-tab-pane label="相关成果" name="relateResult" :name="options.route"></el-tab-pane>
          <el-tab-pane label="用户支持" name="userSupport" :name="options.route"></el-tab-pane>
          <el-tab-pane label="关于我们" name="about" :name="options.route"></el-tab-pane> -->
        </el-tabs>
        
      </el-col>
      <keep-alive>
          <router-view></router-view>
        </keep-alive>
    </el-row>
    <el-row class="navColor">
      <el-col :span="24"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      temp: "",
      weather: "",
      local: "",
      date: "",
      week: "",
      inputKey: "",
      activeName: "home",
      options:[
        {
          name: "home",
          path: "/home",
          CName:"首页",
          component: "../components/pages/header.vue"
        },
        {
          name: "dataService",
          path: "/dataService",
          CName:"数据服务",
          component: "../components/pages/dataService.vue"
        },
        {
          name: "onlineDisplay",
          path: "/onlineDisplay",
          CName:"在线展示",
          component: "../components/pages/onlineDisplay.vue"
        },
        {
          name: "relateResult",
          path: "/relateResult",
          CName:"相关成果",
          component: "../components/pages/relateResult.vue"
        },
        {
          name: "userSupport",
          path: "/userSupport",
          CName:"用户支持",
          component: "../components/pages/userSupport.vue"
        },
        {
          name: "about",
          path: "/about",
          CName:"关于我们",
          component: "../components/pages/about.vue"
        }

      ]
    };
  },

  mounted() {
    this.headerInit();
  },
  methods: {
    headerInit() {
      this.temp = "16/23°";
      (this.weather = "多云转晴"),
        this.getLocal(),
        (this.date = this._global.formatDate(new Date(), "yyyy-MM-dd")),
        this.getWeek();
        console.log(this);
    },
    getLocal() {
      var self = this;
      var LocalCity = this.$refs.LocalCity;
      var map = new BMap.Map(LocalCity);
      function myFun(result) {
        var cityName = result.name;
        map.setCenter(cityName);
        self.local = cityName;
      }
      var myCity = new BMap.LocalCity();
      myCity.get(myFun);
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
      var p=ev.name;
      this.$router.push(p);
    },
    register(){
      this.$router.push('register');
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
.header >>> .el-tabs__header{
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
  color: black;
}
.header >>> .el-tabs__item {
  color: white;
  font-weight: bold;
  width: 35%;
  text-align: center;
  height: 50px;
  line-height: 50px;
}

.navColor {
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
}
</style>