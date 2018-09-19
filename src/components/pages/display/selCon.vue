<template>
  <div class="con">
    <el-row>
      <el-col :span="24">
        <span>区域：</span>
        <el-button @click="areaClickActive(index)" :class="{active:index===areaActive}" size="medium" v-for="(item,index) in condition.area" :key="index+'_area'">{{item}}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <span>类型：</span>
        <div style="display:none;">{{selectCon}}</div>
        <el-button v-model="typeActive" @click="typeClickActive(index)" :class="{active:index===typeActive}" size="medium" v-for="(item,index) in condition.type" :key="index+'_type'" v-html='item'></el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <span>时间：</span>
        <el-date-picker prefix-icon="1" value-format="yyyy-MM-dd HH:mm:ss" v-model="condition.startTime" clear-icon="close" type="datetime" align="left">
        </el-date-picker>
        <span class="date-suffix"></span>
        <i class="icon" v-if="condition.endTime!=''"></i>
        <el-date-picker v-if="condition.endTime!=''" value-format="yyyy-MM-dd HH:mm:ss" prefix-icon="1" v-model="condition.endTime" clear-icon="close" type="datetime" align="left">
        </el-date-picker>
        <span class="date-suffix" v-if="condition.endTime!=''"></span>
        <span style="margin-left: 10px;margin-right: 10px;vertical-align: middle;" >间隔</span>
        <el-select v-model="selPlayInterval">
          <el-option v-for="(item,index) in condition.intervalOpt" :key="index" :label="item.val" :value="item.key"></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      areaActive: 0,
      typeActive: 0,
      selPlayInterval:null
    };
  },
  props: ["condition", "playInterval", "isFirst"],
  computed: {
    selectCon() {
      let area = this.condition.area[this.areaActive];
      let type = this.condition.type[this.typeActive];
      let startTime = this.condition.startTime;
      let endTime = this.condition.endTime;
      this.$emit("selectedCon", {
        area: area,
        type: type,
        startTime: startTime,
        endTime: endTime
      });
    }
  },
  watch: {
     $route:{
      handler(val){
        this.areaActive= 0,
        this.typeActive= 0,
        this.selPlayInterval=null
      },
      deep:true
    },
    playInterval() {
      this.selPlayInterval = this.playInterval;
    },
    selPlayInterval(val){
      this.$emit('selPlayInterval',val);
    }
  },
  methods: {
    areaClickActive(index) {
      this.areaActive = index;
    },
    typeClickActive(index) {
      this.typeActive = index;
    }
  }
};
</script>

<style scoped>
.el-row {
  /* margin-top: 2vh; */
  padding: 3vh 0 0 2%;
}
.el-row:first-child {
  margin-top: 2vh;
}
.el-row:last-child {
  padding-bottom: 3vh;
}
.con >>> .el-date-editor .el-input__inner,
.con >>> .el-input__inner {
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
  padding-left: 0 !important;
}
.con >>> .el-date-editor .el-input__inner {
  border-radius: 0 !important;
}
.con >>> .el-select .el-icon-arrow-up:before {
  content: "\E60C";
}
.con >>> .el-select {
  width: 10%;
}
.con >>> .el-select .el-input__inner {
  text-align: center !important;
  border-radius: 0;
}
.con .icon {
  background: url("../../../assets/img/display/jiaohuan-n.png") no-repeat center
    center;
  width: 1.3vw;
  height: 2.3vh;
  display: inline-block;
  background-size: cover;
  vertical-align: -webkit-baseline-middle;
  margin-left: 10px;
  margin-right: 10px;
}
/* .con >>> .el-date-editor .el-input__suffix .el-input__icon:after {
  background: url("../../../assets/img/display/date-n.png") no-repeat center
    center;
  width: 1vw;
  height: 2vh;
  background-size: cover;
} */
.con >>> .date-suffix {
  background: url("../../../assets/img/display/date-n.png") no-repeat center
    center;
  width: 1vw;
  height: 2vh;
  background-size: cover;
  display:inline-block;
  position: relative;
  top: 5px;
  left: -35px;
}
.con >>> .el-button:focus,
.el-button:hover,
.active {
  color: white;
  border-color: rgb(9, 157, 220);
  background-color: rgb(9, 157, 220);
}
</style>