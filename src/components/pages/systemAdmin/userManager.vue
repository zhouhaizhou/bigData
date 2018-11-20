<template>
  <div style="background-color:white;margin-right:15px">
    <my-header info='用户管理'></my-header>
    <div class="main">
      <el-row>
        <el-col :span="5">
          <el-input v-model="inputKey" @change="search" @keyup.enter="search" placeholder="搜索"></el-input>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="24">
          <my-table pageSize="10"  v-on:selectionChange="selectionChange" v-on:handleEdit="handleEdit" activeTxt='激活' inactiveTxt='停用' :tableColName=tableColName :tableData=tableData></my-table>
        </el-col>
      </el-row>
      <el-dialog
        :title="title"
        :visible.sync="edit"
        class="dialog"
        width="30%">
        <el-row v-for="(item,index) in dialog" :key=index  style="line-height:40px;">
          <el-col :span="3" :offset="1">
            <span>{{item.label}}：</span>
          </el-col>
          <el-col :span="15">
            <el-input v-if="item.label!='状态'&&item.label!='星级'" :disabled="item.label=='类型'||item.label=='账号'" v-model="item.value" ></el-input>
            <el-radio-group v-else-if="item.label=='状态'" v-model="item.value">
              <el-radio :label="1" class="active">激活</el-radio>
              <el-radio :label="0" class="stop">停用</el-radio>
            </el-radio-group>
            <el-select v-else v-model="item.value" style="width:100%;">
              <el-option
                v-for="option in options"
                :key="option.value"
                :label="option.label"
                :value="option.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="edit = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import myHeader from './header'
import myTable from './table'
import profession from '../../../utils/profession.js'
export default {
  data(){
    return {
      title:'编辑',
      edit:false,
      inputKey:'',
      currentDataId:'',
      tableColName: [
        {
          label: "序号",
          property: "index",
          type: "index",
          width:'50'
        },
        {
          label: "账号",
          property: "account",
          type: "",
          width:''
        },
        {
          label: "姓名",
          property: "userName",
          type: "",
          width:'140'
        },{
          label: "手机号",
          property: "mobile",
          type: "",
          width:'130'
        },
        {
          label: "用户类型",
          property: "userType",
          type: "",
          width:'150'
        },{
          label: "用户星级",
          property: "userStar",
          type: "",
          width:'60'
        },
        {
          label: "状态",
          property: "status",
          type: "",
          width:'80'
        },{
          label: "创建时间",
          property: "createTime",
          type: "",
          width:'180'
        },
        {
          label: "更新时间",
          property: "updateTime",
          type: "",
          width:'180'
        },
        {
          label: "编辑",
          property: "option",
          type: "",
          width:'80'
        }
      ],
      tableData:[],
      dialog:[
        {
          label:'账号',
          value:''
        },{
          label:'姓名',
          value:''
        },{
          label:'手机',
          value:''
        },{
          label:'星级',
          value:''
        },{
          label:'类型',
          value:''
        },{
          label:'状态',
          value:''
        }
      ],
      options:[
        {
          label:'无',
          value:0
        },{
          label:'一星',
          value:1
        },{
          label:'二星',
          value:2
        },{
          label:'三星',
          value:3
        },{
          label:'四星',
          value:4
        },{
          label:'五星',
          value:5
        }
      ],
      originData:[]
    } 
  },
  components:{
    myHeader,
    myTable
  },
  mounted(){
    this.getUser();
  },
  methods:{
    getUser(){
      this.axios
        .get("SystemAdmin.svc/GetUser")
        .then(res => {
          let data=JSON.parse(res.data.replace(/userStatus/g,'status'));
          data.forEach(ele=>{
            for (const key in ele) {
              if (ele[key]==null) {
                ele[key]='';
              }
            }
          })
          this.originData=data;
          this.tableData=data;
        })
        .catch(res =>console.log(res.response.data));
    },
    selectionChange(){},
    handleEdit(index,row){
      this.title='编辑',
      this.edit=true;
      this.dialog[0].value=row.account;
      this.dialog[1].value=row.userName;
      this.dialog[2].value=row.mobile;
      this.dialog[3].value=row.userLevel;
      this.dialog[4].value=row.userType;
      this.dialog[5].value=row.status=="1"?1:0;
      this.currentDataId=row.id
    },
    save(){
      this.axios
        .get("SystemAdmin.svc/UserManagerSave",{
          params:{
            values:JSON.stringify(this.dialog),
            id:this.currentDataId
        }})
        .then(res => {
          alert("修改成功！");
          this.edit=false;
          this.getUser();
        })
        .catch(res => {
          console.log(res.response.data);
          alert("修改失败！")
        });
    },
    search(){
      let excludeField=['id','userStatus'];
      this.tableData = profession.search(this.originData,this.inputKey,excludeField,"激活","停用");
    }
  }
}
</script>

<style scoped>
.main{
  margin-left: 20px;
  padding-top: 20px;
}
.el-row{
  padding-bottom: 20px;
}
.active{
  color:rgb(0, 162, 92);
}
.stop{
  color: red;
}
.active /deep/ .el-radio__input.is-checked+.el-radio__label{
  color:rgb(0, 162, 92);
}
.stop /deep/ .el-radio__input.is-checked+.el-radio__label{
  color:red;
}
.dialog /deep/ .el-dialog__title{
  font-weight: bold !important;
  font-size: 24px;
}
.dialog /deep/ .el-dialog__body{
  padding: 20px 20px !important;
}
.dialog /deep/ .el-dialog__header{
  padding: 20px 19px 22px !important;
  border-bottom: 1px solid #ccc !important;
}
</style>