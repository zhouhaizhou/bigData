<template>
    <div class="sites-div-wrap">
        <div class="checkAll">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        </div>

        <div class="sites-wrap">
            <!-- <div class="site-radio-font-wrap" v-for="(site,index) in citySites" :key="index">
                <div class="radio-wrap"><input type="radio"></div>
                <div class="site">{{site}}</div>
            </div> -->

            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>

        </div>
    </div>

</template>


    <script>
const cityOptions = [
  //父组件传过来省市的名称，子组件到数据库中查询相对应的省市站点
  "[58361]闵行",
  "[58367]徐家汇",
  "[58361]闵行",
  "[58367]徐家汇",
  "[58361]闵行",
  "[58367]徐家汇",
  "[58361]闵行",
  "[58367]徐家汇",
  "[58361]闵行",
  "[58367]徐家汇",
  "[58361]闵行",
  "[58367]徐家汇",
  "[58361]闵行",
  "[58367]徐家汇",
  "[58361]闵行",
  "[58367]徐家汇",
  "[58361]闵行",
  "[58367]徐家汇",
  "[58361]闵行",
  "[58367]徐家汇",
  "[58361]闵行",
  "[58367]徐家汇"
];
export default {
  components: {},

  data() {
    return {
      citySites: [
        //父组件传过来省市的名称，子组件到数据库中查询相对应的省市站点
        "[58361]闵行",
        "[58367]徐家汇",
        "[58361]闵行",
        "[58367]徐家汇",
        "[58361]闵行",
        "[58367]徐家汇",
        "[58361]闵行",
        "[58367]徐家汇",
        "[58361]闵行",
        "[58367]徐家汇",
        "[58361]闵行",
        "[58367]徐家汇"
      ],
      checkAll: false,
      checkedCities: ["[58367]徐家汇"],
      cities: cityOptions,
      isIndeterminate: true
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.modalData[0].dataDownLoad[0].element.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.modalData[0].dataDownLoad[0].element.length;
    }
  }
};
</script>

    <style scoped>
.sites-div-wrap {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.checkAll {
  float: right;
  height: 15%;
}
.sites-wrap {
  height: 86%;
  padding: 3% 5% 4% 5%;
  float: left;
  border: solid #8080802b 0.5px;
      overflow: overlay;
}
/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
.sites-wrap::-webkit-scrollbar
{
    width:5px;
    
    background-color:#F5F5F5;
}
/*定义滚动条轨道
 内阴影+圆角*/
.sites-wrap::-webkit-scrollbar-track
{
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
    border-radius:5px;
    background-color:#F5F5F5;
}
/*定义滑块
 内阴影+圆角*/
.sites-wrap::-webkit-scrollbar-thumb
{
        background-color: #099AD7;
    /* background-image: -webkit-gradient(linear, 40% 0%, 75% 84%, from(rgb(77, 156, 65)), color-stop(0.6, rgb(84, 222, 93)), to(rgb(25, 145, 29))); */
    border-radius: 5px;
}

.sites-wrap >>> .el-checkbox + .el-checkbox {
  margin-left: 0px;
}
.sites-wrap >>> .el-checkbox {
  margin-right: 10%;
  padding-top: 3%;
}
.site-radio-font-wrap {
  width: 50%;
  padding-top: 2%;
  float: left;
}
.radio-wrap {
  float: left;
  margin-right: 5px;
}
.site {
  font-size: 1.8em !important;
}
</style>
