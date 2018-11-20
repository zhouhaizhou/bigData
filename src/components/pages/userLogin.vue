<template>
  <div>
    <my-header></my-header>
    <div class="user-login-wrap-center">
      <div class="user-login-wrap">
        <div class="user-register">用户登录</div>
        <div class="sub-img-wrap" style="">
          <div class="sub-img"></div>
        </div>
        <div class="sub-wrap">

          <div class="text-wrap">
            <div class="text">
              U&nbsp;S&nbsp;E&nbsp;R&nbsp;&nbsp; L&nbsp;O&nbsp;G&nbsp;I&nbsp;N&nbsp;</div>
          </div>

        </div>
        <div class="users-register-wrap">
          <div class="users-register-wrap-center">
            <div class="element-ui-wrap">
              <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

                <el-form-item label="" prop="userName" class="regi_form_input">
                  <i class="icon IconPeople"></i>
                  <el-input v-model="ruleForm2.userName" placeholder="用户名" class="user-ui" @keyup.enter.native="submitForm('ruleForm2')"></el-input>
                </el-form-item>
                <el-form-item label="" prop="pass" class="regi_form_input noMargin">
                  <i class="icon IconPwd"></i>
                  <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" placeholder="密码" class="user-ui" @keyup.enter.native="submitForm('ruleForm2')"></el-input>
                </el-form-item>

                <el-form-item class="login-button">
                  <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="login-foot-wrap">
              <div class="left-wrap">
                <el-checkbox v-model="checked">下次自动登录</el-checkbox>
              </div>
              <div class="right-wrap">
                <span class="cur-point">忘记密码</span>
                <span>|</span>
                <span class="cur-point" @click="register">注册</span>
              </div>
            </div>
            </el-form>
          </div>
        </div>
      </div>

    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import myHeader from "../common/header.vue";
