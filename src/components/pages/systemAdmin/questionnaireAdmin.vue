<template>
  <div class="body-style">
    <div class="title-wrap">
      <div class="nav-marker"></div>
      <div class="sub-title">调查问卷管理</div>
    </div>
    <div class="content-wrap">
      <div class="head-wrap">
        <!--工具条-->
        <div class="button-row-wrap">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd" >添加</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="batchRemove" :disabled="this.sels.length===0">删除</el-button>
        </div>
        <div class="search-wrap">
          <el-input v-model="select_word" size="mini" placeholder="请输入查询内容" suffix-icon="el-icon-search" />
        </div>
      </div>
      <div class="table-wrap">
        <!--列表-->
        <el-table :data="bindTableData" style="width: 100%" border stripe highlight-current-row @selection-change="selsChange" :header-cell-style="{textAlign: 'center'}" :cell-style="{textAlign: 'center'}">

          <el-table-column type="selection">
          </el-table-column>
          <el-table-column type="index" label="序号" width="50" prop="taskNumber">
          </el-table-column>
          <el-table-column label="问卷内容" width="450" prop="question">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top" width="300">
                <p> {{ scope.row.question }}</p>
                <div slot="reference">
                  {{ scope.row.question }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="开始时间" prop="startTime">
          </el-table-column>
          <el-table-column label="结束时间" prop="endTime">
          </el-table-column>
          <el-table-column label="创建时间" prop="createTime">
          </el-table-column>
          <el-table-column label="条件" prop="condition">
          </el-table-column>
          <el-table-column label="编辑" width="100">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--工具条-->
        <el-pagination align="left" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

    </div>

    <!--编辑界面-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="问卷内容">
          <el-input type="textarea" placeholder="请输入调查问卷记录，注意：换行输入每条记录" :rows="8" v-model="editForm.question"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.startTime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.endTime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.createTime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="条件">
          <el-select v-model="editForm.condition" placeholder="请选调查对象" @change="handleSelect">
            <el-option v-for="item in menuOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" prop="enable">
          <el-radio-group v-model="editForm.enable">
            <el-radio class="radio" :label=1>是</el-radio>
            <el-radio class="radio" :label=0>否</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageSize: 10,
      select_word: "",
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      },
      dialogFormVisible: false,
      // total: 0, //总条目数，默认为0，通过后台统计获取，现在先固定
      page: 1,
      sels: [], // 列表选中列
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      // 编辑界面数据
      editForm: {
        taskNumber: "",
        question: "",
        startTime: "",
        endTime: "",
        createTime: "",
        condition: "",
        enable: ""
      },
      currentPage: 1,
      currentPageSizes: 0,
      menuOptions: [],
      selectMenu: {},
      selectIndex: null
    };
  },
  computed: {
    total() {
      return this.tableData.length;
    },
    pageSizes() {
      let numArr = [];
      for (
        let i = this.pageSize;
        i < this.total + this.pageSize;
        i = i + this.pageSize
      ) {
        numArr.push(i); //每页显示个数选择器的选项设置 [10, 20, 30, 40, 50, 100]
      }

      if (!this.currentPageSizes) {
        this.currentPageSizes = numArr[0];
      }
      return numArr;
    },

    bindTableData() {
      let data = [];
      let start = (this.currentPage - 1) * this.currentPageSizes;
      let end = this.currentPage * this.currentPageSizes;
      if (end > this.tableData.length) {
        end = this.tableData.length;
      }
      data = this.tableData.slice(start, end);
      return data.filter(d => {
        let is_del = false;
        if (!is_del) {
          if (
            d.question.indexOf(this.select_word) > -1 ||
            d.startTime.indexOf(this.select_word) > -1 ||
            d.endTime.indexOf(this.select_word) > -1 ||
            d.createTime.indexOf(this.select_word) > -1 ||
            d.condition.indexOf(this.select_word) > -1
          ) {
            return d;
          }
        }
      });
    },
    data() {
      return this.tableData.filter(d => {
        let is_del = false;
        if (!is_del) {
          if (
            d.question.indexOf(this.select_word) > -1 ||
            d.startTime.indexOf(this.select_word) > -1 ||
            d.endTime.indexOf(this.select_word) > -1 ||
            d.createTime.indexOf(this.select_word) > -1 ||
            d.condition.indexOf(this.select_word) > -1
          ) {
            return d;
          }
        }
      });
    }
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    // 获取用户列表
    getUsers() {
      let self = this;
      const para = {
        // page: this.page,
        // name: this.filters.name
      };
      this.axios
        .get("UserManager.svc/GetQuestionData", {
          params: {
            // page: this.page,
            // name: this.filters.name
          }
        })
        .then(res => {
          // this.total = res.data.total;
          // this.users = res.data.users;
          let resData = eval("(" + res.data + ")");
          //遍历数据将enable的值类型改为int
          self.tableData = resData;
          // self.total = self.tableData.length;
        });
    },
    // 显示新增界面
    handleAdd() {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.editForm = {
        //可以为模板中设置默认值，比如当前时间
        taskNumber: "",
        question: "",
        startTime: "",
        endTime: "",
        createTime: "",
        condition: "",
        enable: 1
      };
      this.getMenu();
    },
    // 点击模板中的“新增”按钮
    createData: function() {
      this.$refs.editForm.validate(valid => {
        //提交之前先核查是否遗漏填写内容
        let returnNum = this.chekedValue();
        if (returnNum != 0) {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {})
              .then(() => {
                const para = Object.assign({}, this.editForm);

                var objToStr1 = JSON.stringify(para); //将json对象转化为json字符串
                //将时间后的0去掉   00:00:00
                var objToStr=objToStr1.replace(/ 00:00:00/g,"")

                this.axios
                  .get("UserManager.svc/InsertQuestionData", {
                    params: {
                      funParams: objToStr //后台通过泛型集合解析json字符串
                    }
                  })
                  .then(res => {
                    this.$message({
                      message: "提交成功",
                      type: "success"
                    });
                    this.$refs["editForm"].resetFields();
                    this.dialogFormVisible = false;
                    this.getUsers();
                  });
              })
              .catch(e => {
                // 打印一下错误
                console.log(e);
              });
          }
        }
      });
    },
    chekedValue() {
      //提交之前先核查是否遗漏填写内容
      let p = Object.assign({}, this.editForm);
      if (p.question == "") {
        alert("请输入调查内容");
        return "0";
      } else if (p.startTime == "") {
        alert("请选择开始时间");
        return "0";
      } else if (p.endTime == "") {
        alert("请选择结束时间");
        return "0";
      } else if (p.createTime == "") {
        alert("请选择创建时间");
        return "0";
      } else if (p.condition == "") {
        alert("请选择条件");
        return "0";
      } else if (p.enable == "") {
        alert("选择是否启用");
        return "0";
      }
    },
    // 全选单选多选
    selsChange(sels) {
      this.sels = sels;
    },
    // 批量删除
    batchRemove() {
      var taskNumbers = this.sels.map(item => item.taskNumber).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          console.log(taskNumbers);
          this.axios
            .get("UserManager.svc/DeleteQuestionData", {
              params: {
                taskNumbers: taskNumbers
              }
            })
            .then(res => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getUsers(); //删除用户后重新请求数据显示列表
            });
        })
        .catch(() => {});
    },
    // 显示编辑界面
    handleEdit(index, row) {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.editForm = Object.assign({}, row);
      //将星级中的数字改为对应的汉语
      this.getMenu();
    },
    // 编辑
    updateData() {
      this.$refs.editForm.validate(valid => {
        //提交之前先核查是否遗漏填写内容
        let returnNum = this.chekedValue();
        if (returnNum != 0) {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {})
              .then(() => {
                const para = Object.assign({}, this.editForm);
                var objToStr = JSON.stringify(para); //将json对象转化为json字符串
                this.axios
                  .get("UserManager.svc/UpdateQuestionData", {
                    params: {
                      funParams: objToStr //后台通过泛型集合解析json字符串
                    }
                  })
                  .then(res => {
                    this.$message({
                      message: "提交成功",
                      type: "success"
                    });
                    this.$refs["editForm"].resetFields();
                    this.dialogFormVisible = false;
                    this.getUsers();
                  });
              })
              .catch(e => {
                // 打印一下错误
                console.log(e);
              });
          }
        }
      });
    },
    //设置星级用户选项
    getMenu() {
      this.menuOptions = [];
      const menu = [
        { name: "一星级以上用户", value: "1" },
        // { name: "一星级以上用户", value: ">=1" },
        { name: "二星级以上用户", value: "2" },
        // { name: "二星级以上用户", value: ">=2" },
        { name: "三星级以上用户", value: "3" },
        // { name: "三星级以上用户", value: ">=3" },
        { name: "四星级以上用户", value: "4" },
        // { name: "四星级以上用户", value: ">=4" },
        { name: "五星级用户", value: "5" }
      ];
      menu.forEach((item, index) => {
        this.menuOptions.push({
          label: item.name,
          value: item.value,
          index
        });
      });
    },
    //手动选星级用户
    handleSelect(index) {
      this.selectIndex = index;
      this.selectMenu = this.menuOptions[index];
    },
    //操作分页
    handleSizeChange(val) {
      this.currentPageSizes = val; //改变
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUsers(); //从数据库中获取每条记录
    }
  }
};
</script>

