<template>
  <div>
    <el-row>
      <span  style="line-height:40px;float:left;">资讯标题：</span>
      <el-col :span="6">
        <el-input type="text" v-model="inputTitle" ></el-input>
      </el-col>
      <el-col :span="2" style="text-align:right;">
        <span style="line-height:40px;">日期：</span>
      </el-col>
      <el-col :span="6">
        <el-date-picker v-model="inputDate" value-format="yyyy-MM-dd HH:mm:ss"  style="width:100%;" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div id="editor"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="4" offset="20">
        <el-button type="primary" style="float:right;" @click="save">保存</el-button>
        <el-button style="float:right;margin-right:60px;" type="danger" @click="cancel">返回</el-button>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import'../../../../static/Ueditor/ueditor.config.js'
import'../../../../static/Ueditor/ueditor.all.min.js'
import'../../../../static/Ueditor/lang/zh-cn/zh-cn.js'
import'../../../../static/Ueditor/ueditor.parse.min.js'
import toolbars from '../../../../static/data/toolbars.json'
export default {
  data(){
    return {
      editor:null,
      inputDate:'',
      inputTitle:'',
      content:'',
      config:{
        autoHeightEnabled: false,
        autoFloatEnabled: true,
        initialContent:'请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
        autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
        initialFrameWidth: null,
        initialFrameHeight: 500,
        toolbars:[toolbars],
        BaseUrl: '',
        UEDITOR_HOME_URL: 'static/ueditor/',
        elementPathEnabled:false,
        wordCount:false,
      }
    } 
  },
  mounted(){
    let data=this.$route.params.data;
    var root = process.env.API_ROOT;
    this.config.serverUrl=root+"/controller.ashx";
    this.editor = UE.getEditor('editor',this.config);
    if(data){   //有值说明是编辑状态需要赋值操作
      this.inputDate=data.Date;
      this.inputTitle=data.Item;
      this.content=data.content;
      this.setEditorVal(this.content);
    }
  },
  methods:{
    setEditorVal(val){
      let self=this;
      this.editor.addListener("ready",()=> {
        self.editor.setContent(val);
      });
    },
    cancel(){
      this.$router.push({name:'zixun'});
    },
    save(){
      let config={
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      let content =this.editor.getContent();
      if(this.inputDate==''||this.inputTitle==''||content==''){
        alert("请填写完之后再保存！");
        return;
      }
      content=content.replace(/</g,'#').replace(/>/g,'*');
      this.axios
        .post("Handler.ashx?action=dynamicInfo",{data:content,title:this.inputTitle,date:this.inputDate},config).then(res=>{
          this.$message({
            message: '保存成功！',
            type: 'success'
          });
          this.$router.push({name:'zixun'});
        }).catch(res=>{
            this.$message.error('保存失败！');
            console.log(res.response.data);
          }
        )
    }
  },
  destroyed() {
    this.editor.destroy();
  }
}
</script>

<style scoped>
.el-row{
  padding-bottom: 20px;
}
</style>