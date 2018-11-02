<template>
  <div class="content">
    <div class="header-info sub-content">
      <div class="img"></div>
      <div style="float:left;width:85%;margin-top:20px">
        <div style="font-size: 24px;margin-bottom:10px;">{{title}}</div>
        <div style="line-height:30px;font-size:18px;margin-bottom:40px;">{{des}}</div>
      </div>
    </div>
    <el-form :model="check" ref="items" id="form"  label-width="10vw" class="item-class" :rules="relues">
      <el-form-item  :label="item.label+'：'" :prop="item.infoKey" v-for="(item,index) in items" :key="index">
        <el-row>
          <el-col :span="18">
            <!-- <el-input v-if='item.type=="select"' :type="item.type" class="require" v-model="item.value" @change="inputChange(item.value,item.infoType)" autocomplete="off"></el-input> -->
            <el-select v-model="item.value" class="com" :class="{require:item.require=='1',norm:item.require!='1'}" v-if='item.type=="select"' placeholder="请选择">
              <el-option v-for="option in item.options" :key="option.code" :label="option.MC" :value="option.code">
              </el-option>
            </el-select>
            <el-date-picker
              :class="{require:item.require=='1',norm:item.require!='1'}" class="com"
              v-else-if='item.type=="date"'
              v-model="item.value"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
            <el-input v-else :accept="item.accept" :type="item.type" :ref="item.infoKey"  class="com" :class="{require:item.require=='1',norm:item.require!='1'}" v-model="item.value" @change="inputChange(item,index)" autocomplete="off"></el-input>
            <span v-if="item.description" style="margin-left:30px;line-height:25px;">{{item.description}}</span>
          </el-col>
          <el-col :offset="2" :span="4" v-if='item.infoKey=="account"'>
            <el-button type="primary" @click="checkAccount">验证用户名</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div class="footer sub-content">
      <div class="_footer" :class="{'_footer-hidden':!footer_hidden}" v-html="provision"></div>
      <el-checkbox class="all" v-model="footer_hidden"><label style="color:black;">显示所有条款</label></el-checkbox>
    </div>
    <div class="agree sub-content">
      <el-checkbox style="margin:20px 0 0 20px;" v-model="agree"><label style="color:rgb(0,195,194);">我已看过并同意</label><label style="color:black;">《污染天气大数据平台服务条款》</label></el-checkbox>
    </div>
    <div class="btn sub-content">
      <el-button native-type="submit" style="background-color:rgb(0,195,194);margin-right:90px;" type="primary" @click="clickRegister">注册</el-button>
      <el-button  type="primary" @click="resetForm('items')">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatorAccount = (rule, value, callback) => {
      let mobile=/(^1\d{10}$)/;
      let email=/^((\w-*\.*)+@(\w-?)+(\.\w{2,})+$)/
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if (!(email.test(value)||mobile.test(value))) {
          callback("请输入合法的账号");
        }
        callback();
      }
    };
    var validatorcheckPass = (rule, value, callback) => {
      let self = this;
      if (value === "") {
        callback(new Error("请确认密码"));
      } else if (!(value === self.check.pass)) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      check: {
        account: "",
        pass: "",
        checkPass: ""
      },
      title:'',
      des:'',
      provision:'',
      items:null,
      footer_hidden:false,
      agree:false,
      roleId:'',
      relues: {
        account: [{ validator: validatorAccount, trigger: "blur" }],
        checkPass: [{ validator: validatorcheckPass, trigger: "blur" }]
      }
    };
  },
  mounted(){
    let roleId=this.$route.params.roleId;
    if(roleId==undefined){
      this.$router.push("/register");
    }
    this.roleId=roleId;
    this.getInfo()
    this.getRegisterItem();
  },
  methods: {
    resetForm(items){
      this.items.filter((ele,i)=>{
        ele.value='';
      })
      this.$refs[items].resetFields();
    },
    checkAccount() {
      let account=this.items[0].value;
      let mobile=/(^1\d{10}$)/;
      let email=/^((\w-*\.*)+@(\w-?)+(\.\w{2,})+$)/
      if(!(mobile.test(account)||email.test(account))){
        this.$message.error('错误，请输入合法的账号！');
        return;
      }
      this.axios
        .get("Register.svc/CheckAccount",{
          params:{
            account:account
          },
        }).then(res=>{
          this.$message({
            message: '验证成功！',
            type: 'success'
          });
        }).catch(res=>{
            this.$message.error('错误，该账户已被注册！');
          }
        )
    },
    inputChange(item,index) {
      if(item.type=='file'){
        let file = this.$refs[item.infoKey][0].$el.firstElementChild.files[0];
        let size=file.size/1024;
        if(size>Number(item.sizeRestrict)&&Number(item.sizeRestrict)){
          this.$refs[item.infoKey][0].$el.firstElementChild.files=null;this.$refs[item.infoKey][0].$el.outerHTML=this.$refs[item.infoKey][0].$el.outerHTML;
          item.value="";
          this.$message.error("文件大小不能超过"+item.sizeRestrict+"KB");
          return;
        }
      }
      this.check[item.infoKey] = item.value;
    },
    getRegisterItem(){
       this.axios
        .get("Register.svc/GetRegisterItem",{
          params:{
            roleId:this.roleId
          },
        }).then(res=>{
          console.log(res);
          this.items=JSON.parse(res.data);
        }).catch(res=>{
            console.log(res)
          }
        )
    },
    getInfo(){
      this.axios
        .get("Register.svc/GetInfo",{
          params:{
            roleId:this.roleId
          },
        }).then(res=>{
          let data=JSON.parse(res.data)[0];
          this.provision=data.provision;
          this.title=data.type;
          this.des=data.Description;
        }).catch(res=>{
            console.log(res)
          }
        )
    },
    clickRegister(){
      if(!this.agree) {
        this.$message({
          message: '请查看条款后再注册！',
          type: 'warning'
        });
        return;
      };
      let self=this;
      let emptyStr='';
      this.items.filter((ele,i)=>{
        if(ele.value=='' && ele.require=='1'){
          emptyStr+=','+ele.label;
        }
      })
      if(emptyStr!=''){
          emptyStr=emptyStr.substring(1);
          alert(emptyStr+'项为空，请填写后再注册');
          return;
      }
      let items=[];
      let formData = new FormData();
      let fileName=[];
      this.items.forEach((element,i) => {
        if(element.type=="file"){
          let temp={};
          let file=self.$refs[element.infoKey][0].$el.firstElementChild.files[0];
          formData.append(element.infoKey,file);
          temp["key"]=element.infoKey;
          if(file==undefined){
            temp["fileName"]="";
          }else{
            temp["fileName"]=file.name;
          }
          fileName.push(temp);
        }else{
          formData.append(element.infoKey,element.value);
        }
      })
      let config={
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      let itemsStr=JSON.stringify(items);
      var path = "~/Register/";
      var url="Handler.ashx?action=register&value="+path+"&roleId="+this.roleId+"&filename="+JSON.stringify(fileName)+"";
      this.axios
        .post(url,formData,config).then(res=>{
          this.$message({
            message: '恭喜你，注册成功！',
            type: 'success'
          });
        }).catch(res=>{
            this.$message.error('注册失败！');
            console.log(res.response.data);
          }
        )
    }
  }
};
</script>

