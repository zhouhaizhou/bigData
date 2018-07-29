<template>
  <div>
    <p>
      <div>{{count}}</div>
      <button @click="add">+</button>
      <button @click="increment">-</button>
     </p>
  </div>
</template>
<script>
import store from '../store';
//console.log(store)
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
         // ip:this._global.ip
        };
    },
    mounted(){
      ///api/SYS/Huadong/LoadMenuService.svc/GetUser123
      // this.axios.get('/SYS/Huadong/LoadMenuService.svc/GetUser')
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });  
      
    },
    computed: {
      ...mapState(['count'])
    },
    methods: {
      ...mapMutations(['add','reduce']),
      ...mapActions(['increment']),

    }
};
</script>

<style scoped>
button{
  background-color:red;
}
</style>