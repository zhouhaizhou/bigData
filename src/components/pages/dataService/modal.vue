<template>
  <div>
    <div id="modal" class="body-background">
      <div class="modal-wraps">
        <div class="modal-wrap-left">
          <div class="top-wrap">
            <div class="top-font">{{moduleCnName}}</div>
          </div>
          <div class="middle-wrap">
            <div class="middle">
              <div class="middle-name-wrap">
                <span>资料内容</span>
              </div>
              <div class="middle-left-wrap">
                <div class="data-content padding-bottom">{{modalData[0].subTitle}}</div>
                <div class="data-start-time-wrap padding-bottom">
                  <div class="data-start-time-name float-left font-style1">数据起始时间：</div>
                  <div class="data-start-time-value font-style2">{{modalData[0].startTime}}</div>
                </div>
                <div class="data-end-time-wrap padding-bottom">
                  <div class="data-end-time-wrap-name float-left font-style1">数据终止时间：</div>
                  <div class="data-end-time-wrap-value font-style2">{{modalData[0].endTime}}</div>
                </div>
                <div class="update-wrap padding-bottom">
                  <div class="update-name float-left font-style1">更新频率：</div>
                  <div class="update-value font-style2">{{modalData[0].UpdateInter}}</div>
                </div>
                <div class="data-soure-wrap padding-bottom">
                  <div class="data-soure-name float-left font-style1">数据源：</div>
                  <div class="data-soure-value font-style2">{{modalData[0].dataSource}}</div>
                </div>
                <div class="share-wrap padding-bottom">
                  <div class="share-name float-left font-style1">共享级别：</div>
                  <div class="share-value font-style2">{{modalData[0].shareClassID}}</div>
                </div>

              </div>
              <div class="middle-right-wrap ">
                <div class="comments-wrap padding-bottom border-bottom">
                  <div class="comment-pic float-left icon-style1"></div>
                  <div class="comment-name float-left icon-font-style">评论</div>
                  <div class="comment-count">{{modalData[0].commentCount}}</div>
                </div>
                <div class="likes-wrap padding-bottom border-bottom">
                  <div class="likes-pic float-left icon-style1"></div>
                  <div class="likes-name float-left icon-font-style">收藏</div>
                  <div class="likes-count ">{{modalData[0].likesCount}}</div>
                </div>
                <div class="views-wrap padding-bottom border-bottom">
                  <div class="views-pic float-left icon-style1"></div>
                  <div class="views-name float-left icon-font-style">浏览量</div>
                  <div class="views-count ">{{modalData[0].viewCount}}</div>
                </div>
                <div class="share-wrap padding-bottom border-bottom">
                  <div class="share-pic float-left icon-style1"></div>
                  <div class=" icon-font-style share" style="padding-left: 28%;" >分享</div>
                </div>
              </div>
            </div>
          </div>
          <div class="foot-wrap">
              <div class="file-download-font">
              <span>资料下载</span>
            </div>
            <div class="date-all-wrap">
              <div class="date-wrap">
                <div class="date-pic" src="../../../assets/img/modal/date.png"></div>
                <div class="date-name font-style1">时间选择</div>
              </div>
              <div class="date-value">
                <div class="start-time">
                  <el-date-picker v-model="startTimes" class="time-time" type="datetime" format="yyyy-MM-dd HH" value-format="yyyy-MM-dd HH" clear-icon="close" prefix-icon="1" @focus="dateChange">
                  </el-date-picker>
                </div>
                <div class="dao font-style1">到</div>
                <div class="end-time">
                  <el-date-picker v-model="endTimes" class="time-time" type="datetime" format="yyyy-MM-dd HH" value-format="yyyy-MM-dd HH" clear-icon="close" prefix-icon="1" @focus="dateChange">
                  </el-date-picker>
                </div>
              </div>
            </div>
            <div class="provinces-position-wrap">

              <my-modal-provinces-pan ref="c1" v-on:getParams="getChildComProvinceParams" v-on:getCityParams="getChildComCityParams" :style="{height:'100%'}" :moduleEnName="moduleEnName"></my-modal-provinces-pan>

            </div>
            <div class="elements-select-wrap">
              <div class="element-select-title">
                <div class="element-select-wrap">
                  <div class="element-select-pic"></div>
                  <div class="element-select-name font-style12">要素选择</div>
                </div>

                <div class="all-select-wrap element-all-select-wrap-postion">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                </div>
              </div>

              <div class="element-content">
                <!-- <div class="element-radio-font-wrap" v-for="ele in modalData[0].dataDownLoad[0].element">
                  <div class="radio-wrap"><input type="radio"></div>{{ele}}</div> -->
                <el-checkbox-group v-model="checkedElements" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="(element,index) in elements" :label="index" :key="index">{{element.elementCnName}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="files-wrap">
              <div class="pic-file-wrap">
                <div class="file-pic"></div>
                <div class="file-name font-style12">文件选择</div>
              </div>
              <div class="famat-time-wrap">
                <div class="famat-name float-left">文件格式：</div>
                <div class="famat-value float-left">
                  <el-select v-model="famatValue" placeholder="请选择">
                    <el-option v-for="item in famatOptions" :key="item.label" :label="item.label" :value="item.label">
                    </el-option>
                  </el-select>
                </div>

                <div class="time-interval-name float-left">时间间隔：</div>
                <div class="time-interval-value float-left">
                  <el-input v-model="timeInput" @keyup.native="proving1" @blur="checkInputIsEmpty()" placeholder="请输入数字"></el-input>
                </div>
                <div class="time-interval-unit ">
                  <el-select v-model="timeValue" placeholder="请选择">
                    <el-option v-for="item in timeType" :key="item.value" :label="item.label" :value="item.label">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="btns-wrap">
              <div class="now-download-wrap" @click="nowDownLoad">
                <el-button type="success">直接下载</el-button>
              </div>
              <div class="add-in-car" @click="insertCart">
                <el-button type="primary">加入清单</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-wrap-right">
          <div class="close-wrap" @click="Hidden()">
            <i class="el-icon-close"></i>
          </div>
          <div class="download-lists-wrap">
            <div class="download-lists" @click="goCart()"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myModalProvincesPan from "./modalProvincesPan";
import { mapState } from "vuex";
export default {
  components: {
    myModalProvincesPan
  },
  props: ["moduleEnName", "moduleCnName", "isShow"],
  data() {
    return {
      elementCnName: "",
      modalData: [],
      UpdateInterValue: "",
      province: "",
      provinceData: "",
      citySite: "",
      citySiteDetail: "",
      checkAll: false,
      checkedElements: [],
      isIndeterminate: false,
      elements: [],
      elementCnNameArr: [],
      elementsIndexArr: [],
      famatOptions: [
        {
          value: "0",
          label: "txt"
        },
        {
          value: "1",
          label: "csv"
        }
      ],
      famatValue: "csv",
      timeInput: "1",
      timeValue: "天",
      timeType: [
        // {
        //   value: "0",
        //   label: "年"
        // },
        // {
        //   value: "1",
        //   label: "月"
        // },
        // {
        //   value: "2",
        //   label: "天"
        // }
      ],
      timeTypeValue: "",
      startTimes: "",
      endTimes: "" //this._global.formatDate(new Date(), "yyyy-MM-dd hh")将GMT时间格式转化为字符串形式的正常时间格式
    };
  },
  mounted() {

  },
  created() {
    // this.getTime();
  },
  computed: {
    ...mapState(["UserToken"])
  },
  watch: {
    moduleEnName() {
      if (this.moduleEnName != "") {
        //更新页面
        this.getFileContentData();
        this.elements = "";
        this.getElementData();
        this.getIntervalTime();//根据module的年月日设置时间间隔单位
      }
    },
    isShow() {
      //监听
      if (this.isShow == false) {
        this.isIndeterminate = false; //弹框关闭时，全选按钮恢复初始状态
      } else {
        //弹框显示时，默认选中后台返回数据中的第一个要素
      }
    }
  },
  methods: {
    /**
     * 修改elementUI中的样式，动态修改style
     */
        dateChange() {
      setTimeout(()=>{
          document.querySelectorAll(".has-time .el-time-spinner__wrapper")[1].style.display='none';
      },100);//由于获取焦点时动态生成时的div还没出来，所以设置延迟执行
      },
     /**
     *  获取资料对应的间隔时间
     */
    getIntervalTime() {
      let self = this;
      this.axios
        .get("DataService.svc/GetDataIntelTime", {
          params: {
            dataType: this.moduleEnName
            // moduleEnName: "hourData" //待修改为moduleEnName，先用固定值代替
          }
        })
        .then(response => {
          let resData = eval("(" + response.data + ")");
          let str = resData[0].IntervalTime;
          let Arr=str.split("、");
          let timeTypeArr=[];
        for(let i=0;i<Arr.length;i++){
          let obj={
          value: i,
          label: Arr[i]
        }
        timeTypeArr.push(obj);
        }
          self.timeType=timeTypeArr;
        })
        .catch(response => {
          console.log(response);
        });
    },
    /**
     *  获取数据表中的最新时间，赋值给结束时间
     */
    getLstTime() {
      let self = this;
      this.axios
        .get("DataService.svc/GetDataLastTime", {
          params: {
            dataType: this.moduleEnName
            // moduleEnName: "hourData" //待修改为moduleEnName，先用固定值代替
          }
        })
        .then(response => {
          let resData = eval("(" + response.data + ")");
          self.endTimes = this._global.formatDate(new Date((resData[0].collect_time)), "yyyy-MM-dd hh");
          self.defaultSetByModuleEnName();
        })
        .catch(response => {
          console.log(response);
        });
    },
     defaultSetByModuleEnName() {
      let hour = this.UpdateInterValue.indexOf("时"); //注意：数据库中配置时，年月日时，的命名采用要包含此处对应的字符
      let day = this.UpdateInterValue.indexOf("天");
      let day1 = this.UpdateInterValue.indexOf("日");
      let month = this.UpdateInterValue.indexOf("月");
      let year = this.UpdateInterValue.indexOf("年");
      if (hour != -1) {
        this.getTime("hour");
        this.timeValue = "天"; //去掉间隔单位“小时”，小时数据也用“天”单位
      } else if (day != -1 || day1 != -1) {
        this.getTime("day");
        this.timeValue = "月";
      } else if (month != -1) {
        this.getTime("month");
        this.timeValue = "年";
      } else if (year != -1) {
        this.getTime("year");
        this.timeValue = "年";//下载的时间间隔先默认为年   （待）
      } else {
        this.getTime("day");
        this.timeValue = "天";
      }
    },
    getTime(time) {
      const start = new Date(this.endTimes+":00:00");//将正常的字符串时间格式转化为GMT时间格式
      // this.endTimes = this._global.formatDate(new Date(), "yyyy-MM-dd hh");
      switch (time) {
        case "hour":
          start.setTime(start.getTime() - 3600 * 1000 * 1); //提前一小时
          this.startTimes = this._global.formatDate(start, "yyyy-MM-dd hh");
          break;
        case "day":
          start.setTime(start.getTime() - 3600 * 1000 * 24); //提前一天
          this.startTimes = this._global.formatDate(start, "yyyy-MM-dd hh");
          break;
        case "month":
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30); //提前一个月
          this.startTimes = this._global.formatDate(start, "yyyy-MM-dd hh");
          break;
        case "year":
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 12); //提前一年
          this.startTimes = this._global.formatDate(start, "yyyy-MM-dd hh");
          break;

        default:
          start.setTime(start.getTime() - 3600 * 1000 * 24); //提前一天    如果非年月日，就默认采用天
          this.startTimes = this._global.formatDate(start, "yyyy-MM-dd hh");
          break;
      }
    },
    getChildComProvinceParams(val) {
      this.province = val.province;
      this.provinceData = val.provinceData;
    },
    getChildComCityParams(val) {
      this.citySite = val.citySite;
      this.citySiteDetail = val.citySiteDetail;
    },
    goCart() {
      this.$router.push("/cart");
    },
    getFileContentData() {
      let self = this;
      this.axios
        .get("DataService.svc/getSubTitle", {
          params: {
            moduleEnName: this.moduleEnName //待修改为moduleEnName，先用固定值代替
            // moduleEnName: "hourData" //待修改为moduleEnName，先用固定值代替
          }
        })
        .then(response => {
          let resData = eval("(" + response.data + ")");
          self.modalData = resData;
          self.UpdateInterValue = self.modalData[0].UpdateInter; //将更新频率赋值给变量数据UpdateInterValue，用于设置默认时间

          // this.defaultSetByModuleEnName();//需要的变量生成后执行   解决axios不能同步
          self.getLstTime();
        })
        .catch(response => {
          console.log(response);
        });
    },
    getElementData() {
      let self = this;
      this.axios
        .get("DataService.svc/GetElement", {
          params: {
            DataType: this.moduleEnName //待修改为moduleEnName，先用固定值代替
            //DataType: "cimissHour" //待修改为moduleEnName，先用固定值代替
          }
        })
        .then(response => {
          let resData = eval("(" + response.data + ")");
          var elementsArr = [];
          self.elementCnNameArr = [];
          self.elementsIndexArr = [];
          for (var i = 0; i < resData.length; i++) {
            elementsArr[i] = {
              id: resData[i].id,
              elementCnName: resData[i].elementCn,
              elementEnName: resData[i].elementEn
            };
            self.elementCnNameArr.push(resData[i].elementCn);
            self.elementsIndexArr.push(i);
          }
          self.elements = elementsArr;

          this.checkedElements = [self.elementsIndexArr[0]]; //默认选中第一个要素
        })
        .catch(response => {
          console.log(response);
        });
    },
    nowDownLoad() {
      let account = this.UserToken.Account;
      if (account == "readearth") {
        alert("请登录后再下载数据！");
        return;
      }
      var data = this.getNowFormatDate();
      var nowTime = data.toString().replace(/[^0-9]/gi, "");

      //处理时间为数字字符串
      var startT = this.startTimes.replace(/[^0-9]/gi, "");
      var endT = this.endTimes.replace(/[^0-9]/gi, "");
      // alert(this.checkedElements);
      var checkedIndex = this.checkedElements;
      var eleObj = {
        eleEn: [],
        eleCn: []
      };
      if (checkedIndex.length != 0) {
        for (var i = 0; i < checkedIndex.length; i++) {
          eleObj.eleEn.push(
            this.elements[this.checkedElements[i]].elementEnName
          );
          eleObj.eleCn.push(
            this.elements[this.checkedElements[i]].elementCnName
          );
        }
      } else {
        eleObj.eleEn.push("");
        eleObj.eleCn.push("");
      }
      var eleEnStr = eleObj.eleEn.toString();
      var eleCnStr = eleObj.eleCn.toString();
      var timeIntervalStr = this.timeInput + this.timeValue;

      var comparTime = startT > endT;

      let hour = this.UpdateInterValue.indexOf("时");
      if (hour != -1) {
        let end = new Date(this.endTimes + ":00:00");
        let start = new Date(this.startTimes + ":00:00");
        let disTime = end.getTime() - start.getTime();
        if (disTime < 3600 * 1000 * 24 * 30 * 3) {
          //时间间隔小于三个月就不做处理
        } else {
          alert("时间间隔大于三个月，请重新选择");
          return;
        }
      }

      if (startT == "" || endT == "") {
        alert("选择的日期不能空！");
        return;
      } else if (comparTime == true) {
        alert("起始时间不能大于结束时间！");
        return;
      } else if (this.citySite == "" || this.citySiteDetail == "") {
        alert("请选择省市对应的站点！");
        return;
      } else if (eleEnStr == "" || eleCnStr == "") {
        alert("请选择要素！");
        return;
      } else {
        var obj = {
          userName: account,
          downTime: nowTime + "",
          moduleEnName: this.moduleEnName,
          date: startT + "0000-" + endT + "0000",
          province: this.province,
          provinceData: this.provinceData,
          citySite: this.citySite,
          citySiteDetail: this.citySiteDetail,
          elementEn: eleEnStr,
          elementCn: eleCnStr,
          famat: this.famatValue,
          timeInterval: timeIntervalStr,
          insertTime: nowTime,
          downState: "1",
          isDown: "1"
        };

        var objToStr = JSON.stringify(obj);
        //添加loading加载层
        const loading = this.$loading({
          lock: true,
          text: "正在请求数据...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });

        let self = this;
        this.axios
          .get("DataService.svc/insertDownList", {
            params: {
              funParams: objToStr
            },
            timeout: 1000 * 60 * 5
          })
          .then(res => {
            let data = res.data;
            loading.close();
            if (data != "ERROR") {
              let arr = JSON.parse(data);
              let a = document.createElement("a");
              let path = this._global.downPath;
              arr.result.forEach(element => {
                let fileName = element.zipDownUrl;
                let id = element.id;
                let fullPath = path + id + "/" + fileName;
                a.download = fileName;
                a.href = fullPath;
                a.click();
              });
            } else {
              alert("没有数据！");
            }
          })
          .catch(error => {
            console.log(error.data);
            // alert("下载失败");
            // console.log(error)
            var str = error + "";

            if (str.search("timeout") !== -1) {
              // 超时error捕获
              // self.showLoadMore = true
              // self.showLoadMoreOk = false
              alert("请求超时，起止时间过大，请缩小时间跨度");
            }
          });
      }
    },
    getSTime(val) {
      // var d = new Date(val);
      // this.startTimes = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()+'-'+d.getHours();
    },
    getETime(val) {
      // var d = new Date(val);
      // this.endTimes = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()+' '+d.getHours();
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;

      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }

      var strHour = date.getHours();
      if (strHour >= 0 && strHour <= 9) {
        strHour = "0" + strHour;
      }

      var strMin = date.getMinutes();
      if (strMin >= 0 && strMin <= 9) {
        strMin = "0" + strMin;
      }

      var strSec = date.getSeconds();
      if (strSec >= 0 && strSec <= 9) {
        strSec = "0" + strSec;
      }

      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        strHour +
        seperator2 +
        strMin +
        seperator2 +
        strSec;
      return currentdate;
    },
    insertCart() {
      let account = this.UserToken.Account;
      if (account == "readearth") {
        alert("请登录后再加入清单！");
        return;
      }
      var data = this.getNowFormatDate();
      var nowTime = data.toString().replace(/[^0-9]/gi, "");

      //处理时间为数字字符串
      var startT = this.startTimes.replace(/[^0-9]/gi, "");
      var endT = this.endTimes.replace(/[^0-9]/gi, "");
      // alert(this.checkedElements);
      var checkedIndex = this.checkedElements;
      var eleObj = {
        eleEn: [],
        eleCn: []
      };
      if (checkedIndex.length != 0) {
        for (var i = 0; i < checkedIndex.length; i++) {
          eleObj.eleEn.push(
            this.elements[this.checkedElements[i]].elementEnName
          );
          eleObj.eleCn.push(
            this.elements[this.checkedElements[i]].elementCnName
          );
        }
      } else {
        eleObj.eleEn.push("");
        eleObj.eleCn.push("");
      }
      var eleEnStr = eleObj.eleEn.toString();
      var eleCnStr = eleObj.eleCn.toString();
      var timeIntervalStr = this.timeInput + this.timeValue;

      var comparTime = startT > endT;

      let hour = this.UpdateInterValue.indexOf("时");
      if (hour != -1) {
        let end = new Date(this.endTimes + ":00:00");
        let start = new Date(this.startTimes + ":00:00");
        let disTime = end.getTime() - start.getTime();
        if (disTime < 3600 * 1000 * 24 * 30 * 3) {
          //时间间隔小于三个月就不做处理
        } else {
          alert("时间间隔大于三个月，请重新选择");
          return;
        }
      }

      if (startT == "" || endT == "") {
        alert("选择的日期不能空！");
        return;
      } else if (comparTime == true) {
        alert("起始时间不能大于结束时间！");
        return;
      } else if (this.citySite == "" || this.citySiteDetail == "") {
        alert("请选择省市对应的站点！");
        return;
      } else if (eleEnStr == "" || eleCnStr == "") {
        alert("请选择要素！");
        return;
      } else {
        var obj = {
          userName: account,
          downTime: nowTime + "",
          moduleEnName: this.moduleEnName,
          date: startT + "0000-" + endT + "0000",
          province: this.province,
          provinceData: this.provinceData,
          citySite: this.citySite,
          citySiteDetail: this.citySiteDetail,
          elementEn: eleEnStr,
          elementCn: eleCnStr,
          famat: this.famatValue,
          timeInterval: timeIntervalStr,
          insertTime: nowTime,
          downState: "0",
          isDown: "0"
        };

        var objToStr = JSON.stringify(obj);

        let self = this;
        this.axios
          .get("DataService.svc/insertDownList", {
            params: {
              funParams: objToStr
            }
          })
          .then(response => {
            let resData = eval("(" + response.data + ")");
            alert("加入清单成功！");
          })
          .catch(response => {
            console.log(response);
            alert("加入清单失败！");
          });
      }
    },
    //      验证只能输入正整数
    proving1() {
      this.timeInput = this.timeInput.replace(/[^\.\d]/g, "");
      this.timeInput = this.timeInput.replace(".", "");
    },
    checkInputIsEmpty() {
      if (this.timeInput == "") {
        this.timeInput = "1";
      }
    },
    Hidden() {
      //通过$emit引用组件传过来的hidden()事件
      this.$emit("hidden");
    },
    handleCheckAllChange(val) {
      this.checkedElements = val ? this.elementsIndexArr : [];
      // this.checkedElementsEn = val ? this.elementEnNameArr : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.elements.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.elements.length;
    }
  }
};
</script>

