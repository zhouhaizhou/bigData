<template>
  <div class="wrap">
    <sel-con  :condition="condition" :isFirst="isFirst" :timeInterval="timeInterval" v-on:selectedCon="selectedCon"></sel-con>
    <div class="main">
      <div class="icon">
        <div class="print" @click="print"></div>
        <div class="download" @click="download"></div>
      </div>
      <div class="imgCon">
        <transition>
          <div class="img" @click="showImg" :style="style"></div>
        </transition>
      </div>
      <right class="right" :times="times" :selectIndex="condition.times.length-1" v-on:selShowImg="selShowImg"></right>
    </div>
    <dialog-img v-on:handleClose="handleClose" :height="height" :dialogVisible="dialogVisible" :imgPath="imgPath" :width="width"></dialog-img>
  </div>
</template>

<script>
import selCon from "./selCon.vue";
import right from "./right";
import dialogImg from "./dialogImg";
export default {
  components: {
    selCon,
    right,
    dialogImg
  },
  data() {
    return {
      dialogVisible: false,
      imgPath: "",
      width: "",
      height: "",
      style: {},
      condition: {},
      times:[],
      timeInterval: null,
      isFirst: true //是否第一次请求后台数据
    };
  },
  mounted() {
    this.getData("", "", "", "", "");
    
  },
  methods: {
    getData(Station, type, startTime, endTime, interTime) {
      let self = this;
      if( typeof startTime==='object'){
        startTime=this._global.formatDate(startTime,"yyyy-MM-dd hh:mm:ss");
      }
     if(typeof startTime==='object'){
        endTime=this._global.formatDate(endTime,"yyyy-MM-dd hh:mm:ss");
      }
      this.axios
        //.get("/v2/book/1220562"
        .get("GetImageProducts.svc/GetImageProducts", {
          params: {
            EntityName: "CimissRain",
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
          
          if (self.isFirst) {
            self.isFirst=false;
            self.condition = data;
            self.timeInterval = self.condition.intervalOpt[0]["key"];
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
      let imagePath = document.querySelector(".img").style.backgroundImage;
      imagePath = imagePath.replace('url("', "").replace('")', "");
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
      let img = document.querySelector(".img").style.backgroundImage;
      img = img.replace('url("', "").replace('")', "");
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
      this.style = {
        background: "url(" + url + ") no-repeat top center"
      };
    },
    selectedCon(con) {
      let area = con.area;
      let type = con.type;
      let startTime = con.startTime;
      let endTime = con.endTime;
      this.getData(area, type, startTime, endTime, "");
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
  height: 85.5vh;
  float: left;
  margin-left: 2vw;
  background-size: contain !important;
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