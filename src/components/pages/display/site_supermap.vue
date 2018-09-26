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
        <div>经度:{{siteLon}}</div>
        <div>纬度:{{siteLat}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../../../static/css/ol.css";
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
      mapZoom: 4,
      center: [105, 35],
      siteData: null
    };
  },
  watch: {
    $route: {
      handler(val) {
        if (val.name == "emSite") {
          this.mapZoom = 5;
          this.center = [105, 35];
          this.map.getView().setZoom(this.mapZoom);
          this.map.getView().setCenter(ol.proj.fromLonLat([this.center[0], this.center[1]]));
        } else {
          this.mapZoom = 4;
          this.center = [105, 35];
          this.map.getView().setZoom(this.mapZoom);
          this.map.getView().setCenter(ol.proj.fromLonLat([this.center[0], this.center[1]]));
        }
        this.getPoint();
      },
      deep: true
    }
  },
  mounted() {
    if (this.$route.name == "emSite") {
      this.center = [105, 35];
      this.mapZoom = 5;
    }
    this.init();
  },
  methods: {
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
          zoom: this.mapZoom
        }),
        overlays: [this.popup]
      });

      this.getPoint();
      this.listerEvent();
    },
    listerEvent() {
      this.hoverLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        map: this.map
        //zIndex: 99
      });
      this.map.on("click", evt => {this.visible = false;});
      // this.map.on("pointermove", evt => this.siteDataHover(evt));
      this.map.getView().on("change:resolution", this.zoomend);
    },
    zoomend(){
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
    getGeoStyle(feature) {
      let type = feature.Type;
      let level = feature.Station_levl;
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
      let randomCircleStyles = new ol.style.RegularShape({
        radius: zoom,
        fill: new ol.style.Fill({
          color: color
        }),
        stroke: new ol.style.Stroke({
          color:[0, 0, 0, 0.5],
          width: 1
        }),
        points: 10
      });
      return randomCircleStyles;
    },
    proMap(data){
      let self=this;
      this.map.removeLayer(this.siteLayer);
      let graphics = [];
        data.forEach(element => {
          let geometry = new ol.geom.Point(
            ol.proj.transform(
              [Number(element.Lon), Number(element.Lat)],
              "EPSG:4326",
              "EPSG:3857"
            )
          );
          let graphic = new ol.Graphic(geometry, element);
          graphic.setStyle(this.getGeoStyle(element));
          graphics.push(graphic);
        });
        let vectorSource = new ol.source.Graphic({
          graphics: graphics,
          render: "canvas",
          map: this.map,
          onClick: function(graphic) {
            if (graphic) {
              graphic.style_.radius_=6;
              //graphic.setStyle(clickRandomCircleStyles);
              self.visible = true;
              let attributes = graphic.getAttributes();
              let coords = graphic.getGeometry().getCoordinates();
              self.province = attributes.Province;
              self.city = attributes.City;
              self.siteType = attributes.Type;
              self.siteLon = attributes.Lon;
              self.siteLat = attributes.Lat;
              self.siteName = attributes.Station_Name;
              self.siteId = attributes.Station_Id_C;
              self.popup.setPosition(coords);
              return;
            }
            self.popup.setPosition(undefined);
          }
        });
        let vectorLayer = new ol.layer.Image({
          source: vectorSource,
          zIndex: 10
        });
        self.siteLayer = vectorLayer;
        self.map.addLayer(self.siteLayer);
    },
    getPoint() {
      let self = this;
      this.axios
        .get("DataService.svc/GetSitebyName", {
          params: {
            ModuleName: this.$route.meta.parentEntityName
          }
        })
        .then(res => {
          let self = this;
          console.log(res.data);
          this.map.removeLayer(this.siteLayer);
          let data = JSON.parse(res.data);
          this.siteData = data;
          if (this.$route.name == "emSite") {
            this.zoomend();
          }else{
            this.proMap(data);
          }
        })
        .catch(res => console.log(res));
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