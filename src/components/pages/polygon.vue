<template>
  <div>
    <ul>
        <li>
            <a href="#" ref="a" style="height:113px;">
                <i></i>
                <em></em>
                <h4>标题</h4>
            </a>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
    } 
  },
  mounted(){
      var obj = this.$refs.a;
      obj.style.height=obj.clientWidth/ 30 * 17+1+'px';
    }
}
</script>

<style scoped>
ul {
	position:absolute;
	left:0;
	top:50%;
	width:100%;
	padding:0 30px;
	list-style:none;
	margin:0;
	-webkit-transform:translate(0,-50%);
	-ms-transform:translate(0,-50%);
	transform:translate(0,-50%);
}
ul li {
	float:left;
	width:14.285714%;
	padding:0 13px;
	margin-top:5%;
}
ul li:nth-child(8) {
	margin-left:7.142857%;
	clear:left;
}
ul li:nth-child(14) {
	margin-left:14.285714%;
	clear:left;
}
ul li a {
	display:block;
	float:left;
	width:100%;
	position:relative;
	outline:none;
	-webkit-box-shadow:0 0 15px rgba(0,0,0,0.20);
	-moz-box-shadow:0 0 15px rgba(0,0,0,0.20);
	box-shadow:0 0 15px rgba(0,0,0,0.20);
}
ul li a::before {
	content:"";
	display:block;
	position:absolute;
	left:0;
	top:0;
	background:#fff;
	width:100%;
	height:100%;
	z-index:0;
	-webkit-box-shadow:0 0 15px rgba(0,0,0,0.20);
	-moz-box-shadow:0 0 15px rgba(0,0,0,0.20);
	box-shadow:0 0 15px rgba(0,0,0,0.20);
	-webkit-transition:all 0.2s ease-out 0s;
	-moz-transition:all 0.2s ease-out 0s;
	-o-transition:all 0.2s ease-out 0s;
	transition:all 0.2s ease-out 0s;
	-webkit-transform:rotate(60deg);
	-moz-transform:rotate(60deg);
	-ms-transform:rotate(60deg);
	-o-transform:rotate(60deg);
	transform:rotate(60deg);
}
ul li a::after {
	content:"";
	display:block;
	position:absolute;
	left:0;
	top:0;
	background:#fff;
	width:100%;
	height:100%;
	z-index:0;
	-webkit-box-shadow:0 0 15px rgba(0,0,0,0.20);
	-moz-box-shadow:0 0 15px rgba(0,0,0,0.20);
	box-shadow:0 0 15px rgba(0,0,0,0.20);
	-webkit-transition:all 0.2s ease-out 0s;
	-moz-transition:all 0.2s ease-out 0s;
	-o-transition:all 0.2s ease-out 0s;
	transition:all 0.2s ease-out 0s;
	-webkit-transform:rotate(-60deg);
	-moz-transform:rotate(-60deg);
	-ms-transform:rotate(-60deg);
	-o-transform:rotate(-60deg);
	transform:rotate(-60deg);
}
ul li a i {
	display:block;
	position:absolute;
	left:0;
	top:0;
	background:#fff;
	width:100%;
	height:100%;
	z-index:1;
	-webkit-transition:all 0.2s ease-out 0s;
	-moz-transition:all 0.2s ease-out 0s;
	-o-transition:all 0.2s ease-out 0s;
	transition:all 0.2s ease-out 0s;
}
ul li a i::before {
	content:"";
	display:block;
	position:absolute;
	left:0;
	top:0;
	background:#fff;
	width:100%;
	height:100%;
	z-index:1;
	-webkit-transition:all 0.2s ease-out 0s;
	-moz-transition:all 0.2s ease-out 0s;
	-o-transition:all 0.2s ease-out 0s;
	transition:all 0.2s ease-out 0s;
	-webkit-transform:rotate(60deg);
	-moz-transform:rotate(60deg);
	-ms-transform:rotate(60deg);
	-o-transform:rotate(60deg);
	transform:rotate(60deg);
}
ul li a i::after {
	content:"";
	display:block;
	position:absolute;
	left:0;
	top:0;
	background:#fff;
	width:100%;
	height:100%;
	z-index:1;
	-webkit-transition:all 0.2s ease-out 0s;
	-moz-transition:all 0.2s ease-out 0s;
	-o-transition:all 0.2s ease-out 0s;
	transition:all 0.2s ease-out 0s;
	-webkit-transform:rotate(-60deg);
	-moz-transform:rotate(-60deg);
	-ms-transform:rotate(-60deg);
	-o-transform:rotate(-60deg);
	transform:rotate(-60deg);
}
ul li a em {
	display:block;
	position:absolute;
	left:0;
	top:0;
	background:#568fd1;
	width:100%;
	height:100%;
	z-index:10;
	opacity:0;
	filter:alpha(opacity=00);
	-webkit-transition:all 0.2s ease-out 0s;
	-moz-transition:all 0.2s ease-out 0s;
	-o-transition:all 0.2s ease-out 0s;
	transition:all 0.2s ease-out 0s;
}
ul li a em::before {
	content:"";
	display:block;
	position:absolute;
	left:0;
	top:0;
	background:#568fd1;
	width:100%;
	height:100%;
	-webkit-transition:all 0.2s ease-out 0s;
	-moz-transition:all 0.2s ease-out 0s;
	-o-transition:all 0.2s ease-out 0s;
	transition:all 0.2s ease-out 0s;
	-webkit-transform:rotate(60deg);
	-moz-transform:rotate(60deg);
	-ms-transform:rotate(60deg);
	-o-transform:rotate(60deg);
	transform:rotate(60deg);
}
ul li a em::after {
	content:"";
	display:block;
	position:absolute;
	left:0;
	top:0;
	background:#568fd1;
	width:100%;
	height:100%;
	-webkit-transition:all 0.2s ease-out 0s;
	-moz-transition:all 0.2s ease-out 0s;
	-o-transition:all 0.2s ease-out 0s;
	transition:all 0.2s ease-out 0s;
	-webkit-transform:rotate(-60deg);
	-moz-transform:rotate(-60deg);
	-ms-transform:rotate(-60deg);
	-o-transform:rotate(-60deg);
	transform:rotate(-60deg);
}
ul li a h4 {
	display:block;
	float:left;
	position:absolute;
	left:0;
	width:100%;
	top:50%;
	height:32px;
	line-height:32px;
	font-size:16px;
	color:#fff;
	z-index:19;
	text-align:center;
	opacity:0;
	filter:alpha(opacity=00);
	white-space:nowrap;
	overflow:hidden;
	text-overflow:ellipsis;
	-webkit-transform:translate(0,-50%);
	-ms-transform:translate(0,-50%);
	transform:translate(0,-50%);
	-webkit-transition:all 0.2s ease-out 0s;
	-moz-transition:all 0.2s ease-out 0s;
	-o-transition:all 0.2s ease-out 0s;
	transition:all 0.2s ease-out 0s;
}
ul li a:hover em {
	opacity:0.8;
	filter:alpha(opacity=80);
}
ul li a:hover h4 {
	opacity:1;
	filter:alpha(opacity=100);
}
</style>