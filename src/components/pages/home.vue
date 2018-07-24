<template>
    <div>
        <span>首页</span>
        <product-service></product-service>
        <datahot></datahot>
    </div>
</template>

<script>
import productService from "./productService.vue";
import datahot from "./datahot.vue";
export default {
  components: {
    productService,
    datahot
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
</style>