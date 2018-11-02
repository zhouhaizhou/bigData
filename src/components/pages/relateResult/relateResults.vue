<template>
    <div>
        <div class="body-wraps">
            <div class="article-wrap item">
                <div class="article-title-wrap item-title">
                    <div class="article-icon"></div>
                    <div class="item-title-font">文章</div>
                </div>
                <div class="article-lists-wrap item-lists">
                    <!-- <a href="javascript:;" @click="getArticleLink(article)" class="article" v-for="(article,index) in articleLists"><span>[{{index+1}}]</span> <span>{{article.articleName}}</span></a> -->
                    <div class="article" v-for="(article,index) in articleLists"><span>[{{index+1}}]</span> <span>{{article.articleName}}</span></div>
                </div>
            </div>
            <div class="books-wrap item">
                <div class="books-title-wrap item-title">
                    <div class="books-icon"></div>
                    <div class="item-title-font">专著</div>
                </div>
                <div class="booke-lists-wrap item-lists">
                    <div class="book" v-for="(book,index) in bookLists"><span>[{{index+1}}]</span> <span>{{book.bookName}}</span></div>
                </div>
            </div>
            <div class="copy-right-wrap item">
                <div class="copyright-title-wrap item-title">
                    <div class="copyright-icon"></div>
                    <div class="item-title-font">软件著作权</div>
                </div>
                <div class="copyright-lists-wrap item-lists">
                    <div class="copyright" v-for="(copyright,index) in copyrightLists"><span>[{{index+1}}]</span><span>{{copyright.copyrightName}}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      articleLists: [],
      bookLists: [],
      copyrightLists: []
    };
  },
  mounted(){
    this.getAllData();
  },
  methods: {
    open() {
      this.$alert("这是一段内容", "标题名称", {
        confirmButtonText: "确定",
        callback: action => {
          this.$message({
            type: "info",
            message: `action: ${action}`
          });
        }
      });
    },
    getArticleLink(article) {
      // window.location.href=article.articleUrl;
      window.open(article.articleUrl);
    },
    getPageData(){
            this.axios.get("").then(response => {
            let resData = eval("(" + response.data + ")");
            //解析传过来的数据

          }
			).catch(response => {
            console.log(response);
          });
    },
    /**
     * 获取相关成果的所有数据
     */
    getAllData(){
      let self=this;
      this.axios.get("HomeDataService.svc/GetRelateResults").then(
        response=>{
          let resData=eval("("+response.data+")");
          self.articleLists=resData[0].articleLists;
          self.bookLists=resData[0].bookLists;
          self.copyrightLists=resData[0].copyrightLists;
        }
      ).catch(response=>{
        console.log(response);
      });
    }
  }
};
</script>

<style scoped>
.body-wraps {
  width: auto;
  height: auto;
  margin-left: 20%;
  margin-right: 20%;
  background-color: white;
  margin-top: 2%;
  margin-bottom: 2%;
}
.article-icon {
  background: url("../../../assets/img/userSupport/article.png") no-repeat
    center center;
    width: 5%;
    height: 4vh;
    float: left;
    background-size: 65%;
}
.article {
  /* cursor: pointer; */
  clear: both;
  display: flex;
}
.article-lists-wrap a{
  margin-bottom: 3%;
}
.article-lists-wrap.item-lists  span:nth-child(1){
  margin-right: 2%;
  font-weight: bold;
}
.article-lists-wrap.item-lists  span:nth-child(2){
word-break: break-all;
}
.booke-lists-wrap .book{
  margin-bottom: 3%;
}
.booke-lists-wrap .book span:nth-child(1){
    margin-right: 2%;
  font-weight: bold;
}
.booke-lists-wrap .book span:nth-child(2){
word-break: break-all;
}
.copyright-lists-wrap .copyright{
  margin-bottom: 3%;
}
.copyright-lists-wrap .copyright span:nth-child(1){
    margin-right: 2%;
  font-weight: bold;
}
.pic-wrap {
  display: flex;
  align-items: center;
}
.skim {
  background: url("../../../assets/img/userSupport/yulan.png") no-repeat center
    center;
  width: 2vw;
  height: 3vh;
  background-size: 70%;
}
.books-icon {
  background: url("../../../assets/img/userSupport/zhuanzhu.png") no-repeat
    center center;
  width: 5%;
  height: 5vh;
  float: left;
  background-size: 62%;
}
.copyright-icon {
  background: url("../../../assets/img/userSupport/copyright.png") no-repeat
    center center;
  width: 5%;
  height: 5vh;
  float: left;
  background-size: 62%;
}
.item {
  padding-top: 2%;
  padding-bottom: 2%;
}
.item-title {
    border-bottom: 1px solid #80808073;
    padding-bottom: 1%;
    padding-left: 4%;
    margin-bottom: 2%;
    display: flex;
    align-items: center;
}
.item-title-font {
     font-size: 1.2em;
    font-weight: bold;
}
.item-lists {
  padding-left: 7%;
  padding-right: 7%;
  line-height: 2;
}
a:link,
a:visited {
  text-decoration: none; /*超链接无下划线*/
  color: black;
}
a:hover {
  text-decoration: underline; /*鼠标放上去有下划线*/
}
</style>
