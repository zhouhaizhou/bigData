<template>
  <div class="dialog">
    <el-dialog title="" :visible.sync="dialogVisible" :before-close="handleClose" :width="width">
      <div @mousewheel="mousewheel" class="dragImg" v-drag :style="{background:'url('+imgPath+') center center no-repeat',height:height}">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import drag from "../../../utils/directive.js";
export default {
  props: ["dialogVisible", "imgPath", "width","height"],
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$emit("handleClose");
    },
    mousewheel(evt){
      document.querySelector(".el-dialog__body").style.height=this.height;
      let obj=evt.currentTarget;
      var zoom=parseInt(obj.style.zoom, 10)||100;
      zoom+=(event.wheelDelta/120);
      if(zoom>0){
        obj.style.height=parseFloat(obj.style.height)*zoom/100+"px";
      }
    }
  }
};
</script>

<style scoped>
.dragImg {
  position: relative;
  top: 0;
  left: 0;
  background-size: contain !important;
  cursor: pointer;
}
.dialog >>> .el-dialog__body{
  overflow: hidden;
  position: relative;
}
.dialog >>> .el-dialog__headerbtn{
  z-index: 100;
}
</style>