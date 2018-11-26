<template>
  <div style="background-color:white;margin-right:15px">
    <my-header info='我的收藏'></my-header>
    <div class="main">
      <el-row>
        <el-col :span="5">
          <el-input v-model="inputKey" @change="search" @keyup.enter="search" placeholder="搜索"></el-input>
        </el-col>
        <el-col :span="4" offset="15">
          <el-button class='btn' type="danger" @click="del" size='mini' icon="el-icon-delete">删除</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <my-table pageSize="10" v-on:selectionChange="selectionChange" v-on:handleEdit="handleEdit" :tableColName=tableColName :tableData=tableData></my-table>
        </el-col>
      </el-row>
    </div>
    <div class="mymodal" v-show="isShow">
      <my-module @toggleLike="toggleLike" @hidden="hiddenShow" :moduleEnName='moduleEnName' :moduleCnName='moduleCnName' :isShow='isShow' :clickListData="clickListData" ></my-module>
    </div>
  </div>
</template>

<script>
import myHeader from "../systemAdmin/header";
import myTable from "../systemAdmin/table";
import myModule from "../dataService/modal";
import profession from "../../../utils/profession.js";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data(){
    return {
      inputKey:'',
      moduleEnName:'',
      clickListData:{},//将当前点击模块的list数据传给子组件   控制子组件收藏的变化
      moduleCnName:'',
      isShow:false,
      selectedRow: [],
      tableData: [],
      originData: [],
      tableColName: [
        {
          label: "",
          property: "index",
          type: "selection",
          width: "100"
        },
        {
          label: "序号",
          property: "index",
          type: "index",
          width: "100"
        },
        {
          label: "数据类型",
          property: "dataType",
          type: "",
          width: ""
        },
        {
          label: "收藏时间",
          property: "collectTime",
          type: "",
          width: ""
        },
        {
          label: "查看",
          property: "option",
          type: "",
          width: "250"
        }
      ],
    } 
  },
  components: {
    myHeader,
    myTable,
    myModule
  },
  mounted(){
    this.getMyCollect();
  },
  methods:{
    ...mapState(["UserToken"]),
        /**
     * toggle效果
     */
    toggleLike(list) {
      list.likeActive = !list.likeActive;
      //获取向后台传的变量
      let account = this.UserToken.Account;
      if (account == "readearth") {
        alert("请登录后再点击收藏！");
        return;
      }
      var data = this.getNowFormatDate();
      var nowTime = data.toString();
      if (list.likeActive == true) {
        //增   向数据库的表中增加收藏记录  并返回统计的条数
        this.axios
          .get("DataService.svc/insertLikeData", {
            params: {
              moduleEnName: list.moduleEnName,
              account: account,
              insertTime: nowTime + ""
            }
          })
          .then(res => {
            let data = res.data;
            console.log(data);
            let strArr=data.split(",")
            if(strArr[0]>0){
              alert("收藏成功！")
            }else{
              alert("收藏失败！")
              return;
            }

            //更新收藏量
            list.likesCount=strArr[1];
          })
          .catch(res => {
            console.log(res);
          });
      } else {
        //删
        this.axios
          .get("DataService.svc/deleteLikeData", {
            params: {
              moduleEnName: list.moduleEnName,
              account: account
            }
          })
          .then(res => {
            let data = res.data;
            console.log(data);
            let strArr=data.split(",")
            if(strArr[0]>0){
              alert("取消收藏！")
            }else{
              alert("取消收藏失败！")
              return;
            }

            //更新收藏量
            list.likesCount=strArr[1];
          })
          .catch(res => {
            console.log(res);
          });
      }
    },
    getMyCollect(){
      this.axios
        .get("SystemAdmin.svc/GetMyCollect")
        .then(res => {
          let temp=res.data.replace(/moduleCnName/g,'dataType').replace(/insertTime/g,'collectTime');
          let data = JSON.parse(temp);
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
    selectionChange(row){
      this.selectedRow=row;
    },
    handleEdit(index,row){
      this.isShow=true;
      this.moduleEnName=row.moduleName;
      this.moduleCnName=row.dataType;
      //zhz
      this.clickListData=row;
    },
    del(){
      if(!confirm('是否要删除？')) return;
      let ids = [];
      this.selectedRow.forEach(ele => {
        ids.push(ele.Id);
      });
      this.axios
        .get("SystemAdmin.svc/DelMyCollect",{
          params:{
            ids:JSON.stringify(ids)
          }
        })
        .then(res => {
          alert("删除成功！");
          this.getMyCollect();
        })
        .catch(res => {
          alert("删除失败");
          console.log(res.response.data);
        });
    },
    search(){
      let excludeField = ["Id","Account","moduleName","parentModule"];
      this.tableData = profession.search(this.originData,this.inputKey,excludeField);
    },
    hiddenShow() {
      this.isShow = false;
      this.moduleEnName = "";
      //zhz
      this.clickListData={} 
    }
  }
}
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

.mymodal {
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 999;
  height: 100vh;
  overflow: auto;
}
/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
.mymodal::-webkit-scrollbar {
  width: 9px;
  height: 9px;
  background-color: #f5f5f5;
}
/*定义滚动条轨道
 内阴影+圆角*/
.mymodal::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: #f5f5f5;
}
/*定义滑块
 内阴影+圆角*/
.mymodal::-webkit-scrollbar-thumb {
  background-color: #099ad7;
  /* background-image: -webkit-gradient(linear, 40% 0%, 75% 84%, from(rgb(77, 156, 65)), color-stop(0.6, rgb(84, 222, 93)), to(rgb(25, 145, 29))); */
  border-radius: 5px;
}
</style>