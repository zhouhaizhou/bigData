<template>
    <div class="about-wrap">
       <div class="body-wrap">
           <div class="title-wrap">关于我们</div>
           <div class="content-wrap">
               <p> 污染天气大数据平台是国家重点研发计划大气污染成因与控制技术研究专项“我国东部城市群污染天气观测及大
数据平台建设”项目的重要组成。该项目由上海市城市环境气象中心牵头，参加单位有京津冀环境气象预报预警中心、
中国气象局广州热带海洋气象研究所、安徽省气象科学研究所、浙江省气象科学研究所、江苏省气象台。污染天气大
数据平台为大气专项提供标准化、高质量的环境气象数据集和格点化分析产品集，为重污染天气诊断分析、环境气象
模式同化和评估、重污染天气科学研究提供数据支撑。</p>
           </div>
           <div class="foot-wrap">
               <div class="foot-left">
                  <div class="foot-title-wrap"> <span>联系我们</span></div>
                  <div class="foot-text"><span>地址：</span><span>上海市徐汇区蒲西路166号</span></div>
                  <div class="foot-text"><span>邮编：</span><span>200030</span></div>
                  <div class="foot-text"><span>电话：</span><span>021-54896913</span></div>
                  <div class="foot-text"><span>邮箱：</span><span>shkeylab_mh@smb.gov.cn</span></div>

               </div>
               <div class="foot-right">
    <div style="width:400px;height:300px;border:1px solid gray;margin:2.5% auto" id="container"></div>
               </div>
           </div>
       </div>
    </div>
</template>

<script>

export default {
    components: {

  },
  data(){
      return{

      }
  },
  mounted(){
this.geolocation();
  },
  methods:{
geolocation(){
    var x = 121.443406,
        y = 31.196059;
            // 百度地图API功能  
            var map = new BMap.Map("container"); // 创建地图实例  
            var point = new BMap.Point(x, y); // 创建点坐标
            map.centerAndZoom(point, 19);

            map.enableScrollWheelZoom(); //开启滚轮缩放功能
            map.disableDoubleClickZoom(); //关闭双击放大功能

            map.enableKeyboard(); //开启键盘操作功能
            var marker=new BMap.Marker(point);
            map.addOverlay(marker); //添加到地图上
}
  }
    
}
</script>

<style scoped>
.about-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 82vh;
    width: 100%;
}
.body-wrap{
    width: 50%;
    height: 88%;
    background-color: white;
    border: 1px solid #80808061;
    padding-left: 4%;
    padding-right: 4%;
}
.title-wrap{
    width: 96%;
    height: 10%;
    font-size: 1.5em;
    line-height: 2.2;
    border-bottom: solid 1px #8080802b;
    font-weight: bold;
    padding-top: 1%;
    padding-bottom: 1%;
} 
.content-wrap{
width: 100%;
    height: 35%;
    text-indent: 2em;
    line-height: 3;
    padding-top: 1%;
    color: gray;
    border-bottom: 1px solid #8080802e;
}
.foot-wrap{
width: 100%;
    height: 48%;

}
.foot-left{
    width: 40%;
    float: left;
    line-height: 2.5;
}
.foot-title-wrap{
font-size: 1.5em;
    font-weight: bold;
    padding-top: 3%;
    padding-bottom: 2%;
}
.foot-text{
    color: #2c81D9;
    padding-top: 2%;

}
.foot-right{
    float: left;
    width: 55%;
}
</style>

