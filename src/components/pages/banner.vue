<template>
  <div>
    <div class="bg">
      <!-- <my-polygon></my-polygon> -->
      <div class="module">
        <div class="_module" :class="{select:modul.hoverModule,unselect:!modul.hoverModule}" ref="_module" v-for="modul in modules" :style="{top:modul.top+'px',left:modul.left+'px'}" @mouseover="mouseover(modul)" @mouseout="mouseout(modul)">
          <p v-html="modul.txt"></p>
        </div>
      </div>
      <div class="title">
        <div class="cname">
          <span ref="cname">污染天气大数据</span>
        </div>
        <div class="line" ref="line"></div>
        <div class="ename">
          <span>METEOROLOGICAL BIG DATA</span>
        </div>
        <div class="icon">
          <div>
            <img src="../../../static/img/tubiao.png" alt="">
          </div>
          <div style="margin-top: 15px;">
            <img src="../../../static/img/jiantou.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myPolygon from "./polygon.vue";
export default {
  components: {
    myPolygon
  },
  data() {
    return {
      modules: [
        {
          txt: "地面气象</br>资料",
          top: 82,
          left: -118,
          hoverModule: false
        },
        {
          txt: "辐射资料",
          top: 4,
          left: 14,
          hoverModule: false
        },
        {
          txt: "大气成分<br/>资料",
          top: 158,
          left: 15,
          hoverModule: false
        },
        {
          txt: "高空气象</br>资料",
          top: 236,
          left: -117,
          hoverModule: false
        },
        {
          txt: "八大数据</br>共享模块",
          top: 80,
          left: 149,
          hoverModule: false
        },
        {
          txt: "卫星探测</br>资料",
          top: 4,
          left: 284,
          hoverModule: false
        },
        {
          txt: "数值预报</br>产品",
          top: 159,
          left: 282,
          hoverModule: false
        },
        {
          txt: "雷达探测</br>资料",
          top: 83,
          left: 415,
          hoverModule: false
        },
        {
          txt: "综合观测</br>数据",
          top: 237,
          left: 414,
          hoverModule: false
        }
      ]
    };
  },
  mounted() {
    this.$refs._module[4].style.background =
      "url('../../../static/img/zongti.png') no-repeat center center";
    let width = this.$refs.cname.offsetWidth;
    let left = this.$refs.cname.offsetLeft;
    let top = this.$refs.cname.offsetTop;
    this.$refs.line.style.left = left + "px";
    this.$refs.line.style.width = width + "px";
    this.$refs.line.style.top = top + 55 + "px";
  },
  methods: {
    mouseout(modul) {
      modul.hoverModule = false;
    },
    mouseover(modul) {
      modul.hoverModule = true;
    }
  }
};
</script>

<style scoped>
.bg {
  position: relative;
  width: 100%;
  height: 759px;
  background: url('../../../static/img/bg.png') no-repeat center center;
}
.title {
  float: left;
  width: 100%;
  margin-top: 530px;
  color: white;
  font-size: 16px;
  text-align: center;
  position: relative;
}
.title span {
  margin: 0;
  font-weight: bold;
}
.title .cname {
  font-size: 36px;
}
.title .ename {
  font-size: 21px;
  margin-top: 20px;
}
.line {
  height: 1px;
  background-color: white;
  position: absolute;
}
.icon{
  margin-top: 25px;
}
.icon img{
  cursor: pointer;
}
.unselect {
  background: url("../../../static/img/xuanze-n.png") no-repeat center center;
}
.select {
  background: url("../../../static/img/xuanze-d.png") no-repeat center center;
}

.module {
  position: absolute;
  width: 30%;
  height: 400px;
  top: 90px;
  left: 0;
  right: 0;
  margin: 0 auto;
}
._module {
  width: 173px;
  height: 150px;
  position: absolute;
  cursor: pointer;
  transition: all 0.5s;
}
._module p {
  text-align: center;
  padding-top: 53px;
  margin: 0;
  font-size: 18px;
  color: white;
}
</style>