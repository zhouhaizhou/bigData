<template>
  <div>
    <div class="table">
      <el-table 
      cell-class-name='center' 
      header-cell-style='text-align:center' 
      style="width: 100%" 
      ref="table" 
      :data="bindTableData" 
      border
      @selection-change="handleSelectionChange">
        <el-table-column  v-if='index<tableColName.length-1' :type="colName.type" v-for="(colName,index) in tableColName" :width='colName.width' :key=index :property=colName.property :label=colName.label>
        </el-table-column>
        <el-table-column v-if='index==tableColName.length-1' :type="colName.type" v-for="(colName,index) in tableColName" :width='colName.width' :key=index :property=colName.property :label=colName.label>
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
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
    total(){
      return this.tableData.length;
    },
    pageSizes(){
      let numArr=[];
      for(let i=this.pageSize;i<this.total+this.pageSize;i=i+this.pageSize){
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
    handleSelectionChange(val) {
      this.$emit('selectionChange',val);
      console.log(val)
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

</style>