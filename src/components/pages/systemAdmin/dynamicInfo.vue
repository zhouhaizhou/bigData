<template>
  <div style="background-color:white;padding-right:15px">
    <header-info info='动态资讯管理'></header-info>
    <div class="main" v-show="showInfo">
      <el-row>
        <el-col :span="5">
          <el-button type="primary" @click="add('')" size='mini' icon="el-icon-plus">添加</el-button>
          <el-button type="danger" @click="del" size='mini' icon="el-icon-delete">删除</el-button>
        </el-col>
      </el-row>
      <el-row style="padding-bottom:0;">
        <el-col :span="24">
          <my-table :pageSize="pageSize"  v-on:selectionChange="selectionChange" v-on:handleEdit="edit" :tableColName=tableColName :tableData=tableData></my-table>
        </el-col>
      </el-row>
    </div>
    <div class="edit-status">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { joinRouter } from "@/utils/recursion-router";
import headerInfo from "./header";
import myTable from './table'
export default {
  components: {
    headerInfo,
    myTable
  },
  data() {
    return {
      showInfo:true,
      pageSize:5,
      selectedRow:[],
      tableColName: [
        {
          label: "",
          property: "index",
          type: "selection",
          width:'80'
        },
        {
          label: "序号",
          property: "index",
          type: "index",
          width:'80'
        },
        {
          label: "资讯标题",
          property: "Item",
          type: "",
          width:''
        },
        {
          label: "更新时间",
          property: "Date",
          type: "",
          width:''
        },
        {
          label: "操作",
          property: "option",
          type: "",
          width:'80'
        }
      ],
      tableData: []
    };
  },
  watch: {
    $route: {
      handler(to,from) {
        if(from.name=='info'){
          this.showInfo=true;
          this.getDynamicInfo();
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState(["permissionList"])
  },
  mounted(){
    this.getDynamicInfo();
  },
  methods: {
    getDynamicInfo(){
      this.axios
        .get("SystemAdmin.svc/GetDynamicInfo")
        .then(res => {
          let data=JSON.parse(res.data);
          this.tableData=data;
        })
        .catch(res => console.log(res));
    },
    selectionChange(row){
      this.selectedRow=row;
    },
    add(content){
      let component = require("./addDynamicInfo").default;
      let parentEntityName=this.$route.meta.entityName;
      let dynamicRoute = [
        {
          path: "info",
          name: "info",
          meta: {
            parentEntityName: parentEntityName
          },
          component: component
        }
      ];
      let route = this.permissionList;
      joinRouter(route, dynamicRoute, parentEntityName);
      this.$router.addRoutes(route);
      this.showInfo = false;
      this.$router.push({ name: "info",params:{'data':content} });
    },
    del(){
      let ids=[];
      this.selectedRow.forEach(ele=>{
        ids.push(ele.id);
      });
      this.axios
        .get("SystemAdmin.svc/DelDynamicInfo",{
          params:{
            ids:JSON.stringify(ids)
          }
        })
        .then(res => {
          alert("删除成功！");
          this.getDynamicInfo();
          // this.tableData.forEach((ele,i)=>{
          // });
        })
        .catch(res => {
          alert("删除失败");console.log(res)
        });
    },
    edit(index,row){
      this.add(row);
    }
  }
};
</script>

<style scoped>
.main,.edit-status{
  margin-left: 20px;
  padding-top: 20px;
}
.el-row{
  padding-bottom: 20px;
}
</style>