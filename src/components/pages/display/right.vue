<template>
  <div class="rTime">
    <div class="title">时间序列</div>
    <div class="timewrap">
      <div class="time" :class="{active:selectIndex === index}" @click="selImg(index)" :img="t.url" v-for="(t,index) in times">{{t.time}}</div>
    </div>
    <el-row>
      <el-col :span="24" class="control">
        <div style="float:left;width:55%;margin-left:5%;">
          <el-select v-model="playSpeed">
            <el-option v-for="(s,index) in speed" :label="s.label" :value="s.value" :key="index">
            </el-option>
          </el-select>
        </div>
        <div style="width: 96%;height: 100%;">
          <span class="pre same" @click="pre"></span>
          <span class="same" :class="{play:playStatus===1,pause:playStatus===0}" @click="clickPlay"></span>
          <span class="next same" @click="next(1,'next')"></span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:['times','selPlayInterval'],
  computed:{
    ...mapState(['selectedTime'])
  },
  data() {
    return {
      playStatus: 0, //0表示暂停，1表示播放
      speed: [
        { label: "1X", value: "800" },
        { label: "2X", value: "500" },
        { label: "3X", value: "200" }
      ],
      playSpeed: "800",
      timer: null,
      selectIndex: -1,
      webProduct:null
    };
  },
  mounted() {
    //this.selectIndex=this.times.length-1;
    this.webProduct = process.env.PRODUCT_PATH;
  },
  watch: {
    selectedTime(val){
      this.selectIndex=this.selectedTime;
    },
    selectIndex(val) {
      let temp = this.times[val].url;
      let path = this.webProduct + temp;
      this.$emit("selShowImg", path);
    }
  },
  methods: {
    selImg(index) {
      this.selectIndex = index;
    },
    pre() {
      if (this.selectIndex === 0) {
        this.selectIndex = this.times.length;
      }
      this.selectIndex--;
      this.pause();
    },
    next(interval,status) {
      if (this.selectIndex >= this.times.length - 1) {
        this.selectIndex = -1;
      }
      this.selectIndex=this.selectIndex+parseInt(interval);
      if(status==='next'){
        this.pause();
      }
    },
    clickPlay() {
      if (this.playStatus === 1) {
        // this.playStatus = 0;
        // clearInterval(this.timer);
        this.pause();
      } else {
        this.playStatus = 1;
        this.play();
      }
    },
    play() {
      let self=this;
      this.timer = setInterval(() => {
        this.next(self.selPlayInterval,'play');
      }, this.playSpeed);
    },
    pause(){
      this.playStatus = 0;
      clearInterval(this.timer);
    }
  }
};
</script>

<style scoped>
.timewrap::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 7px;
}
.timewrap::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 100px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgb(9, 157, 220);
}
.timewrap::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  background: #ededed;
}
.timewrap {
  border: 1px solid #ccc;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.rTime {
  width: 280px;
}
.time,
.title {
  text-align: center;
  line-height: 45px;
}
.title {
  background-color: rgb(90 171 216);
  color: white;
}
.timewrap {
  height: 69vh;
  overflow: auto;
}
.time {
  cursor: pointer;
  transition: all 0.5s;
  overflow: auto;
}
.time:hover,
.active {
  color: #3f9ddd;
  background-color: rgb(231, 238, 244);
}
.control {
  border: 1px solid #ccc;
  border-radius: 10px;
  /* display: flex;
  justify-content: space-around; */
      display: flex;
    align-items: center;
}
.same {
  width: 48px;
  height: 5vh;
  /* display: table-cell; */
  float: left;
  cursor: pointer;
  transition: all 0.5s;
}
.pre {
  background: url("../../../assets/img/display/tui-n.png") no-repeat center
    center;
  margin-left: 5%;
}
.pre:hover {
  background: url("../../../assets/img/display/tui-d.png") no-repeat center
    center;
}
.pause {
  background: url("../../../assets/img/display/zanting-n.png") no-repeat center
    center;
  margin-top: 1px;
}
.pause:hover {
  background: url("../../../assets/img/display/zanting-d.png") no-repeat center
    center;
  /* margin-top: 0; */
}
.play {
  background: url("../../../assets/img/display/bofang-n.png") no-repeat center
    center;
}
.play:hover {
  background: url("../../../assets/img/display/bofang-d.png") no-repeat center
    center;
}
.next {
  background: url("../../../assets/img/display/jin-n.png") no-repeat center
    center;
}
.next:hover {
  background: url("../../../assets/img/display/jin-d.png") no-repeat center
    center;
}
.control >>> .el-input__icon {
  width: 15px;
  line-height: 20px;
}
.control >>> .el-input--suffix .el-input__inner {
  padding-right: 15px;
  padding-left: 15px;
  border-radius: 30px;
  color: rgb(9, 157, 220);
  height: 4.3vh;
}
</style>