<style scoped>
.img{
  width:15%;
  height:14vh;
  background:url('../../assets/img/regUser.png') no-repeat center center;
  float:left;
}
.content {
  width: 80%;
  margin: 0 auto;
  background-color: white;
  padding: 20px 0;
}
.item-class {
  width: 50vw;
  margin-left: 80px;
  margin-top: 30px;
}
.require::before {
  content: "*";
  color: red;
  margin-right: 10px;
}
.norm::before {
  content: "";
  color: red;
  margin-right: 17px;
}
.com {
  display: inline-flex !important;
  width: 100% !important;
}
.com /deep/ .el-input__prefix{
  left: 20px;
}
.sub-content{
  width: 65vw;
  margin-left: 80px;
}
.header-info{
  border-bottom: 1px solid #ddd;
  height: 16vh;
}
.footer{
  border: 1px solid #ddd;
}
._footer{
  margin: 20px;
  background-color: #eee;
  line-height: 30px;
  font-size: 14px;
  text-indent: 2em;
}
._footer-hidden{
  height: 90px;
  overflow: hidden;
}
._footer p{
  margin: 0;
  padding: 0 15px;
}
.all{
  margin-left: 65px;
  margin-bottom: 15px;
}
.content /deep/ .el-button{
  padding:10px 40px;
  border-radius: 0;
}
.btn{
  text-align: center;
}
</style>
