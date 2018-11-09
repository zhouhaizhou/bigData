<template>
  <div>
    <div class="header">
      <div class="strip"></div>
      <div class="header-text">{{info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
    } 
  },
  props: {
      info: String
  },
  methods:{
  }
}
</script>

<style scoped>
.header {
  border-bottom: 1px solid #ccc;
  margin-top: 2vh;
}
.strip {
  width: 10px;
  height: 25px;
  float: left;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 7px;
  background-color: rgb(0, 195, 154);
}
.header-text {
  line-height: 45px;
}
</style>