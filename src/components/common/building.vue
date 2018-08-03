<template>
  <div>
    <my-header></my-header>
    <div style="text-align:center">
      <img src="../../assets/img/timg.jpg" alt="">
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from './header';
import MyFooter from './foot';
export default {
  components:{
    MyHeader,
    MyFooter
  },
  data(){
    return {
    } 
  },
  methods:{
  }
}
</script>

<style scoped>
img{
  margin:0 auto;
}
</style>