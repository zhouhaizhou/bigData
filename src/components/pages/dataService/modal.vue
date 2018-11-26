<template>
  <div class="modal-component">
    <div id="modal" class="body-background">
      <div class="modal-wraps">
        <div class="modal-wrap-left">
          <div class="top-wrap">
            <div class="top-font">{{moduleCnName}}</div>
          </div>
          <div class="middle-wrap">
            <div class="middle-name-wrap">
              <span>资料内容</span>
            </div>
            <div class="middle-left-wrap">
              <!-- <div class="data-content padding-bottom">{{modalData[0].subTitle}}</div> -->
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
                <div class="likesIcon float-left icon-style1" :class="{'likesIcon':!clickListData.likeActive,'likesIconActive':clickListData.likeActive}" @click="toggleLike" ></div>
                <div class="likes-name float-left icon-font-style">收藏</div>
                <div class="likes-count ">{{clickListData.likesCount}}</div>
              </div>
              <div class="views-wrap padding-bottom border-bottom">
                <div class="views-pic float-left icon-style1"></div>
                <div class="views-name float-left icon-font-style">浏览量</div>
                <div class="views-count ">{{modalData[0].viewCount}}</div>
              </div>
              <div class="share-wrap padding-bottom border-bottom">
                <div class="share-pic float-left icon-style1"></div>
                <div class=" icon-font-style share" style="padding-left: 28%;">分享</div>
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
                  <el-date-picker v-model="startTimes" class="time-time" :type="dateTimeType" :format="dateTimeFormat" value-format="yyyy-MM-dd HH" clear-icon="close" prefix-icon="1" @focus="dateChange" @change="changeTime()">
                  </el-date-picker>
                </div>
                <div class="dao font-style1">到</div>
                <div class="end-time">
                  <el-date-picker v-model="endTimes" class="time-time" :type="dateTimeType" :format="dateTimeFormat" value-format="yyyy-MM-dd HH" clear-icon="close" prefix-icon="1" @focus="dateChange" @change="changeTime()">
                  </el-date-picker>
                </div>
              </div>
            </div>
            <div class="provinces-position-wrap">

              <my-modal-provinces-pan ref="c1" v-on:getParams="getChildComProvinceParams" v-on:getCityParams="getChildComCityParams" :style="{height:'100%'}" :moduleEnName="moduleEnName" :isShow="isShow "></my-modal-provinces-pan>

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
                  <el-checkbox v-for="(element,index) in elements" :label="index" :key="index"><label v-html="element.elementCnName"></label></el-checkbox>
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

                <div id="time-interval-name" class="time-interval-name float-left">时间间隔：</div>
                <div id="time-interval-value" class="time-interval-value float-left">
                  <el-input v-model="timeInput" @keyup.native="proving1" @blur="checkInputIsEmpty()" placeholder="请输入数字"></el-input>
                </div>
                <div id="time-interval-unit" class="time-interval-unit ">
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
  props: ["moduleEnName", "moduleCnName", "isShow","clickListData"],
  data() {
    return {
      dateFormat: "",
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
      timeType: [],
      timeTypeValue: "",
      startTimesFlag: "", //数据库中数据的最早时间，用它来限制用户输入的起始时间是否合法
      startTimes: "",
      lstTime: "", //数据库中数据的最新时间  正常格式，后面通过new Date（this.lstTime）转化为GMT时间格式，用作对比用户选的起始时间
      endTimes: "", //this._global.formatDate(new Date(), "yyyy-MM-dd hh")将GMT时间格式转化为字符串形式的正常时间格式

      dateTimeType: "",
      dateTimeFormat: "",
      nowStartTime: "", //时间控件的时间修改前的时间
      nowEndTime: ""
    };
  },
  mounted() {},
  created() {
    // this.getTime();
  },
  computed: {
    ...mapState(["UserToken"]),
    dateType() {
      let str = this.modalData[0].UpdateInter;
      if (str.indexOf("小时") >= 0) {
        this.dateFormat = "yyyy-MM-dd HH";
        return "datetime";
      } else if (str.indexOf("天") >= 0 || str.indexOf("日") >= 0) {
        this.dateFormat = "yyyy-MM-dd";
        return "date";
      } else if (str.indexOf("月") >= 0) {
        this.dateFormat = "yyyy-MM";
        return "month";
      } else if (str.indexOf("年") >= 0) {
        this.dateFormat = "yyyy";
        return "year";
      }
    }
  },
  watch: {
    moduleEnName() {
      if (this.moduleEnName != "") {
        //更新页面
        this.getFileContentData();
        this.elements = "";
        this.getElementData();
        this.getIntervalTime(); //根据module的年月日设置时间间隔单位
      }
    },
    isShow() {
      //监听
      if (this.isShow == false) {
        this.isIndeterminate = false; //弹框关闭时，全选按钮恢复初始状态
        this.checkAll = false; //刚进来时，将上次勾选的全选对勾去掉
        document.querySelector("html").style.overflow = "auto";
        //关闭modal时，将时间清空，解决因网络慢造成时间显示还是上个模块选过的时间
        this.startTimes = "";
        this.endTimes = "";
      } else {
        //  this.isIndeterminate = false;//弹框显示时，默认选中后台返回数据中的第一个要素
      }
    },
    //子组件的省份发生变化时，要素也恢复最初状态
    province(){
      if(this.province!=""){
        this.isIndeterminate = false; //弹框关闭时，全选按钮恢复初始状态
        this.checkAll = false;//全选按钮取消勾选
        this.checkedElements=[];
      }
    }
  },
  methods: {
    /**
     * 将GTM格式的时间转化为指定的普通时间格式
     * @param {new Date()} date  GMT格式的时间
     * @param {String} fmt  想要转化的时间格式
     */
    formatDate1(date, fmt) {
      //author: meizz
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "H+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    },
    /**
     * 根据更新频率中的“小时、日、月、年”来动态改变elementUI的时间控件类型
     */
    changeDateTimeTypeFormat() {
      let hour = this.UpdateInterValue.indexOf("时"); //注意：数据库中配置时，年月日时，的命名采用要包含此处对应的字符
      let day = this.UpdateInterValue.indexOf("天");
      let day1 = this.UpdateInterValue.indexOf("日");
      let month = this.UpdateInterValue.indexOf("月");
      let year = this.UpdateInterValue.indexOf("年");
      if (hour != -1) {
        this.dateTimeType = "datetime";
        this.dateTimeFormat = "yyyy-MM-dd HH";
      } else if (day != -1 || day1 != -1) {
        this.dateTimeType = "date";
        this.dateTimeFormat = "yyyy-MM-dd";
      } else if (month != -1) {
        this.dateTimeType = "month";
        this.dateTimeFormat = "yyyy-MM";
      } else if (year != -1) {
        this.dateTimeType = "year";
        this.dateTimeFormat = "yyyy";
      } else {
        this.dateTimeType = "datetime";
        this.dateTimeFormat = "yyyy-MM-dd HH";
      }
    },
    /**
     * 修改elementUI中的样式，动态修改style
     */
    dateChange() {
      //截获时间改变前，时间控件中的时间值，为change事件提供值
      this.nowStartTime = this.startTimes;
      this.nowEndTime = this.endTimes;
      setTimeout(() => {
        document
          .querySelectorAll(".has-time")[0]
          .querySelectorAll(".el-time-spinner__wrapper")[1].style.display =
          "none";
        document
          .querySelectorAll(".el-popper.has-time")[1]
          .querySelectorAll(".el-time-spinner__wrapper")[1].style.display =
          "none";
      }, 100); //由于获取焦点时动态生成时的div还没出来，所以设置延迟执行
    },
    /**
     * 改变elementUI中的起止时间，并作限制
     */
    changeTime(type) {
      //选的开始时间不能小于数据的开始时间
      let sTBefore = new Date(this.startTimesFlag);
      let startDateTime = new Date(this.startTimes + "00:00"); //所选起始时间
      //结束时间不能大于数据的最新时间
      let lst = new Date(this.lstTime); //数据的最新时间  处理成世界时
      let end = new Date(this.endTimes + "00:00");

      let lstNormalFomat = "";
      let startNormalFomat = "";
      let str = this.UpdateInterValue;
      if (str.indexOf("时") != -1) {
        // let lstNormalFomat=this._global.formatDate(lst, "yyyy-MM-dd hh");//将数据的最新时间GMT时间格式化为对应的正常格式
        lstNormalFomat = this.formatDate1(lst, "yyyy-MM-dd HH"); //将数据的最新时间GMT时间格式化为对应的正常格式
        startNormalFomat = this.formatDate1(sTBefore, "yyyy-MM-dd HH"); //将数据的最新时间GMT时间格式化为对应的正常格式
      } else if (str.indexOf("天") != -1 || str.indexOf("日") != -1) {
        // let lstNormalFomat=this._global.formatDate(lst, "yyyy-MM-dd");//将数据的最新时间GMT时间格式化为对应的正常格式
        lstNormalFomat = this.formatDate1(lst, "yyyy-MM-dd"); //将数据的最新时间GMT时间格式化为对应的正常格式
        startNormalFomat = this.formatDate1(sTBefore, "yyyy-MM-dd"); //将数据的最新时间GMT时间格式化为对应的正常格式
      } else if (str.indexOf("月") != -1) {
        // let lstNormalFomat=this._global.formatDate(lst, "yyyy-MM");//将数据的最新时间GMT时间格式化为对应的正常格式
        lstNormalFomat = this.formatDate1(lst, "yyyy-MM"); //将数据的最新时间GMT时间格式化为对应的正常格式
        startNormalFomat = this.formatDate1(sTBefore, "yyyy-MM"); //将数据的最新时间GMT时间格式化为对应的正常格式
      } else if (str.indexOf("年") != -1) {
        // let lstNormalFomat=this._global.formatDate(lst, "yyyy");//将数据的最新时间GMT时间格式化为对应的正常格式
        lstNormalFomat = this.formatDate1(lst, "yyyy"); //将数据的最新时间GMT时间格式化为对应的正常格式
        startNormalFomat = this.formatDate1(sTBefore, "yyyy"); //将数据的最新时间GMT时间格式化为对应的正常格式
      } else {
        // let lstNormalFomat=this._global.formatDate(lst, "yyyy-MM-dd hh");//将数据的最新时间GMT时间格式化为对应的正常格式
        lstNormalFomat = this.formatDate1(lst, "yyyy-MM-dd hh"); //将数据的最新时间GMT时间格式化为对应的正常格式
        startNormalFomat = this.formatDate1(sTBefore, "yyyy-MM-dd hh"); //将数据的最新时间GMT时间格式化为对应的正常格式
      }
      //设置提示
      //所选时间不能小于数据的起始时间
      if (startDateTime.getTime() - sTBefore.getTime() < 0) {
        this.startTimes = this.nowStartTime; //恢复原有值
        alert("起始时间不能小于 " + startNormalFomat);
        return;
      }
      //如果选的结束时间大于数据库中的最新时间，就提示“所选时间不能大于数据库中数据的最新时间”
      if (end.getTime() - lst.getTime() > 0) {
        this.endTimes = this.nowEndTime; //恢复原有值
        alert("结束时间不能大于 " + lstNormalFomat);
        return;
      }
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
          let Arr = str.split("、");
          //如果更新频率为年的话，就隐藏掉“时间间隔”
          if (self.UpdateInterValue.indexOf("年") > -1) {
            //隐藏掉“时间间隔”
            document.querySelector(
              ".famat-time-wrap #time-interval-name"
            ).style.display = "none";
            document.querySelector(
              ".famat-time-wrap #time-interval-value"
            ).style.display = "none";
            document.querySelector(
              ".famat-time-wrap #time-interval-unit"
            ).style.display = "none";
          } else {
            let timeTypeArr = [];
            for (let i = 0; i < Arr.length; i++) {
              let obj = {
                value: i,
                label: Arr[i]
              };
              timeTypeArr.push(obj);
            }
            self.timeType = timeTypeArr;

            document.querySelector(
              ".famat-time-wrap #time-interval-name"
            ).style.display = "block";
            document.querySelector(
              ".famat-time-wrap #time-interval-value"
            ).style.display = "block";
            document.querySelector(
              ".famat-time-wrap #time-interval-unit"
            ).style.display = "block";
          }
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
          self.lstTime = resData[0].collect_time; //将数据的最新时间保留下来（保存为GMT时间格式），用作对比用户选的起始时间
          self.endTimes = this._global.formatDate(
            new Date(resData[0].collect_time),
            "yyyy-MM-dd hh"
          );
          // self.defaultSetByModuleEnName();
        })
        .catch(response => {
          console.log(response);
        });
    },
    /**
     * 根据更新频率中的“时日月年”，动态修改时间间隔的单位
     */
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
        this.timeValue = "年"; //下载的时间间隔先默认为年   
      } else {
        this.getTime("day");
        this.timeValue = "天";
      }
    },
    /**
     * 根据更新频率的单位，设置起始时间
     */
    getTime(time) {
      const start = new Date(this.endTimes + ":00:00"); //将正常的字符串时间格式转化为GMT时间格式
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
      let account = this.UserToken.Account;
      this.axios
        .get("DataService.svc/getSubTitle", {
          params: {
            moduleEnName: self.moduleEnName, //待修改为moduleEnName，先用固定值代替
            account:account
          }
        })
        .then(response => {
          let resData = eval("(" + response.data + ")");
          self.modalData = resData;
          self.UpdateInterValue = self.modalData[0].UpdateInter; //将更新频率赋值给变量数据UpdateInterValue，用于设置默认时间
          //获取起始时间，用于限制选的起始时间不能过小
          self.startTimesFlag = self.modalData[0].startTime;
          //获取结束时间，用于放到时间控件中的结束时间内
          self.lstTime = self.modalData[0].endTime; //将数据的最新时间保留下来（保存为GMT时间格式），用作对比用户选的起始时间
          self.endTimes = self._global.formatDate(
            new Date(self.modalData[0].endTime),
            "yyyy-MM-dd hh"
          ); //self.modalData[0].endTime

          //将获取到的时间根据moduleEnName的不同在资料内容中显示不同的时间格式
          self.getTimeFormatByModuleEnName(
            self.modalData[0].startTime,
            self.modalData[0].endTime
          );
          self.defaultSetByModuleEnName(); //需要的变量生成后执行   解决axios不能同步
          // self.getLstTime();
          self.changeDateTimeTypeFormat();
        })
        .catch(response => {
          console.log(response);
        });
    },
    /**
     * 根据moduleEnName的不同在资料内容中显示不同的时间格式
     */
    getTimeFormatByModuleEnName(startT, endT) {
      let sT = startT;
      let eT = endT;
      let hour = this.UpdateInterValue.indexOf("时"); //注意：数据库中配置时，年月日时，的命名采用要包含此处对应的字符
      let day = this.UpdateInterValue.indexOf("天");
      let day1 = this.UpdateInterValue.indexOf("日");
      let month = this.UpdateInterValue.indexOf("月");
      let year = this.UpdateInterValue.indexOf("年");
      if (hour != -1) {
        this.modalData[0].startTime = this._global.formatDate(
          new Date(sT),
          "yyyy-MM-dd hh"
        );
        this.modalData[0].endTime = this._global.formatDate(
          new Date(eT),
          "yyyy-MM-dd hh"
        );
      } else if (day != -1 || day1 != -1) {
        this.modalData[0].startTime = this._global.formatDate(
          new Date(sT),
          "yyyy-MM-dd"
        );
        this.modalData[0].endTime = this._global.formatDate(
          new Date(eT),
          "yyyy-MM-dd"
        );
      } else if (month != -1) {
        this.modalData[0].startTime = this._global.formatDate(
          new Date(sT),
          "yyyy-MM"
        );
        this.modalData[0].endTime = this._global.formatDate(
          new Date(eT),
          "yyyy-MM"
        );
      } else if (year != -1) {
        this.modalData[0].startTime = this._global.formatDate(
          new Date(sT),
          "yyyy"
        );
        this.modalData[0].endTime = this._global.formatDate(
          new Date(eT),
          "yyyy"
        );
      } else {
        this.modalData[0].startTime = this._global.formatDate(
          new Date(sT),
          "yyyy-MM-dd hh"
        );
        this.modalData[0].endTime = this._global.formatDate(
          new Date(eT),
          "yyyy-MM-dd hh"
        );
      }
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
              elementCnName: self.proEleType(resData[i].elementCn),
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
    /**
     * 将要素处理成带下标的形式
     */
    proEleType(data) {
      if (data.indexOf("PM25") > -1) {
        data = data.replace("PM25", "PM<sub>2.5</sub>");
      } else if (data.indexOf("PM10") > -1) {
        data = data.replace("PM10", "PM<sub>10</sub>");
      } else if (data.indexOf("PM1") > -1) {
        data = data.replace("PM1", "PM<sub>1</sub>");
      } else if (data.indexOf("O3") > -1) {
        data = data.replace("O3", "O₃");
      } else if (data.indexOf("NO2") > -1) {
        data = data.replace("NO2", "NO₂");
      } else if (data.indexOf("SO2") > -1) {
        data = data.replace("SO2", "SO₂");
      } else if (data.indexOf("CO2") > -1) {
        data = data.replace("CO2", "CO₂");
      } else {
        data = data;
      }
      return data;
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
      let startDate = "";
      let endDate = "";
      let str = this.UpdateInterValue;
      //由于日期输入框中虽然显示到日、月、年，但是startT都都默认位数到小时，所以此处统一采用加四个0的方式
      startDate = startT + "0000";
      endDate = endT + "0000";

      //起止时间间隔不能大于三个月
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

      //选取的要素
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
          updateInterValue:this.UpdateInterValue,
          moduleEnName: this.moduleEnName,
          date: startDate + "-" + endDate,
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
            var str = error.message + "";

            if (str.search("timeout") !== -1) {
              // 超时error捕获
              // self.showLoadMore = true
              // self.showLoadMoreOk = false
              alert("请求超时，起止时间过大，请缩小时间跨度");
            }
            loading.close();
          });
      }
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
      // //定义一个标识
      // let stateType = "0"; //插入清单的标识
      // //调用公共的部分
      // this.commonFun(stateType);

      var data = this.getNowFormatDate();
      var nowTime = data.toString().replace(/[^0-9]/gi, "");

      //处理时间为数字字符串
      var startT = this.startTimes.replace(/[^0-9]/gi, "");
      var endT = this.endTimes.replace(/[^0-9]/gi, "");
      let startDate = "";
      let endDate = "";
      let str = this.UpdateInterValue;
      //由于日期输入框中虽然显示到日、月、年，但是startT都都默认位数到小时，所以此处统一采用加四个0的方式
      startDate = startT + "0000";
      endDate = endT + "0000";

      //起止时间间隔不能大于三个月
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

      //选取的要素
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
          updateInterValue:this.UpdateInterValue,
          moduleEnName: this.moduleEnName,
          date: startDate + "-" + endDate,
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
      // this.isIndeterminate =
      //   checkedCount > 0 && checkedCount < this.elements.length;
    },
    /**
     * 点击收藏   执行父组件中的方法，并传值给父组件的方法
     */
    toggleLike(){
      //执行父组件中的方法，并传参
      this.$emit("toggleLike", this.clickListData);
    }
  }
};
</script>

