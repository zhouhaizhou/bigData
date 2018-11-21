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
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">添加</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="batchRemove" :disabled="this.sels.length===0">删除</el-button>
        </div>
        <div class="search-wrap">
          <el-input v-model="select_word" size="mini" placeholder="筛选关键词" />
        </div>
      </div>
      <div class="table-wrap">
        <!--列表-->
        <el-table :data="data" style="width: 100%" border stripe highlight-current-row @selection-change="selsChange" :header-cell-style="{textAlign: 'center'}" :cell-style="{textAlign: 'center'}">

          <el-table-column v-if='index<tableColName.length-1' :type="colName.type" v-for="(colName,index) in tableColName" :width='colName.width' :key="index" :prop="colName.prop" :label="colName.label">
          </el-table-column>
          <el-table-column v-if='index==tableColName.length-1' :type="colName.type" v-for="(colName,index) in tableColName" :width='colName.width' :key="index" :prop="colName.prop" :label="colName.label">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--工具条-->
        <el-pagination align="right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
        <el-form-item label="条件" prop="condition">
          <el-input v-model="editForm.condition" auto-complete="off"></el-input>
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
  props: {
    tableColName: Array,
    tableData: Array,
    editForm: Object, //父组件自定义编辑页面要显示的选项
    searchKeys: Array,
    url: Object
  },
  data() {
    return {
      pageSize: 10,
      select_word: "",
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "添加"
      },
      dialogFormVisible: false,
      total: 60, //总条目数，默认为0，通过后台统计获取，现在先固定
      page: 1,
      sels: [], // 列表选中列
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      currentPage: 1,
      currentPageSizes: 0
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
        numArr.push(i);
      }
      if (!this.currentPageSizes) {
        this.currentPageSizes = numArr[0];
      }
      return numArr;
    },
    data() {
      return this.tableData.filter(d => {
        let is_del = false;
        //将要筛选的内容统一整成一个字符串
        let str = "";
        for (let i = 0; i < this.searchKeys.length; i++) {
          str += d[searchKeys[i]];
        }
        if (!is_del) {
          if (
            // d.question.indexOf(this.select_word) > -1 ||
            // d.startTime.indexOf(this.select_word) > -1 ||
            // d.endTime.indexOf(this.select_word) > -1 ||
            // d.createTime.indexOf(this.select_word) > -1 ||
            // d.condition.indexOf(this.select_word) > -1
            str.indexOf(this.select_word) > -1
          ) {
            return d;
          }
        }
      });
    }
  },
  mounted() {
    // this.getData();
    this.$emit("getTableData"); //执行父组件的方法（获取table列表数据的方法）
  },
  methods: {
    // 显示新增界面
    handleAdd() {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      // this.editForm = {
      //   //可以为模板中设置默认值，比如当前时间
      //   taskNumber: "",
      //   question: "",
      //   startTime: "",
      //   endTime: "",
      //   createTime: "",
      //   condition: "",
      //   enable: 1
      // };
    },
    // 点击模板中的“新增”按钮
    createData: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              const para = Object.assign({}, this.editForm); //合并多个JavaScript的对象

              var objToStr = JSON.stringify(para); //将json对象转化为json字符串
              this.axios
                .get(this.url.add, {
                  //父组件传给子组件请求后台的URL
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
                  // this.getData(); //(子组件调用父组件的方法)
                  this.$emit("getTableData"); //执行父组件的方法（获取table列表数据的方法）
                });
            })
            .catch(e => {
              // 打印一下错误
              console.log(e);
            });
        }
      });
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
            .get(this.url.delete, {
              params: {
                taskNumbers: taskNumbers
              }
            })
            .then(res => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              // this.getData(); //删除用户后重新请求数据显示列表
              this.$emit("getTableData"); //执行父组件的方法（获取table列表数据的方法）
            });
        })
        .catch(() => {});
    },
    // 显示编辑界面
    handleEdit(index, row) {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    // 编辑
    updateData() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              const para = Object.assign({}, this.editForm);
              var objToStr = JSON.stringify(para); //将json对象转化为json字符串
              this.axios
                .get(this.url.update, {
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
                  // this.getData();
                  this.$emit("getTableData"); //执行父组件的方法（获取table列表数据的方法）
                });
            })
            .catch(e => {
              // 打印一下错误
              console.log(e);
            });
        }
      });
    },

    //操作分页
    handleSizeChange(val) {
      this.currentPageSizes = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.getData();//从数据库中获取每条记录
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
  width: 100%;
  height: 5vh;
}
.button-row-wrap {
  float: left;
  width: 16%;
  margin-left: 2%;
}
.search-wrap {
  float: left;
  width: 15%;
  line-height: 2.5;
}
.table-wrap {
  margin-left: 2%;
}
.cellTable {
  text-align: center;
}
</style>


