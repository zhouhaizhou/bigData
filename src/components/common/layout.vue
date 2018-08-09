<template>
  <div>
    <!-- <el-container class="container">
      <el-header  ref="header" :style="{height:this.height+'px'}">
        <my-header ref="myheader"></my-header>
      </el-header>
      <el-container>
        <el-aside width="400px">
          <router-view></router-view>
        </el-aside>
        <el-container>
          <el-main>
            <my-main></my-main>
          </el-main>
          <el-footer></el-footer>
        </el-container>
      </el-container>
    </el-container> -->
    <el-container class="container">
      <el-header ref="header" :style="{height:this.height+'px'}" class="fixedheader">
        <my-header ref="myheader"></my-header>
      </el-header>
      <el-main class="mainposition">
        <router-view></router-view>
      </el-main>
      <el-footer>
        <my-footer></my-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import myHeader from "./header";
import myFooter from "./foot";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    myHeader,
    myFooter
  },
  computed: {
    ...mapState(["navHeight"])
  },
  data() {
    return {
      height: 0,
      isFixed: true
    };
  },
  mounted() {
    this.height = this.$refs.myheader.$el.scrollHeight;
    document.querySelector(".mainposition").style.top = this.height + "px";
    document.querySelector(".el-footer").style.top = this.height + "px";
    this.SETNAVHEIGHT(this.height);
  },
  methods: {
    ...mapMutations(["SETNAVHEIGHT"])
  }
};
</script>

<style scoped>
.container >>> .el-header,
.container >>> .el-main,
.container >>> .el-footer {
  padding: 0;
}
.fixedheader {
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100vw;
}
.mainposition {
  position: relative;
  top: 0;
  background-color: rgb(242, 248, 252);
}
.container >>> .el-footer {
  position: relative;
}
</style>