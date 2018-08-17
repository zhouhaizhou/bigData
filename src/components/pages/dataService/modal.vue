<template>
  <div>
    <div id="modal" class="body-background">
      <div class="modal-wraps">
        <div class="modal-wrap-left">
          <div class="top-wrap">
            <div class="top-font">{{modalData[0].title}}</div>
          </div>
          <div class="middle-wrap">
            <div class="middle">
              <div class="middle-name-wrap">
                <span>{{modalData[0].dataContent[0].name}}</span>
              </div>
              <div class="middle-left-wrap">
                <div class="data-content padding-bottom">{{modalData[0].dataContent[0].content}}</div>
                <div class="data-start-time-wrap padding-bottom">
                  <div class="data-start-time-name float-left font-style1">数据起始时间：</div>
                  <div class="data-start-time-value font-style2">{{modalData[0].dataContent[0].startTime}}</div>
                </div>
                <div class="data-end-time-wrap padding-bottom">
                  <div class="data-end-time-wrap-name float-left font-style1">数据终止时间：</div>
                  <div class="data-end-time-wrap-value font-style2">{{modalData[0].dataContent[0].endTime}}</div>
                </div>
                <div class="update-wrap padding-bottom">
                  <div class="update-name float-left font-style1">更新频率：</div>
                  <div class="update-value font-style2">{{modalData[0].dataContent[0].upDateRate}}</div>
                </div>
                <div class="share-wrap padding-bottom">
                  <div class="share-name float-left font-style1">共享级别：</div>
                  <div class="share-value font-style2">{{modalData[0].dataContent[0].shareClass}}</div>
                </div>
                <div class="data-soure-wrap padding-bottom">
                  <div class="data-soure-name float-left font-style1">数据源：</div>
                  <div class="data-soure-value font-style2">{{modalData[0].dataContent[0].dataSource}}</div>
                </div>

              </div>
              <div class="middle-right-wrap ">
                <div class="comments-wrap padding-bottom border-bottom">
                  <div class="comment-pic float-left icon-style1"></div>
                  <div class="comment-name float-left icon-font-style">评论</div>
                  <div class="comment-count">{{modalData[0].dataContent[0].commentCount}}</div>
                </div>
                <div class="likes-wrap padding-bottom border-bottom">
                  <div class="likes-pic float-left icon-style1"></div>
                  <div class="likes-name float-left icon-font-style">收藏</div>
                  <div class="likes-count ">{{modalData[0].dataContent[0].likesCount}}</div>
                </div>
                <div class="views-wrap padding-bottom border-bottom">
                  <div class="views-pic float-left icon-style1"></div>
                  <div class="views-name float-left icon-font-style">浏览量</div>
                  <div class="views-count ">{{modalData[0].dataContent[0].viewCount}}</div>
                </div>
                <div class="share-wrap padding-bottom border-bottom">
                  <div class="share-pic float-left icon-style1"></div>
                  <div class="share-name ">分享</div>
                </div>
              </div>
            </div>
          </div>
          <div class="foot-wrap">
            <div class="file-download-font">资料下载</div>
            <div class="date-all-wrap">
              <div class="date-wrap">
                <div class="date-pic" src="../../../assets/img/modal/date.png"></div>
                <div class="date-name font-style1">日期选择</div>
              </div>
              <div class="date-value">
                <div class="start-time">
                  <el-date-picker v-model="startTimes" type="datetime" prefix-icon="1">
                  </el-date-picker>
                </div>
                <div class="dao font-style1">到</div>
                <div class="end-time">
                  <el-date-picker v-model="endTimes" type="datetime" prefix-icon="1">
                  </el-date-picker>
                </div>
              </div>
            </div>
            <div class="provinces-position-wrap">
              <div class="provinces-title-wraps float-left">
                <div class="provinces-title-wrap">
                  <div class="positon-title-wrap">
                    <div class="position-pic"></div>
                    <div class="position-title font-style12">台站选择</div>
                  </div>
                  <div class="all-select-wrap"><input type="radio">
                    <div class="all-select-name">全选</div>
                  </div>
                </div>
                <div class="provinces-wrap">
                  <div class="province-wrap">
                    <div v-for="province in modalData[0].dataDownLoad[0].sites" class="province">{{province.provinceName}}</div>
                  </div>
                </div>
              </div>
              <div class="arrow-wrap float-left">
                <div class="arrow"></div>
              </div>

              <div class="province-sites float-left">

                <div class="site-title">
                  <div class="all-select-wrap"><input type="radio">
                    <div class="all-select-name">全选</div>
                  </div>
                </div>

                <div class="sites-wrap">
                  <my-modal-city-sites></my-modal-city-sites>
                </div>

              </div>

            </div>
            <div class="elements-select-wrap">
              <div class="element-select-title">
                <div class="element-select-wrap">
                  <div class="element-select-pic"></div>
                  <div class="element-select-name font-style12">要素选择</div>
                </div>
                <div class="all-select-wrap element-all-select-wrap-postion"><input type="radio">
                  <div class="all-select-name">全选</div>
                </div>
              </div>

              <div class="element-content">
                <div class="element-radio-font-wrap" v-for="ele in modalData[0].dataDownLoad[0].element">
                  <div class="radio-wrap"><input type="radio"></div>{{ele}}</div>
              </div>
            </div>
            <div class="files-wrap">
              <div class="pic-file-wrap">
                <div class="file-pic"></div>
                <div class="file-name font-style1">文件选择</div>
              </div>
              <div class="famat-time-wrap">
                <div class="famat-name float-left">文件格式：</div>
                <div class="famat-value float-left">
                  <el-select v-model="famatValue" placeholder="请选择">
                    <el-option v-for="item in famatOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>

                <div class="time-interval-name float-left">时间间隔：</div>
                <div class="time-interval-value float-left">
                  <el-input placeholder="请输入内容"></el-input>
                </div>
                <div class="time-interval-unit ">
                  <el-select v-model="timeTypeValue" placeholder="请选择">
                    <el-option v-for="item in timeType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="btns-wrap">
              <div class="now-download-wrap">
                <el-button type="success">直接下载</el-button>
              </div>
              <div class="add-in-car">
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
            <div class="download-lists"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myModalCitySites from "./modalCitySites";
