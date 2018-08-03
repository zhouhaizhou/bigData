<template>
  <div>
    <div class="side">
      <el-menu :collapse="isSidebarNavCollapse" background-color="#304156" text-color="#eee" active-text-color="#4dbcff" :default-active="currentMenu">
        <DynamicMenu :menuList="sidebarMenu"></DynamicMenu>
      </el-menu>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import DynamicMenu from "./dynamic-menu";
import { mapState } from "vuex";
export default {
  components: {
    DynamicMenu
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["sidebarMenu", "currentMenu", "isSidebarNavCollapse"])
  },
  methods: {}
};
</script>

<style scoped>
.side {
  float: left;
  width: 20vw;
}
.main {
  float: left;
  width: 80vw;
  background-color: aqua;
}
</style>