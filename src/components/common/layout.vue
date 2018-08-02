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
      <el-header ref="header" :style="{height:this.height+'px'}">
        <my-header ref="myheader"></my-header>
      </el-header>
      <el-main>
        <my-main></my-main>
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
import myMain from "./mainrouter";
import mySlideBar from "./slideBar";
export default {
  components: {
    myHeader,
    myFooter,
    myMain,
    mySlideBar
  },
  data() {
    return {
      height: 0
    };
  },
  mounted() {
    this.height = this.$refs.myheader.$el.scrollHeight;
    //this.$refs.header.style.height=height+'px';
  },
  methods: {}
};
</script>

<style scoped>
.container >>> .el-header,
.container >>> .el-main,
.container >>> .el-footer {
  padding: 0;
}
</style>