<template>
  <div>
    <div id="map"></div>
    <div id="popup" class="ol-popup" :class="{visible:!visible}">
      <div id="popup-content" style="width:200px;">
        <div>省份:{{province}}</div>
        <div>城市:{{city}}</div>
        <div>类型:{{siteType}}</div>
        <div>名称:{{siteName}}</div>
        <div>编号:{{siteId}}</div>
        <div v-if="siteLevel!=undefined">等级:{{siteLevel}}</div>
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
      siteInfo: "",
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
      center: [110, 38],
      siteData: null
    };
  },
  watch: {
    $route: {
      handler(val) {
        if (val.name == "emSite") {
          this.center = [110, 35];
          this.map.getView().setZoom(5);
          this.map
            .getView()
            .setCenter(ol.proj.fromLonLat([this.center[0], this.center[1]]));
        } else {
          this.center = [110, 38];
          this.map.getView().setZoom(4);
          this.map
            .getView()
            .setCenter(ol.proj.fromLonLat([this.center[0], this.center[1]]));
        }
        this.getPoint();
      },
      deep: true
    }
  },
  mounted() {
    if (this.$route.name == "emSite") {
      this.center = [110, 35];
      this.mapZoom = 5;
    }
    this.init();
  },
  methods: {
    getMarkerStyle(features) {
      let type = features.get("Type");
      let level = features.get("Station_levl");
      let color = null;
      if (type.indexOf("酸雨") >= 0 ||level=='11') {
        color = [255, 165, 0, 1];
      } else if (type.indexOf("气溶胶") >= 0||level=='12') {
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
      this.popup = new ol.Overlay({
        element: document.getElementById("popup"),
        positioning: "bottom-center",
        offset: [0, -15],
        // autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      });
      this.map = new ol.Map({
        layers: layers,
        target: "map",
        view: new ol.View({
          center: ol.proj.fromLonLat([this.center[0], this.center[1]]),
          zoom: this.mapZoom,
          minZoom: 3,
          maxZoom:8
        }),
        overlays: [this.popup]
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
     // this.siteLayer=null;
      this.siteLayer=null;
      let data=[];
      let zoom = this.map.getView().getZoom();
      if(zoom<4 && zoom>=3){
        data = this.filterSiteData(11);
      }else if(zoom>=4&&zoom<5){
        data = this.filterSiteData(12);
      }else{
        data = this.siteData;
      }
      this.proMap(data);
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
      let feature = this.siteLayer
        .getSource()
        .getClosestFeatureToCoordinate(evt.coordinate);
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
        //this.siteName = feature.get("Station_Name");
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
      let self = this;
      this.map.removeLayer(this.siteLayer);
      this.axios
        .get("DataService.svc/GetSitebyName", {
          params: {
            ModuleName: this.$route.meta.parentEntityName
          }
        })
        .then(res => {
          let self = this;
          // console.log(res.data);
          this.map.removeLayer(this.siteLayer);
          let data = JSON.parse(res.data);
          this.siteData = data;
          this.zoomend();
          //let graphics = [];
          this.proMap(data);
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
            // var geometry = new ol.geom.Point(
            //   ol.proj.transform(
            //     [Number(element.Lon), Number(element.Lat)],
            //     "EPSG:4326",
            //     "EPSG:3857"
            //   )
            // );
            // var graphic = new ol.Feature(geometry,element);
            // //graphic.setStyle(randomCircleStyles);
            // graphics.push(graphic);
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
          // var clusterSource = new ol.source.Cluster({
          //   distance: 20,
          //   source: vectorSource
          // });
          var vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: this.getMarkerStyle,
            zIndex: 10
          });
          this.siteLayer = vectorLayer;
          this.map.addLayer(this.siteLayer);
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
</style>