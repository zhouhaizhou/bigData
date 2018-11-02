<template>
  <div>
    <div class="side">
      <el-menu :unique-opened=true :collapse="isSidebarNavCollapse"
       background-color="#fff" text-color="#2c3e50" active-text-color="rgb(0, 162, 243)" 
       :default-active="currentMenu">
        <DynamicMenu :menuList="computedSidebarMenu"></DynamicMenu>
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
import profession from '../../utils/profession.js'
export default {
  components: {
    DynamicMenu
  },
  data() {
    return {
     
    };
  },
  computed: {
    ...mapState(["sidebarMenu","currentMenu","isSidebarNavCollapse","navHeight"]),
    computedSidebarMenu(){
      let sidebarMenu=this.sidebarMenu;
      let newSideBarMenu = this.iterationSidebarMenu(sidebarMenu);
      return newSideBarMenu;
    }
  },
  mounted() {
    let navH =
      document.querySelector(".navColor").offsetTop +
      document.querySelector(".navColor").offsetHeight;
     document.querySelector(".side").style.top = navH +15+ "px";
  },
  methods:{
    iterationSidebarMenu(sidebarMenu){
      sidebarMenu.forEach((element,i) => {
        sidebarMenu[i].meta.name=profession.proEleType(element.meta.name);
        if(element.children!=undefined&&element.children.length>0){
          let eleChildrenArr=element.children;
          this.iterationSidebarMenu(eleChildrenArr);
        }
      });
      return sidebarMenu;
    }
  }
};
</script>

<style scoped>
.side {
  position: fixed;
  width: 14vw;
  z-index: 2;
  left: 2.5vw;
  border: 1px solid #ccc;
  border-right: none;
  border-bottom: none;
}
.main {
  width: 79.5vw;
  /* background-color: aqua; */
  position: relative;
  left: 19vw;
  /* top: 2vh; */
  /* height: 99vh; */
}
</style>