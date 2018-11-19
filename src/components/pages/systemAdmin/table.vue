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
      tooltip-effect='dark'
      @selection-change="handleSelectionChange">
        <el-table-column show-overflow-tooltip v-if='(index<tableColName.length-1)&&colName.property!="status"' :type="colName.type" v-for="(colName,index) in tableColName" :width='colName.width' :key=index :property=colName.property :label=colName.label>
        </el-table-column>
        <el-table-column v-if='(index==tableColName.length-1)||colName.property=="status"' :type="colName.type" v-for="(colName,index) in tableColName" :width='colName.width' :key=index :property=colName.property :label=colName.label>
          <template slot-scope="scope">
            <div v-if='colName.property=="status"' :class="{active:scope.row.status=='1',stop:scope.row.status=='0'||scope.row.status==''}">
              <span class="circle"></span>
              <span>{{status(scope.row.status)}}</span>
            </div>
            <el-button v-else type="primary" :icon="icon" size="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
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
    pageSize:Number,
    activeTxt:String,
    inactiveTxt:String
  },
  data() {
    return {
      currentPage:1,
      currentPageSizes:0
    };
  },
  computed:{
    status(){
      return (val)=>{
        return this.proStatus(val)
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
    },
    icon(){
      let val=this.tableColName[this.tableColName.length-1].label;
      let icon='el-icon-edit';
      if(val=='查看'){
        icon='el-icon-view';
      }else if(val=='详细'){
        icon='el-icon-info';
      }
      return icon;
    }
  },
  methods: {
    proStatus(val){
      let temp=this.tableData[0].author;
      if(val==true){
        return this.activeTxt;
      }else{
      return  this.inactiveTxt;
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