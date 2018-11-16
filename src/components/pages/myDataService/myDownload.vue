<template>
  <div style="background-color:white;margin-right:15px">
    <my-header info='我的下载'></my-header>
    <div class="main">
      <el-row style="line-height:40px;">
        <el-col :span="5" style="padding-right:20px;margin-top:-2px;">
          <el-input v-model="inputKey" @change="search" @keyup.enter="search" placeholder="搜索"></el-input>
        </el-col>
        <el-col :span="1">
          <span style="float: right;">日期：</span>
        </el-col>
        <el-col :span="10">
          <el-date-picker
            v-model="startTime"
            type="date"
            clear-icon=''
            value-format="yyyy-MM-dd"
            @change="getMyDownload"
            placeholder="选择起始时间">
          </el-date-picker> 至
          <el-date-picker
            clear-icon=''
            v-model="endTime"
            value-format="yyyy-MM-dd"
            type="date"
            @change="getMyDownload"
            placeholder="选择终止时间">
          </el-date-picker>
        </el-col>
        <el-col :span="4" offset="4">
          <el-button class='btn' type="danger" @click="del" size='mini' icon="el-icon-delete">删除</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <my-table pageSize="10" v-on:selectionChange="selectionChange" v-on:handleEdit="handleEdit" :tableColName=tableColName :tableData=tableData></my-table>
        </el-col>
      </el-row>
      <el-dialog
        title="详细"
        :visible.sync="edit"
        width="40%"
        class="dialog">
        <my-specific :info="editRow"></my-specific>
        <span slot="footer" class="dialog-footer">
          <el-button @click="edit = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import myHeader from "../systemAdmin/header";
import myTable from "../systemAdmin/table";
import mySpecific from "./specific";
import profession from "../../../utils/profession.js";
export default {
  data(){
    return {
      edit:false,
      editRow:[],
      startTime:'',
      endTime:'',
      selectedRow: [],
      tableData: [],
      originData: [],
      tableColName: [
        {
          label: "",
          property: "index",
          type: "selection",
          width: "100"
        },
        {
          label: "序号",
          property: "index",
          type: "index",
          width: "100"
        },
        {
          label: "文件名称",
          property: "fileName",
          type: "",
          width: ""
        },
        {
          label: "下载时间",
          property: "downLoadTime",
          type: "",
          width: ""
        },
        {
          label: "详细",
          property: "option",
          type: "",
          width: "250"
        }
      ],
    } 
  },
   components: {
    myHeader,
    myTable,
    mySpecific
  },
  mounted(){
    let now=new Date();
    this.endTime = this._global.formatDate(now,'yyyy-MM-dd');
    this.startTime = this._global.formatDate(new Date(now.setDate(now.getDate()-1)),'yyyy-MM-dd');
    this.getMyDownload();
  },
  methods:{
    getMyDownload(){
      this.axios
        .get("SystemAdmin.svc/MyDownload",{
          params:{
            startTime:this.startTime,
            endTime:this.endTime 
          }
        })
        .then(res => {
          let data = JSON.parse(res.data);
          data.forEach(ele => {
            for (const key in ele) {
              if (ele[key] == null) {
                ele[key] = "";
              }
            }
          });
          this.originData = data;
          this.tableData = data;
        })
        .catch(res => console.log(res.response.data));
    },
    selectionChange(row){
      this.selectedRow=row;
    },
    del(){
      if(!confirm('是否要删除？')) return;
      let ids = [];
      this.selectedRow.forEach(ele => {
        ids.push(ele.id);
      });
      this.axios
        .get("SystemAdmin.svc/DelMyDownload",{
          params:{
            ids:JSON.stringify(ids)
          }
        })
        .then(res => {
          alert("删除成功！");
          this.getMyDownload();
        })
        .catch(res => {
          alert("删除失败");
          console.log(res.response.data);
        });
    },
    save(){
      let id=this.editRow.id;
      this.axios
        .get("SystemAdmin.svc/SaveMyDownload",{
          params:{
            id:id
          }
        })
        .then(res => {
          alert("保存成功！");
          this.edit=false;
          this.getMyDownload();
        })
        .catch(res => {
          alert("保存失败");
          console.log(res.response.data);
        });
    },
    handleEdit(index,row){
      this.edit=true;
      this.editRow=row;
    },
    search(){
      let excludeField = ["id","citySite","citySite","date","downState","elementCn","elementEn","downTime","elementEn","moduleEnName","provinceData","timeInterval","userName"];
      this.tableData = profession.search(this.originData,this.inputKey,excludeField);
    }
  }
}
</script>

<style scoped>
.main {
  margin-left: 20px;
  padding-top: 20px;
}
.el-row {
  padding-bottom: 20px;
}
.btn{
  float: right;
  margin-right: 20px;
}
.dialog /deep/ .el-dialog__title{
  font-weight: bold !important;
  font-size: 24px;
}
.dialog /deep/ .el-dialog__body{
  padding: 10px 20px !important;
}
.dialog /deep/ .el-dialog__header{
  padding: 20px 19px 22px !important;
  border-bottom: 1px solid #ccc !important;
}
</style>