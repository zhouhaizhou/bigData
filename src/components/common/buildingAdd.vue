<template>
  <div>
    <div v-show="parentCom">
      <el-button type="success" @click="add">添加</el-button>
      <div style="text-align:center">
        <img src="../../assets/img/timg.jpg" alt="">
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { joinRouter } from "@/utils/recursion-router";
export default {
  data() {
    return {
      parentCom: true
    };
  },
  computed: {
    ...mapState(["permissionList"])
  },
  watch: {
    $route: {
      handler(to,from) {
        if(from.name=='addTest'){
          this.parentCom=true;
        }
      },
      deep: true
    }
  },
  methods: {
    add() {
      let component = require("@/components/common/building.vue").default;
      let dynamicRoute = [
        {
          path: "addTest",
          name: "addTest",
          meta: {
            parentEntityName: "userAdm"
          },
          component: component
        }
      ];
      let route = this.permissionList;
      joinRouter(route, dynamicRoute, "userAdm");
      this.$router.addRoutes(route);
      this.parentCom = false;
      this.$router.push({ name: "addTest" });
    }
  }
};
</script>

<style scoped>
img {
  margin: 0 auto;
}
</style>