<style scoped>
.modal-component {
  /* width: 100vw; */
  height: 100vh;
}
/*适应宽度*/
@media screen and (min-width: 10px) and (max-width: 1919px) {
  .body-background {
    width: 1911px;
    height: 1080px;
    background-color: #00000085;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
  }
  .middle-name-wrap {
    width: 15%;
    height: 20%;
    position: relative;
    top: -19%;
    left: -3%;
    background-color: white;
    color: #4fb9ed;
    font-size: 21px;
    font-weight: bold;
    text-align: center;
    line-height: 1.5;
  }
  .modal-wraps {
    width: 50%;
    height: 97%;
    background-color: white;
    border-radius: 1em;
  }
}
@media screen and (min-width: 1920px) {
  .body-background {
    width: 100%;
    height: 1080px;
    background-color: #00000085;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
  }
  .middle-name-wrap {
    width: 14%;
    height: 20%;
    position: relative;
    top: -23%;
    left: -3%;
    background-color: white;
    color: #4fb9ed;
    font-size: 21px;
    font-weight: bold;
    text-align: center;
    line-height: 1.5;
  }
  .modal-wraps {
    width: 45%;
    height: 97%;
    background-color: white;
    border-radius: 1em;
  }
}

/*适应高度*/
@media screen and (min-height: 901px) and (max-height: 1080px) {
  .body-background {
    width: 1911px;
    height: 1080px;
    background-color: #00000085;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
  }
}
@media screen and (min-height: 10px) and (max-height: 900px) {
  .body-background {
    width: 1911px;
    height: 1080px;
    background-color: #00000085;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
  }
}

