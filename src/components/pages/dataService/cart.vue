 <template>
    <div class="carts-wrap">
        <div class="cart-wrap">
            <div class="title-wrap">
                <div class="nav-marker"></div>
                <div class="sub-title">下载清单</div>
            </div>
            <div class="items-wrap">
                <div class="item-tr-wrap" v-for="(item,index) in items">
                    <div class="item-wrap">
                        <div class="left-wrap">
                            <input type="checkbox" class="check-style" @click="checkboxNum(item)">
                        </div>
                        <div class="right-wrap">
                            <div class="right-title">
                                <span class="title-index">{{index+1}}</span>
                                <span class="title-name">{{item.title}}</span>
                            </div>
                            <div class="right-content">
                                <div class="date-wrap span-wrap">
                                    <span>日期：</span>
                                    <span>{{item.date}}</span>
                                </div>
                                <div class="province-wrap span-wrap">
                                    <span>省(市)：</span>
                                    <span>{{item.province}}</span>
                                </div>
                                <div class="city-site-wrap span-wrap">
                                    <span>城市站点：</span>
                                    <span>{{item.citySites}}</span>
                                </div>
                                <div class="element-wrap span-wrap">
                                    <span>气象要素：</span>
                                    <span>{{item.element}}</span>
                                </div>
                                <div class="file-famat-wrap span-wrap">
                                    <span>文件格式：</span>
                                    <span>{{item.fileFamat}}</span>
                                </div>
                                <div class="time-interval-wrap span-wrap">
                                    <span>时间间隔：</span>
                                    <span>{{item.timeInterval}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="line"></div>
                </div>
            </div>
            <div class="boot-wrap">
                <div class="select-all-wrap">
                    <span><input type="checkbox"></span>
                    <span>全选文件</span>
                </div>
                <div class="select-num-wrap">
                    <span>已选择</span>
                    <span>1</span>
                    <span>个文件</span>
                </div>
                <div class="download-button">
                    <el-button type="primary" icon="el-icon-download">下载</el-button>
                </div>
            </div>
            <div class="clearfloat"></div>
        </div>
    </div>
</template>

<script>
// import myHeader from "../../common/header";
// import myFooter from "../../common/foot";

export default {
  //     components: {
  //     myHeader,
  //     myFooter
  //   },
  data() {
    return {
      items: [
        {
          title: "中国地面气象站逐小时观测资料",
          date: "20180706 - 20180806",
          province: "上海",
          citySites: "[58376] 徐汇区,[48461]青浦,[58370]浦东",
          elements: "气压,海平面气压,最高气温,最高气压,最大风速,极大风速",
          fileFamat: "csv",
          timeInterval: "24小时"
        },
        {
          title: "中国地面气象站逐小时观测资料",
          date: "20180706 - 20180806",
          province: "上海",
          citySites: "[58376] 徐汇区,[48461]青浦,[58370]浦东",
          elements: "气压,海平面气压,最高气温,最高气压,最大风速,极大风速",
          fileFamat: "csv",
          timeInterval: "24小时"
        },
        {
          title: "中国地面气象站逐小时观测资料",
          date: "20180706 - 20180806",
          province: "上海",
          citySites: "[58376] 徐汇区,[48461]青浦,[58370]浦东",
          elements: "气压,海平面气压,最高气温,最高气压,最大风速,极大风速",
          fileFamat: "csv",
          timeInterval: "24小时"
        },
        {
          title: "中国地面气象站逐小时观测资料",
          date: "20180706 - 20180806",
          province: "上海",
          citySites: "[58376] 徐汇区,[48461]青浦,[58370]浦东",
          elements: "气压,海平面气压,最高气温,最高气压,最大风速,极大风速",
          fileFamat: "csv",
          timeInterval: "24小时"
        },
        {
          title: "中国地面气象站逐小时观测资料",
          date: "20180706 - 20180806",
          province: "上海",
          citySites: "[58376] 徐汇区,[48461]青浦,[58370]浦东",
          elements: "气压,海平面气压,最高气温,最高气压,最大风速,极大风速",
          fileFamat: "csv",
          timeInterval: "24小时"
        },
        {
          title: "中国地面气象站逐小时观测资料",
          date: "20180706 - 20180806",
          province: "上海",
          citySites: "[58376] 徐汇区,[48461]青浦,[58370]浦东",
          elements: "气压,海平面气压,最高气温,最高气压,最大风速,极大风速",
          fileFamat: "csv",
          timeInterval: "24小时"
        },
        {
          title: "中国地面气象站逐小时观测资料",
          date: "20180706 - 20180806",
          province: "上海",
          citySites: "[58376] 徐汇区,[48461]青浦,[58370]浦东",
          elements: "气压,海平面气压,最高气温,最高气压,最大风速,极大风速",
          fileFamat: "csv",
          timeInterval: "24小时"
        }
      ],
      counts:"0"
    };
  },
  methods() {}
};
</script>

<style scoped>
.carts-wrap {
  width: 100%;
  /* height: 100vh; */
  background-color: #f3f8fc;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.cart-wrap {
  width: 73%;
  background-color: white;
  margin-top: 1%;
  border: solid 0.5px #8080805e;
  margin-bottom: 1%;
}
.nav-marker {
  float: left;
  width: 0.5vw;
  height: 2.5vh;
  background-color: #1bbf9d;
}
.title-wrap {
  padding-left: 2%;
  padding-top: 1%;
  padding-bottom: 0.5%;
  width: 98%;
  height: 3vh;
  border-bottom: solid #808080c2;
  border-bottom-width: 0.5px;
}
.sub-title {
  float: left;
  margin-left: 0.8vw;
  font-size: 1vw;
  font-weight: bold;
}
.item-wrap {
     padding-left: 3%;
    padding-top: 1.9%;
    /* padding-bottom: 0.5%; */
    width: 97%;
    height: 20vh;
}
.left-wrap {
  float: left;
  width: 2%;
}
.right-wrap {
  float: left;
}
.title-index {
  background-color: #4fa5e0;
  color: white;
  font-weight: bold;
  padding-left: 1%;
  padding-right: 1%;
}
.span-wrap {
  padding-top: 1.5%;
}
.line {
    height: 0.1vh;
    background-color: #808080c2;
    margin-top: 1%;
}

.boot-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  height: 6vh;
}
.select-all-wrap {
  padding-left: 3%;
  width: 7%;
}
.select-num-wrap {
  margin-left: 68%;
}
.select-num-wrap span:nth-child(2) {
  color: red;
  font-weight: bold;
}
.download-button {
  margin-left: 2%;
}
.download-button >>> .el-button {
  padding: 6px 17px;
}

.clearfloat {
  clear: both;
  height: 0;
  font-size: 1px;
  line-height: 0px;
}
</style>

