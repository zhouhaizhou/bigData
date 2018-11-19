<template>
  <div style="background-color:white;margin-right:15px">
    <my-header info='相关成果管理'></my-header>
    <div class="main">
      <el-row>
        <el-col :span="5" style="padding-right:20px;margin-top:-2px;">
          <el-input v-model="inputKey" @change="search" @keyup.enter="search" placeholder="搜索"></el-input>
        </el-col>
        <el-col :span="4" offset="15">
          <el-button class='btn' type="primary" @click="add('')" size='mini' icon="el-icon-plus">添加</el-button>
          <el-button class='btn' type="danger" @click="del" size='mini' icon="el-icon-delete">删除</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <my-table pageSize="10" v-on:selectionChange="selectionChange" activeTxt='已审核' inactiveTxt='未审核' v-on:handleEdit="handleEdit" :tableColName=tableColName :tableData=tableData></my-table>
        </el-col>
      </el-row>
      <el-dialog class="dialog" :title="title" :visible.sync="edit" width="40%">
        <el-row v-for="(item,index) in dialog" :key=index style="line-height:40px;" v-if="!(UserToken.Account=='Administrator'&&title=='添加'&&index==dialog.length-1)">
          <el-col :span="3" :offset="1" style="text-align:right;" >
            <span>{{item.label}}：</span>
          </el-col>
          <el-col :span="18">
            <el-input v-if="item.label=='名称'||item.label=='链接'"  v-model="item.value"></el-input>
            <el-select v-else-if="item.label=='类别'" v-model="item.value" :disabled="title=='编辑'" style="width:100%;">
              <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value">
              </el-option>
            </el-select>
            <el-switch
              v-else
              v-model="item.value"
              width=60
              active-value="1"
              inactive-value='0'
              active-color="#13ce66"
              inactive-color="#ccc">
            </el-switch>
            
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
import myHeader from "./header";
import myTable from "./table";
import profession from "../../../utils/profession.js";
import {mapState} from 'vuex';
export default {
  components: {
    myHeader,
    myTable
  },
  data() {
    return {
      edit: false,
      editRowId:'',
      inputKey: "",
      title: "添加",
      selectedRow: [],
      tableData: [],
      originData: [],
      tableColName: [
        {
          label: "",
          property: "index",
          type: "selection",
          width: "40"
        },
        {
          label: "序号",
          property: "index",
          type: "index",
          width: "40"
        },
        {
          label: "成果名称",
          property: "name",
          type: "",
          width: ""
        },
        {
          label: "链接地址",
          property: "url",
          type: "",
          width: ""
        },
        {
          label: "类型",
          property: "typeTxt",
          type: "",
          width: "100"
        },
        {
          label: "创建者",
          property: "author",
          type: "",
          width: "100"
        },
        {
          label: "创建时间",
          property: "createTime",
          type: "",
          width: "150"
        },{
          label: "审核",
          property: "status",
          type: "",
          width: "100"
        },{
          label: "审核时间",
          property: "checkTime",
          type: "",
          width: "150"
        },
        {
          label: "编辑",
          property: "option",
          type: "",
          width: "80"
        }
      ],
      constDialog: [
        {
          label: "类别",
          value: "",
          options: [
            {
              label: "文章",
              value: "article"
            },
            {
              label: "专著",
              value: "book"
            },
            {
              label: "软件著作权",
              value: "copyright"
            }
          ]
        },
        {
          label: "名称",
          value: ""
        },
        {
          label: "链接",
          value: ""
        },
        {
          label: "通过审核",
          value: ""
        }
      ],
      dialog:[]
    };
  },
  computed:{
    ...mapState(["UserToken"]),
  },
  watch:{
    title(val){
      if(this.UserToken.Account!='Administrator'){
        if(val=='添加'){
          this.dialog=this.constDialog.slice(0,this.constDialog.length-1);
        }else {
          this.dialog=this.dialog;
        }
      }
    }
  },
  mounted() {
    this.getRelateResult();
    if(this.UserToken.Account!='Administrator'){
      this.dialog=this.constDialog.slice(0,this.constDialog.length-1);
    }else{
      this.dialog=this.constDialog
    }
  },
  methods: {
    getRelateResult() {
      this.axios
        .get("SystemAdmin.svc/GetRelateResult")
        .then(res => {
          let data = JSON.parse(res.data.replace(/enable/g,'status'));
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
    selectionChange(row) {
      this.selectedRow = row;
    },
    handleEdit(index,row) {
      this.title = "编辑";
      this.edit = true;
      this.editRowId=row.id;
      this.dialog[0].value=row.type;
      this.dialog[1].value=row.name;
      this.dialog[2].value=row.url;
      if(this.dialog.length==4){
        let val=row.status;
        val=val?"1":"0"
        this.dialog[3].value=val;
      }
    },
    add() {
      this.title = "添加";
      this.edit = true;
      this.dialog[0].value='';
      this.dialog[1].value='';
      this.dialog[2].value='';
    },
    del() {
      if(!confirm('是否要删除？')) return;
      let ids = [];
      this.selectedRow.forEach(ele => {
        ids.push(ele.id);
      });
      this.axios
        .get("SystemAdmin.svc/DelRelateResult", {
          params: {
            ids: JSON.stringify(ids)
          }
        })
        .then(res => {
          alert("删除成功！");
          this.getRelateResult();
        })
        .catch(res => {
          alert("删除失败");
          console.log(res.response.data);
        });
    },
    save() {
      let id=this.editRowId;
      id=this.title=='添加'?'':id;
      this.axios
        .get("SystemAdmin.svc/SaveRelateResult",{
          params:{
            type:this.dialog[0].value,
            name:this.dialog[1].value,
            url:this.dialog[2].value,
            status:this.dialog[3].value,
            id:id
          }
        })
        .then(res => {
           alert("保存成功！");
           this.getRelateResult();
           this.edit=false;
        })
        .catch(res => {
          console.log(res.response.data);
          alert("保存失败！");
        });
    },
    search() {
      let excludeField = ["id"];
      this.tableData = profession.search(
        this.originData,
        this.inputKey,
        excludeField
      );
    }
  }
};
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
  padding: 20px 20px !important;
}
.dialog /deep/ .el-dialog__header{
  padding: 20px 19px 22px !important;
  border-bottom: 1px solid #ccc !important;
}

</style>