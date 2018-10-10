<template>
<div class="form-center">
      <div class="img-form-wrap"> 
		  <div class="img-font-wrap"><div class="img"></div><div class="font">用户反馈</div></div>
		<div class="form-wrap">
			<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="width:60%;min-width:600px;padding-top: 3%;">
			<el-form-item label="标题:"
			prop="title">
				<el-input v-model="form.title"></el-input>
			</el-form-item>

			<el-form-item label="建议:"
			prop="advice"
			:rules="[
      { required: true, message: '请输入建议', trigger: 'blur' }
    ]">
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
				<el-button type="primary" @click="onSubmit()">提交</el-button>
				<el-button @click="resetForm('form')">清空</el-button>
			</el-form-item>

		</el-form>
		</div>
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
		//获取当前系统时间
		 getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;

      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }

      var strHour = date.getHours();
      if (strHour >= 0 && strHour <= 9) {
        strHour = "0" + strHour;
      }

      var strMin = date.getMinutes();
      if (strMin >= 0 && strMin <= 9) {
        strMin = "0" + strMin;
      }

      var strSec = date.getSeconds();
      if (strSec >= 0 && strSec <= 9) {
        strSec = "0" + strSec;
      }

      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        strHour +
        seperator2 +
        strMin +
        seperator2 +
        strSec;
      return currentdate;
    },
    onSubmit() {
			let self=this;
			//获取当前系统时间
			var data = self.getNowFormatDate();
			var nowTime = data.toString().replace(/[^0-9]/gi, "");//传给后台一个时间数字字符串，精确到秒，例如，20180905223600
			if (self.form.advice == "") {
        alert("请填写点儿建议~~~");
        return;
      }
			var obj = {
          title: self.form.title,
					advice:self.form.advice,
					name:self.form.name,
					phone:self.form.phone,
					email:self.form.email,
					userName:"readearth",
					commiteTime:nowTime
				};
				
			var objToStr = JSON.stringify(obj);
      this.axios.get("HomeDataService.svc/GetUserFormInfo",{//待传入请求地址
				params:{
					funParams: objToStr
				}
			}).then(response => {
            let resData = response.data
            alert(resData);
          }
			).catch(response => {
            console.log(response);
            alert("提交失败！");
          });
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
	height: auto;
}
.img-form-wrap{
width: 63%;
    background-color: #ffffff;
    height: auto;
    margin-left: 8%;
    border: solid 1px #80808069;
    margin-top: 3%;
    margin-bottom: 4%;
}
.img-form-wrap >>> .el-textarea__inner {
  height: 23vh;
}
.img-form-wrap >>> .el-form-item__label{
	font-weight: bold;
	width: 20% !important;
	font-size: 20px;
}
.img-form-wrap >>> .el-form-item__content{
	margin-left: 140px !important;
}
.form-wrap{
	display: flex;
    justify-content: center;
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
    width: 6%;
    float: left;
    margin-left: 4%;
    background-size: 57%;
}
.font{
font-size: 1.5em;
    padding-bottom: 0.5%;
    padding-left: 2%;
        width: 15%;

}
</style>

