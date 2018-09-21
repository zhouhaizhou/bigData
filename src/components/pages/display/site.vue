<template>
  <div>
    <div id="map">
      <!-- <div class="legend" :style="{backgroundImage:'url('+legend+')'}"></div> -->
      <div class="legend">
        <div class="tuli" v-show='legend[2].show'>
          <div class="txt" style="margin-left:0;padding-bottom:5px">图例：</div>
          <div class="type" v-show='item.show' v-for='(item,index) in legend'>
            <span class="circle" :style="{backgroundColor:item.color}"></span>
            <span class="txt">{{item.txt}}</span>
          </div>
        </div>
      </div>
    </div>
    <div id="popup" class="ol-popup" :class="{visible:!visible}">
      <div id="popup-content" style="width:200px;">
        <div>省份:{{province}}</div>
        <div>城市:{{city}}</div>
        <div>类型:{{siteType}}</div>
        <div>名称:{{siteName}}</div>
        <div>编号:{{siteId}}</div>
        <div v-if="siteLevel!=undefined">等级:{{siteLevelZH}}</div>
        <div>经度:{{siteLon}}</div>
        <div>纬度:{{siteLat}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../../../static/css/ol.css';
export default {
  data() {
    return {
      siteInfo: "一般站",
      legend:[
        {
          txt:'基准站',
          color:'rgb(0, 229, 0)',
          show:false
        },
        {
          txt:'基本站',
          color:'rgb(232, 122, 211)',
          show:false
        },{
          txt:'一般站',
          color:'rgb(255, 165, 0)',
          show:false
        },
      ],
      map: {},
      url: [
        // "http://222.66.83.21:8282/arcgis/rest/services/ChinaBoundary/MapServer",
        "http://222.66.83.21:8282/arcgis/rest/services/ChinaProvince1/MapServer",
        //"http://222.66.83.21:8282/arcgis/rest/services/ChinaProvince/MapServer",
        "http://222.66.83.21:8282/arcgis/rest/services/ChinaProvinceLabel/MapServer"
        //"http://139.196.174.214/arcgis/rest/services/WorldMap_Blue_Label/MapServer"
      ],
      graphics: [],
      siteLayer: {},
      hoverLayer: {},
      popup: null,
      visible: false,
      province: "",
      siteName: "",
      city: "",
      siteType: "",
      siteLon: "",
      siteLat: "",
      siteId: "",
      siteLevel:"",
      mapZoom: 4,
      center: [105, 35],
      siteData: null,
      canvas:null,
      dataObj:[{
          tname: '国家级文物保护建筑',
          color: '#365e96',
        }, {
          tname: '省级文物保护建筑',
          color: '#d1702f',
        }, {
          tname: '市级级文物保护建筑',
          color: '#4fa1dc',
        }, {
          tname: '区县级文物保护建筑',
          color: '#368829',
        }],
      removeData :{
          tx: 115,
          ty: 22
        }
      }
  },
  watch: {
    $route: {
      handler(val) {
        if(val.name == "airSite"){
          this.legend[1].txt='酸雨';
          this.legend[2].txt='气溶胶';
          this.isShow(false,true,true);
        }else if (val.name == "emSite") {
          this.showTxt();
          this.isShow(false,true,true);
          this.center = [105, 35];
          this.map.getView().setZoom(5);
          this.map.getView().setCenter(ol.proj.fromLonLat([this.center[0], this.center[1]]));
        } else {
          this.isShow(false,false,false);
          this.center = [105, 35];
          this.map.getView().setZoom(4);
          this.map.getView().setCenter(ol.proj.fromLonLat([this.center[0], this.center[1]]));
        }
        this.getPoint();
      },
      deep: true
    }
  },
  computed:{
    siteLevelZH(){
      if(this.siteLevel==11){
        return '基准站';
      }else if(this.siteLevel==12){
        return '基本站';
      }else if(this.siteLevel==13){
        return '一般站';
      }
    }
  },
  mounted() {
    this.canvas=document.createElement('canvas');
    if (this.$route.name == "emSite") {
      this.center = [105, 35];
      this.mapZoom = 5;
      this.showTxt();
      this.isShow(false,true,true);
    }
    if(this.$route.name == "airSite"){
      this.legend[1].txt='酸雨';
      this.legend[2].txt='气溶胶';
      this.isShow(false,true,true);
    }
    this.init();
  },
  methods: {
    getMarkerStyle(features) {
      let type = features.get("Type");
      let level = features.get("Station_levl");
      let color = null;
      if (type.indexOf("气溶胶") >= 0 ||level=='11') {
        color = [255, 165, 0, 1];
      } else if (type.indexOf("酸雨") >= 0||level=='12') {
        color = [232, 122, 211, 1];
      } else {
        color = [0, 229, 0, 1];
      }
      var zoom = this.map.getView().getZoom();
      var zoom = 2;
      if (zoom < 4) {
        zoom = 4;
      }
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: zoom,
          fill: new ol.style.Fill({
            color: color
          }),
          stroke: new ol.style.Stroke({
            color: [0, 0, 0, 0.5],
            width: 1
          })
        }),
        zIndex: 3
      });
    },
    init() {
      var layers = [];
      // this.map.removeLayer(layers);
      this.url.forEach(ele => {
        let l = new ol.layer.Tile({
          source: new ol.source.TileArcGISRest({
            url: ele
          })
        });
        layers.push(l);
      });
      this.map = new ol.Map({
        layers: layers,
        target: "map",
        view: new ol.View({
          center: ol.proj.fromLonLat([this.center[0], this.center[1]]),
          zoom: this.mapZoom,
          minZoom: 3,
          maxZoom:8
        })
      });
      this.getPoint();
      this.listerEvent();
    },
    listerEvent() {
      this.hoverLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        map: this.map,
        zIndex: 9
      });
      // this.map.on("click", evt => {
      //   this.visible = false;
      // });
      this.map.on("pointermove", this.siteDataHover);
      this.map.getView().on("change:resolution", this.zoomend);
    },
    zoomend(evt) {
      if (this.$route.name != "emSite") {
        return;
      }
      this.map.removeLayer(this.siteLayer);
      this.siteLayer=null;
      let data=[];
      let zoom = this.map.getView().getZoom();
      if(zoom<5 && zoom>=3){
        this.isShow(false,false,true);
        data = this.filterSiteData(11);
      }else if(zoom>=5 && zoom<6){
        this.isShow(false,true,true);
        data = this.filterSiteData(12);
      }else{
        this.isShow(true,true,true);
        data = this.siteData;
      }
      this.proMap(data);
    },
    isShow(val1,val2,val3){
      this.legend[0].show=val1;
      this.legend[1].show=val2;
      this.legend[2].show=val3;
    },
    showTxt(){
      this.legend[0].txt='一般站';
      this.legend[1].txt='基本站';
      this.legend[2].txt='基准站';
    },
    filterSiteData(grade){
      let data=[];
      this.siteData.filter((ele)=>{
          let level=ele.Station_levl;
          if(Number(level) <= grade){
            data.push(ele);
          }
        })
      return data;
    },
    siteDataHover(evt) {
      if (!this.siteLayer || evt.dragging) return;
      this.hoverLayer.getSource().clear();
      if (this.popup) {
        this.popup.setPosition(undefined);
      }
      let s=this.siteLayer.getSource();
      if(s==undefined) return;
      let feature = s.getClosestFeatureToCoordinate(evt.coordinate);
      let geometry = feature.getGeometry();
      let fPoint = this.map.getPixelFromCoordinate(geometry.flatCoordinates); //要素点的坐标
      let mousePoint = this.map.getPixelFromCoordinate(evt.coordinate); //鼠标的坐标
      let px1 = fPoint[0];
      let py1 = fPoint[1];
      let px2 = mousePoint[0];
      let py2 = mousePoint[1];
      let d = Math.sqrt(Math.pow(px2 - px1, 2) + Math.pow(py2 - py1, 2));
      if (feature && d < this.map.getView().getZoom() + 4) {
        this.visible = true;
        this.province = feature.get("Province");
        this.city = feature.get("City");
        this.siteType = feature.get("Type");
        this.siteLon = feature.get("Lon");
        this.siteLat = feature.get("Lat");
        this.siteName = feature.get("Station_Name");
        this.siteId = feature.get("Station_Id_C");
        this.siteLevel = feature.get("Station_levl");
        let sf = this.siteLayer.getStyleFunction();
        let s = sf(feature);
        s.image_.setRadius(this.map.getView().getZoom() + 4);
        this.siteName = feature.get("Station_Name");
        this.popup = new ol.Overlay({
          element: document.getElementById("popup"),
          positioning: "bottom-center",
          offset: [0, -15]
          // autoPan: true,
          // autoPanAnimation: {
          //   duration: 250
          // }
        });
        this.popup.setPosition(geometry.flatCoordinates);
        this.map.addOverlay(this.popup);
        s.zIndex_ += 1;
        let hf = feature.clone();
        hf.setStyle(s);
        this.hoverLayer.getSource().addFeature(hf);
      }
    },
    getPoint() {
      //this.drawMapTuliMethod();
      this.map.removeLayer(this.siteLayer);
      let self = this;
      this.map.removeLayer(this.siteLayer);
      this.axios.get("DataService.svc/GetSitebyName", {
          params: {
            ModuleName: this.$route.meta.parentEntityName
          }
        })
        .then(res => {
          let self = this;
          // console.log(res.data);
          let data = JSON.parse(res.data);
          this.siteData = data;
          if (self.$route.name == "emSite") {
            this.zoomend();
          }else{
            this.proMap(data);
          }
        })
        .catch(res => console.log(res));
    },
    proMap(data){
      this.map.removeLayer(this.siteLayer);
      var dataArr = {
            type: "FeatureCollection",
            features: []
          };
          data.forEach(element => {
            let ele = {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [Number(element.Lon), Number(element.Lat)]
              },
              properties: element
            };
            dataArr.features.push(ele);
          });
          var format = new ol.format.GeoJSON({
            defaultDataProjection: "EPSG:4326"
          });
          var f = format.readFeatures(dataArr, {
            featureProjection: "EPSG:3857"
          });
          var vectorSource = new ol.source.Vector({
            features: f
          });
          var clusterSource = new ol.source.Cluster({
            distance: 0,
            source: vectorSource
          });
          var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: this.getMarkerStyle,
            zIndex: 10
          });
          this.siteLayer = vectorLayer;
          this.map.addLayer(this.siteLayer);
    },
    drawMapTuliMethod(){
      let layers = new ol.layer.Vector({
          type: 'tuli',
          source: new ol.source.Vector(),
          zIndex: 20
      })
      let shape = new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.fromLonLat([this.removeData.tx, this.removeData.ty]))
      });
      var ctx = this.canvas.getContext("2d");
      var yheight = 30;
      yheight += this.dataObj.length * 27; //计算canvas高度
      this.canvas.width = 180;
      this.canvas.height = yheight;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, 200, yheight); //绘制底图
      ctx.font = "16px Arial";
      ctx.fillStyle = "#000";
      ctx.fillText('图例', this.canvas.width / 2.5, 25);
      for(var i = 0; i < this.dataObj.length; i++) {
          //实现文字前面带色块
          //ctx.fillStyle = dataObj[i].color; //块颜色
          //ctx.fillRect(10, 60 + (i - 1) * 25, 15, 15); //颜色块：x,y,w,h
          
          ctx.font = "12px Arial";
          ctx.fillStyle = "#555";
          ctx.fillText(this.dataObj[i].tname, 30, 72 + (i - 1) * 25); //文字
          
          //添加图片方法一，实现文字前面带图片，移动图例不会出现闪烁
           this.drawImg_first('xiushan.png', i); 
          
          //添加图片方法二，移动图例会出现闪烁
          //drawImg_Second(ctx, 'xiushan.png', i);   
      }
      //将canvas添加到样式中
      let style = new ol.style.Style({
          image: new ol.style.Icon({
              img: this.canvas,
              imgSize: [this.canvas.width, this.canvas.height],
          })
      });
      shape.setStyle(style);
      layers.getSource().addFeature(shape);
      this.map.addLayer(layers);
    },
    /*
    * 将绘制完成的图片添加到canvas上
    * @imgObj：图片对象
    * @p：循环序号，确定图片坐标
    */
   drawTuliImage(imgObj, p) {
       var ctxImge = this.canvas.getContext("2d");
       ctxImge.drawImage(imgObj, 5, 30 + (p * 25), 24, 26);
   },
   /*
      * 绘制图例上的图片，方法一
      * 此方法能解决重绘canvas时图片闪烁留白的问题
      * @imgs：图片名称
      * @p:序号
      * @complete：HTMLImageElement对象的一个属性，可以判断图片加载完成
      */
    drawImg_first(imgs, p) {
        var imgObj = new Image();
        imgObj.src = 'img/' + imgs;
        //如果图片加载完成
        if(imgObj.complete) {
            this.drawTuliImage(imgObj, p);
        } else {
            //onload：重绘，重新加载
            imgObj.onload = function() {
                this.drawTuliImage(imgObj, p);
            };
            //加载失败
            imgObj.onerror = function() {
                console.log('canvas图片加载失败,请重试！')
            };
        }
    }

  }
};
</script>

<style scoped>
#map {
  width: 80%;
  margin: 0 auto;
  background-color: white;
  height: 85vh;
  position: relative;
}
.visible {
  display: none;
}
/* hoverPopup */
.ol-popup {
  position: absolute;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 50px;
}

.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}

.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.legend{
  width: 150px;
  /* height: 95px; */
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 99;
  /* padding-top: 20px; */
}
.legend .tuli{
  bottom: 50px;
  position: absolute;
  background-color: white;
  right: 20px;
  padding: 10px 20px;
  border: 1px solid #bbb;
}
.legend .type .circle{
  width: 15px;
  height: 15px;
  /* border: 5px; */
  border-radius: 50%;
  display: inline-block;
}
.legend .txt{
  font-size: 18px;
  line-height: 30px;
  margin-left: 10px;
}
</style>