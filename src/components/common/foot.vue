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
<div class="middle-content-wrap">
        <div class="units-wrap">
        <div class="units-title">相关单位</div>
        <div class="unit" v-for="unit in units">
          <!-- <div @click="linkClick(unit.url)">{{unit.name}}</div>  加了链接 -->
           <div>{{unit.name}}</div>   
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
          <!-- <div class="friendly-link" v-for="fL in fLinks" @click="linkClick(fL.url)">{{fL.name}}</div> -->
          <div class="friendly-link" v-for="fL in fLinks">{{fL.name}}</div>
        </div>
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
          name: "中央气象台",
          splitLine: "&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;",
          url: "http://www.nmc.cn/"
        },
        {
          name: "中国环境监测总站",
          splitLine: "&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;",
          url:
            "http://www.cnemc.cn/"
        },
        {
          name: "大气超级观测站SCAN联盟",
          splitLine: "&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;",
          url: "#"
        },
        {
          name: "全国城市空气质量实时发布平台",
          splitLine: "",
          url: "http://106.37.208.233:20035/"
        }
      ],
      units: [
        {
          name: "长三角环境气象预报预警中心",
          url: "http://www.shkeylab-mh.org/"
        },
        {
          name: "京津冀环境气象预报预警中心",
          url: ""
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
          name: "中国气象局",
          url: "http://www.cma.gov.cn/"
        },
        { name: "资源环境数据云平台", url: "http://www.resdc.cn/" },
        { name: "国家人口与健康科学数据共享平台气象环境与健康专题服务", url: "http://www.meaph.com/" }
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
  padding-top: .8vh;
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
.middle-content-wrap{
  width: 70%;
    display: flex;
    justify-content: center;
    padding-left: 7%;
}
.units-wrap {
    width: 22%;
    margin-top: 2vh;
}
.units-title {
  margin-left: 3vw;
  margin-bottom: 0.5vh;
  color: #7d8089;
}
.unit {
  /* cursor: pointer; */
  line-height: 1.6;
  font-size: 0.8em;
  color: #a4a4a6;
}
.address-wrap {
    width: 21%;
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
    width: 33%;
    margin-top: 2vh;
}
.friendly-link-title {
  margin-left: 4vw;
  margin-bottom: 0.5vh;
  color: #7d8089;
}
.friendly-link {
  float: left;
  width: 18vw;
  font-size: 0.8em;
  color: #a4a4a6;
  line-height: 1.6;
  /* cursor: pointer; */
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