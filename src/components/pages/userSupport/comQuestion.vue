<template>
<div :class="{bodyWrap:!highIsSmall,bodyWrapH:highIsSmall}">
	<div class="img-font-wrap"><div class="img"></div><div class="font">常见问题</div></div>
	<div class="content-wrap" >
<div class="content" v-for="content in contents">
	<div><p class="triangle">Q:&#12288;{{content.question}}</p></div>
	<div class="a"><p >A:&#12288;{{content.answer}}</p></div>
</div>	
	</div>
</div>
</template>

<script>
	export default {
		data() {
			return {
				contents:[{question:"数据下载为什么很慢？",answer:"可能是您选择的时间区间过大，设置的时间间隔较小造成的，进而请求的资源较多，如果网络速度较慢，就很容易出现下载缓慢的情况。"},{question:"什么是地面资料？",answer:"指利用各种观测手段获得的近地面气象观测资料及其综合分析衍生资料，不含单独用卫星、雷达、模式分析、科考等方式获得的地面资料。"},{question:"什么是中国辐射日值数据集？",answer:"该数据集以各省上报的辐射月报表信息化文件（即气表?33）为资料源，选取日值进行读取,共有五个要素（总辐射Q、净辐射N、散射辐射D、直接辐射S和反射辐射R），直接辐射S中分为垂直面直接辐射和水平面直接辐射。每个要素文件为固定长格式。该数据集包含了中国130个站的资料。时间跨度为1957年至最新，滞后3个月。"},{question:"雷达资料包含哪些数据和产品？",answer:"包括各种雷达探测和加工的数据和产品，包括基本数据、雷达反演产品（包括定量产品和图像产品）等。"},{question:"什么是垂直累积液态水？",answer:"垂直累积液态水表示将反射率因子数据转换成等价的液态水值，是假设所有反射率因子返回都是由液态水引起，通过经验关系得到的。"}],
				bodyWrapHeight:"0",
				h:false

			}
		},
		watch:{
			bodyWrapHeight(){
				this.setContainerHeight();
			}
		},
		methods: {
			setContainerHeight() {
      let headerHeight = document.querySelector(".header").clientHeight;
      let bodyWrapHeight = document.querySelector(".bodyWrap").clientHeight;

      let footHeight = document.querySelector(".foot-wrap").clientHeight;
      let pageHeight = document.documentElement.clientHeight;
      let dHeight =
        (headerHeight + bodyWrapHeight + footHeight+50) - pageHeight;
      if (dHeight <= 0) {
        this.highIsSmall = true;
        //当通过computed计算得到的值发生变化后，执行相应的操作
      } else {
        this.highIsSmall = false;
      }
    }
		}
	}

</script>


<style scoped>
.bodyWrap{
	background-color: #FFFFFF;
	    width: 95%;
		    margin-bottom: 1.5%;
}
.bodyWrapH{
	background-color: #FFFFFF;
	    width: 95%;
		    height: 54vh;
}
.img-font-wrap{
width: 99%;
    height: 10vh;
    border-bottom: 1px solid #80808047;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-top: 1%;
    margin-left: 1%;
}
.img{
  background: url("../../../assets/img/userSupport/cjwt.png") no-repeat center center;  
height: 6vh;
    width: 4%;
    float: left;
    background-size: 88%;
}
.font{
        font-size: 2em;
    padding-bottom: 1%;
}
.content-wrap{
	padding-bottom: 1%;
}
.content{
	margin-left: 1%;
}
.a{
	    margin-left: 2%;
}
.triangle:before{    
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-left: 8px solid #3499DB;
    position: relative;
    top: 2px;
    left: 10px;
	    margin-right: 1%;
}
</style>

