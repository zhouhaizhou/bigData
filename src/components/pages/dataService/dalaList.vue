<template>
<div>
<div class="dataChoose">
  <div class="dataChoose_btn" @click="dataChooseShow=!dataChooseShow">选择数据</div>
  <div class="dataChoose_div" v-show="dataChooseShow">
    <div class="dataChoose_list" v-for="item in dataItems">
      <div class="dataChoose_type">{{item.nameFlag}}</div>
      <div class="dataChoose_item" v-for="child in item.childNode" @click="itemNameNow=child.name;GetIntroduce()">{{child.nameFlag}}</div>
    </div>
  </div>
  <div class="dataChoose_search">
    <input class="dataChoose_input" type="text" v-model="searchName" @keyup="NameSuggest($event)">
    <div class="dataChoose_suggest" v-show="suggest">
      <ul>
        <li v-for="data in dataListTable" v-show="NameMatch(data.moduleCnName)" @click="searchName=data.moduleCnName;suggest=false;">{{data.moduleCnName}}</li>
      </ul>
    </div>
    <div class="dataChoose_searchbtn">搜索</div>
  </div>
</div>
<div class="dataIntroduce">
<div><strong>{{dataIntroduce[0].subTitle}}</strong></div>
<div><strong>数据起始时间：</strong>{{dataIntroduce[0].startTime}}</div>
<div><strong>数据终止时间：</strong>{{dataIntroduce[0].endTime}}</div>
<div><strong>最近更新时间：</strong>{{dataIntroduce[0].lstTime}}</div>
<div><strong>更新频率：</strong>{{dataIntroduce[0].UpdateInter}}</div>
<div><strong>数据源：</strong>{{dataIntroduce[0].dataSource}}</div>
<div><strong>共享级别：</strong>{{dataIntroduce[0].shareClassID}}</div>
<div><strong>站点总数：</strong>{{dataIntroduce[0].siteCount}}个</div>
<div><strong>数据总量：</strong>{{(dataIntroduce[0].dbSize/1024/1024).toFixed(2)}}GB</div>
</div>
<div class="columnIntroduce">
  <table class="columnTable">
    <thead>
      <th>序号</th>
      <th>要素代码</th>
      <th>要素名称</th>
      <th>单位</th>
    </thead>
    <tbody>
      <tr v-for="column in columnIntroduce">
         <td>{{column.RowNum}}</td>
         <td>{{column.columnName}}</td>
         <td>{{column.columnDetail}}</td>
         <td>{{column.unit}}</td>
      </tr>
    </tbody>
  </table>
</div>
</div>

</template>

<script>
export default {
  data() {
    return {
      dataItems: [],
      dataListTable: [],
      itemNameNow: "",
      dataChooseShow: false,
      dataIntroduce: [],
      columnIntroduce: [],
      searchName: "",
      vague: "",
      suggest: false
    };
  },
  created() {
    this.GetDataList();
  },
  methods: {
    NameSuggest(obj) {
      this.vague = obj.currentTarget.value;
      if (obj.currentTarget.value != "" && obj.keyCode != 13) {
        this.suggest = true;
      } else if (obj.currentTarget.value == "") {
        this.suggest = false;
      } else if (obj.keyCode == 13) {
        this.suggest = false;
        if (
          obj.currentTarget.value.indexOf("市") == -1 &&
          obj.currentTarget.value.length >= 2
        ) {
          this.vague = obj.currentTarget.value;
          this.searchName = this.vague;
        }
      }
      this.searchName = this.vague;
    },
    NameMatch: function(Name) {
      if (
        Name.indexOf(this.vague) != -1 ||
        pinyin
          .getFullChars(Name)
          .toLowerCase()
          .indexOf(this.vague.toLowerCase()) != -1 ||
        pinyin
          .getCamelChars(Name)
          .toLowerCase()
          .indexOf(this.vague.toLowerCase()) != -1
      ) {
        return true;
      } else return false;
    },
    GetDataList() {
      var that = this;
      this.axios
        .get("DataService.svc/GetDataList")
        .then(response => {
          if (response.data != "") {
            var resData = eval("(" + response.data + ")");
            that.dataListTable = resData;
            var lb = "";
            var lbFlag = "";
            var index = -1;
            for (var i in resData) {
              if (lb != resData[i].parentModule) {
                lb = resData[i].parentModule;
                lbFlag = resData[i].parentModuleCnName;
                index++;
                that.dataItems[index] = {
                  name: lb,
                  nameFlag: lbFlag,
                  childNode: []
                };
              }
              var child = {
                name: resData[i].moduleEnName,
                nameFlag: resData[i].moduleCnName
              };
              that.dataItems[index].childNode.push(child);
              if (i == 0) {
                that.itemNameNow = resData[i].moduleEnName;
              }
            }
            that.GetIntroduce();
          }
        })
        .catch(response => {
          console.log(response);
        });
    },
    GetIntroduce() {
      var that = this;
      this.axios
        .get("DataService.svc/GetDataListDetail", {
          params: {
            moduleEnName: that.itemNameNow
          }
        })
        .then(response => {
          var resData = eval("(" + response.data + ")");
          that.dataIntroduce = resData;
          that.GetColumnIntroduce();
        })
        .catch(response => {
          console.log(response);
        });
    },
    GetColumnIntroduce() {
      var that = this;
      this.axios
        .get("DataService.svc/GetColumnDetail", {
          params: {
            moduleEnName: that.itemNameNow
          }
        })
        .then(response => {
          var resData = eval("(" + response.data + ")");
          that.columnIntroduce = resData;
        })
        .catch(response => {
          console.log(response);
        });
    }
  }
};
</script>

<style scoped>
div {
  cursor: default;
}
.dataChoose {
  height: 10vh;
}
.dataChoose_btn {
  width: 10vw;
  position: absolute;
  height: 5vh;
  border: 1px solid;
  background: white;
  text-align: center;
  cursor: pointer;
  line-height: 5vh;
}
.dataChoose_div {
  position: absolute;
  width: 50vw;
  top: 5vh;
  height: 40vh;
  border: 1px solid;
  background: white;
  overflow-y: scroll;
}
.dataChoose_list {
  position: relative;
  height: 10vh;
}
.dataChoose_item {
  float: left;
  cursor: pointer;
}
.dataChoose_search {
  position: absolute;
  left: 30vw;
  height: 5vh;
}
</style>