.modal-wrap-left {
  padding-top: 2%;
  padding-left: 3%;
  width: 91%;
  height: 89%;
  float: left;
}
.top-wrap {
  border-bottom: solid 0.05em #80808045;
  height: 4.5%;
}
.top-font {
  font-size: 21px;
  font-weight: bold;
}
.middle-wrap {
  margin-top: 3%;
  border: #80808038 solid 0.5px;
  padding-top: 2.5%;
  padding-left: 6%;
  padding-right: 5%;
  padding-bottom: 0%;
  height: 19%;
}
.middle {
}

.middle-left-wrap {
  width: 70%;
  height: 100%;
  float: left;
  font-size: 15.5px;
  position: relative;
  top: -21%;
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
  font-size: 15px;
  padding-left: 5%;
  position: relative;
  top: -21%;
}
.comment-pic {
  background: url("../../../assets/img/dataDownLoad/comment.png") no-repeat
    center center;
}

.likesIcon {
  cursor: pointer;
  background: url("../../../assets/img/dataDownLoad/likes.png") no-repeat center
    center;
}
.likesIconActive {
  cursor: pointer;
  background: url("../../../assets/img/dataDownLoad/likes-d.png") no-repeat center
    center;
}

.views-pic {
  background: url("../../../assets/img/dataDownLoad/view.png") no-repeat center
    center;
}