import myFooter from "../common/foot.vue";
import {mapActions,mapMutations} from 'vuex';
export default {
  components: {
    myHeader,
    myFooter
  },
   data() {
      var checkUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }else{
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        checked:false,
        ruleForm2: {
          pass: '',
          checkPass: '',
          userName: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          userName: [
            { validator: checkUserName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      ...mapActions(['LOGIN']),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      register() {
      this.$router.push("/register");
    },
     resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      login(){
        let userName=this.ruleForm2.userName;
        let password=this.ruleForm2.pass;
        let isChecked=this.checked;
        let expires=isChecked?'7D':'-1D';
        let params={"userName":userName,"password":password,"expires":expires};
        this.LOGIN(params).then(res=>{
          if(res=="ok"){
           this.$router.push("/home");
          }else{
            alert("登录失败！");
            this.resetForm('ruleForm2');
          }
        }).catch(res=>{
         alert("错误！");
        });
      }
    }
};
</script>

<style scoped>
.user-login-wrap-center {
  display: flex;
  justify-content: center;
}
.user-login-wrap {
    width: 25%;
    border: solid 1px #80808047;
    margin-top: 2%;
    margin-bottom: 3%;
}
.users-register-wrap{
      width: 100%;
    display: flex;
    justify-content: center;
}
.users-register-wrap-center{
  width: 80%;
}
.element-ui-wrap >>> .el-input__inner {
  width: 70%;
}

.regi_form_input{
  position: relative;
  height: 42px;
  line-height: 42px;
  background: none;
  margin-bottom: 7%;
  font-size: 14px;
  /* overflow: hidden; */
  border:1px solid #ccc;
  padding-bottom: 0;
}
.regi_form_input .icon.IconPeople {
  display: inline-block;
  float: left;
  width: 25px;
  height: 29px;
  margin: 0px 5px 0 20px;

  background-image: url("../../assets/img/user.png");
  background-repeat: no-repeat;
  /* background: url("../../assets/img/user.png") no-repeat center center; */
}
.regi_form_input .icon.IconPwd {
  display: inline-block;
  float: left;
  width: 25px;
  height: 29px;
  margin: 0px 5px 0 20px;
  background-image: url("../../assets/img/password.png");
  background-repeat: no-repeat;
  /* background: url("../../assets/img/user.png") no-repeat center center; */
}
.regi_form_input .regi_login_input{
  position: absolute;
  left:45px;
  top:0;
  padding: 9px 0 10px;
  width: 270px;
  font-size: 14px;
  zoom: 1;
  border: none;
  color: #333;
  /*height: 23px;*/
  line-height: 23px;
  background: 0 0!important;
}
.regi_form_input >>> .el-form-item__content{
  margin-left: 0px !important;
      display: flex;
    align-items: center;
    height: 100%;
    background-color: #F4F4F4;
}
.login-button >>> .el-form-item__content{
  margin-left: 0px !important;
      display: flex;
    align-items: center;
    height: 100%;
    
}
.login-button >>> .el-form-item__content button{
width: 100%;
    
}
.user-ui{
  width:80%;
}
.user-ui >>> input{
  border: none;
      width: 100% !important;
    background-color: #F4F4F4;
}

.login-foot-wrap {
  height: 4vh;
}
.left-wrap {
  float: left;
}
.left-wrap >>> .el-checkbox__label{
  font-size: 16px;
}
.right-wrap {
  float: right;
}
.cur-point{
  cursor: pointer;
  color: #808080c9;
}
.cur-point:hover{
  color: black;
}
.user-register {
  margin-top: 11%;
  height: 5vh;
  font-weight: bold;
  font-size: 1.4em;
  text-align: center;
}
.sub-img-wrap {
  width: 100%;
  height: 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sub-img {
  background: url("../../assets/img/sub-img.png") no-repeat center center;
  width: 99vw;
  height: 1vh;
}
.sub-wrap {
  width: auto;
  height: 7vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 6%;
}
.hr-wrap {
  width: 35%;
  /* display: flex;
justify-content: center;
align-items: center; */
}

.text-wrap {
  width: auto;
  font-size: 1.4em;
  text-align: center;
}
.text {
  line-height: 250%;
  color: #808080b3;
}
.users-login-wrap {
  height: 54vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2vh;
}
.users-login-wrap-center {
  display: inline-block;
}

.user {
  float: left;
  border: 1px solid #d3d3d3c9;
  width: 22vw;
  height: 60vh;
  cursor: pointer;

  -webkit-transform: scale(0.8);
  -moz-transform: scale(0.8);
  -o-transform: scale(0.8);
  -webkit-transition-duration: 0.2s;
  -moz-transition-duration: 0.2s;
  -o-transition-duration: 0.2s;
  opacity: 0.7;
}
.user:hover {
  /* transform: scale(1.1); */
  -webkit-transform: scale(
    0.85
  ); /*Webkit: Scale up image to 1.2x original size*/
  -moz-transform: scale(0.85); /*Mozilla scale version*/
  -o-transform: scale(0.85); /*Opera scale version*/
  box-shadow: 0px 0px 20px gray; /*CSS3 shadow: 30px blurred shadow all around image*/
  -webkit-box-shadow: 0px 0px 20px gray; /*Safari shadow version*/
  -moz-box-shadow: 0px 0px 20px gray; /*Mozilla shadow version*/
  opacity: 1;
}
.img-wrap {
  height: 22vh;
}
.subtitle-wrap {
  font-weight: bold;
  font-size: 1.6em;
}
.content-wrap {
  height: 20vh;
}
.content {
  text-indent: 2em;
  margin: 6% 6% 0% 6%;
  font-size: 1.1em;
  text-align: left;
  line-height: 2;
}
.enter-wrap {
  height: 10vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.enter {
  width: 8vw;
  height: 5vh;
  font-size: 1.2em;
  line-height: 5vh;
  background-color: rgb(53, 152, 219);
  color: white;
}
</style>