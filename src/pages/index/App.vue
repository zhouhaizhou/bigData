<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>    
// console.info(document.currentScript.src);

export default {
  name: 'App'
}
</script>

<style>
@media print {
  body {-webkit-print-color-adjust: exact;}
}
.el-icon-close:before{
  font-size: 30px;
}
.el-message-box__content{
  margin-top: 15px;
}
</style>
