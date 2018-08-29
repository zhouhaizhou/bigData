 <template>
  <div>
    <my-header></my-header>
    <div class="carts-wrap">
      <div class="cart-wrap">
        <div class="title-wrap">
          <div class="nav-marker"></div>
          <div class="sub-title">下载清单</div>
        </div>
        <div class="items-wrap">
          <div class="item-tr-wrap" v-for="(item,index) in items">
            <div class="item-wrap">
              <div class="left-wrap">
                <el-checkbox v-model="item.checked"></el-checkbox>
                <!-- <input type="checkbox" class="check-style" @click="checkboxNum(item)"> -->
              </div>
              <div class="right-wrap">
                <div class="right-title">
                  <span class="title-index">{{index+1}}</span>
                  <span class="title-name">{{item.title}}</span>
                </div>
                <div class="right-content">
                  <div class="date-wrap span-wrap">
                    <span>日期：</span>
                    <span>{{item.date}}</span>
                  </div>
                  <div class="province-wrap span-wrap">
                    <span>省(市)：</span>
                    <span>{{item.province}}</span>
                  </div>
                  <div class="city-site-wrap span-wrap">
                    <span>城市站点：</span>
                    <span>{{item.citySites}}</span>
                  </div>
                  <div class="element-wrap span-wrap">
                    <span>气象要素：</span>
                    <span>{{item.elements}}</span>
                  </div>
                  <div class="file-famat-wrap span-wrap">
                    <span>文件格式：</span>
                    <span>{{item.fileFamat}}</span>
                  </div>
                  <div class="time-interval-wrap span-wrap">
                    <span>时间间隔：</span>
                    <span>{{item.timeInterval}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="boot-wrap">
          <div class="select-all-wrap">
            <el-checkbox v-model="all" @change="allChecked()"></el-checkbox>
            <span>全选文件</span>
          </div>
          <div class="select-num-wrap">
            <span>已选择</span>
            <span>{{counts}}</span>
            <span>个文件</span>
          </div>
          <div class="download-button">
            <el-button type="danger" icon="el-icon-delete" @click="delect">删除</el-button>
          </div>
          <div class="download-button">
            <el-button type="primary" icon="el-icon-download" @click="download">下载</el-button>
          </div>
        </div>
        <div class="clearfloat"></div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import myHeader from "../common/header.vue";
import myFooter from "../common/foot.vue";
export default {
  components: {
    myHeader,
    myFooter
  },
  data() {
    return {
      all: true,
      ids: [],
      items: [
        {
          id: "1",
          checked: true,
          title: "中国地面气象站逐小时观测资料",
          date: "20180706 - 20180806",
          province: "上海",
          citySites: "[58376] 徐汇区,[48461]青浦,[58370]浦东",
          elements: "气压,海平面气压,最高气温,最高气压,最大风速,极大风速",
          fileFamat: "csv",
          timeInterval: "24小时"
        },
        {
          id: "2",
          checked: false,
          title: "中国地面气象站逐小时观测资料",
          date: "20180706 - 20180806",
          province: "上海",
          citySites: "[58376] 徐汇区,[48461]青浦,[58370]浦东",
          elements: "气压,海平面气压,最高气温,最高气压,最大风速,极大风速",
          fileFamat: "csv",
          timeInterval: "24小时"
        },
        {
          id: "3",
          checked: false,
          title: "中国地面气象站逐小时观测资料",
          date: "20180706 - 20180806",
          province: "上海",
          citySites: "[58376] 徐汇区,[48461]青浦,[58370]浦东",
          elements: "气压,海平面气压,最高气温,最高气压,最大风速,极大风速",
          fileFamat: "csv",
          timeInterval: "24小时"
        },
        {
          id: "4",
          checked: false,
          title: "中国地面气象站逐小时观测资料",
          date: "20180706 - 20180806",
          province: "上海",
          citySites: "[58376] 徐汇区,[48461]青浦,[58370]浦东",
          elements: "气压,海平面气压,最高气温,最高气压,最大风速,极大风速",
          fileFamat: "csv",
          timeInterval: "24小时"
        },
        {
          id: "5",
          checked: false,
          title: "中国地面气象站逐小时观测资料",
          date: "20180706 - 20180806",
          province: "上海",
          citySites: "[58376] 徐汇区,[48461]青浦,[58370]浦东",
          elements: "气压,海平面气压,最高气温,最高气压,最大风速,极大风速",
          fileFamat: "csv",
          timeInterval: "24小时"
        },
        {
          id: "6",
          checked: false,
          title: "中国地面气象站逐小时观测资料",
          date: "20180706 - 20180806",
          province: "上海",
          citySites: "[58376] 徐汇区,[48461]青浦,[58370]浦东",
          elements: "气压,海平面气压,最高气温,最高气压,最大风速,极大风速",
          fileFamat: "csv",
          timeInterval: "24小时"
        },
        {
          id: "7",
          checked: false,
          title: "中国地面气象站逐小时观测资料",
          date: "20180706 - 20180806",
          province: "上海",
          citySites: "[58376] 徐汇区,[48461]青浦,[58370]浦东",
          elements: "气压,海平面气压,最高气温,最高气压,最大风速,极大风速",
          fileFamat: "csv",
          timeInterval: "24小时"
        }
      ]
    };
  },
  watch: {
    items: {
      handler() {
        let self = this;
        this.items.filter((item, index) => {
          let id = item.id;
          let num = self.ids.indexOf(id);
          if (item.checked) {
            if (num == -1) {
              self.ids.push(item.id);
            }
          } else {
            if (num > -1) {
              self.ids.splice(num, 1);
            }
          }
        });
        this.ids.sort();
      },
      deep: true
    }
  },
  computed: {
    counts() {
      let num = 0;
      this.items.filter(item => {
        if (item.checked) {
          num++;
        }
      });
      if (num < this.items.length) {
        //判断是否全选了
        this.all = false;
      } else {
        this.all = true;
      }
      return num;
    }
  },
  mounted() {
    this.getDownLoadData();
  },
  methods: {
    allChecked() {
      if (!this.all) {
        this.filterItems(false);
      } else {
        this.filterItems(true);
      }
    },
    filterItems(flag) {
      this.items.filter(item => {
        item.checked = flag;
      });
      this.all = flag;
    },
    getDownLoadData() {
      this.axios
        .get("DataService.svc/GetActiveList", {
          params: {
            userName: "readearth"
          }
        })
        .then(res => {
          let data = res.data;
          data = data
            .replace(/elementCn/g, "elements")
            .replace(/citySiteDetail/g, "citySites")
            .replace(/famat/g, "fileFamat")
            .replace(/moduleCnName/g, "title");
          let obj = JSON.parse(data);
          obj.filter(item => {
            item.checked = true;
          });
          this.items = obj;
          console.log(res.data);
        })
        .catch(res => {
          console.log(res.data);
        });
    },
    getIds() {
      let ids = "";
      this.ids.forEach((element, index) => {
        if (index == this.ids.length - 1) {
          ids += element;
        } else {
          ids += element + ",";
        }
      });
      return ids;
    },
    delect() {
      if (this.ids.length == 0) {
        alert("未选择数据，请选择后再进行此操作！");
        return;
      }
      let ids = this.getIds();
      this.axios
        .get("DataService.svc/deleteDownList", {
          params: {
            userName: "readearth",
            ids: ids
          }
        })
        .then(res => {
          if (res.data == this.ids.length) {
            alert("删除成功！");
          }
          this.getDownLoadData();
        })
        .catch(res => {
          alert("删除失败！");
          console.log(res.data);
        });
    },
    download() {
      if (this.ids.length == 0) {
        alert("未选择数据，请选择后再进行此操作！");
        return;
      }
      const loading = this.$loading({
          lock: true,
          text: '正在请求数据...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
      let ids = this.getIds();
      this.axios
        .get("DataService.svc/BatchDownload", {
          params: {
            userName: "readearth",
            ids: ids
          }
        })
        .then(res => {
          let data = res.data;
          loading.close();
          let arr = JSON.parse(data);
          let a = document.createElement("a");
          let path = this._global.downPath;
          arr.forEach(element => {
            let fileName = element.zipDownUrl;
            let id = element.id;
            let fullPath = path + id + "/" + fileName;
            a.download = fileName;
            a.href = fullPath;
            a.click();
          });
        })
        .catch(res => {
          console.log(res.data);
          alert("下载失败");
        });
    }
  }
};
</script>

<style scoped>
.carts-wrap {
  width: 100%;
  /* height: 100vh; */
  background-color: #f3f8fc;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.cart-wrap {
  width: 73%;
  background-color: white;
  margin-top: 1%;
  border: solid 0.5px #8080805e;
  margin-bottom: 1%;
}
.nav-marker {
  float: left;
  width: 0.5vw;
  height: 2.5vh;
  background-color: #1bbf9d;
}
.title-wrap {
  padding-left: 2%;
  padding-top: 1%;
  padding-bottom: 0.5%;
  width: 98%;
  height: 3vh;
  border-bottom: solid #808080c2;
  border-bottom-width: 0.5px;
}
.sub-title {
  float: left;
  margin-left: 0.8vw;
  font-size: 1vw;
  font-weight: bold;
}
.item-wrap {
  padding-left: 3%;
  padding-top: 1.9%;
  /* padding-bottom: 0.5%; */
  width: 97%;
  height: 20vh;
}
.left-wrap {
  float: left;
  width: 2%;
}
.right-wrap {
  float: left;
}
.title-index {
  background-color: #4fa5e0;
  color: white;
  font-weight: bold;
  padding-left: 1%;
  padding-right: 1%;
}
.span-wrap {
  padding-top: 1.5%;
}
.line {
  height: 0.1vh;
  background-color: #808080c2;
  margin-top: 1%;
}

.boot-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  height: 6vh;
}
.select-all-wrap {
  padding-left: 3%;
  width: 7%;
}
.select-num-wrap {
  margin-left: 60%;
}
.select-num-wrap span:nth-child(2) {
  color: red;
  font-weight: bold;
}
.download-button {
  margin-left: 2%;
}
.download-button >>> .el-button {
  padding: 6px 17px;
}

.clearfloat {
  clear: both;
  height: 0;
  font-size: 1px;
  line-height: 0px;
}
</style>

