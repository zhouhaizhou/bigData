<template>
  <div>
    <div class="table" style="margin-right:20px;">
      <el-table 
      cell-class-name='center' 
      header-cell-style='text-align:center' 
      style="width: 100%" 
      ref="table" 
      :data="bindTableData" 
      border
      @selection-change="handleSelectionChange">
        <el-table-column  v-if='(index<tableColName.length-1)&&colName.property!="userStatus"' :type="colName.type" v-for="(colName,index) in tableColName" :width='colName.width' :key=index :property=colName.property :label=colName.label>
        </el-table-column>
        <el-table-column v-if='(index==tableColName.length-1)||colName.property=="userStatus"' :type="colName.type" v-for="(colName,index) in tableColName" :width='colName.width' :key=index :property=colName.property :label=colName.label>
          <template slot-scope="scope">
            <div v-if='colName.property=="userStatus"' :class="{active:scope.row.userStatus,stop:!scope.row.userStatus}">
              <span class="circle"></span>
              <span>{{userStatus(scope.row.userStatus)}}</span>
            </div>
            <el-button v-else type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    tableColName: Array,
    tableData: Array,
    pageSize:Number
  },
  data() {
    return {
      currentPage:1,
      currentPageSizes:0
    };
  },
  computed:{
    userStatus(){
      return (val)=>{
        return this.proUserStatus(val)
      }
    },
    total(){
      return this.tableData.length;
    },
    pageSizes(){
      let numArr=[];
      for(let i=Number(this.pageSize);i<this.total+Number(this.pageSize);i=i+Number(this.pageSize)){
        numArr.push(i);
      }
      if(!this.currentPageSizes){
        this.currentPageSizes=numArr[0];
      }
      return numArr;
    },
    bindTableData(){
      let data=[];
      let start=(this.currentPage-1)*this.currentPageSizes;
      let end=this.currentPage*this.currentPageSizes;
      if(end>this.tableData.length){
        end=this.tableData.length;
      }
      data=this.tableData.slice(start,end);
      return data;
    }
  },
  methods: {
    proUserStatus(val){
      if(val==true){
        return "激活";
      }else{
        return "停用";
      }
    },
    handleSelectionChange(row) {
      this.$emit('selectionChange',row);
      console.log(row)
    },
    handleEdit(index, row) {
      this.$emit('handleEdit',index,row);
    },
    handleSizeChange(val){
      this.currentPageSizes=val;
    },
    handleCurrentChange(val){
      this.currentPage=val;
    }
  }
};
</script>

<style scoped>
.table /deep/ .center {
  text-align: center !important;
}

.table /deep/ .el-table thead th.gutter{
    display: table-cell!important;
}
.block{
  padding-top: 20px;
}
.active{
  color: rgb(0, 162, 92);
}
.stop{
  color: red;
}
.active .circle{
  background-color: rgb(0, 162, 92);
}
.stop .circle{
  background-color: red;
}
.circle{
  display: inline-block;
  width: 15px;
  height: 15px; 
  border-radius: 50%;
  margin-bottom: -2px;
}
/* .block /deep/ .el-pagination__jump{
  float: right;
  margin-right: 15px;
} */
</style>