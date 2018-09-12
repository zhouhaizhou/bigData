<template>
  <div>
    <div id="map"></div>
    <div id="popup" :class="{visible:!visible}">{{siteName}}</div>
  </div>
</template>

<script>
import "ol/ol.css";
// import ol from "ol";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import { OSM, TileArcGISRest, Vector } from "ol/source.js";
import { fromLonLat } from "ol/proj.js";
import LayerVector from "ol/layer/Vector.js";
import { GeoJSON } from "ol/format.js";
import { Style, Circle, Fill, Stroke } from "ol/style.js";
import Overlay from "ol/Overlay.js";

export default {
  data() {
    return {
      siteName: "",
      map: {},
      url: [
        "http://222.66.83.21:8282/arcgis/rest/services/ChinaProvince/MapServer",
        "http://222.66.83.21:8282/arcgis/rest/services/ChinaBoundary/MapServer",
        "http://222.66.83.21:8282/arcgis/rest/services/ChinaProvinceLabel/MapServer"
        //"http://139.196.174.214/arcgis/rest/services/WorldMap_Blue_Label/MapServer"
      ],
      siteLayer: {},
      hoverLayer: {},
      popup: null,
      visible: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    getMarkerStyle(features) {
      var zoom = this.map.getView().getZoom();
      var zoom = 2;
      if (zoom < 4) {
        zoom = 4;
      }
      return new Style({
        image: new Circle({
          radius: zoom,
          fill: new Fill({
            color: [234, 12, 233, 0.5]
          }),
          stroke: new Stroke({
            color: [0, 0, 0, 0.5],
            width: 1
          })
        }),
        zIndex: 3
      });
    },
    init() {
      var layers = [];
      this.url.forEach(ele => {
        let l =new TileLayer({
          source: new TileArcGISRest({
            url: ele
          })
        });
        layers.push(l);
      });
      // var layers = [
      //   // new TileLayer({
      //   //   source: new OSM()
      //   // }),
      //   new TileLayer({
      //     source: new TileArcGISRest({
      //       url: this.url[0]
      //     })
      //   })
      // ];
      this.map = new Map({
        layers: layers,
        target: "map",
        view: new View({
          center: fromLonLat([105, 31]),
          zoom: 4
        })
      });
      this.getPoint();
      this.listerEvent();
    },
    listerEvent() {
      this.hoverLayer = new LayerVector({
        source: new Vector(),
        map: this.map
        //zIndex: 99
      });
      this.map.on("pointermove", evt => this.siteDataHover(evt));
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
        let sf = this.siteLayer.getStyleFunction();
        let s = sf(feature);
        s.image_.setRadius(this.map.getView().getZoom() + 4);
        this.siteName = feature.get("Station_Name");
        this.popup = new Overlay({
          element: document.getElementById("popup"),
          positioning: "bottom-center",
          offset: [0, -15],
          autoPan: true,
          autoPanAnimation: {
            duration: 250
          }
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
      this.axios
        .get("DataService.svc/GetSitebyName", {
          params: {
            ModuleName: this.$route.meta.parentEntityName
          }
        })
        .then(res => {
          let data = JSON.parse(res.data);
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
          var format = new GeoJSON({
            defaultDataProjection: "EPSG:4326"
          });
          var f = format.readFeatures(dataArr, {
            featureProjection: "EPSG:3857"
          });
          var vectorSource = new Vector({
            features: f
          });
          var vectorLayer = new LayerVector({
            source: vectorSource,
            style: self.getMarkerStyle
          });
          self.siteLayer = vectorLayer;
          self.map.addLayer(self.siteLayer);
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
  height:85vh;
}
.visible {
  display: none;
}
/* hoverPopup */
#popup {
  position: relative;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
}

#popup:after,
#popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

#popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 50%;
  margin-left: -10px;
}

#popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 50%;
  margin-left: -11px;
}
</style>