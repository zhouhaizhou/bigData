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
