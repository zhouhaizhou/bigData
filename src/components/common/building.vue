<template>
  <div>
    <my-header></my-header>
    <img src="../../assets/img/timg.jpg" alt="">
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