<template>
<div>
   <div class="title"><div class="title_point"></div><div class="title_text">数据清单</div> </div>
<div class="background">
<div class="dataChoose">
  <div @mouseover="dataChooseShow=true" @mouseout="dataChooseShow=false">
    <div class="dataChoose_btn">{{itemCnNameNow}}</div>
  <div class="dataChoose_div" v-show="dataChooseShow">
    <div class="dataChoose_datalist" v-for="datalist in dataListTable" @click="itemNameNow=datalist.moduleEnName;itemCnNameNow=datalist.parentModuleCnName+'/'+datalist.moduleCnName;dataChooseShow=false; GetIntroduce()">
      {{datalist.parentModuleCnName+"/"+datalist.moduleCnName}}
    </div>
  </div>
  </div>

  <div class="dataChoose_search">
    <input class="dataChoose_input" type="text" placeholder="搜索" v-model="searchName" @keyup="NameSuggest($event)">
    <div class="dataChoose_suggest" v-show="suggest">
      <ul>
        <li v-for="data in dataListTable" v-show="NameMatch(data.moduleCnName)" @click="searchName=data.moduleCnName;suggest=false;">{{data.moduleCnName}}</li>
      </ul>
    </div>
    <div class="dataChoose_searchbtn" title="搜索" @click="Search()"></div>
  </div>
</div>
<div class="dataIntroduce">
<div><strong style="font-size:22px">1.基本资料：<br/><br/></strong><strong style="font-size:20px">·&nbsp;{{dataIntroduce[0].subTitle}}</strong></div>
<table class="dataIntroduce_table">
  <tr><td><div>数据起始时间：</div><span>{{dataIntroduce[0].startTime}}</span></td><td><div>数据终止时间：</div><span>{{dataIntroduce[0].endTime}}</span></td></tr>
  <tr><td><div>最近更新时间：</div><span>{{dataIntroduce[0].lstTime}}</span></td><td><div>更新频率：</div><span>{{dataIntroduce[0].UpdateInter}}</span></td></tr>
  <tr><td><div>数据源：</div><span>{{dataIntroduce[0].dataSource}}</span></td><td><div>共享级别：</div><span>{{dataIntroduce[0].shareClassID}}</span></td></tr>
  <tr><td><div>站点总数：</div><span>{{dataIntroduce[0].siteCount}}个</span></td><td><div>数据总量：</div><span>{{(dataIntroduce[0].dbSize/1024/1024).toFixed(2)}}GB</span></td></tr>
</table>
</div>
<div class="columnIntroduce">
  <div><strong style="font-size:22px">2.资料要素：<br/><br/></strong></div>
  <table class="columnTable">
    <thead>
      <th>序号</th>
      <th>要素代码</th>
      <th>要素名称</th>
      <th>单位</th>
    </thead>
    <tbody>
      <tr v-for="column in columnPage[pageNum].page">
         <td>{{column.RowNum}}</td>
         <td>{{column.columnName}}</td>
         <td>{{column.columnDetail}}</td>
         <td>{{column.unit}}</td>
      </tr>
      <!-- <tr v-for="column in columnIntroduce">
         <td>{{column.RowNum}}</td>
         <td>{{column.columnName}}</td>
         <td>{{column.columnDetail}}</td>
         <td>{{column.unit}}</td>
      </tr> -->
    </tbody>
  </table>

    <div class="turnPage">
    <div @click="pageNum=0"><<</div>
    <div @click="pageNum-1>=0?pageNum-=1:pageNum=0"><</div>
    <div v-for="page in columnPage" @click="pageNum=columnPage.indexOf(page)" :class="pageNum==columnPage.indexOf(page)?'pageActive':''">{{columnPage.indexOf(page)+1}}</div>
    <div @click="pageNum+1<columnPage.length?pageNum+=1:pageNum=columnPage.length-1">></div>
    <div @click="pageNum=columnPage.length-1">>></div>
  </div>


