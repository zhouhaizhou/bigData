<template>
  <div>
    <banner v-on:goAnchor="goAnchor"></banner>
    <product-service ref="pro"></product-service>
    <datahot></datahot>
  </div>
</template>

<script>
import myHeader from "../../common/header.vue";
import myFooter from "../../common/foot.vue";
import productService from "./productService.vue";
import datahot from "./datahot.vue";
import banner from "./banner";
import {mapActions,mapMutations} from 'vuex'
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
    this.SETCOOKIES('wb');
  },
  methods: {
    ...mapMutations(['SETCOOKIES']),
    ...mapActions(['scrollAnchor']),
    goAnchor() {
     // this.scrollAnchor({top:document.documentElement.scrollTop,obj:this.$refs.pro.$el})
      this.$store.dispatch('scrollAnchor', {top:document.documentElement.scrollTop,obj:this.$refs.pro.$el})
    },
  }
};
</script>

<style scoped>
</style>