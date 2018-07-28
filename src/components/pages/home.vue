<template>
  <div>
    <my-header></my-header>
    <banner v-on:goAnchor="goAnchor"></banner>
    <product-service ref="pro"></product-service>
    <datahot></datahot>
    <my-footer></my-footer>
  </div>
</template>

<script>
import myHeader from "../common/header.vue";
import myFooter from "../common/foot.vue";
import productService from "./productService.vue";
import datahot from "./datahot.vue";
import banner from "./banner";
import {mapMutations} from 'vuex'
export default {
  components: {
    productService,
    datahot,
    myHeader,
    banner,
    myFooter
  },
  data() {
    return {
    };
  },
  mounted() {
    // setInterval(function(){
    //   console.log(12);
    // },1000)
  },
  methods: {
    ...mapMutations(['scrollAnchor']),
    goAnchor() {
      //this.scrollAnchor(document.documentElement.scrollTop,this.$refs.pro.$el);
      this.scrollAnchor({top:document.documentElement.scrollTop,obj:this.$refs.pro.$el})
    },
    // scrollAnchor(Top,obj) {
    //   //Top 对象要从开始的位置移动到目标位置的距离
    //   //obj 哪个对象要移动
    //   var self = this;
    //   if (document.documentElement.scrollTop >= obj.offsetTop) {
    //     return;
    //   }
    //   document.documentElement.scrollTo(0, Top);
    //   var timer = setInterval(function() {
    //     clearInterval(timer);
    //     let distance=(obj.offsetTop-document.documentElement.scrollTop)/10  //步长
    //     self.scrollAnchor(distance + Top,obj);
    //   }, 15);
    // }
  }
};
// if ( document.documentElement.scrollTop >= self.$refs.pro.$el.offsetTop)
// {
//   clearInterval(timer);
// }
</script>

<style scoped>
</style>