<template>
  <div class="body-style">
    <div class="title-wrap">
      <div class="nav-marker"></div>
      <div class="sub-title">调查问卷管理</div>
    </div>
    <div class="content-wrap">
      <!-- 实现父组件给子组件传值 -->
      <table-temp class="" :tableData="tableData" :tableColName="tableColName" :url="url" :editForm="editForm" v-on:getTableData="getData"></table-temp>

    </div>

  </div>
</template>

<script>
import tableTemp from "./tableTemp";

export default {
  data() {
    return {
      tableData: [], //子组件需要的表格数据
      tableColName: [
        {
          type: "selection",
          label: "",
          prop: "",
          width: "50"
        },
        {
          type: "index",
          label: "序号",
          prop: "taskNumber",
          width: "50"
        },
        {
          type: "",
          label: "问卷内容",
          prop: "question",
          width: "150"
        },
        {
          type: "",
          label: "开始时间",
          prop: "startTime",
          width: "80"
        },
        {
          type: "",
          label: "结束时间",
          prop: "endTime",
          width: "80"
        },
        {
          type: "",
          label: "创建时间",
          prop: "createTime",
          width: "80"
        },
        {
          type: "",
          label: "条件",
          prop: "condition",
          width: "80"
        },
        {
          type: "primary",
          label: "",
          prop: "",
          width: "80"
        }
      ], //表格列所包含的键值对type、label、prop
      //请求增删改查方法中请求后台的方法
      url: {
        add: "UserManager.svc/InsertQuestionData",
        delete: "UserManager.svc/DeleteQuestionData",
        update: "UserManager.svc/UpdateQuestionData"
      },
      // 编辑界面数据  (用于向后台传数据)
      editForm: {
        taskNumber: "",
        question: "",
        startTime: "",
        endTime: "",
        createTime: "",
        condition: "",
        enable: ""
      },
      //(手动挑选出编辑页面要显示的选项)
      editFormSelectShow:[
        {
          label:"问卷内容",
          type:"textarea",
          placeholder:"请输入调查问卷记录，注意：换行输入每条记录",
          rows:"8",
          value:"editForm.startTime",
          format:"yyyy-MM-dd HH:mm:ss"
        }
      ],
      //查询时，给子组件（模板页面）指定的键
      searchKeys: [
        "question",
        "startTime",
        "endTime",
        "createTime",
        "condition"
      ]
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
    this.getData();
  },
  methods: {
    // 获取列表数据
    getData() {
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
        });
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


