<template>
  <div>
    <el-row v-for="">
      <el-col :span="3"></el-col>
      <el-col :span="7"></el-col>
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
          code:'citySite',
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
          label:'moduleCnName',
          code:'数据类型',
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
        }
      ]
    } 
  },
  methods:{
  }
}
</script>

<style scoped>

</style>