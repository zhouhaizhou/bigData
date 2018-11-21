<template>
    <div>
        <my-header></my-header>
        zhz
        <my-footer></my-footer>
    </div>
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
        checkedData:[],
        value:[]//将获取的个人信息数据传给王斌  自己也可以用 
    };
  },
  mounted() {},
  computed: {
    ...mapState(["UserToken"]) //为获取用户名
  },
  methods: {
    getPersonInfo() {
    //   let account = this.UserToken.Account; //为获取用户名
    //   if (account == "readearth") {
    //     alert("请登录！");
    //     return;
    //   }
      let self = this;
      this.axios
        .get("UserManager.svc/GetPersonInfo?account=wb", {
          params: {
            account: "1184058205@qq.com"//测试用    待处理
          }
        })
        .then(response => {
          let resData = eval("(" + response.data + ")");
          console.log(resData);
          self.value=resData;
          
          self.checkedData = resData;
        })
        .catch(response => {
          console.log(response);
        });
    }
  }
};
</script>

<style scoped>
</style>

