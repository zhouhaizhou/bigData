<template>
  <span>
    <my-header></my-header>
    <div>
      <div><span>tubiao</span><span>我的个人信息</span></div>
      <div>
        <div>
          <div>
            <div>基本信息</div>
            <div>
              <div class="" v-for="(base,index) in baseInfo"><span>{{base.label}} :</span><span>{{base.value}}</span></div>
              <!-- <span class="" v-for="(base,index) in baseInfo"><span>{{base}}</span></span> -->
           </div>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-edit" round>修改</el-button>
          </div>
        </div>
        <div>
          <div>详细信息</div>
          <div>
            <div class="" v-for="(detail,index) in detailInfo"><span>{{detail.label}} :</span><span>{{detail.value}}</span></div>
            <!-- <div class="" v-for="(detail,index) in detailInfo"><span>{{detail}}</span></div>       -->
          </div>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </span>
</template>


<script>
import myHeader from "../../common/header";
import myFooter from "../../common/foot";
import { mapState } from "vuex"; //为获取用户名
export default {
  components: {
    myHeader,
    myFooter
  },
  data() {
    return {
      baseInfo: [],
      detailInfo: []
    };
  },
  mounted() {
    this.getPersonInfo();
  },
  computed: {
    ...mapState(["UserToken"]) //为获取用户名
  },
  methods: {
    getPersonInfo() {
      let account = this.UserToken.Account; //为获取用户名
      if (account == "readearth") {
        alert("请登录！");
        return;
      }
      let self = this;
      this.axios
        .get("UserManager.svc/GetPersonInfo", {
          params: {
            account: account //  "1184058205@qq.com"测试用    待处理
          }
        })
        .then(response => {
          let resData = eval("(" + response.data + ")");
          //基本信息
          let baseInfoArr=[]
          //详细信息
          let detailInfoArr=[]
          resData.map((element,index)=>{
            if(element.infoType==="0"){
              let baseInfoObj={
                label: element.label,
                value: element.value
              }
              baseInfoArr.push(baseInfoObj)
            }else if(element.infoType==="1"){
              let detailInfoObj={
                label: element.label,
                value: element.value
              }
              detailInfoArr.push(detailInfoObj)
            }
          })

          self.baseInfo=baseInfoArr
          self.detailInfo=detailInfoArr
        })
        .catch(response => {
          console.log(response.data);
        });
    }
  }
};
</script>

<style scoped>
</style>