export default {
  components: {
    myModalCitySites
  },
  props: [
    "modalData",
    "famatOptions",
    "famatValue",
    "timeType",
    "timeTypeValue",
    "startTimes",
    "endTimes"
  ],
  data() {
    return {};
  },
  methods: {
    Hidden() {
      //通过$emit引用组件传过来的hidden()事件
      this.$emit("hidden");
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
  height: 5vh;
}
.top-font {
  font-size: 1.1em;
  font-weight: bold;
}
.middle-wrap {
  margin-top: 2vh;
  border: #80808038 solid 0.5px;
  padding-top: 4%;
  padding-left: 6%;
  padding-right: 5%;
  padding-bottom: 4%;
  height: 20vh;
}
.middle {
}
.middle-name-wrap {
  width: 5%;
  height: 3.7vh;
  position: absolute;
  top: 9.3vh;
  left: 30%;
  background-color: white;
  color: #4fb9ed;
  font-size: 1.25em;
  font-weight: bold;
  text-align: center;
  line-height: 1.5;
}
.middle-left-wrap {
  width: 70%;
  height: 100%;
  float: left;
  font-size: 0.8em;
}

.data-content {
  font-weight: bold;
}
.data-start-time-wrap {
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
}
.update-name {
}
.update-value {
}
.share-wrap {
}
.share-name {
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
  background: url("../../../assets/img/dataService/comment.png") no-repeat
    center center;
}
.comment-name {
}
.comment-count {
}
.likes-wrap {
}
.likes-pic {
  background: url("../../../assets/img/dataService/likes.png") no-repeat center
    center;
}
.likes-name {
}
.likes-count {
}
.views-wrap {
}
.views-pic {
  background: url("../../../assets/img/dataService/view.png") no-repeat center
    center;
}
.views-name {
}
.views-count {
}
.share-wrap {
}
.share-pic {
  background: url("../../../assets/img/modal/share.png") no-repeat center center;
  width: 16%;
  height: 2.1vh;
  background-size: 45%;
}
.share-name {
}
.foot-wrap {
  margin-top: 3vh;
  /* border: solid red; */
  border: #80808038 solid 0.5px;
  height: 64%;
  font-size: 0.5em;
}
.file-download-font {
  width: 5%;
  height: 3.7vh;
  position: absolute;
  top: 39vh;
  left: 30%;
  background-color: white;
  color: #4fb9ed;
  font-size: 2.5em !important;
  font-weight: bold;
  text-align: center;
  line-height: 1.5;
}
.date-all-wrap {
  height: 6vh;
  padding-left: 5%;
  padding-right: 4%;
  padding-top: 3%;
}
.date-wrap {
  padding-bottom: 1vh;
}
.date-pic {
  background: url("../../../assets/img/modal/date.png") no-repeat center center;
  width: 5%;
  height: 2vh;
  float: left;
  background-size: 45%;
}
.date-name {
  font-size: 1.8em;
}
.date-value {
}
.provinces-position-wrap {
  float: left;
    height: 36%;
    padding-left: 5%;
    padding-right: 4%;
}
.provinces-title-wraps {
  width: 44%;
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
    height: 75%;
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
    padding-top: 1%;
    padding-right: 2.5%;
    float: left;
    color: #5476b7;
    transform: scale(0.9,0.9);
    font-weight: bold;
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
  width: 44%;
  height: 95%;
}
.site-title {
  height: 17%;
}
.sites-wrap {
  height: 85%;
  float: left;
  width: 100%;
  background-color: #f9fbfb;
  border: solid #8080802b 0.5px;
  overflow-x: hidden;
}
.site-radio-font-wrap {
}
.radio-wrap {
  float: left;
  margin-right: 3%;
}
.elements-select-wrap {
  float: left;
  height: 29%;
  padding-left: 5%;
  padding-right: 4%;
}
.element-select-title {
      width: 100%;
    height: 15%;
    float: left;
    margin-top: 0.5%;
    margin-bottom: 0.5%;
}
.element-select-wrap {
  float: left;
  width: 18%;
  height: 100%;
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
}
.element-all-select-wrap-postion {
}
.element-content {
  height: 82%;
  width: 100%;
  float: left;
  border: solid #8080802b 0.5px;
  padding-top: 0.5%;
}
.element-radio-font-wrap {
  width: 25%;
  float: left;
  transform: scale(0.9,0.9);
}
.files-wrap {
    float: left;
    height: 8%;
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
.famat-time-wrap >>> .el-input__inner{
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
    height: 7%;
    padding-left: 5%;
    padding-right: 4%;
 
    padding-top: 1%;
 
    display: flex;
    -webkit-box-pack: center;
    
    justify-content: center;
    -webkit-box-align: center;
    
    align-items: center;
}
.btns-wrap >>> .el-button{
  padding: 5px 20px;
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
  height: 25%;
  padding-left: 12%;
  margin-left: 12%;
  cursor: pointer;
}
.download-lists:hover {
  background: url("../../../assets/img/modal/xiazaiqingdan-2.png") no-repeat
    center center;
  width: 100%;
  height: 25%;
  padding-left: 12%;
  margin-left: 12%;
  cursor: pointer;
}

.float-left {
  float: left;
}
.padding-bottom {
  padding-top: 0.7vh;
  padding-bottom: 0.7vh;
}
.border-bottom {
  border-bottom: solid 0.05em #80808045;
}
.font-style1 {
  color: #3d6b84;
  font-weight: bold;
}
.font-style12 {
  color: #3d6b84;
  font-weight: bold;
  font-size: 1.8em !important;
}
.font-style2 {
  color: #4bacf2;
}
.icon-style1 {
  width: 20%;
  height: 2.1vh;
}
.icon-font-style {
  width: 65%;
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
}

.start-time >>> .el-date-editor.el-input {
  width: 100%;
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
</style>






