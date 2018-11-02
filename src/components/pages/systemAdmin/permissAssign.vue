<template>
  <div class="content" ref="content">
    <div class="header">
      <div class="strip"></div>
      <div class="header-text">权限分配</div>
    </div>
    <div class="main">
      <div class="left">
        <el-table ref="singleTable"  @current-change="handleCurrentChange" :data="roleData" border=true highlight-current-row  style="width: 100%">
          <el-table-column :type="colName.type" v-for="(colName,index) in leftColName" :key=index :property=colName.property :label=colName.label :width=colName.width>
          </el-table-column>
        </el-table>
      </div>
      <div class="right">
        <!-- <el-tree :data="data" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
        </el-tree> -->
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      leftColName: [
        {
          label: "序号",
          property: "index",
          width: "50",
          type: "index"
        },
        {
          label: "角色名称",
          property: "Description",
          width: "200",
          type: ""
        }
      ],
      roleData:[],
    };
  },
  mounted(){
    this.getRoleData();
    setTimeout(()=>{ this.setPagePaddingBottom()},100);
  },
  methods: {
    ...mapMutations(['setMainHeight']),
    setPagePaddingBottom(){
      let contentH=document.querySelector('.content').clientHeight+20;
      let obj={
        contentH:contentH,
        self:this,
        ref:'content'
      }
      this.setMainHeight(obj);
    },
    getRoleData(){
       this.axios
        .get("SystemAdmin.svc/GetRoleData").then(res => {
          this.roleData=JSON.parse(res.data);
        })
        .catch(res => console.log(res));
    },
    handleCurrentChange(currentRow){
      let currentRoleId=currentRow.Id;
      this.axios
        .get("SystemAdmin.svc/GetRoleAuth").then(res => {
          this.roleData=JSON.parse(res.data);
        })
        .catch(res => console.log(res));
    }
  }
};
</script>

<style scoped>
.content {
  margin-top: 2vh;
  background-color: white;
}
.header {
  border-bottom: 1px solid #ccc;
}
.strip {
  width: 10px;
  height: 25px;
  float: left;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 7px;
  background-color: rgb(0, 195, 154);
}
.header-text {
  line-height: 45px;
}
</style>