.share-pic {
  background: url("../../../assets/img/modal/share.png") no-repeat center center;
  width: 16%;
  height: 2.1vh;
  background-size: 45%;
}

.share {
  padding-left: 28%;
}
.foot-wrap {
  margin-top: 4%;
  /* border: solid red; */
  border: #80808038 solid 0.5px;
  height: 75%;
  font-size: 8px;
}
.file-download-font {
  width: 13%;
  height: 5%;
  position: relative;
  top: -3%;
  left: 3%;
  background-color: white;
  color: #4fb9ed;
  font-size: 21px;
  font-weight: bold;
  text-align: center;
  line-height: 1.5;
}
.date-all-wrap {
  height: 11.1%;
  padding-left: 5%;
  padding-right: 4%;
  padding-top: 2%;
  position: relative;
  top: -4.2%;
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
  font-size: 14.5px;
}

.provinces-position-wrap {
  float: left;
  height: 40%;
  width: 91%;
  padding-left: 5%;
  padding-right: 4%;
  padding-top: 0.5%;
  position: relative;
  top: -6%;
}

.all-select-wrap {
  float: right;
  width: 53px;
  height: 18px;
}
.all-select-wrap >>> .el-checkbox__label {
  font-size: 14.5px !important;
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
  position: relative;
  top: -6.5%;
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
  height: 70%;
  width: 98%;
  float: left;
  border: solid #8080802b 0.5px;
  padding-left: 2%;
  overflow: auto;
}
/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
.element-content::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #f5f5f5;
}
/*定义滚动条轨道
 内阴影+圆角*/
