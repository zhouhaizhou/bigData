<template>
 <div class="content">
   <el-form :model="info" ref="info" label-width="10vw" class="info-class" :rules="relues">
     <el-form-item :label="item.lable" :prop="item.infokey" v-for="(item,index) in items" :key="index">
       <el-row>
         <el-col :span="18">
           <!-- <el-input v-if='item.type=="select"' :type="item.type" class="require" v-model="item.value" @change="inputChange(item.value,item.infoType)" autocomplete="off"></el-input> -->
            <el-select v-model="item.value"  class="require" v-if='item.type=="select"' placeholder="请选择">
              <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.label"
                :value="option.value">
              </el-option>
            </el-select>
           <el-input v-else :type="item.type" class="require" v-model="item.value" @change="inputChange(item.value,item.infokey)" autocomplete="off"></el-input>
         </el-col>
        <el-col :offset="2" :span="4" v-if='item.type=="account"'>
           <el-button type="primary" @click="checkAccount" >验证用户名</el-button>
        </el-col>
       </el-row>
     </el-form-item>
     <!-- <el-form-item label="用户密码：" prop="password">
       <el-row>
         <el-col :span="18">
           <el-input class="require" v-model="info.password" autocomplete="off"></el-input>
         </el-col>
       </el-row>
     </el-form-item> -->
   </el-form>
 </div>
</template>

<script>
export default {
  data() {
    var validatorAccount = (rule, value, callback) => {
      var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if (!re.test(value)) {
          callback("请输入有效的邮箱");
        }
        callback();
      }
    };
    var validatorcheckPass=(rule, value, callback)=>{
      let self=this;
       if (value === "") {
        callback(new Error("请确认密码"));
      } else if(!(value===self.info.pass)){
          callback(new Error("两次输入的密码不一致"));
      }else{
        callback();
      }
    };
    return {
      info: {
        account: "",
        pass:'',
        checkPass:''
      },
      items:[
        {lable:'用户名(有效邮箱)：',infokey:'account',value:'',isShow:true,type:'text',ordex:1},
        {lable:'用户密码：',infokey:'pass',value:'',isShow:true,type:'password',ordex:1},
        {lable:'密码确认：',infokey:'checkPass',value:'',isShow:true,type:'password',ordex:2},
        {lable:'用户真实姓名',infokey:'name',value:'',isShow:true,type:'text',ordex:3},
        {lable:'国家：',infokey:'country',value:'',isShow:true,type:'select',ordex:4,
          options: [{
            value: 'china',
            label: '中国'
          }]
        },
        {lable:'省：',infokey:'province',value:'',isShow:true,type:'select',ordex:5,
          options: [{
            value: 'shanghai',
            label: '上海'
          }]
        },
        {lable:'证件类型：',infokey:'credentialType',value:'',isShow:true,type:'select',ordex:6,
          options: [{
            value: '1',
            label: '二代身份证'
          }]
        },
        {lable:'手持证件照：',infokey:'crePhone',value:'',isShow:true,type:'file',ordex:3},
        {lable:'使用目的：',infokey:'target',value:'',isShow:true,type:'textarea',ordex:3},
        {lable:'学历：',infokey:'education',value:'',isShow:true,type:'select',ordex:6,
          options: [{
            value: '本科',
            label: '本科'
          }]
        },
        {lable:'专业：',infokey:'department',value:'',isShow:true,type:'text',ordex:3},
        {lable:'工作单位：',infokey:'wkunit',value:'',isShow:true,type:'text',ordex:3},
        {lable:'单位性质：',infokey:'unitProperties',value:'',isShow:true,type:'select',ordex:3,
          options:[
            {
              value:'国企',
              label:'国企'
            }
          ]
        },
      ],
      relues: {
        account: [{ validator: validatorAccount, trigger: "blur" }],
        checkPass:[{validator: validatorcheckPass, trigger: "blur"}]
      }
    };
  },
  methods: {
    checkAccount() {
      alert();
    },
    inputChange(val,key){
      this.info[key]=val;
    }
  }
};
</script>

<style>
.content {
  width: 80%;
  margin: 0 auto;
  background-color: white;
  padding: 20px 0;
}
.info-class {
  width: 50vw;
}
.require::before {
  content: "*";
  color: red;
  margin-right: 10px;
}
.require {
  display: inline-flex;
  width:100%;
}
</style>
