<template>
<div class="useHelp-body">
	<div class="useHelp-wrap">
		<div class="img-font-wrap"><div class="img"></div><div class="font">使用帮助</div></div>

		<div class="content-wrap">
			<p>上海市气象局污染天气大数据平台系统，主要有七大模块组成，分别是首页、数据服务、在线展示、开放指数、相关成果、用户支持、关于我们。点击各导航标题即可进入各个模块查看相应的内容。</p>
			<p>系统的首页，简略的提供了各模块内容的一览图，主要有把大数据共享模块、数据产品服务、数据热点，如果想了解某部分内容，点击，跳转到指定的页面进行浏览查看。</p>
			<!-- <img src="../../../assets/img/userSupport/pic1.png" alt="污染天气大数据八大模块">
			<img src="../../../assets/img/userSupport/pic2.png" alt="数据产品服务"> -->
			<p>数据服务模块，主要提供各种数据的下载功能。主要有：地面气象资料、辐射资料、大气成分资料、高空气象资料、综合观测资料、卫星探测资料、雷达探测资料、数值预报产品等等。点击左边的导航栏跳转到指定的数据列表，选择下载相应的小时数据、日数据、月数据、年数据，同时设置相应的下载条件：例如下载时间区间、选择哪些省份的哪些站点、选择那些要素、设置下载的时间间隔，可以直接下载，也可以加入清单，方便后期随时下载。下载清单中的记录可以根据需要进行相应的添加删除操作，或者根据需要进行进行勾选指定的记录进行自定义或批量下载。</p>
			<!-- <img src="../../../assets/img/userSupport/pic3.png" alt="弹出层"> -->
			<p>在线展示模块，左边菜单：分为九大模块，每一模块下面分几种要素，然后根据这些要素绘制相对应的图。图片展示区域：条件选择主要有全国和华东，数值预报只有华东。类型选择比较多，主要根据数据类型分类。时间序列：列出了符合该条件下的所有产品，可以点击播放</p>
			<!-- <img src="../../../assets/img/userSupport/pic4.png" alt="在线展示"> -->
			<p>相关成果模块，主要包含相关研究人员的文章、专著等信息内容，方便浏览者查阅。</p>
			<p>用户支持模块，主要包含使用帮助、常见问题、用户反馈等模块，帮助浏览者了解系统，并向平台反馈宝贵的意见。</p>
			<p>关于我们模块，主要包含关于我们的大致介绍，同时提供了我们的联系方式和地址，同时提供地图定位，方便用户直观地查看我们的位置。</p>
            <!-- <img src="../../../assets/img/userSupport/pic5.png" alt="关于我们"> -->
			<p>用户注册模块，主要包含三类用户：大气专项用户实名注册、教育科研实名注册、单位实名注册。根据不同的用户赋予不同的权限，权限不同，用户所能浏览、下载的数据级别也不同。</p>
			<!-- <img src="../../../assets/img/userSupport/pic6.png" alt="注册模块"> -->

		</div>
	</div>
</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			
		}
	}

</script>

<style scoped>
.useHelp-body{
	    width: 65%;
    padding-top: 3%;
    padding-left: 7%;
}
.useHelp-wrap{
    padding-top: 0%;
    background-color: white;
    padding-left: 8%;
}
.img-font-wrap{
width: 88%;
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
  background: url("../../../assets/img/userSupport/sybz1.png") no-repeat center center;  
height: 6vh;
    width: 4%;
    float: left;
    background-size: 88%;
}
.font{
font-size: 1.5em;
    padding-bottom: 0.5%;
    padding-left: 2%;
	    width: 15%;

}
.content-wrap{
	padding-bottom: 2.5%;
	    width: 90%;
    padding-left: 3%;
    padding-right: 3%;
}
p{
	    text-indent: 2em;
    width: 92%;
    line-height: 2;
}
</style>