.element-content::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: #f5f5f5;
}
/*定义滑块
 内阴影+圆角*/
.element-content::-webkit-scrollbar-thumb {
  background-color: #099ad7;
  /* background-image: -webkit-gradient(linear, 40% 0%, 75% 84%, from(rgb(77, 156, 65)), color-stop(0.6, rgb(84, 222, 93)), to(rgb(25, 145, 29))); */
  border-radius: 5px;
}
.element-content >>> .el-checkbox + .el-checkbox {
  margin-left: 0px;
}
.element-content >>> .el-checkbox {
  width: 25%;
  padding-top: 0.5%;
  padding-bottom: 1%;
}
.element-content >>> .el-checkbox__label {
  font-size: 14.5px;
}
.el-checkbox-group {
  margin-top: 1.5%;
  margin-bottom: 1%;
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
  width: 91%;
  height: 11%;
  padding-left: 5%;
  padding-right: 4%;
  /* padding-top: 1.5%; */
  position: relative;
  top: -6%;
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
  width: 91%;
  height: 8%;
  padding-left: 5%;
  padding-right: 4%;
  padding-top: 0%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  top: -6%;
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
  height: 12%;
}
.border-bottom {
  border-bottom: solid 0.05em #80808045;
  padding-bottom: 3%;
}
.font-style1 {
  color: #3d6b84;
  font-weight: bold;
}
.font-style12 {
  color: #3d6b84;
  font-weight: bold;
  font-size: 14.5px !important;
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






