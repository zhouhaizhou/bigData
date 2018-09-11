<template>
    <div>
        <div class="body-wraps">
            <div class="article-wrap item">
                <div class="article-title-wrap item-title">
                    <div class="article-icon"></div>
                    <div class="item-title-font">文章</div>
                </div>
                <div class="article-lists-wrap item-lists">
                    <a href="javascript:;" @click="getArticleLink(article)" class="article" v-for="(article,index) in articleLists">[{{index+1}}] {{article.articleName}}</a>
                </div>
            </div>
            <div class="books-wrap item">
                <div class="books-title-wrap item-title">
                    <div class="books-icon"></div>
                    <div class="item-title-font">专著</div>
                </div>
                <div class="booke-lists-wrap item-lists">
                    <div class="book" v-for="(book,index) in bookLists">[{{index+1}}] {{book}}</div>
                </div>
            </div>
            <div class="copy-right-wrap item">
                <div class="copyright-title-wrap item-title">
                    <div class="copyright-icon"></div>
                    <div class="item-title-font">软件著作权</div>
                </div>
                <div class="copyright-lists-wrap item-lists">
                    <div class="copyright" v-for="copyright in copyrightLists">{{copyright}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      articleLists: [
        {
          articleName:
            "Gao W, Tie X, Xu J, et al. Long-term trend of O3 in a mega City (Shanghai), China: Characteristics, causes, and interactions with precursors[J]. Science of the Total Environment, 2017, 603-604:425.",
          articleUrl:
            "http://kns.cnki.net/KCMS/detail/detail.aspx?dbcode=SJES&dbname=SJESTEMP_U&filename=SJESEABF50A3F9F22A70252BEB4EC599ADD7&uid=WEEvREcwSlJHSldRa1FhdXNXa0hFbHBYckZoNHdVaGJSRkt4UEJENUYrTT0=$9A4hF_YAuvQ5obgVAqNKPCYcEjKensW4IQMovwHtwkF4VYPoHbKxJw!!&v=MzEzNTNsZkNwTFU4NXQ5aHhieTh4YUE9TmlmT2ZjYkpiS2ZKci81R0V1SjVEbjVJeUJZUjd6MFBQUTNtMldFd2NMdmxNYzZZQ0pVYUYxdVFVci9QSmxjU2JtS0NHWUNHUQ=="
        },
        {
          articleName:
            "Xu J, Chang L, Yan F, et al. Role of climate anomalies on decadal variation in the occurrence of wintertime haze in the Yangtze River Delta, China.[J]. Science of the Total Environment, 2017, 599-600:918.",
          articleUrl:
            "http://kns.cnki.net/KCMS/detail/detail.aspx?dbcode=SJES&dbname=SJESTEMP_U&filename=SJES643113042C20E1F8D4A12C238BD18DD6&uid=WEEvREcwSlJHSldRa1FhdXNXa0hFbHBYckZoNHdVaGJSRkt4UEJENUYrTT0=$9A4hF_YAuvQ5obgVAqNKPCYcEjKensW4IQMovwHtwkF4VYPoHbKxJw!!&v=MTQ0MDZ1UVVyL1BKbGNTYm1LQ0dZQ0dRbGZDcExVODV0OWh4Ynk2eEtvPU5pZk9mYlc4SGRETnJJOUJacGdOREFrNHVSNW43azU4U2d6Z3J4cEhEYk9jTWM2WkNKVWFGMQ=="
        },
        {
          articleName: "Visual Basic与Oracle数据库在生态与农牧业气象中的应用",
          articleUrl:
            "http://kns.cnki.net/KCMS/detail/detail.aspx?dbcode=CJFQ&dbname=CJFDLAST2017&filename=GLXZ201624101&uid=WEEvREcwSlJHSldRa1FhdXNXa0hFbHBYckZoNHdVaGJSRkt4UEJENUYrTT0=$9A4hF_YAuvQ5obgVAqNKPCYcEjKensW4IQMovwHtwkF4VYPoHbKxJw!!&v=MjI4MjdTN0RoMVQzcVRyV00xRnJDVVJMS2ZidVpwRnluaFY3dkJJaUhUZExHNEg5Zk9xNDVGWllSOGVYMUx1eFk="
        }
      ],
      bookLists: [
        "(美)ThomasKyte著,袁勤勇,张玉魁等译.Oracle 专家高级编程[M]. 清华大学出版社, 2002",
        "清源计算机工作室编著.Visual Basic 6.0开发宝典[M]. 机械工业出版社, 1999",
        "刘辰等编著.ORACLE数据库系统[M]. 人民邮电出版社, 1999"
      ],
      copyrightLists: ["污染天气大数据平台V1.0"]
    };
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
    background-size: 56%;
}
.article {
  cursor: pointer;
  clear: both;
  display: flex;
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
  padding-left: 5%;
  padding-right: 3%;
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