<style scoped>
.body-style {
  background-color: white;
  width: 90%;
  margin-top: 2%;
  margin-bottom: 2%;
}
.title-wrap {
  padding-left: 2%;
  padding-top: 1%;
  padding-bottom: 1%;
  width: 98%;
  height: 2.5vh;
  border-bottom: solid #808080c2;
  border-bottom-width: 0.5px;
}
.nav-marker {
  float: left;
  width: 0.5vw;
  height: 2.5vh;
  background-color: #1bbf9d;
}
.sub-title {
  float: left;
  margin-left: 0.8vw;
  font-size: 1vw;
  font-weight: bold;
}
.content-wrap {
  /* padding-left: 7%; */
  padding-top: 1%;
  padding-bottom: 2%;
  padding-right: 2%;
}
.head-wrap {
  height: 5vh;
  margin-left: 2%;
}
.button-row-wrap {
  float: right;
}
.search-wrap {
  float: left;
  width: 15%;
}
.table-wrap {
  margin-left: 2%;
}
.table-wrap >>> .el-table td div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* .table-wrap >>> .el-pagination .el-pagination__total,.table-wrap >>> .el-pagination .el-pagination__sizes,.table-wrap >>> .el-pagination .btn-prev,.table-wrap >>> .el-pagination .el-pager,.table-wrap >>> .el-pagination .btn-next{
  float: left;
} */
.cellTable {
  text-align: center;
}
</style>


