<template>
  <div ref="datahot" id="datahot">
    <div class="txt">
      <p style="margin: 0px;padding-top: 3vh;">数据热点</p>
      <p style="color:rgb(148,152,152);font-size:16px;margin: 0px;padding-top: 0.5vh;padding-bottom: 1vh;">DATA HOTSPOTS</p>
    </div>
    <div class="banner" ref="banner">
      <el-row style="width:100%;">
        <el-col :span="7" :offset="data.offset" class="frame" v-for="(data,index) in datahot" :key="index">
          <el-row style="line-height:40px;width:100%">
            <el-col class="line" :span="15" :offset="1">{{data.title}}</el-col>
            <el-col class="line" :span="8" :pull="2" style="text-align:right;">MORE>></el-col>
          </el-row>
          <el-row style="line-height:30px;width:100%" v-for="(dataItem,index2) in data.item" :key="index2">
            <el-col class="itemTxt" :span="(index==0?20:(index==1?13:8))" :offset="1">
              <span>·</span>
              <span class="item">{{dataItem.txt}}</span>
            </el-col>
            <el-col :span="(index==0?0:(index==1?1:6))" :offset="1">
              <span class="item">{{dataItem.stat}}</span>
            </el-col>
            <el-col :span="(index==0?0:(index==1?6:6))" :offset="1">
              <span class="item">{{dataItem.time}}</span>
            </el-col>
          </el-row>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datahot: [
        {
          offset: 0,
          item: [
            {
              txt: "中国地面气象站逐小时观测数据",
              stat: "",
              time: ""
            },
            {
              txt: "中国地面气象站逐小时观测数据",
              stat: "",
              time: ""
            },
            {
              txt: "中国地面气象站逐小时观测数据",
              stat: "",
              time: ""
            },
            {
              txt: "中国地面气象站逐小时观测数据",
              stat: "",
              time: ""
            }
          ],
          title: "今日下载排行"
        },
        {
          offset: 1,
          item: [
            {
              txt: "小锯推书|你知道薛定娥的猫吗？",
              time: "2018-07-25",
              stat: ""
            },
            {
              txt: "小锯推书|你知道薛定娥的猫吗？",
              time: "2018-07-25",
              stat: ""
            },
            {
              txt: "小锯推书|你知道薛定娥的猫吗？",
              time: "2018-07-25",
              stat: ""
            },
            {
              txt: "小锯推书|你知道薛定娥的猫吗？",
              time: "2018-07-25",
              stat: ""
            }
          ],
          title: "动态资讯"
        },
        {
          offset: 1,
          item: [
            {
              txt: "开放数据集",
              time: "2018-07-25",
              stat: "20个"
            },
            {
              txt: "开放数据量",
              time: "2018-07-25",
              stat: "600GB "
            },
            {
              txt: "总下载量",
              time: "2018-07-25",
              stat: "2500GB"
            },
            {
              txt: "总访问量",
              time: "2018-07-25",
              stat: "1500次"
            }
          ],
          title: "开放统计"
        }
      ]
    };
  },
  mounted(){
    this.getDownLoadRankData();
    this.GetDynamicInfo();
    this.GetOpenStat();
  },
  methods: {
    getDownLoadRankData(){
      let time=this._global.formatDate(new Date(),'yyyyMMdd000000');
      this.axios.get("HomeDataService.svc/GetDownloadRank",{
        params:{
          time:time
        }
      }).then(response=>{
        let data=response.data;
        data=data.replace(/DataType/g,"txt");
        let arr=JSON.parse(data);
        this.datahot[0].item=arr.slice(0,4);
      })
      .catch(response=>{
        console.log(response)
      })
    },
    GetDynamicInfo(){
      this.axios.get("HomeDataService.svc/GetDynamicInfo").then(res=>{
        let data=res.data;
        data=data.replace(/Item/g,"txt").replace(/Date/g,"time");
        let arr=JSON.parse(data);
        this.datahot[1].item=arr.slice(0,4);
      }).catch(res=>console.log(res))
    },
    GetOpenStat(){
      this.axios.get("HomeDataService.svc/GetOpenStat").then(res=>{
        let data=res.data;
        data=data.replace(/name/g,"txt").replace(/date/g,"time").replace(/dataSize/g,"stat");
        let arr=JSON.parse(data);
        this.datahot[2].item=arr.slice(0,4);
      }).catch(res=>console.log(res))
    }
  }
};
</script>

<style scoped>
.txt {
  width: 100%;
  /* margin-top: 40px; */
}
.txt p {
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 28px;
  color: rgb(47, 68, 75);
  line-height: 30px;
}
.banner {
  width: 77%;
  /* height: 254px; */
  margin: 0 auto;
  border-top: 1px solid rgb(227, 231, 232);
  padding: 80px 0 80px 0;
}
.banner .el-row:first-child {
  display: flex;
  justify-content: space-between;
}
.frame {
  border: 1px solid #ccc;
  border-top: 5px solid #aaa;
  width: 31.5%;
  cursor: pointer;
}
.frame:hover{
  border-top:5px solid #3598DB;
}
.frame:hover{
  border-top:5px solid #3598DB;
}
.frame .itemTxt{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.frame .item{
  padding-left: 5px;
  color: #969696;
    font-size: 0.8vw;
}
.line {
  border-bottom: 1px solid #ccc;
}
</style>