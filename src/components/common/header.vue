<template>
  <div class="header">
    <el-row>
      <el-col :span='8' :offset='4' class="left">
        <div class="item">
          <img src="" height="" width="" alt="">
          <span class="temp">{{temp}}</span>
          <span class="weather">{{weather}}</span>
        </div>
        <div class="item">
          <img src="" height="" width="" alt="">
          <span ref="LocalCity">位置：</span>
          <span class="local">{{local}}</span>
        </div>
        <div class="item">
          <img src="" width="" height="" alt="">
          <span>日期：</span>
          <span class="date">{{date}}</span>
          <span class="week">{{week}}</span>
        </div>
      </el-col>
      <el-col :span='4' class="right" offset='4'>
        <div class="item">
          <el-button type="primary" round size="mini" class="btn">注册</el-button>
          <el-button round class="btn" size="mini">登录</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset='8' :span='4' class="left">
        <img src="" width="" height="" alt="">
      </el-col>
      <el-col :span='4' class="right" offset='4'>
        <el-input type='text' v-model="inputKey" placeholder="输入关键字" suffix-icon="el-icon-search"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="navColor"></div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-col>
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
            inputKey: ""
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
        }
    }
};
</script>

<style scoped>
.item {
    float: left;
    margin-left: 10px;
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
}
.header .el-row:first-child {
    border-bottom: 1px solid #ccc;
}
.header .el-row:nth-child(2) {
    line-height: 50px;
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
.navColor{
  width: 100%;
  height: 50px;
  background-color: purple;
  float: left;
}
</style>