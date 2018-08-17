<template>
    <div class="sites-div-wrap">
        <div class="sites-wrap">
            <div class="site-radio-font-wrap" v-for="(site,index) in citySites" :key="index">
                    <div class="radio-wrap"><input type="radio"></div><div class="site">{{site}}</div></div>
        </div>
    </div>

</template>


    <script>
export default {
  components: {},
  data() {
    return {
      citySites: [//父组件传过来省市的名称，子组件到数据库中查询相对应的省市站点
            "[58361]闵行",
            "[58367]徐家汇",
            "[58361]闵行",
            "[58367]徐家汇",
            "[58361]闵行",
            "[58367]徐家汇",
            "[58361]闵行",
            "[58367]徐家汇",
            "[58361]闵行",
            "[58367]徐家汇",
            "[58361]闵行",
            "[58367]徐家汇"
          ]
    };
  }
};
</script>

    <style scoped>
    .sites-div-wrap{
        height: 100%;
        width: 100%;
            overflow: hidden;
    }
    .sites-wrap{
        height: 86%;
    padding: 5%;
float: left;
    }
    .site-radio-font-wrap{
    width: 50%;
    
    float: left;

    }
    .radio-wrap{
        float: left;
    margin-right: 5px;
    }
    .site{

    }
    </style>
