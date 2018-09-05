<template>
<div class="form-center">
      <div class="form-wrap"> 
		  <div class="img-font-wrap"><div class="img"></div><div class="font">用户反馈</div></div>
		<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;padding-top: 3%;padding-left: 16%;">
			<el-form-item label="标题:"
			prop="title">
				<el-input v-model="form.title"></el-input>
			</el-form-item>

			<el-form-item label="建议:"
			prop="advice">
				<el-input type="textarea" v-model="form.advice"></el-input>
			</el-form-item>
			<el-form-item label="您的姓名:"
			prop="name">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="您的电话:"
			prop="phone" >
				<el-input v-model="form.phone"></el-input>
			</el-form-item>
			<el-form-item 
			prop="email" 
			label="您的邮箱" 
			:rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]">
				<el-input v-model="form.email"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">提交</el-button>
				<el-button @click="resetForm('form')">清空</el-button>
			</el-form-item>

		</el-form>
	</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        advice: "",
        name: "",
        phone: "",
        email: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
	},
	resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
};
</script>

<style scoped>
.form-center{
	display: flex;
	/* justify-content: center; */
	align-items: center;
	height: 83vh;
}
.form-wrap{
    width: 63%;
    background-color: #ffffff;
    height: 74vh;
    margin-left: 8%;
    border: solid 1px #80808069;
}
.form-wrap >>> .el-textarea__inner {
  height: 23vh;
}
.form-wrap >>> .el-form-item__label{
	font-weight: bold;
	width: 20% !important;
	font-size: 20px;
}
.form-wrap >>> .el-form-item__content{
	margin-left: 140px !important;
}

.img-font-wrap{
    width: 100%;
    height: 7vh;
    border-bottom: 1px solid #80808047;
    display: flex;
    align-items: center;
}
.img{
  background: url("../../../assets/img/userSupport/yhfk.png") no-repeat center center;  
    height: 5vh;
    width: 10%;
    float: left;
}
.font{
    font-size: 1.5em;
}
</style>

