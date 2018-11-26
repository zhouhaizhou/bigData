<template>
  <div class="specific">
    <el-row v-for="(item,index) in items" :key='index'>
      <el-col :span="6" :offset="1">
        <span class="key">{{item.label}}：</span>
      </el-col>
      <el-col :span="17">
        <span v-if='item.code!="addCard"'>{{item.value}}</span>
         <el-radio-group v-else v-model="item.value">
          <el-radio :label="0">是</el-radio>   <!-- 这里要改变数据库的状态值，0代表是未下载，1代表是已经下载过的 -->
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return {
      items:[
        {
          label:'站点',
          code:'citySiteDetail',
          value:''
        },
        {
          label:'选择数据日期',
          code:'date',
          value:''
        },
        {
          label:'下载日期',
          code:'downLoadTime',
          value:''
        },
        {
          label:'要素',
          code:'elementCn',
          value:''
        },
        {
          label:'文件格式',
          code:'famat',
          value:''
        },
        {
          label:'文件名',
          code:'fileName',
          value:''
        },
        {
          label:'数据类型',
          code:'moduleCnName',
          value:''
        },
        {
          label:'省份',
          code:'province',
          value:''
        },
        {
          label:'间隔',
          code:'timeInterval',
          value:''
        },
        {
          label:'加入下载清单',
          code:'addCard',
          value:1
        }
      ]
    }
  },
  props:{
    info:Array
  },
  watch:{
    info:{
      handler(row){
        this.calAssign(row);
      }
    },
    deep:true
  },
  mounted(){
    this.calAssign(this.info);  //第一次点击的时候执行，以后不会进入这里，用监听来绑定值
  },
  methods:{
    calAssign(row){
      this.items.forEach(ele => {
        let key=ele.code;
        if(key!="addCard"){
          ele.value=row[key];
        }
      });
    }
  }
}
</script>

<style scoped>
.el-row{
  line-height: 40px;
}
.key{
  float:right;
  font-weight:bold;
  font-size: 18px;
}
</style>