<template>
  <div>
    <div class="menu-container0">
      <template v-for="v in menuList">
        <el-submenu :index="v.name" v-if="v.children&&v.children.length>0" :key="v.name">
          <template slot="title">
            <i class="iconfont" :class="v.meta.icon"></i>
            <span>{{v.meta.name}}</span>
          </template>
          <el-menu-item-group>
            <my-nav :menuList="v.children"></my-nav>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :key="v.name" :index="v.name" @click="gotoRoute(v.name)" v-else>
          <!-- <i class="iconfont" :class="v.meta.icon"></i> -->
          <span slot="title">{{v.meta.name}}</span>
        </el-menu-item>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-nav",
  props: {
    menuList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  mounted() {
    this.removeDIV();
  },
  methods: {
    removeDIV() {
      let removeDiv = document.querySelectorAll(".el-menu-item-group__title");
      removeDiv.forEach(ele => {
        ele.parentNode.removeChild(ele);
      });
    },
    gotoRoute(name) {
      this.$router.push({ name: name });
    }
  }
};
</script>

<style scoped>
.menu-container0 >>> li .el-submenu__title {
  background-color: white !important;
  color: black !important;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  /* border-left: 1px solid #ddd;
  border-right: 1px solid #ddd; */
}
.menu-container0 >>> .indis {
  display: none !important;
}
.menu-container0 .el-menu-item {
  border-bottom: 1px solid #ddd;
}
.menu-container0 .el-menu-item span{
  font-size: 15px;
}
.el-menu{
  width: 100% !important;
}
.menu-container0 .is-opened span {
  color: rgb(0, 162, 243);
}
/* .menu-container0 .el-submenu__title{
  border-bottom: 1px solid #ddd;
} */
.menu-container0 >>> .el-menu-item-group__title {
  background-color: white;
}
.menu-container0 >>> li {
  background-color: white !important;
  color: black !important;
}

.menu-container0 >>> .is-opened .el-menu-item.is-active {
  background-color: rgb(90 171 216) !important;
  color: white !important;
}
.menu-container0 >>> .el-submenu__title *{
  vertical-align: baseline;
}
.menu-container0 >>> .el-menu-item *{
   vertical-align: baseline;
}
.menu-container0 >>> .el-menu-item.is-active span {
  color: white !important;
}
.menu-container0 >>> .el-menu-item:hover {
  background-color: rgb(226, 242, 252) !important;
}
.menu-container0 >>> .is-opened .el-icon-arrow-down:before {
  color: rgb(0, 162, 243) !important;
  font-size: 14px;
  font-weight: bold;
}
</style>
