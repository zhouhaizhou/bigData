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
import {mapActions} from 'vuex'
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
  },
  methods: {
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