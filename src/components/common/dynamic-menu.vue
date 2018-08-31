<template>
  <div>
    <div class="menu-container0">
      <template v-for="v in menuList">
        <el-submenu :index="v.name" v-if="v.children&&v.children.length>0" :key="v.name">
          <template slot="title">
            <i className="iconfont" :class="v.meta.icon"></i>
            <span>{{v.meta.name}}</span>
          </template>
          <el-menu-item-group>
            <my-nav :menuList="v.children"></my-nav>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :key="v.name" :index="v.name" :class="{'gis-active':v.name=='GISInterVisual'}" @click="gotoRoute(v.name,$event)" v-else>
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
  data() {
    fromMenu: "";
  },
  watch: {
    $route: {
      handler(to, from) {
        this.fromMenu = from.name;
      }
    }
  },
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
    gotoRoute(name, evt) {
      if (name == "GISInterVisual") {
        let obj = document.querySelector(".el-menu-item.is-active");
        window.open('https://www.baidu.com');
        setTimeout(() => {
          obj.classList.add("from-menu");
        }, 1);
        return;
      } else {
        let fromClassObj = document.querySelector(".from-menu");
        if (fromClassObj != null) {
          fromClassObj.classList.remove("from-menu");
        }
      }
      this.$router.push({ name: name });
    }
  }
};
</script>

<style scoped>
.menu-container0 >>> li .el-submenu__title {
  background-color: white !important;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
}
.menu-container0 >>> .indis {
  display: none !important;
}
.menu-container0 .el-menu-item {
  border-bottom: 1px solid #ddd;
}
.menu-container0 .el-menu-item span {
  font-size: 16px;
}
.menu-container0 .el-menu-item-group .el-menu-item span {
  font-size: 13px;
}
.el-menu {
  width: 100% !important;
}
.menu-container0 .is-opened span {
  color: #27a3f2;
}
.menu-container0 .is-opened .is-active span {
  color: white !important;
}
.menu-container0 >>> .is-opened .el-menu {
  background-color: #e4f4fd;
}
.menu-container0 >>> .el-menu-item-group__title {
  background-color: white;
}
.menu-container0 >>> li.el-menu-item.is-active {
  background-color: #5babd8 !important;
  color: white !important;
}
.menu-container0 >>> li.el-menu-item.from-menu {
  background-color: #5babd8 !important;
  color: white !important;
}
.menu-container0 >>> li.el-menu-item.from-menu span {
  color: white !important;
}
.menu-container0 >>> li.el-menu-item.gis-active {
  background-color: white !important;
  color: rgb(44, 62, 80) !important;
}
.menu-container0 >>> li.el-menu-item .is-active {
  color: white !important;
}
.menu-container0 >>> .el-submenu__title * {
  vertical-align: baseline;
}
.menu-container0 >>> .el-menu-item * {
  vertical-align: baseline;
}
.menu-container0 >>> .el-menu-item:hover {
  background-color: #e4f4fd !important;
}
.menu-container0 >>> .is-opened .el-icon-arrow-down:before {
  color: rgb(0, 162, 243) !important;
  font-size: 14px;
  font-weight: bold;
}
.menu-container0 >>> .el-submenu .el-menu-item {
  height: 45px;
  line-height: 45px;
}
.menu-container0 >>> .el-menu-item,
.menu-container0 >>> .el-submenu__title {
  height: 45px;
  line-height: 45px;
}
</style>
