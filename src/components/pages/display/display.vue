<template>
  <div class="wrap">
    <sel-con  :condition="condition" :isFirst="isFirst" v-on:selPlayInterval="selPlayIntervalFun" :playInterval="playInterval" v-on:selectedCon="selectedCon"></sel-con>
    <div class="main">
      <div class="icon">
        <div class="print" @click="print"></div>
        <div class="download" @click="download"></div>
      </div>
      <div  class="img">
          <!-- <div class="img" :style="style"></div> -->
          <img :src="style" style="height:80vh"  class="loadImg" alt="">
          <!-- <div class="img" @click="showImg" :style="style"></div> -->
      </div>
      <right class="right" :times="times" :selPlayInterval="selPlayInterval" v-on:selShowImg="selShowImg"></right>
    </div>
    <dialog-img v-on:handleClose="handleClose" :height="height" :dialogVisible="dialogVisible" :imgPath="imgPath" :width="width"></dialog-img>
  </div>
</template>

<script>
import selCon from "./selCon.vue";
import right from "./right";
import dialogImg from "./dialogImg";
import {mapMutations} from 'vuex'
export default {
  components: {
    selCon,
    right,
    dialogImg
  },
  watch:{
    $route:{
      handler(val){
        this.condition={},  //路由发生变化说明进入另一个页面，对应这些变量要初始化
        this.time=[],
        this.isFirst=true;
        this.selPlayInterval=null;
        this.playInterval=null;
        this.getData("", "", "", "", "");
      }
    },
    deep:true
  },
  data() {
    return {
      dialogVisible: false,
      imgPath: "",
      width: "",
      height: "",
      style: null,
      condition: {},
      times:[],
      playInterval: null,
      isFirst: true, //是否第一次请求后台数据
      selPlayInterval:null
    };
  },
  mounted() {
    this.getData("", "", "", "", "");
  },
  methods: {
    ...mapMutations(["SETSELECTEDTIME"]),
    getData(Station, type, startTime, endTime, interTime) {
      let self = this;
      let entityName=this.$route.name;
      this.SETSELECTEDTIME(-1);
      this.axios
        .get("GetImageProducts.svc/GetImageProducts", {
          params: {
            EntityName: entityName,
            Station: Station,
            type: type,
            bTime: startTime,
            eTime: endTime,
            interTime: interTime
          }
        })
        .then(response => {
          let data = eval("(" + response.data + ")");
          self.times=data.times;
          self.SETSELECTEDTIME(self.times.length-1)
          if (self.isFirst) {
            self.isFirst=false;
            if(data.endTime=='WRF'){
              data.endTime="";
            }
            self.condition = data;
            self.playInterval = self.condition.intervalOpt[0]["key"];
            self.calImgWidth();
          }
        })
        .catch(response => {
          console.log(response);
          this.calImgWidth();
        });
    },
    calImgWidth() {
      let main = document.querySelector(".wrap").offsetWidth;
      let iconW = document.querySelector(".icon").offsetWidth;
      let timeW = document.querySelector(".rTime").offsetWidth;
      let imgW = main - iconW - timeW - main * 0.15;
      document.querySelector(".img").style.width = imgW + "px";
    },
    creatImg() {
      let imagePath = document.querySelector(".loadImg").src;
      var img = document.createElement("img");
      img.src = imagePath;
      return img;
    },
    print() {
      let img = this.creatImg();
      let newContent = img.outerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML = oldContent;
      return false;
    },
    download() {
      let img = document.querySelector(".loadImg").src;
      let a = document.createElement("a");
      a.download = img;
      a.href = img;
      a.click();
    },
    showImg() {
      let w = document.querySelector(".img").offsetWidth;
      let h = document.querySelector(".img").offsetHeight;
      this.width = w + 35 + "px";
      this.height = h - 200 + "px";
      this.dialogVisible = true;
      this.imgPath = this.creatImg().src;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    selShowImg(url) {
      // this.style = {
      //   background: "url(" + url + ") no-repeat top center"
      // };
      this.style=url;
    },
    selectedCon(con) {
      let area = con.area;
      let type = con.type;
      let startTime = con.startTime;
      let endTime = con.endTime;
      this.getData(area, type, startTime, endTime, "");
    },
    selPlayIntervalFun(val){
      this.selPlayInterval=val;
    }
  }
};
</script>

<style scoped>
.main {
  padding-left: 3vh;
  overflow: hidden;
  margin-top: 5px;
}
.icon {
  float: left;
}

.img {
  width: 52vw;
  /* height: 85.5vh; */
  float: left;
  margin-left: 2vw;
  background-size: contain !important;
  text-align: center;
}
.right {
  float: right;
  margin-right: 3vw;
}
.print {
  background: url("../../../assets/img/display/dayin-n.png") no-repeat center
    center;
  width: 3vw;
  height: 7vh;
  cursor: pointer;
  transition: 0.5s;
}
.print:hover {
  background: url("../../../assets/img/display/dayin-d.png") no-repeat center
    center;
}
.download {
  background: url("../../../assets/img/display/xiazai-n.png") no-repeat center
    center;
  width: 3vw;
  height: 7vh;
  /* margin-top: 20px; */
  cursor: pointer;
  transition: 0.5s;
}
.download:hover {
  background: url("../../../assets/img/display/xiazai-d.png") no-repeat center
    center;
}
.el-message-box__content {
  margin-top: 10px;
}
.wrap {
  background-color: white;
  width: 99%;
  margin-bottom: 6vh;
  padding-bottom: 6vh;
}
</style>