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
          <div v-for="province in provinces" class="province">
            <div class="province-cur" :class="{'cur':provinceChecked==province.provinceCode}" @click="getCityData(province)">
              {{province.provinceName}}</div>
          </div>
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
              <el-checkbox v-for="city in cities" :label="city" :key="city" :title="city">{{city}}</el-checkbox>
            </el-checkbox-group>

          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  props: ["moduleEnName","isShow"],
  data() {
    return {
      provinces: [],
      checkedProvince: {
        provinceName: "上海市",
        provinceAllName: "上海市"
      },

      //   cities: [],
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: false,//默认去掉蓝色横杠
      provinceChecked: "310000",
      cityOptions: [],
      province: "",
      provinceData: "",
      citySite: "",
      citySiteDetail: ""
    };
  },
  watch: {
    moduleEnName() {
      if (this.moduleEnName != "") {
        this.getAllData();
        this.getCityData({
          provinceName: "上海市",
          provinceCode: "310000",
          provinceAllName: "上海市",
          isFirst: true
        }); //暂时隐藏
        this.deafultProvince(); //更新默认城市
      }
    },
    isShow() {
      //监听
      if (this.isShow == false) {
        this.isIndeterminate = false; //弹框关闭时，全选按钮恢复初始状态
        this.checkAll=false;//刚进来时，将上次勾选的全选对勾去掉

      } else {
        //  this.isIndeterminate = false;//弹框显示时，默认选中后台返回数据中的第一个要素
      }
    }
  },
  mounted() {
     this.getAllData();
        this.getCityData({
          provinceName: "上海市",
          provinceCode: "310000",
          provinceAllName: "上海市",
          isFirst: true
        }); //暂时隐藏
        this.deafultProvince(); //更新默认城市
  },
  methods: {
    deafultProvince() {
      let self = this;
      let provinceObj = {
        province: self.checkedProvince.provinceName,
        provinceData: "上海市"
      };
      //向父组件传值
      this.$emit("getParams", provinceObj);

    },
    getAllData() {
      let self = this;
      this.axios
        .get("DataService.svc/GetProvince")
        .then(response => {
          //需要接收父组件传过来的参数去后台查询相应的省市和站点
          let resData = eval("(" + response.data + ")");
          var provincesArr = [];
          for (var i = 0; i < resData.length; i++) {
            provincesArr[i] = {
              provinceName: resData[i].province,
              provinceCode: resData[i].provinceCode,
              provinceAllName: resData[i].provinceData
            };
            // self.provinces.push(resData[i].province);
            // self.provinceCode.push(resData[i].provinceCode);
            //   provincesArr[i] = resData[i].province;
          }
          self.provinces = provincesArr;
        })
        .catch(response => {
          console.log(response);
        });
    },
    getCityData(province) {
      //点击省份，改变provinceChecked
      this.provinceChecked = province.provinceCode;
      let self = this;
      //获取点击的省份
      self.province = province.provinceName;
      self.provinceData = province.provinceAllName;
      let provinceObj = {
        province: self.province,
        provinceData: self.provinceData
      };
      let isFirst = province.isFirst == true ? province.isFirst : false;
      //默认省份或点击省份，向父组件传省份值
      this.$emit("getParams", provinceObj);

      var provinceAllName = province.provinceAllName; //作为参数传给后台

      this.axios
        .get("DataService.svc/GetStationByDataType", {
          params: {
            DataType: this.moduleEnName, //待修改为this.moduleEnName，先用固定值代替
            Provinces: "'" + provinceAllName + "'"
          }
        })
        .then(response => {
          //需要接收父组件传过来的参数去后台查询相应的省市和站点
          let resData = eval("(" + response.data + ")");

          self.cityOptions = [];
          this.checkedCities = []; //点击下一个省份之前清空上一个省份点击的城市站点
          self.cities = [];
          for (var i = 0; i < resData.length; i++) {
            self.cityOptions.push(
              "[" + resData[i].StationId + "]" + resData[i].Station_Name
            );
            self.cities.push(
              "[" + resData[i].StationId + "]" + resData[i].Station_Name
            );
          }
          if (isFirst) {//默认选中返回城市数据中的第一个  如果再次点击省份，由于点击省份对象中没有isFirst，上面定义的isFirst就为false，不执行选中功能
            let defaultV = self.cities[0];
            this.checkedCities = [defaultV];
            //获取默认勾选的城市站点,将其传给父组件
            this.getCheckedCitiesParams();
          }
        })
        .catch(response => {
          console.log(response);
        });

    },
    getCheckedCitiesParams() {
      //解析勾选的城市站点，传给父组件
      let checkedCitie = this.checkedCities;
      // var checkedCitieArr=checkedCitie.join(",");//将数组转化成字符串
      var ids = [];
      var sites = [];
      for (var i = 0; i < checkedCitie.length; i++) {
        ids.push(checkedCitie[i].replace(/[^0-9]/gi, ""));
        sites.push(checkedCitie[i].match(/\](.*)/)[1]);
      }
      this.citySite = ids.join();
      this.citySiteDetail = sites.join();

      let cityObj = {
        citySite: this.citySite,
        citySiteDetail: this.checkedCities.join()
      };
      //向父组件传城市站点值
      this.$emit("getCityParams", cityObj);
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cityOptions : [];
      this.isIndeterminate = false;
      this.getCheckedCitiesParams(); //更新选中的站点
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      // this.isIndeterminate =
      //   checkedCount > 0 && checkedCount < this.cities.length;

      this.getCheckedCitiesParams(); //更新选中的站点
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
    color: #3d6b84;
    font-weight: bold;
    font-size: 14.5px;
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
  color: #606266;
  /* transform: scale(0.9,0.9); */
  font-weight: bold;
  text-align: center;
}
.province-cur {
  cursor: pointer;
}
.cur {
  background-color: #439ced;
  color: white;;
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
.checkAll >>> .el-checkbox__label {
  font-size: 14.5px;
}
.sites-wrap {
  width: 89%;
  height: 73%;
  padding: 3% 5% 4% 5%;
  float: left;
  border: solid #8080802b 0.5px;
  overflow-y: overlay;
  overflow-x: hidden;
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
  width: 50%;
  padding-top: 3%;
}
.sites-wrap >>> .el-checkbox__label {
  display: inline-block;
  padding-left: 10px;
  line-height: 19px;
  font-size: 14.5px;
  width: 76%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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




