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
            ""
        },
        {
          articleName:
            "Zhou G, Xu J, Xie Y, et al. Numerical air quality forecasting over eastern China: An operational application of WRF-Chem[J]. Atmospheric Environment, 2017, 153:94-108.",
          articleUrl:
            ""
        },
        {
          articleName:
            "Pu W, Quan W, Ma Z, et al. Long-term trend of chemical composition of atmospheric precipitation at a regional background station in Northern China[J]. Science of the Total Environment, 2017, 580:1340-1350.",
          articleUrl:
            ""
        },
        {
          articleName:
            "Xu J, Chang L, Yan F, et al. Role of climate anomalies on decadal variation in the occurrence of wintertime haze in the Yangtze River Delta, China.[J]. Science of the Total Environment, 2017, 599-600:918.",
          articleUrl:
            ""
        },
        {
          articleName:
            "Tan H, Cai M, Fan Q, et al. An analysis of aerosol liquid water content and related impact factors in Pearl River Delta.[J]. Science of the Total Environment, 2016, 579.",
          articleUrl:
            ""
        },
        {
          articleName:
            "Deng H, Tan H, Li F, et al. Impact of relative humidity on visibility degradation during a haze event: A case study[J]. Science of the Total Environment, 2016, 569-570:1149-1158.",
          articleUrl:
            ""
        },
        {
          articleName:
            "Qin Y M, Tan H B, Jie Li Y, et al. Impacts of traffic emissions on atmospheric particulate nitrate and organics at a downwind site on the periphery of Guangzhou, China[J]. Atmospheric Chemistry & Physics, 2017, 17(17):1-31.",
          articleUrl:
            ""
        },
        {
          articleName:
            "Cheung H H Y, Tan H B, Xu H B, et al. Measurements of non-volatile aerosols with a VTDMA and their correlations with carbonaceous aerosols in Guangzhou, China[J]. Atmospheric Chemistry & Physics Discussions, 2016, 15(18):25269-25298.",
          articleUrl:
            ""
        },
        {
          articleName:
            "Cai M, Tan H, Chan C K, et al. Comparison of Aerosol Hygroscopcity, Volatility, and Chemical Composition between a Suburban Site in the Pearl River Delta Region and a Marine Site in Okinawa[J]. Aerosol & Air Quality Research, 2017, 17(12).",
          articleUrl:
            ""
        },
        {
          articleName:
            "Zhang Z, Ma Z, Kim S J. Significant Decrease of PM2.5 in Beijing Based on Long-Term Records and Kolmogorov–Zurbenko Filter Approach[J]. Aerosol & Air Quality Research, 2017, 18(3).",
          articleUrl:
            ""
        },
        {
          articleName:
            "陈赛华, 周广强, 朱彬,等. 一种快速定量估计大气污染物来源的方法[J]. 环境科学学报, 2017, 37(7):2474-2481.",
          articleUrl:
            ""
        },
        {
          articleName:
            "康志明, 桂海林, 王继康,等. 2015年北京“阅兵蓝”特征及成因探讨[J]. 中国环境科学, 2016, 36(11):3227-3236.",
          articleUrl:
            ""
        },
        {
          articleName:
            "孔锋, 代光烁, 李曼,等. 中国不同历时霾日数时空变化特征及其与城镇化和风速的关联性研究(1961-2015)[J]. 灾害学, 2017, 32(3):63-70.",
          articleUrl:
            ""
        },
        {
          articleName:
            "于彩霞, 邓学良, 石春娥,等. 基于CALIOP的安徽沿淮地区霾天气溶胶类型及垂直分布特征[J]. 环境科学学报, 2018, 38(4):1317-1326.",
          articleUrl:
            ""
        },
        {
          articleName:
            "黄俊, 廖碧婷, 吴兑,等. 广州近地面臭氧浓度特征及气象影响分析[J]. 环境科学学报, 2018, 38(1):23-31.",
          articleUrl:
            ""
        },
        {
          articleName:
            "徐宏辉, 徐婧莎, 何俊,等. 高效液相色谱-三重四极杆质谱法快速测定真菌气溶胶示踪物[J]. 环境化学, 2017(12):2683-2689.",
          articleUrl:
            ""
        },
        {
          articleName:
            "浦静姣, 徐宏辉, 马千里. 长江三角洲背景地区大气污染对能见度的影响[J]. 中国环境科学, 2017, 37(12):4435-4441.",
          articleUrl:
            ""
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
    background-size: 65%;
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
