<template>
  <div>
    <iframe scrolling="no" id="bdIframe" width="100%" border=0 style="padding-top:20px;width:100%;" src="http://10.228.9.134/csj/html/huanjingqixiang/zongheguance/ZhouXingWei/LaserRadar_xujiahui.html" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    const oIframe = document.getElementById("bdIframe");
    //const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    //oIframe.style.width = Number(deviceWidth) - 220 + "px"; //数字是页面布局宽度差值
    oIframe.style.height = Number(deviceHeight)-260 + "px"; //数字是页面布局高度差
  }
};
</script>

<style scoped>
</style>