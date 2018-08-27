<template>
    <div>
        <div class="province-city-wrap">

            <div class="provinces-title-wraps float-left">
                <div class="provinces-title-wrap">
                    <div class="positon-title-wrap">
                        <div class="position-pic"></div>
                        <div class="position-title font-style12">台站选择</div>
                    </div>

                </div>

                <div class="province-wrap float-left sites-wrap-province">
                    <div v-for="province in provinces" class="province" ><div  class="province-cur" :class="{'cur':provinceChecked==province.provinceCode}" @click="getCityData(province)">{{province.provinceName}}</div></div>
                </div>

            </div>

            <div class="arrow-wrap float-left">
                <div class="arrow"></div>
            </div>

            <div class="province-sites float-left">

                <div class="sites-div-wrap">
                    <div class="checkAll">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    </div>

                    <div class="sites-wrap">

                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>

                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
// var resData = ""; //向后台请求一次，将数据保存到前台，以便获取省市和站点都用此变量，直接遍历此变量就行

var  cityOptions=[];

var cityOptions = [
        "[58361]闵行",
        "[58367]徐家汇",
        "[58361]闵行",
        "[58367]浦东",
        "[58361]长宁",
        "[58367]普陀",
        "[58361]嘉定",
        "[58367]杨浦",
        "[58361]崇明",
        "[58367]青浦",
        "[58361]宝山",
        "[58367]松江",
        "[58361]虹口",
        "[58367]静安",
        "[58361]金山",
        "[58367]奉贤",
        "[58361]黄埔",
        "[58367]徐家汇",
        "[58361]闵行",
        "[58367]徐家汇",
        "[58361]闵行",
        "[58367]徐家汇"
      ];

export default {
  props:[
    "moduleEnName"
  ],
  data() {
    return {
      provinces: [],
     
    //   cities: [],
      checkAll: false,
      checkedCities: ["[58367]徐家汇"],
      cities: cityOptions,
      isIndeterminate: true,
      provinceChecked:'310000'
    };
  },
  mounted() {
    this.getAllData();
     this.getCityData({
            provinceName:"上海市",
            provinceCode:'310000'
          }); //暂时隐藏
  },
  methods: {
    getAllData() {
      let self = this;
      this.axios.get("DataService.svc/GetProvince").then(response => {
        //需要接收父组件传过来的参数去后台查询相应的省市和站点
       let resData = eval("(" + response.data + ")");
        var provincesArr = [];
        for (var i = 0; i < resData.length; i++) {
           provincesArr[i]={
            provinceName:resData[i].province,
            provinceCode:resData[i].provinceCode,
            provinceAllName:resData[i].provinceData
          };
          // self.provinces.push(resData[i].province);
          // self.provinceCode.push(resData[i].provinceCode);
          //   provincesArr[i] = resData[i].province;
        }
         self.provinces = provincesArr;
      }).catch(response => {
          console.log(response);
        });
    },
    getCityData(province) {
      // //点击省份，改变provinceChecked
     this.provinceChecked=province.provinceCode
     let self=this;

     var provinceAllName=province.provinceAllName;//作为参数传给后台

this.axios.get("DataService.svc/getSubTitle",{
  params:{
DataType:moduleEnName,
Provinces:provinceAllName
  }
}).then(response => {
        //需要接收父组件传过来的参数去后台查询相应的省市和站点
      let  resData = eval("(" + response.data + ")");
        var stationArr = [];
        for (var i = 0; i < resData.length; i++) {
           stationArr[i]={
             stationId:resData[i].stationId,
             stationName:"闵行"//后台待添加
          };
        
        }
         self.cities
      }).catch(response => {
          console.log(response);
        });

      //点击省份，请求城市
      for(var i=0;i<resData.length;i++){
          if(province.provinceName==resData[i].province){
              // self.cities=resData[i].adminName;//直接将点击省份对应的城市显示出来，默认显示上海的  在mounted中 getCityData("上海市");
              // cityOptions=resData[i].adminName;
              //测试
              cityOptions=["[58361]虹口","[58367]静安",
        "[58361]金山",
        "[58367]奉贤"];
        self.cities=["[58361]虹口","[58367]静安",
        "[58361]金山",
        "[58367]奉贤"];
          }
      }

    
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll =
        checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 &&
        checkedCount < this.cities.length;
    }
  }
};
</script>

<style scoped>
.province-city-wrap {
  width: 100%;
  height: 96%;
}
.provinces-position-wrap {
  float: left;
  height: 38%;
  padding-left: 5%;
  padding-right: 0%;
  padding-top: 0.5%;
}
.provinces-title-wraps {
  width: 46%;
  height: 100%;
}
.provinces-title-wrap {
  height: 14%;
  float: left;
  width: 100%;
  padding-top: 0.5vh;
}
.positon-title-wrap {
  height: 2vh;
  float: left;
  width: 50%;
}
.position-pic {
  background: url("../../../assets/img/modal/position.png") no-repeat center
    center;
  width: 17%;
  height: 2vh;
  float: left;
}
.position-title {
  padding-left: 20%;
}
.all-select-wrap {
  float: right;
  width: 53px;
  height: 18px;
}
.all-select-wrap input {
  float: left;
  margin-right: 7px;
}
.all-select-name {
}
.provinces-wrap {
  height: 77%;
  float: left;
  width: 100%;
  background-color: #f9fbfb;
  border: solid #8080802b 0.5px;
  overflow: hidden;
  padding-bottom: 1vh;
}
.province-wrap {
  width: 97%;
  height: 100%;
  padding-left: 3%;
  padding-top: 2%;
}
.province {
  width: 14%;
  padding-left: 2.5%;
  padding-top: 2.1%;
  padding-right: 2.5%;
  float: left;
  color: #5476b7;
  /* transform: scale(0.9,0.9); */
  font-weight: bold;
  text-align: center;
}
.province-cur{
  cursor: pointer;
}
.cur{
  background-color: #10be8f;
}
.arrow-wrap {
  width: 12%;
  height: 100%;
}
.arrow {
  width: 100%;
  height: 100%;
  background: url("../../../assets/img/modal/jiantou2.png") no-repeat center
    center;
}
.province-sites {
  width: 42%;
  height: 99%;
}
.site-title {
  height: 17%;
}
.sites-wrap-province {
  height: 77%;
  float: left;
  width: 96.5%;
  background-color: #f9fbfb;
  border: solid #8080802b 0.5px;
  overflow: hidden;
}
.site-radio-font-wrap {
}
.radio-wrap {
  float: left;
  margin-right: 3%;
}
.float-left {
  float: left;
}

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
  height: 73%;
  padding: 3% 5% 4% 5%;
  float: left;
  border: solid #8080802b 0.5px;
  overflow: overlay;
}
/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
.sites-wrap::-webkit-scrollbar {
  width: 5px;

  background-color: #f5f5f5;
}
/*定义滚动条轨道
 内阴影+圆角*/
.sites-wrap::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: #f5f5f5;
}
/*定义滑块
 内阴影+圆角*/
.sites-wrap::-webkit-scrollbar-thumb {
  background-color: #099ad7;
  /* background-image: -webkit-gradient(linear, 40% 0%, 75% 84%, from(rgb(77, 156, 65)), color-stop(0.6, rgb(84, 222, 93)), to(rgb(25, 145, 29))); */
  border-radius: 5px;
}

.sites-wrap >>> .el-checkbox + .el-checkbox {
  margin-left: 0px;
}
.sites-wrap >>> .el-checkbox {
  margin-right: 8%;
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