<style scoped>
.body-background {
  width: 100vw;
  height: 100vh;
  background-color: #00000085;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}
.modal-wraps {
  width: 45%;
  height: 97%;
  background-color: white;
  border-radius: 1em;
}
.modal-wrap-left {
  padding-top: 2%;
  padding-left: 3%;
  width: 91%;
  height: 89vh;
  float: left;
}
.top-wrap {
  border-bottom: solid 0.05em #80808045;
  height: 3.5vh;
}
.top-font {
  font-size: 1.1vw;
  font-weight: bold;
}
.middle-wrap {
  margin-top: 1vh;
  border: #80808038 solid 0.5px;
  padding-top: 3%;
  padding-left: 6%;
  padding-right: 5%;
  padding-bottom: 0%;
  height: 20vh;
}
.middle {
}
.middle-name-wrap {
  width: 5%;
  height: 2.7vh;
  position: absolute;
  top: 7vh;
  left: 30%;
  background-color: white;
  color: #4fb9ed;
  font-size: 1.1vw;
  font-weight: bold;
  text-align: center;
  line-height: 1.5;
}
.middle-left-wrap {
  width: 70%;
  height: 100%;
  float: left;
  font-size: 0.95em;
}

.data-content {
  font-weight: bold;
}
.data-start-time-wrap {
  /* width: 50%;
    float: left; */
}
.data-start-time-name {
}
.data-start-time-value {
}
.data-end-time-wrap {
}
.data-end-time-wrap-name {
}
.data-end-time-wrap-value {
}
.update-wrap {
  /* width: 50%;
    float: left; */
}
.update-name {
}
.update-value {
}
.share-wrap {
}

.share-value {
}
.data-soure-wrap {
}
.data-soure-name {
}
.data-soure-value {
}
.middle-right-wrap {
  float: left;
  width: 25%;
  font-size: 0.8em;
  padding-left: 5%;
}
.comments-wrap {
}
.comment-pic {
  background: url("../../../assets/img/dataDownLoad/comment.png") no-repeat
    center center;
}
.comment-name {
}
.comment-count {
}
.likes-wrap {
}
.likes-pic {
  background: url("../../../assets/img/dataDownLoad/likes.png") no-repeat center
    center;
}
.likes-name {
}
.likes-count {
}
.views-wrap {
}
.views-pic {
  background: url("../../../assets/img/dataDownLoad/view.png") no-repeat center
    center;
}
.views-name {
}
.views-count {
}

.share-pic {
  background: url("../../../assets/img/modal/share.png") no-repeat center center;
  width: 16%;
  height: 2.1vh;
  background-size: 45%;
}
.share-name {
}
.share{
      padding-left: 28%;
}
.foot-wrap {
  margin-top: 2vh;
  /* border: solid red; */
  border: #80808038 solid 0.5px;
  height: 72%;
  font-size: 0.5vw;
}
.file-download-font {
  width: 5%;
  height: 2.7vh;
  position: absolute;
  top: 31vh;
  left: 30%;
  background-color: white;
  color: #4fb9ed;
  font-size: 2.2em;
  font-weight: bold;
  text-align: center;
  line-height: 1.5;
}
.date-all-wrap {
  height: 11.1%;
  padding-left: 5%;
  padding-right: 4%;
  padding-top: 2%;
}
.date-wrap {
  padding-bottom: 1.5%;
}
.date-pic {
  background: url("../../../assets/img/modal/date.png") no-repeat center center;
  width: 5%;
  height: 2vh;
  float: left;
  background-size: 49%;
}
.date-name {
  font-size: 0.8vw;
}

.provinces-position-wrap {
  float: left;
  height: 40%;
  padding-left: 5%;
  padding-right: 4%;
  padding-top: 0.5%;
}

.all-select-wrap {
  float: right;
  width: 53px;
  height: 18px;
}
.all-select-wrap >>> .el-checkbox__label {
  font-size: 0.8vw !important;
}

.radio-wrap {
  float: left;
  margin-right: 3%;
}
.elements-select-wrap {
  float: left;
  height: 25%;
  width: 91%;
  padding-left: 5%;
  padding-right: 4%;
}
.element-select-title {
  width: 100%;
  height: 17%;
  float: left;
  /* margin-top: 0.5%; */
  margin-bottom: 1.5%;
}
.element-select-wrap {
  width: 18%;
  height: 100%;
  /* display: flex;
    align-items: center; */
  float: left;
}
.element-select-pic {
  float: left;
  background: url("../../../assets/img/modal/yaosu.png") no-repeat center center;
  width: 16%;
  height: 100%;
  margin-right: 7%;
  background-size: 65%;
}
.element-select-name {
  float: left;
  line-height: 1.5;
  padding-top: 2%;
}
.element-all-select-wrap-postion {
}
.element-content {
  height: 65%;
  width: 98%;
  float: left;
  border: solid #8080802b 0.5px;
  padding-top: 1.5%;
  padding-left: 2%;
}
.element-content >>> .el-checkbox + .el-checkbox {
  margin-left: 0px;
}
.element-content >>> .el-checkbox {
  width: 20%;
  padding-top: 2%;
}
.element-content >>> .el-checkbox__label {
font-size: 0.8vw;
}
.element-radio-font-wrap {
  width: 24%;
  float: left;
  /* transform: scale(0.9,0.9); */
  font-size: 1.8em !important;
  padding-top: 0.3%;
}
.files-wrap {
  float: left;
  height: 11%;
  padding-left: 5%;
  padding-right: 4%;
  padding-top: 1.5%;
}
.pic-file-wrap {
  width: 100%;
  height: 35%;
  display: flex;
  align-items: center;
}
.file-pic {
  background: url("../../../assets/img/modal/file.png") no-repeat center center;
  float: left;
  width: 3%;
  height: 77%;
  margin-right: 1%;
  background-size: 65%;
}
.file-name {
}
.famat-time-wrap {
  width: 100%;
  height: 65%;
  padding-top: 1.5%;
  font-size: 1.8em !important;
}

.famat-name {
  padding-top: 0.3%;
  color: #48728b;
  font-weight: bold;
}
.famat-value {
  width: 15%;
}
.famat-value >>> .el-input__inner {
  height: 22px;
}
.famat-value >>> .el-input__icon {
  height: 143%;
}
.time-interval-name {
  margin-left: 5%;
  padding-top: 0.3%;
  color: #48728b;
  font-weight: bold;
}
.time-interval-value {
  width: 15%;
}
.famat-time-wrap >>> .el-input__inner {
  height: 22px;
}
.famat-time-wrap >>> .el-input__icon {
  height: 143%;
}

.time-interval-value >>> .el-input__inner {
  /* height: 30px; */
}
.time-interval-unit {
  width: 15%;
  float: left;
  margin-left: 1%;
}
.time-interval-unit >>> .el-input__inner {
  /* height: 30px; */
}
.fomat-time-wrap >>> .el-input__icon {
  /* height: 30px; */
}
.btns-wrap {
  height: 8%;
  padding-left: 5%;
  padding-right: 4%;

  padding-top: 0%;

  display: flex;
  -webkit-box-pack: center;

  justify-content: center;
  -webkit-box-align: center;

  align-items: center;
}
.btns-wrap >>> .el-button {
  padding: 5px 20px;
  font-size: 0.8vw !important;
}
.now-download-wrap {
  float: left;
  margin-right: 5%;
}
.add-in-car {
}
.modal-wrap-right {
  /* background-color: pink; */
  width: 6%;
  height: 100%;
  float: left;
}
.close-wrap {
  margin-top: 30%;
  margin-left: 20%;
  cursor: pointer;
}
.close-wrap >>> .el-icon-close {
  font-weight: bold;
}
.close-wrap >>> .el-icon-close::before {
  font-size: 25px;
}
.download-lists-wrap {
  width: 100%;
  height: 96%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
.download-lists {
  background: url("../../../assets/img/modal/xiazaiqingdan-1.png") no-repeat
    center center;
  width: 100%;
  height: 30%;
  padding-left: 12%;
  margin-left: 12%;
  cursor: pointer;
  transition: all 0.5s;
}
.download-lists:hover {
  background: url("../../../assets/img/modal/xiazaiqingdan-2.png") no-repeat
    center center;
}

.float-left {
  float: left;
}
.padding-bottom {
  padding-top: 0.4vw;
  /* padding-bottom: 0.7vh; */
}
.border-bottom {
  border-bottom: solid 0.05em #80808045;
  padding-bottom: 7%;
}
.font-style1 {
  color: #3d6b84;
  font-weight: bold;
}
.font-style12 {
  color: #3d6b84;
  font-weight: bold;
  font-size: 0.8vw !important;
}
.font-style2 {
  color: #4bacf2;
}
.icon-style1 {
  width: 20%;
  height: 2.1vh;
}
.icon-font-style {
  padding-left: 8%;
  width: 49%;
  font-size: 0.8vw !important;
}
#date {
  line-height: 22px;
}
.start-time {
  float: left;
  width: 22%;
}
.start-time .el-date-editor input.el-input__inner {
  height: 30px !important;
}
.el-input__icon {
  line-height: 30px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 195px;
}
.dao {
  float: left;
  line-height: 30px;
  margin-left: 2%;
  margin-right: 2%;
  line-height: 2;
  font-size: 1.6em;
}

.start-time >>> .el-date-editor.el-input {
  width: 100%;
}
.start-time >>> .el-input__icon {
  line-height: 29px;
}
.start-time >>> .el-date-editor .el-input__inner {
  height: 25px !important;
}
.start-time >>> .el-input--prefix .el-input__inner {
  padding-left: 8.5%;
  padding-right: 0px;
  /* width: 77%; */
}
.end-time {
  float: left;
  width: 22%;
}
.end-time >>> .el-input__icon {
  line-height: 29px;
}
.end-time >>> .el-date-editor.el-input {
  width: 100%;
}
.end-time >>> .el-date-editor .el-input__inner {
  height: 25px !important;
}
.end-time >>> .el-input--prefix .el-input__inner {
  padding-left: 8.5%;
  padding-right: 0px;
  /* width: 77%; */
}
body >>> .el-time-spinner .el-time-spinner__wrapper:nth-child(1) {
  display: none;
}
</style>