</div>
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
      itemCnNameNow: "",
      dataChooseShow: false,
      dataIntroduce: [],
      columnIntroduce: [],
      columnPage: [],
      searchName: "",
      vague: "",
      suggest: false,
      pageNum: 0
    };
  },
  created() {
    this.GetDataList();
  },
  methods: {
    Search() {
      for (var i in this.dataListTable) {
        if (this.dataListTable[i].moduleCnName == this.searchName) {
          this.itemNameNow = this.dataListTable[i].moduleEnName;
          this.itemCnNameNow =
            this.dataListTable[i].parentModuleCnName +
            "/" +
            this.dataListTable[i].moduleCnName;
          this.GetIntroduce();
          break;
        }
      }
    },
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
                that.itemCnNameNow =
                  resData[i].parentModuleCnName + "/" + resData[i].moduleCnName;
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
          var tableCount = that.columnIntroduce.length / 20;
          for (var i = 0; i < tableCount; i++) {
            var page = that.columnIntroduce.slice(i * 20, i * 20 + 20);
            that.columnPage.push({ page });
          }
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
.title {
  margin-top: 17px;
}
.title_point {
  float: left;
  width: 0.5vw;
  height: 2.5vh;
  background-color: #1bbf9d;
}
.title_text {
  margin-left: 20px;
  font-weight: bold;
  font-size: 20px;
}
.background {
  width: 77vw;
  background: white;
  padding: 1vh;
  margin-top: 2vh;
  overflow: hidden;
}
.dataChoose {
  height: 8vh;
}
.dataChoose_btn {
  width: 25vw;
  position: absolute;
  height: 5vh;
  background: white;
  text-align: center;
  cursor: pointer;
  line-height: 5vh;
  border: 1px solid #e6e6e6;
  color: #3499db;
  background-image: url("../../../assets/img/down.png");
  background-repeat: no-repeat;
  background-position: 97%, 0%;
  background-size: 15px 15px;
}
.dataChoose_div {
  position: absolute;
  width: 25vw;
  top: 6vh;
  height: 40vh;
  background: white;
  overflow-y: scroll;
  border: 1px solid #e6e6e6;
  color: #3499db;
  z-index: 9999;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.3);
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
  left: 51vw;
  height: 5vh;
  width: 28vw;
}
.dataChoose_datalist {
  text-align: center;
  height: 5vh;
  line-height: 5vh;
  border-bottom: 1px solid #e6e6e6;
  cursor: pointer;
}
.dataChoose_datalist:hover {
  background-color: #e6e6e6;
}
.dataChoose_input {
  position: absolute;
  height: 5vh;
  line-height: 5vh;
  width: 20vw;
  padding-bottom: 0;
  font-size: 1vw;
  padding-left: 1vw;
  /* color: #3499db; */
  border: 1px solid #e6e6e6;
}
.dataChoose_input::-webkit-input-placeholder {
  color: #e6e6e6;
}
.dataChoose_searchbtn {
  position: absolute;
  left: 21vw;
  width: 3vw;
  background: #3499db;
  height: 5vh;
  border: 2px solid #3499db;
  cursor: pointer;
  background-image: url("../../../assets/img/search-w.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
}
.dataChoose_suggest {
  position: absolute;
  top: 5.3vh;
  width: 21vw;
  background-color: white;
  border: 0.5px solid #e6e6e6;
  z-index: 9999;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.3);
}
.dataChoose_suggest ul {
  margin: 0;
  padding: 0;
}
.dataChoose_suggest ul li {
  list-style-type: none;
  height: 3vh;
  line-height: 3vh;
  padding-left: 1vw;
  cursor: pointer;
}
.dataChoose_suggest li:hover {
  background-color: #e6e6e6;
}
.dataIntroduce_text {
  width: 20vw;
  float: left;
}
.dataIntroduce_table {
  width: 100%;
  padding-left: 2vh;
}
.dataIntroduce_table tr td {
  width: 50%;
  height: 5vh;
  position: relative;
}
.dataIntroduce_table tr td span {
  position: absolute;
  left: 7vw;
  color: #3499db;
}
.dataIntroduce_table tr td div {
  width: 7vw;
  text-align: justify;
  font-weight: bold;
  text-align-last: justify;
  position: absolute;
}
.dataChoose_div::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 7px;
}
.dataChoose_div::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 100px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgb(9, 157, 220);
}
.dataChoose_div::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  background: #ededed;
}
.columnIntroduce {
  margin-top: 2vh;
}
.columnTable {
  width: 100%;
}
.columnTable th {
  background-color: #e1effd;
  height: 3vh;
}
.columnTable td {
  text-align: center;
  width: 32%;
  border-bottom: 1px solid #e6e6e6;
  height: 3vh;
}
.columnTable tr td:first-child {
  width: 4%;
}
.turnPage {
  float: right;
  margin-top: 1vh;
}
.turnPage div {
  float: left;
  width: 2vw;
  height: 3vh;
  line-height: 3vh;
  text-align: center;
  cursor: pointer;
  border: 1px solid #e6e6e6;
}
.pageActive {
  background: #3499db;
  color: white;
}
</style>
