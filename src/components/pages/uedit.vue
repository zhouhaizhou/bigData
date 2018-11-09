<template>
  <div>
    <div>
      <button @click="gettext">点击</button>
      <div id="editor"></div>
    </div>
  </div>
</template>

<script>
import'../../../static/Ueditor/ueditor.config.js'
import'../../../static/Ueditor/ueditor.all.min.js'
import'../../../static/Ueditor/lang/zh-cn/zh-cn.js'
import'../../../static/Ueditor/ueditor.parse.min.js'
export default {
  data(){
    return {
      editor:null,
      config:{
        autoHeightEnabled: false,
        autoFloatEnabled: true,
        initialContent:'请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
        autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
        initialFrameWidth: null,
        initialFrameHeight: 450,
        BaseUrl: '',
        UEDITOR_HOME_URL: 'static/ueditor/',
        elementPathEnabled:false,
        wordCount:false,
      }
    } 
  },
  mounted(){
    var root = process.env.API_ROOT;
    this.config.serverUrl=root+"/controller.ashx";
    // this.editor = UE.delEditor("editor");
    this.editor = UE.getEditor('editor',this.config);
  },
  methods:{
    gettext(){
      alert(this.editor.getContent());
    }
  },
  destroyed() {
    this.editor.destroy();
  }
}
</script>

<style scoped>

</style>