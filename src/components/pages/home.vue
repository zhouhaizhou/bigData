<template>
    <div>
      <my-header></my-header>
      <banner></banner>
      <product-service></product-service>
      <datahot></datahot>
      <my-footer></my-footer>
    </div>
</template>

<script>
import myHeader from '../common/header.vue'
import myFooter from '../common/foot.vue'
import productService from "./productService.vue";
import datahot from "./datahot.vue";
import banner from './banner';
export default {
  components: {
    productService,
    datahot,
    myHeader,
    banner,
    myFooter
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>

</style>