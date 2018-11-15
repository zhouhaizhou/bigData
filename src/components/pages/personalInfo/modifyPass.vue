<template>
  <div class="content" ref="content">
    <div class="header">
      <div class="strip"></div>
      <div class="header-text">修改密码</div>
    </div>
    <div class="main">
      <el-row v-for="(item,index) in items" :key="index" style="margin-bottom:30px;">
        <el-col :span="3" :offset="1" style="text-align:right;">
          <span style="line-height:40px;">{{item.label}}：</span>
        </el-col>
        <el-col :span="8">
          <el-input style="width:80%;" type="password" :class="{error:error&&index==2}" v-model="item.value" @blur="checkPass(item.value,index)"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="5" style="padding-left:40px;margin-top:40px;">
          <el-button type="success" @click="confirm">确定</el-button>
          <el-button type="primary" style="margin-left:40px;" @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      error: false,
      items: [
        {
          label: "旧密码",
          value: ""
        },
        {
          label: "新密码",
          value: ""
        },
        {
          label: "确认密码",
          value: ""
        }
      ]
    };
  },
  mounted(){
    this.setPagePaddingBottom();
  },
  methods: {
    ...mapMutations(["setMainHeight"]),
    setPagePaddingBottom() {
      setTimeout(()=>{
        let contentH = document.querySelector(".content").clientHeight + 20;
        let obj = {
          contentH: contentH,
          self: this,
          ref: "content"
        };
        this.setMainHeight(obj);
      },10)
    },
    confirm() {
      let oldPass = this.items[0].value;
      let newPass = this.items[1].value;
      let checkPass = this.items[2].value;
      if (newPass != checkPass) {
        this.$message.error("密码不一致！");
        return;
      }
      for(var i=0;i<this.items.length;i++){
        let ele=this.items[i];
        if(!ele.value){
          alert("请填写"+ele.label+"项")
          return;
        }
      }
      this.axios
        .get("SystemAdmin.svc/ModifyPass", {
          params: {
            oldPass: oldPass,
            newPass: newPass
          }
        })
        .then(res => {
          this.$message({
            message: "修改成功！",
            type: "success"
          });
        })
        .catch(res => console.log(res));
    },
    reset() {
      this.items.forEach(ele => {
        ele.value = "";
      });
      this.error = false;
    },
    checkPass(val,index) {
      if(index!=2) return;
      if (val != this.items[1].value) {
        this.error = true;
      } else {
        this.error = false;
      }
    }
  }
};
</script>

<style scoped>
.content {
  margin-top: 2vh;
  background-color: white;
}
.header {
  border-bottom: 1px solid #ccc;
}
.strip {
  width: 10px;
  height: 25px;
  float: left;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 7px;
  background-color: rgb(0, 195, 154);
}
.header-text {
  line-height: 45px;
}
.main {
  height: 39vh;
  padding-top: 30px;
  margin-bottom: 80px;
}
.label-txt {
  text-align: right;
}
.error /deep/ .el-input__inner {
  border-color: red;
}
</style>