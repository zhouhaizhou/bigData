<template>
<div class="body-wrap-center">
  <div :class="{bodyWrap:!highIsSmall,bodyWrapH:highIsSmall}">
	<div class="img-font-wrap"><div class="img"></div><div class="font">常见问题</div></div>
	<div class="content-wrap" >
<div class="content" v-for="(content,index) in contents">
	<div><p class="Question">{{index+1}}、{{content.question}}</p></div>
	<div class="Answer-wrap"><p class="Answer">{{content.answer}}</p></div>
</div>	
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
        highIsSmall:false

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
.body-wrap-center{
      display: flex;
    justify-content: center;
    width: 85%;
}
.bodyWrap{
 background-color: #FFFFFF;
    width: 78%;
    margin-bottom: 3%;
    padding-left: 3%;
    padding-right: 3%;
    margin-top: 3%;

}
.bodyWrapH{
	background-color: #FFFFFF;
	    width: 78%;
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
.Question{
    font-size: 1.4em;
    color: #418422;
}
.Answer-wrap{
      padding-left: 4%;
      padding-right: 4%;
      line-height: 2;
      font-size: 1.1em;
}
.Answer{
	   text-indent: 2em;
}
a{text-decoration:none}
</style>

