<template>
  <div style="background-color: #F3F8FC;">
      <div class="txt">
          <p style="padding-top: 6vh;margin: 0px;">数据产品服务</p>
          <p style="color:rgb(148,152,152);font-size:16px;margin: 0px;padding-top: 1vh;padding-bottom: 1vh;">DATA PRODUCTION SERVICE</p>
      </div>
      <div class="imgdisplay">
          <div class="imgsingle" :class="{imgscale:option.hoverImg}" v-for="option in options" @mouseover="enterImg(option)" @mouseout="leaveImg(option)">
            <div class="imgframe" :style="{background:'url('+option.img+') no-repeat center center',backgroundSize:'cover'}">
              <!-- <img :src="option.img"  alt=""> -->
              <!-- <img :src="option.img"  alt=""> -->
            </div>
            <div class="imgtxt" :class="{imgtxtbg:option.hoverImg,imgtxtborder:!option.hoverImg}">
                <p :class="{txtcolor:option.hoverImg}">{{option.CName}}</p>
                <p :class="{txtcolor:option.hoverImg}">{{option.EName}}</p>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
        options:[
            {
                CName:'数据清单',
                EName:'Data List',
                img:require('../../../assets/img/dataProduct1.png'),
                hoverImg:false
            },
            {
                CName:'数据接口',
                EName:'Data Interface',
                img:require('../../../assets/img/dataProduct2.png'),
                hoverImg:false
            },
            {
                CName:'检索订制',
                EName:'Retrieval and Order',
                img:require('../../../assets/img/dataProduct3.png'),
                hoverImg:false
            },
            {
                CName:'图像展示',
                EName:'Image Display',
                img:require('../../../assets/img/dataProduct4.png'),
                hoverImg:false
            }
        ],
    } 
  },
  mounted(){
      this.get();
  },
  methods:{
      get(){

      },
    enterImg(option){
      // var obj=env.currentTarget.children[1].add('imgtxtbg');
      option.hoverImg=true;
    },
    leaveImg(option){
      // env.currentTarget.children[1].remove('imgtxtbg');
      option.hoverImg=false;
    }
  }
}
</script>

<style scoped>
p{
    line-height: 0;
}
.txt{
    width: 100%;
    /* margin-top: 40px; */
}
.txt p{
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 28px;
    color: rgb(47, 68, 75);
    line-height: 30px;
}
.imgdisplay{
    width: 77%;
    /* height: 254px; */
    margin: 0 auto;
    border-top: 1px solid rgb(227, 231, 232);
    display: flex;
    justify-content: space-between;
    padding: 80px 0 80px 0;
}
.imgsingle{
    /* width: 200px; */
    /* border-radius: 5px; */
    /* border: 1px solid #ccc; */
    float: left;
    transition: all .3s;
    cursor: pointer;
}
.imgscale{
  transform: scale(1.02);
  /* box-shadow: 0px 0px 28px -6px; */
}
.imgtxtborder{
  border: 1px solid #ccc;
}
.imgtxtbg{
  background-color: rgb(0, 152, 217) !important;
   color: white !important;
}
.txtcolor{
  color: white !important;
}
.imgframe{
    background-repeat: none;
    background-position: center center;
   background-size:cover;
   width:18vw;
   height: 32vh;
   border-radius: 5px;
}
.imgtxt{
  background-color: white;
  /* border:1px solid #ccc; */
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  transition: all .3s;
  margin-top: -15px;
}
.imgtxt p{
    margin: 0;
    padding: 15px 0 15px 15px;
    line-height: 15px;
}
.imgtxt p:first-child{
    padding-bottom: 0;
    font-weight: bold;
    color: rgb(47, 68, 75);
    font-size: 2.5vh;
    margin-top: 10px;
}
.imgtxt p:last-child{
    color:rgb(148,152,152);
    font-weight: normal;
    font-size: 2vh;
}
</style>