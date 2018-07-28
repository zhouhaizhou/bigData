<template>
  <div class="foot-wrap">
    <div class="links-wrap">
      <div class="link-text">相关链接：</div>
      <div class="link-top-item" v-for="link in links">
        <span class="link-item" @click="linkClick(link.url)" v-html="link.name" v-bind:url="link.url"></span>
        <span v-html="link.splitLine"></span>
      </div>
    </div>
    <div class="middle-content">
      <div class="units-wrap">
        <div class="units-title">相关单位</div>
        <div class="unit" v-for="unit in units">
          <div @click="linkClick(unit.url)">{{unit.name}}</div>
        </div>
      </div>
      <div class="address-wrap">
        <div class="address-title">单位地址</div>
        <div class="address" v-for="address in addressInfo">
          <div>{{address.name}}{{address.data}}</div>
        </div>
      </div>
      <div class="friendly-link-wrap">
        <div class="friendly-link-title">友情链接</div>
        <div class="friendly-links">
          <div class="friendly-link" v-for="fL in fLinks" @click="linkClick(fL.url)">{{fL.name}}</div>
        </div>
      </div>
    </div>
    <div class="bak"><img src="../../assets/img/gongan.png">
      <span class="bak-text">备案信息：沪ICP备18015098号-1</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: "中国气象局",
          splitLine: "&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;",
          url: "http://www.cma.gov.cn/"
        },
        {
          name: "国家气象信息中心",
          splitLine: "&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;",
          url:
            "http://www.cma.gov.cn/2011xzt/2018zt/20180502/2018050202/201805/t20180502_467520.html"
        },
        {
          name: "中国科技资源网",
          splitLine: "&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;",
          url: "https://www.escience.org.cn/"
        },
        {
          name: "中国工程科技知识中心",
          splitLine: "",
          url: "http://www.ckcest.cn/dsp/app/details/applist"
        }
      ],
      units: [
        {
          name: "长三角环境气象预报预警中心",
          url: "http://www.shkeylab-mh.org/"
        },
        {
          name: "京津冀环境气象预报预警中心",
          url: "http://www.bidcenter.com.cn/newssearchyz-19850122.html"
        },
        {
          name: "中国气象局广州热带海洋气象研究所",
          url: "http://www.itmm.org.cn/"
        }
      ],
      addressInfo: [
        { name: "地址：", data: "上海市徐汇区蒲西路166号" },
        {
          name: "邮编：",
          data: "200030"
        },
        {
          name: "电话：",
          data: "021-54896913"
        }
      ],
      fLinks: [
        {
          name: "国家标本共享资源平台",
          url: "http://www.nsii.org.cn/home-old.php"
        },
        { name: "国家农作物种质资源平台", url: "http://www.cgris.net/pt/" },
        { name: "水产种质资源平台", url: "" },
        { name: "林业科学数据平台", url: "" },
        { name: "国家微生物资源平台", url: "" },
        { name: "家养动物种质资源平台", url: "" }
      ]
    };
  },
  methods: {
    linkClick: function(param) {
      window.open(param);
    }
  }
};
</script>

<style scoped>
.foot-wrap {
  background-color: #f1f2f6;
  height: 25vh;
}
.links-wrap {
  text-align: center;
  /* 控制div中的多个div水平和垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.link-text {
  color: #4783d2;
  width: 6vw;
  margin-top: 1vh;
}
.link-top-item {
  color: #a4a4a6;
  margin-top: 1vh;
}
.link-item {
  cursor: pointer;
  font-size: 0.8em;
  color: #a4a4a6;
}
.middle-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.units-wrap {
  width: 26vw;
  margin-top: 2vh;
}
.units-title {
  margin-left: 3vw;
  margin-bottom: 0.5vh;
  color: #7d8089;
}
.unit {
  cursor: pointer;
  line-height: 1.6;
  font-size: 0.8em;
  color: #a4a4a6;
}
.address-wrap {
  width: 18vw;
  margin-top: 2vh;
}
.address-title {
  margin-left: 4vw;
  margin-bottom: 0.5vh;
  color: #7d8089;
}
.address {
  line-height: 1.6;
  font-size: 0.8em;
  color: #a4a4a6;
}
.friendly-link-wrap {
  width: 22vw;
  margin-top: 2vh;
}
.friendly-link-title {
  margin-left: 7vw;
  margin-bottom: 0.5vh;
  color: #7d8089;
}
.friendly-link {
  float: left;
  width: 11vw;
  font-size: 0.8em;
  color: #a4a4a6;
  line-height: 1.6;
  cursor: pointer;
}
.bak {
  margin-top: 3.2vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bak-text {
  margin-left: 1vw;
}
</style>