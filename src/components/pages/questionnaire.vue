<template>
    <div>
        <my-header></my-header>
        <div class="middle-background">
            <div class="center">
                <div class="header-wrap">
                    <div class="pic-wrap"></div>
                    <div class="header-text-wrap">
                        <h3>用户满意度问卷调查</h3>
                        <p>您好！为了给您提供更好的服务，我们希望了解您对污染天气大数据平台的看法或建议。对您的配合和支持表示衷心的感谢！</p>
                    </div>
                </div>
                <div class="body-wrap">
                    <div class="one-part">
                        <div class="one-title-wrap">
                            <span class="pic2"></span>
                            <span class="pic2-text">使用大数据平台的印象</span>
                        </div>
                        <div class="one-subtitle">
                            <span class="red">*</span>&nbsp;&nbsp;&nbsp;<span>1、</span><span>请根据您在使用气象数据过程中的实际感受，对下列题项进行符合度打分（<span class="orange">1星</span>标志用户对平台使用不满意，<span class="orange">5星</span>表示用户对平台使用非常满意）</span>
                        </div>
                        <div class="one-table-wrap">
                            <table class="bordered">
                                <thead>
                                    <tr>
                                        <th>调查内容</th>
                                        <th>满意度评分</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(q,index) in questions">
                                        <td class="width50 paddingleft6">({{index+1}})&nbsp;&nbsp;{{q.question}}</td>
                                        <td class="text-align-center width50">
                                            <el-rate v-model="q.value" show-text @change="getQuestionIndexAndVale(index,q.value)">
                                            </el-rate>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="two-part">
                        <div class="one-title-wrap">
                            <span class="pic2"></span>
                            <span class="pic2-text">主观题</span>
                        </div>
                        <div class="one-subtitle">
                            <span class="red">*</span>&nbsp;&nbsp;&nbsp;<span>2、</span><span>您对大数据平台是否存在其他建议？</span>
                        </div>
                        <div class="advices">
                            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="advices">
                            </el-input>
                        </div>
                    </div>

                    <div class="clearfloat" style="clear:both;height:0;font-size: 1px;line-height: 0px;"></div>
                </div>
                <div class="boot-wrap">
                    <el-button type="primary" @click="onSubmitData()">提交</el-button>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
import myHeader from "../common/header.vue";
import myFooter from "../common/foot.vue";
import { mapState } from "vuex";
export default {
  components: {
    myHeader,
    myFooter
  },
  data() {
    return {
      questions: [],
      advices: null,
      dataArr: [],
      isIndexNum: null //符合条件的数组索引
    };
  },
  mounted() {
    this.getQuestionData();
    this.dataArr = [];
  },
  computed:{
      ...mapState(["UserToken"]),
  },
  methods: {
    getQuestionData() {
      let self = this;
      this.axios
        .get("HomeDataService.svc/GetQuestionData")
        .then(response => {
          let resData = eval("(" + response.data + ")");
          console.log(resData);
          self.questions = resData;
        })
        .catch(response => {
          console.log(response);
        });
    },
    getQuestionIndexAndVale(index, value) {
      let dataObj = {
        index: "",
        value: ""
      };
      //先遍历数组，通过判断是否存在已有的index来决定是插入还是替换
      if (this.inArray(index)) {
        dataObj.index = index;
        dataObj.value = value;
        this.dataArr.splice(this.isIndexNum, 1, dataObj); //替换数组中指定下表的元素
      } else {
        dataObj.index = index;
        dataObj.value = value;
        this.dataArr.push(dataObj);
      }
    },
    /**
     * 遍历json数据中是否含有某个值
     */
    inArray(index) {
      for (let i = 0; i < this.dataArr.length; i++) {
        if (this.dataArr[i].index == index) {
          this.isIndexNum = i;
          return true;
        }
      }

      return false;
    },
    /**
     * 向后台提交数据
     */
    onSubmitData() {
      let self = this;
      //判断是否漏打分和没评价
      if (this.dataArr.length < this.questions.length) {
        alert("您有未打分的问题，请评分");
        return;
      }

      let account = this.UserToken.Account;
      if (account == "readearth") {
        alert("请登录后填写调查问卷！");
        return;
      }
      let obj = {
        dataArr: this.dataArr,
        advices: this.advices,
        userName: account
      };
      //将json对象转化为JSON字符串
      let objToStr = JSON.stringify(obj);
      this.axios
        .get("HomeDataService.svc/InsertQuestionData", {
          params: {
            submitData: objToStr
          }
        })
        .then(response => {
          let resData = response.data;
          alert(resData);
        })
        .catch(response => {
          console.log(response);
          alert("提交失败！");
        });
    }
  }
};
</script>

<style scoped>
.middle-background {
  background-color: rgb(242, 248, 252);
  padding-left: 10%;
  padding-right: 9%;
  padding-top: 2%;
  padding-bottom: 2%;
}
.center {
  width: auto;
  height: auto;
  background-color: white;
  border: 1px solid #80808061;
  padding-left: 6%;
  padding-right: 6%;
  padding-top: 2%;
  padding-bottom: 2%;
}
.header-wrap {
  height: 10vh;
  border-bottom: 1px solid #80808061;
}
.pic-wrap {
  width: 7%;
  height: 100%;
  background: url("../../assets/img/questionnaire/manyidu.png") center center;
  background-size: 92%;
  float: left;
}

.header-text-wrap {
  margin-left: 9%;
}
.body-wrap {
  height: auto;
}
.one-title-wrap {
  margin-top: 1%;
  display: flex;
  align-items: center;
  margin-bottom: 1%;
  border-bottom: 1px solid #80808061;
}
.pic2 {
  width: 50px;
  height: 30px;
  background: url("../../assets/img/questionnaire/yinxiang.png") no-repeat
    center center;
  float: left;
}
.red {
  color: red;
}
.orange {
  color: orange;
}
.one-subtitle {
  margin-bottom: 1%;
}
table {
  border-spacing: 0;
  width: 100%;
}
.bordered {
  border: solid #ccc 1px;
  border-radius: 6px;
  box-shadow: 0 1px 1px #ccc;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;

  -webkit-box-shadow: 0 1px 1px #ccc;
  -moz-box-shadow: 0 1px 1px #ccc;
}
.bordered td,
.bordered th {
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
  padding: 10px;
}

.width50 {
  width: 50%;
}
.text-align-center {
  text-align: center;
}
.paddingleft6 {
  padding-left: 6% !important;
}
.advices {
}
.boot-wrap {
  height: 10vh;
  display: flex;
  justify-items: center;
  align-items: center;
  padding-left: 48%;
}
</style>



