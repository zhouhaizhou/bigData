<template>
  <div>
    <div class="bg">
      <!-- <my-polygon></my-polygon> -->
      <div class="module" id="module">
        <div class="_module" :class="{select:modul.hoverModule,unselect:!modul.hoverModule}" ref="_module" v-for="modul in modules" :style="{top:modul.top+'vh',left:modul.left+'vw'}" @mouseover="mouseover(modul)" @mouseout="mouseout(modul)">
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
            <img src="../../assets/img/tubiao.png" alt="" @click="goAnchor">
          </div>
          <div style="margin-top: 15px;">
            <img src="../../assets/img/jiantou.png" alt="" @click="goAnchor">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modules: [
        {
          txt: "地面气象</br>资料",
          top: 8.5,
          left: -6.32,
          hoverModule: false
        },
        {
          txt: "辐射资料",
          top: 0,
          left: 0.75,
          hoverModule: false
        },
        {
          txt: "大气成分<br/>资料",
          top: 17,
          left: 0.7,
          hoverModule: false
        },
        {
          txt: "高空气象</br>资料",
          top: 25.3,
          left: -6.32,
          hoverModule: false
        },
        {
          txt: "八大数据</br>共享模块",
          top: 8.5,
          left: 7.8,
          hoverModule: false
        },
        {
          txt: "卫星探测</br>资料",
          top: 0,
          left: 14.85,
          hoverModule: false
        },
        {
          txt: "数值预报</br>产品",
          top: 17,
          left: 14.85,
          hoverModule: false
        },
        {
          txt: "雷达探测</br>资料",
          top: 8.5,
          left: 21.9,
          hoverModule: false
        },
        {
          txt: "综合观测</br>数据",
          top: 25.3,
          left: 21.95,
          hoverModule: false
        }
      ]
    };
  },

  mounted() {
    let zong =require('../../assets/img/zongti.png');
    this.$refs._module[4].style.background =
      "url("+zong+") no-repeat center center";
    this.$refs._module[4].style.backgroundSize="cover";
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
    },
    goAnchor(){
      this.$emit('goAnchor');
    }
  }
};
</script>

<style scoped>
.bg {
  position: relative;
  width: 100%;
  height: 84vh;
  background: url('../../assets/img/bg.png') no-repeat center center;
   background-size: cover;/*图片跟随div变化 */
}
.title {
  float: left;
  width: 100%;
  margin-top: 56vh;
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
  background: url("../../assets/img/xuanze-n.png") no-repeat center center;
  background-size: cover;/*图片跟随div变化 */
}
.select {
  background: url("../../assets/img/xuanze-d.png") no-repeat center center;
  background-size: cover;/*图片跟随div变化 */
}

.module {
  position: absolute;
  width: 25.5vw;
  height: 400px;
  top: 90px;
  left: 0;
  right: 0;
  margin: 0 auto;
}
._module {
  width: 9vw;
  height: 16vh;
  position: absolute;
  cursor: pointer;
  transition: all 0.5s;
}
._module p {
  text-align: center;
  padding-top: 28%;
  margin: 0;
  font-size: 1vw;
  color: white;
}
</style>