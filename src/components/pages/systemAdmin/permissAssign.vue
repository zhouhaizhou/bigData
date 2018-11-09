<template>
  <div class="content" ref="content">
    <header-info info='权限分配'></header-info>
    <div class="main">
      <el-row>
        <el-col :span="6" style="padding-left:20px;">
          <el-table ref="singleTable" class='table' stripe header-cell-style='text-align:center' cell-style='text-align:center' @current-change="handleCurrentChange" :data="roleData" border="true" highlight-current-row >
            <el-table-column :type="colName.type" v-for="(colName,index) in leftColName" :key=index :property=colName.property :label=colName.label>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="17" :offset="1">
          <el-row>
            <el-col :span="3">
              <el-button @click="toggle" :icon="icon">{{status}}</el-button>
            </el-col>
            <el-col :span="5">
              <el-input type='text' @change="search" @keyup.enter="search" v-model="inputKey" placeholder="搜索" suffix-icon="el-icon-search"></el-input>
            </el-col>
            <el-col :span="3" :offset="13">
              <el-button type="primary" @click="saveAuth">保存</el-button>
            </el-col>
          </el-row>
          <el-tree class="tree" auto-expand-parent :data="roleAllAuth" show-checkbox node-key="moduleId" ref="tree" highlight-current :props="defaultProps">
          </el-tree>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import headerInfo from './header'
export default {
  components:{
    headerInfo
  },
  data() {
    return {
      status: "展开",
      inputKey:'',
      leftColName: [
        {
          label: "序号",
          property: "index",
          type: "index"
        },
        {
          label: "角色名称",
          property: "Description",
          type: ""
        }
      ],
      roleData: [],
      roleAllAuth: [],
      defaultProps: {
        children: "children",
        label: "moduleNameFlag"
      },
      selectedRoleId: null
    };
  },
  mounted() {
    this.getRoleData(); //获取左边的角色

    setTimeout(() => {
      this.setPagePaddingBottom();
    }, 100);
  },
  computed: {
    icon() {
      if (this.status == "收起") {
        return "el-icon-caret-top";
      } else {
        return "el-icon-caret-bottom";
      }
    }
  },
  methods: {
    ...mapMutations(["setMainHeight", "changeUser"]),
    setPagePaddingBottom() {
      setTimeout(()=>{
        let contentH = document.querySelector(".content").clientHeight + 20;
        let obj = {
          contentH: contentH,
          self: this,
          ref: "content"
        };
        this.setMainHeight(obj);
      },500)
    },
    getRoleData() {
      //获取左边所有的角色
      this.axios
        .get("SystemAdmin.svc/GetRoleData")
        .then(res => {
          this.roleData = JSON.parse(res.data);
          this.selectedRoleId = this.roleData[0].Id;
          this.$refs.singleTable.setCurrentRow(this.roleData[0]);
          this.getAllAuth(); //获取右边所有的权限
        })
        .catch(res => console.log(res));
    },
    //获取右边所有权限
    getAllAuth() {
      this.axios
        .get("SystemAdmin.svc/GetRoleAuth")
        .then(res => {
          this.roleAllAuth = JSON.parse(res.data);
          this.roleAllAuth.forEach(ele => {
            if (ele.children.length == 0) {
              ele.disabled = true;
            }
          });
          this.getRoleExistAuth(this.selectedRoleId);
        })
        .catch(res => console.log(res));
    },
    //获取该角色拥有的权限
    getRoleExistAuth(roleId) {
      let self = this;
      this.axios
        .get("SystemAdmin.svc/GetRoleExistAuth", {
          params: {
            roleId: roleId
          }
        })
        .then(res => {
          let strData = res.data;
          strData = strData
            .replace(/ModuleID/g, "moduleId")
            .replace(/ModuleName/g, "moduleName")
            .replace(/ModuleNameFlag/g, "moduleNameFlag")
            .replace(/ParentModuleID/g, "parentModuleId");
          let data = JSON.parse(strData);
          console.log(data);
          self.$refs.tree.setCheckedNodes(data);
          // this.roleAllAuth=JSON.parse(res.data);
        })
        .catch(res => console.log(res));
    },
    handleCurrentChange(currentRow) {
      this.clearSearch();
      this.selectedRoleId = currentRow.Id;
      this.getRoleExistAuth(this.selectedRoleId);
    },
    //保存设置的新权限
    saveAuth() {
      let data = this.$refs.tree.getCheckedNodes();
      let saveData = [];
      data.forEach(element => {
        let obj = {};
        obj.moduleId = element.moduleId;
        saveData.push(obj);
      });
      this.axios
        .get("SystemAdmin.svc/SaveAuth", {
          params: {
            auth: JSON.stringify(saveData),
            roleId: this.selectedRoleId
          }
        })
        .then(res => {
          this.changeUser(true);
          alert("权限设置成功！");
        })
        .catch(res => {
          alert("权限设置失败！");
          console.log(res);
        });
    },
    toggle() {
      if (this.status == "展开") {
        this.status = "收起";
        this.expandNode(true);
      } else {
        this.status = "展开";
        this.expandNode(false);
      }
    },
    expandNode(val) {
      for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
        this.$refs.tree.store._getAllNodes()[i].expanded = val;
      }
    },
    search(){
      if(this.inputKey=='') return;
      let data=this.$refs.tree.store._getAllNodes();
      let domObj=this.$refs.tree.$el.children;
      let self=this;
      //遍历找到匹配到的节点并展开
      data.forEach((ele,i)=>{
        let val=ele.data.moduleNameFlag;
        if(val.indexOf(self.inputKey)>=0){
          data[i].expanded=true;
          if(data[i].parent){
            this.iteratorSearchNodeParent(data[i].parent);
          }
        }
      });
       //遍历找到匹配的节点并加样式
      setTimeout(()=>{this.setStyle(domObj)},100);  //等到所有节点展开之后再设置样式，要不然获取不到dom节点
    },
    iteratorSearchNodeParent(data){
      if(data){
        data.expanded=true;
        let dataParent=data.parent;
        this.iteratorSearchNodeParent(dataParent);
      }
    },
    setStyle(domObj){
      for(let i=0;i<domObj.length;i++){
        let ele=domObj[i];
        ele.classList.remove('node-bg-color');
        if(ele.innerText.indexOf(this.inputKey)>=0&&ele.className.indexOf('el-tree-node__content')>=0){
          ele.classList.add('node-bg-color');
        }
        if(ele.children){
          this.setStyle(ele.children);
        }
      }
    },
    clearSearch(){  //清除搜索效果
      let domObj=this.$refs.tree.$el.children;
      this.clearStyle(domObj);  //
      this.inputKey='';
    },
    clearStyle(domObj){  //清除搜索样式
      for(let i=0;i<domObj.length;i++){
        let ele=domObj[i];
        ele.classList.remove('node-bg-color');
        if(ele.children){
          this.clearStyle(ele.children);
        }
      }
    }
  }
};
</script>

<style scoped>
.content {
  background-color: white;
  margin-right:15px;
}

.main {
  padding-top: 20px;
}
.table{
  padding-bottom:50px;
}

.left,
.right {
  background-color: white;
}
.tree {
  border: 1px solid #ccc;
  width: 98%;
  margin-top: 2vh;
  border-radius: 5px;
  padding-bottom:20px;
}
.tree /deep/ .el-tree-node__content{
  transition:all 1s;
}
.tree /deep/ .node-bg-color{
  background-color: skyblue;
  opacity: 1;
}

</style>