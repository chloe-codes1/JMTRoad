import { Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import React from "react";
import FormMail from "../admin/FormMail";
import StoreSearchResult from "../store/StoreSearchResult";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      showSearchResult: false,
      storeName: "",
      cuisine: 0,
      list: []
    };
  }

  componentDidMount() {
    var data = [
      {
        layer: {
          metadata: {},
          options: {},
          name: "route",
          id: "Tmap_Layer_Vector_61",
          div: [Object],
          events: [Object],
          renderer: [Object],
          styleMap: [Object],
          features: [Object],
          selectedFeatures: [],
          unrenderedFeatures: {},
          map: [Object],
          maxExtent: [Object],
          minExtent: null,
          projection: [Object],
          units: "m",
          alwaysInRange: true,
          resolutions: [Object],
          scales: [Object],
          numZoomLevels: 20,
          minResolution: 0.2985821417389698,
          maxScale: 846.3728822589533,
          maxResolution: 156543.033928041,
          minScale: 443743145.6937821,
          inRange: true,
          tileSize: [Object],
          drawn: true,
          style: [Object]
        },
        lonlat: null,
        data: {
          index: "0",
          viaPointName: "[0] 출발",
          arriveTime: "20171112131400",
          completeTime: "20171112131400",
          distance: "0",
          time: "0",
          deliveryTime: "0",
          waitTime: "0",
          fare: "0",
          styleUrl: "#startPointStyle",
          nodeType: "POINT",
          pointIndex: "0",
          pointType: "S",
          totalDistance: "38401",
          totalTime: "5316"
        },
        id: "Tmap_Feature_Vector_88",
        geometry: {
          id: "Tmap_Geometry_Point_87",
          x: 14136023.13627518,
          y: 4518589.06894047,
          bounds: [Object]
        },
        state: null,
        attributes: {
          index: "0",
          viaPointName: "[0] 출발",
          arriveTime: "20171112131400",
          completeTime: "20171112131400",
          distance: "0",
          time: "0",
          deliveryTime: "0",
          waitTime: "0",
          fare: "0",
          styleUrl: "#startPointStyle",
          nodeType: "POINT",
          pointIndex: "0",
          pointType: "S",
          totalDistance: "38401",
          totalTime: "5316"
        },
        style: {
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          strokeColor: "#FF0000",
          strokeWidth: 3,
          strokeDashstyle: "solid",
          pointRadius: 2,
          title: "this is a red line"
        }
      },
      {
        layer: {
          metadata: {},
          options: {},
          name: "route",
          id: "Tmap_Layer_Vector_61",
          div: [Object],
          events: [Object],
          renderer: [Object],
          styleMap: [Object],
          features: [Object],
          selectedFeatures: [],
          unrenderedFeatures: {},
          map: [Object],
          maxExtent: [Object],
          minExtent: null,
          projection: [Object],
          units: "m",
          alwaysInRange: true,
          resolutions: [Object],
          scales: [Object],
          numZoomLevels: 20,
          minResolution: 0.2985821417389698,
          maxScale: 846.3728822589533,
          maxResolution: 156543.033928041,
          minScale: 443743145.6937821,
          inRange: true,
          tileSize: [Object],
          drawn: true,
          style: [Object]
        },
        lonlat: null,
        data: {
          index: "1",
          viaPointId: "test03",
          viaPointName: "[0] test03",
          groupKey: "0",
          arriveTime: "20171112133744",
          completeTime: "20171112134744",
          distance: "12034",
          time: "1424",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passPointStyle",
          nodeType: "POINT",
          pointIndex: "1",
          pointType: "B1",
          totalDistance: "38401",
          totalTime: "5316"
        },
        id: "Tmap_Feature_Vector_90",
        geometry: {
          id: "Tmap_Geometry_Point_89",
          x: 14135949.46021241,
          y: 4508733.39371394,
          bounds: [Object]
        },
        state: null,
        attributes: {
          index: "1",
          viaPointId: "test03",
          viaPointName: "[0] test03",
          groupKey: "0",
          arriveTime: "20171112133744",
          completeTime: "20171112134744",
          distance: "12034",
          time: "1424",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passPointStyle",
          nodeType: "POINT",
          pointIndex: "1",
          pointType: "B1",
          totalDistance: "38401",
          totalTime: "5316"
        },
        style: {
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          strokeColor: "#FF0000",
          strokeWidth: 3,
          strokeDashstyle: "solid",
          pointRadius: 2,
          title: "this is a red line"
        }
      },
      {
        layer: {
          metadata: {},
          options: {},
          name: "route",
          id: "Tmap_Layer_Vector_61",
          div: [Object],
          events: [Object],
          renderer: [Object],
          styleMap: [Object],
          features: [Object],
          selectedFeatures: [],
          unrenderedFeatures: {},
          map: [Object],
          maxExtent: [Object],
          minExtent: null,
          projection: [Object],
          units: "m",
          alwaysInRange: true,
          resolutions: [Object],
          scales: [Object],
          numZoomLevels: 20,
          minResolution: 0.2985821417389698,
          maxScale: 846.3728822589533,
          maxResolution: 156543.033928041,
          minScale: 443743145.6937821,
          inRange: true,
          tileSize: [Object],
          drawn: true,
          style: [Object]
        },
        lonlat: null,
        data: {
          index: "1",
          viaPointId: "test03",
          viaPointName: "[0] test03",
          groupKey: "0",
          arriveTime: "20171112133744",
          completeTime: "20171112134744",
          distance: "12034",
          time: "1424",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passLineStyle",
          nodeType: "LINE",
          lineIndex: "0",
          totalDistance: "38401",
          totalTime: "5316"
        },
        id: "Tmap_Feature_Vector_338",
        geometry: {
          id: "Tmap_Geometry_LineString_337",
          components: [Object],
          bounds: [Object]
        },
        state: null,
        attributes: {
          index: "1",
          viaPointId: "test03",
          viaPointName: "[0] test03",
          groupKey: "0",
          arriveTime: "20171112133744",
          completeTime: "20171112134744",
          distance: "12034",
          time: "1424",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passLineStyle",
          nodeType: "LINE",
          lineIndex: "0",
          totalDistance: "38401",
          totalTime: "5316"
        },
        style: {
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          strokeColor: "#FF0000",
          strokeWidth: 3,
          strokeDashstyle: "solid",
          pointRadius: 2,
          title: "this is a red line"
        }
      },
      {
        layer: {
          metadata: {},
          options: {},
          name: "route",
          id: "Tmap_Layer_Vector_61",
          div: [Object],
          events: [Object],
          renderer: [Object],
          styleMap: [Object],
          features: [Object],
          selectedFeatures: [],
          unrenderedFeatures: {},
          map: [Object],
          maxExtent: [Object],
          minExtent: null,
          projection: [Object],
          units: "m",
          alwaysInRange: true,
          resolutions: [Object],
          scales: [Object],
          numZoomLevels: 20,
          minResolution: 0.2985821417389698,
          maxScale: 846.3728822589533,
          maxResolution: 156543.033928041,
          minScale: 443743145.6937821,
          inRange: true,
          tileSize: [Object],
          drawn: true,
          style: [Object]
        },
        lonlat: null,
        data: {
          index: "2",
          viaPointId: "test04",
          viaPointName: "[0] test04",
          groupKey: "0",
          arriveTime: "20171112135327",
          completeTime: "20171112140327",
          distance: "1341",
          time: "343",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passPointStyle",
          nodeType: "POINT",
          pointIndex: "2",
          pointType: "B2",
          totalDistance: "38401",
          totalTime: "5316"
        },
        id: "Tmap_Feature_Vector_340",
        geometry: {
          id: "Tmap_Geometry_Point_339",
          x: 14136890.96522672,
          y: 4508136.39939367,
          bounds: [Object]
        },
        state: null,
        attributes: {
          index: "2",
          viaPointId: "test04",
          viaPointName: "[0] test04",
          groupKey: "0",
          arriveTime: "20171112135327",
          completeTime: "20171112140327",
          distance: "1341",
          time: "343",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passPointStyle",
          nodeType: "POINT",
          pointIndex: "2",
          pointType: "B2",
          totalDistance: "38401",
          totalTime: "5316"
        },
        style: {
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          strokeColor: "#FF0000",
          strokeWidth: 3,
          strokeDashstyle: "solid",
          pointRadius: 2,
          title: "this is a red line"
        }
      },
      {
        layer: {
          metadata: {},
          options: {},
          name: "route",
          id: "Tmap_Layer_Vector_61",
          div: [Object],
          events: [Object],
          renderer: [Object],
          styleMap: [Object],
          features: [Object],
          selectedFeatures: [],
          unrenderedFeatures: {},
          map: [Object],
          maxExtent: [Object],
          minExtent: null,
          projection: [Object],
          units: "m",
          alwaysInRange: true,
          resolutions: [Object],
          scales: [Object],
          numZoomLevels: 20,
          minResolution: 0.2985821417389698,
          maxScale: 846.3728822589533,
          maxResolution: 156543.033928041,
          minScale: 443743145.6937821,
          inRange: true,
          tileSize: [Object],
          drawn: true,
          style: [Object]
        },
        lonlat: null,
        data: {
          index: "2",
          viaPointId: "test04",
          viaPointName: "[0] test04",
          groupKey: "0",
          arriveTime: "20171112135327",
          completeTime: "20171112140327",
          distance: "1341",
          time: "343",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passLineStyle",
          nodeType: "LINE",
          lineIndex: "1",
          totalDistance: "38401",
          totalTime: "5316"
        },
        id: "Tmap_Feature_Vector_395",
        geometry: {
          id: "Tmap_Geometry_LineString_394",
          components: [Object],
          bounds: [Object]
        },
        state: null,
        attributes: {
          index: "2",
          viaPointId: "test04",
          viaPointName: "[0] test04",
          groupKey: "0",
          arriveTime: "20171112135327",
          completeTime: "20171112140327",
          distance: "1341",
          time: "343",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passLineStyle",
          nodeType: "LINE",
          lineIndex: "1",
          totalDistance: "38401",
          totalTime: "5316"
        },
        style: {
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          strokeColor: "#FF0000",
          strokeWidth: 3,
          strokeDashstyle: "solid",
          pointRadius: 2,
          title: "this is a red line"
        }
      },
      {
        layer: {
          metadata: {},
          options: {},
          name: "route",
          id: "Tmap_Layer_Vector_61",
          div: [Object],
          events: [Object],
          renderer: [Object],
          styleMap: [Object],
          features: [Object],
          selectedFeatures: [],
          unrenderedFeatures: {},
          map: [Object],
          maxExtent: [Object],
          minExtent: null,
          projection: [Object],
          units: "m",
          alwaysInRange: true,
          resolutions: [Object],
          scales: [Object],
          numZoomLevels: 20,
          minResolution: 0.2985821417389698,
          maxScale: 846.3728822589533,
          maxResolution: 156543.033928041,
          minScale: 443743145.6937821,
          inRange: true,
          tileSize: [Object],
          drawn: true,
          style: [Object]
        },
        lonlat: null,
        data: {
          index: "3",
          viaPointId: "test01",
          viaPointName: "[0] test01",
          groupKey: "0",
          arriveTime: "20171112140809",
          completeTime: "20171112141809",
          distance: "1318",
          time: "282",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passPointStyle",
          nodeType: "POINT",
          pointIndex: "3",
          pointType: "B3",
          totalDistance: "38401",
          totalTime: "5316"
        },
        id: "Tmap_Feature_Vector_397",
        geometry: {
          id: "Tmap_Geometry_Point_396",
          x: 14137654.95887994,
          y: 4509091.96970098,
          bounds: [Object]
        },
        state: null,
        attributes: {
          index: "3",
          viaPointId: "test01",
          viaPointName: "[0] test01",
          groupKey: "0",
          arriveTime: "20171112140809",
          completeTime: "20171112141809",
          distance: "1318",
          time: "282",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passPointStyle",
          nodeType: "POINT",
          pointIndex: "3",
          pointType: "B3",
          totalDistance: "38401",
          totalTime: "5316"
        },
        style: {
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          strokeColor: "#FF0000",
          strokeWidth: 3,
          strokeDashstyle: "solid",
          pointRadius: 2,
          title: "this is a red line"
        }
      },
      {
        layer: {
          metadata: {},
          options: {},
          name: "route",
          id: "Tmap_Layer_Vector_61",
          div: [Object],
          events: [Object],
          renderer: [Object],
          styleMap: [Object],
          features: [Object],
          selectedFeatures: [],
          unrenderedFeatures: {},
          map: [Object],
          maxExtent: [Object],
          minExtent: null,
          projection: [Object],
          units: "m",
          alwaysInRange: true,
          resolutions: [Object],
          scales: [Object],
          numZoomLevels: 20,
          minResolution: 0.2985821417389698,
          maxScale: 846.3728822589533,
          maxResolution: 156543.033928041,
          minScale: 443743145.6937821,
          inRange: true,
          tileSize: [Object],
          drawn: true,
          style: [Object]
        },
        lonlat: null,
        data: {
          index: "3",
          viaPointId: "test01",
          viaPointName: "[0] test01",
          groupKey: "0",
          arriveTime: "20171112140809",
          completeTime: "20171112141809",
          distance: "1318",
          time: "282",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passLineStyle",
          nodeType: "LINE",
          lineIndex: "2",
          totalDistance: "38401",
          totalTime: "5316"
        },
        id: "Tmap_Feature_Vector_450",
        geometry: {
          id: "Tmap_Geometry_LineString_449",
          components: [Object],
          bounds: [Object]
        },
        state: null,
        attributes: {
          index: "3",
          viaPointId: "test01",
          viaPointName: "[0] test01",
          groupKey: "0",
          arriveTime: "20171112140809",
          completeTime: "20171112141809",
          distance: "1318",
          time: "282",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passLineStyle",
          nodeType: "LINE",
          lineIndex: "2",
          totalDistance: "38401",
          totalTime: "5316"
        },
        style: {
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          strokeColor: "#FF0000",
          strokeWidth: 3,
          strokeDashstyle: "solid",
          pointRadius: 2,
          title: "this is a red line"
        }
      },
      {
        layer: {
          metadata: {},
          options: {},
          name: "route",
          id: "Tmap_Layer_Vector_61",
          div: [Object],
          events: [Object],
          renderer: [Object],
          styleMap: [Object],
          features: [Object],
          selectedFeatures: [],
          unrenderedFeatures: {},
          map: [Object],
          maxExtent: [Object],
          minExtent: null,
          projection: [Object],
          units: "m",
          alwaysInRange: true,
          resolutions: [Object],
          scales: [Object],
          numZoomLevels: 20,
          minResolution: 0.2985821417389698,
          maxScale: 846.3728822589533,
          maxResolution: 156543.033928041,
          minScale: 443743145.6937821,
          inRange: true,
          tileSize: [Object],
          drawn: true,
          style: [Object]
        },
        lonlat: null,
        data: {
          index: "4",
          viaPointId: "test05",
          viaPointName: "[0] test05",
          groupKey: "0",
          arriveTime: "20171112142235",
          completeTime: "20171112143235",
          distance: "975",
          time: "266",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passPointStyle",
          nodeType: "POINT",
          pointIndex: "4",
          pointType: "B4",
          totalDistance: "38401",
          totalTime: "5316"
        },
        id: "Tmap_Feature_Vector_452",
        geometry: {
          id: "Tmap_Geometry_Point_451",
          x: 14137829.02032712,
          y: 4509717.49498651,
          bounds: [Object]
        },
        state: null,
        attributes: {
          index: "4",
          viaPointId: "test05",
          viaPointName: "[0] test05",
          groupKey: "0",
          arriveTime: "20171112142235",
          completeTime: "20171112143235",
          distance: "975",
          time: "266",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passPointStyle",
          nodeType: "POINT",
          pointIndex: "4",
          pointType: "B4",
          totalDistance: "38401",
          totalTime: "5316"
        },
        style: {
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          strokeColor: "#FF0000",
          strokeWidth: 3,
          strokeDashstyle: "solid",
          pointRadius: 2,
          title: "this is a red line"
        }
      },
      {
        layer: {
          metadata: {},
          options: {},
          name: "route",
          id: "Tmap_Layer_Vector_61",
          div: [Object],
          events: [Object],
          renderer: [Object],
          styleMap: [Object],
          features: [Object],
          selectedFeatures: [],
          unrenderedFeatures: {},
          map: [Object],
          maxExtent: [Object],
          minExtent: null,
          projection: [Object],
          units: "m",
          alwaysInRange: true,
          resolutions: [Object],
          scales: [Object],
          numZoomLevels: 20,
          minResolution: 0.2985821417389698,
          maxScale: 846.3728822589533,
          maxResolution: 156543.033928041,
          minScale: 443743145.6937821,
          inRange: true,
          tileSize: [Object],
          drawn: true,
          style: [Object]
        },
        lonlat: null,
        data: {
          index: "4",
          viaPointId: "test05",
          viaPointName: "[0] test05",
          groupKey: "0",
          arriveTime: "20171112142235",
          completeTime: "20171112143235",
          distance: "975",
          time: "266",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passLineStyle",
          nodeType: "LINE",
          lineIndex: "3",
          totalDistance: "38401",
          totalTime: "5316"
        },
        id: "Tmap_Feature_Vector_495",
        geometry: {
          id: "Tmap_Geometry_LineString_494",
          components: [Object],
          bounds: [Object]
        },
        state: null,
        attributes: {
          index: "4",
          viaPointId: "test05",
          viaPointName: "[0] test05",
          groupKey: "0",
          arriveTime: "20171112142235",
          completeTime: "20171112143235",
          distance: "975",
          time: "266",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passLineStyle",
          nodeType: "LINE",
          lineIndex: "3",
          totalDistance: "38401",
          totalTime: "5316"
        },
        style: {
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          strokeColor: "#FF0000",
          strokeWidth: 3,
          strokeDashstyle: "solid",
          pointRadius: 2,
          title: "this is a red line"
        }
      },
      {
        layer: {
          metadata: {},
          options: {},
          name: "route",
          id: "Tmap_Layer_Vector_61",
          div: [Object],
          events: [Object],
          renderer: [Object],
          styleMap: [Object],
          features: [Object],
          selectedFeatures: [],
          unrenderedFeatures: {},
          map: [Object],
          maxExtent: [Object],
          minExtent: null,
          projection: [Object],
          units: "m",
          alwaysInRange: true,
          resolutions: [Object],
          scales: [Object],
          numZoomLevels: 20,
          minResolution: 0.2985821417389698,
          maxScale: 846.3728822589533,
          maxResolution: 156543.033928041,
          minScale: 443743145.6937821,
          inRange: true,
          tileSize: [Object],
          drawn: true,
          style: [Object]
        },
        lonlat: null,
        data: {
          index: "5",
          viaPointId: "test02",
          viaPointName: "[0] test02",
          groupKey: "0",
          arriveTime: "20171112145627",
          completeTime: "20171112150627",
          distance: "12166",
          time: "1432",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passPointStyle",
          nodeType: "POINT",
          pointIndex: "5",
          pointType: "B5",
          totalDistance: "38401",
          totalTime: "5316"
        },
        id: "Tmap_Feature_Vector_497",
        geometry: {
          id: "Tmap_Geometry_Point_496",
          x: 14146536.04833133,
          y: 4502483.02242617,
          bounds: [Object]
        },
        state: null,
        attributes: {
          index: "5",
          viaPointId: "test02",
          viaPointName: "[0] test02",
          groupKey: "0",
          arriveTime: "20171112145627",
          completeTime: "20171112150627",
          distance: "12166",
          time: "1432",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passPointStyle",
          nodeType: "POINT",
          pointIndex: "5",
          pointType: "B5",
          totalDistance: "38401",
          totalTime: "5316"
        },
        style: {
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          strokeColor: "#FF0000",
          strokeWidth: 3,
          strokeDashstyle: "solid",
          pointRadius: 2,
          title: "this is a red line"
        }
      },
      {
        layer: {
          metadata: {},
          options: {},
          name: "route",
          id: "Tmap_Layer_Vector_61",
          div: [Object],
          events: [Object],
          renderer: [Object],
          styleMap: [Object],
          features: [Object],
          selectedFeatures: [],
          unrenderedFeatures: {},
          map: [Object],
          maxExtent: [Object],
          minExtent: null,
          projection: [Object],
          units: "m",
          alwaysInRange: true,
          resolutions: [Object],
          scales: [Object],
          numZoomLevels: 20,
          minResolution: 0.2985821417389698,
          maxScale: 846.3728822589533,
          maxResolution: 156543.033928041,
          minScale: 443743145.6937821,
          inRange: true,
          tileSize: [Object],
          drawn: true,
          style: [Object]
        },
        lonlat: null,
        data: {
          index: "5",
          viaPointId: "test02",
          viaPointName: "[0] test02",
          groupKey: "0",
          arriveTime: "20171112145627",
          completeTime: "20171112150627",
          distance: "12166",
          time: "1432",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passLineStyle",
          nodeType: "LINE",
          lineIndex: "4",
          totalDistance: "38401",
          totalTime: "5316"
        },
        id: "Tmap_Feature_Vector_771",
        geometry: {
          id: "Tmap_Geometry_LineString_770",
          components: [Object],
          bounds: [Object]
        },
        state: null,
        attributes: {
          index: "5",
          viaPointId: "test02",
          viaPointName: "[0] test02",
          groupKey: "0",
          arriveTime: "20171112145627",
          completeTime: "20171112150627",
          distance: "12166",
          time: "1432",
          deliveryTime: "600",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passLineStyle",
          nodeType: "LINE",
          lineIndex: "4",
          totalDistance: "38401",
          totalTime: "5316"
        },
        style: {
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          strokeColor: "#FF0000",
          strokeWidth: 3,
          strokeDashstyle: "solid",
          pointRadius: 2,
          title: "this is a red line"
        }
      },
      {
        layer: {
          metadata: {},
          options: {},
          name: "route",
          id: "Tmap_Layer_Vector_61",
          div: [Object],
          events: [Object],
          renderer: [Object],
          styleMap: [Object],
          features: [Object],
          selectedFeatures: [],
          unrenderedFeatures: {},
          map: [Object],
          maxExtent: [Object],
          minExtent: null,
          projection: [Object],
          units: "m",
          alwaysInRange: true,
          resolutions: [Object],
          scales: [Object],
          numZoomLevels: 20,
          minResolution: 0.2985821417389698,
          maxScale: 846.3728822589533,
          maxResolution: 156543.033928041,
          minScale: 443743145.6937821,
          inRange: true,
          tileSize: [Object],
          drawn: true,
          style: [Object]
        },
        lonlat: null,
        data: {
          index: "6",
          viaPointName: "[0] 도착",
          arriveTime: "20171112153236",
          completeTime: "20171112153236",
          distance: "10567",
          time: "1569",
          deliveryTime: "0",
          waitTime: "0",
          fare: "0",
          styleUrl: "#endPointStyle",
          nodeType: "POINT",
          pointIndex: "6",
          pointType: "E",
          totalDistance: "38401",
          totalTime: "5316"
        },
        id: "Tmap_Feature_Vector_773",
        geometry: {
          id: "Tmap_Geometry_Point_772",
          x: 14138057.57409564,
          y: 4507022.37337512,
          bounds: [Object]
        },
        state: null,
        attributes: {
          index: "6",
          viaPointName: "[0] 도착",
          arriveTime: "20171112153236",
          completeTime: "20171112153236",
          distance: "10567",
          time: "1569",
          deliveryTime: "0",
          waitTime: "0",
          fare: "0",
          styleUrl: "#endPointStyle",
          nodeType: "POINT",
          pointIndex: "6",
          pointType: "E",
          totalDistance: "38401",
          totalTime: "5316"
        },
        style: {
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          strokeColor: "#FF0000",
          strokeWidth: 3,
          strokeDashstyle: "solid",
          pointRadius: 2,
          title: "this is a red line"
        }
      },
      {
        layer: {
          metadata: {},
          options: {},
          name: "route",
          id: "Tmap_Layer_Vector_61",
          div: [Object],
          events: [Object],
          renderer: [Object],
          styleMap: [Object],
          features: [Object],
          selectedFeatures: [],
          unrenderedFeatures: {},
          map: [Object],
          maxExtent: [Object],
          minExtent: null,
          projection: [Object],
          units: "m",
          alwaysInRange: true,
          resolutions: [Object],
          scales: [Object],
          numZoomLevels: 20,
          minResolution: 0.2985821417389698,
          maxScale: 846.3728822589533,
          maxResolution: 156543.033928041,
          minScale: 443743145.6937821,
          inRange: true,
          tileSize: [Object],
          drawn: true,
          style: [Object]
        },
        lonlat: null,
        data: {
          index: "6",
          viaPointName: "[0] 도착",
          arriveTime: "20171112153236",
          completeTime: "20171112153236",
          distance: "10567",
          time: "1569",
          deliveryTime: "0",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passLineStyle",
          nodeType: "LINE",
          lineIndex: "5",
          totalDistance: "38401",
          totalTime: "5316"
        },
        id: "Tmap_Feature_Vector_1047",
        geometry: {
          id: "Tmap_Geometry_LineString_1046",
          components: [Object],
          bounds: [Object]
        },
        state: null,
        attributes: {
          index: "6",
          viaPointName: "[0] 도착",
          arriveTime: "20171112153236",
          completeTime: "20171112153236",
          distance: "10567",
          time: "1569",
          deliveryTime: "0",
          waitTime: "0",
          fare: "0",
          styleUrl: "#passLineStyle",
          nodeType: "LINE",
          lineIndex: "5",
          totalDistance: "38401",
          totalTime: "5316"
        },
        style: {
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          strokeColor: "#FF0000",
          strokeWidth: 3,
          strokeDashstyle: "solid",
          pointRadius: 2,
          title: "this is a red line"
        }
      }
    ];

    console.log(data);
    console.log(data[0].data.viaPointName);

    for( var i=0 ; i < data.length ; i++ ){
        console.log(data[i].data.viaPointName);
    }

  }

  openModal = () => {
    this.setState({
      isModalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  search = async () => {
    if (this.state.storeName !== "" && this.state.cuisine !== 0) {
      let storeName = this.state.storeName;
      let cuisine = this.state.cuisine;
      await axios({
        method: "get",
        url: `searchBothOfThem/${storeName}/${cuisine}`
      })
        .then(success => {
          const data = success.data;
          console.log("음식점 이름 & 음식종류로 검색 성공 크크.. " + data);
          this.setState({
            list: data,
            storeName: "",
            cuisine: 0,
            showSearchResult: true
          });
        })
        .catch(error => console.log("에러..." + error));
    } else if (this.state.cuisine === 0) {
      const storeName = this.state.storeName;
      await axios({
        method: "get",
        url: `searchByName/${storeName}`
      })
        .then(success => {
          const data = success.data;
          console.log("음식점 이름으로 검색 성공 " + data);
          this.setState({
            list: data,
            storeName: "",
            showSearchResult: true
          });
          console.log(this.state.showSearchResult);
        })
        .catch(error => console.log("에러..흑흑.. => " + error));
    } else if (this.state.storeName === "") {
      const cuisine = this.state.cuisine;
      await axios({
        method: "get",
        url: `searchByCuisine/${cuisine}`
      })
        .then(success => {
          const data = success.data;
          console.log("음식 종류로 검색 성공 " + data);
          this.setState({
            list: data,
            storeName: "",
            showSearchResult: true
          });
        })
        .catch(error => console.log("에러..흑흑.. => " + error));
    }
  };

  render() {
    // const classes = useStyles();
    return (
      <div>
        <h4>메인페이지</h4>
        <div>
          {/* 검색 */}
          <form noValidate autoComplete="on">
            <TextField
              type="text"
              id="outlined-basic"
              margin="normal"
              label="어느 음식점에서"
              variant="outlined"
              placeholder="음식점 이름을 입력하세요!"
              name="storeName"
              onChange={this.onChange}
              value={this.state.storeName}
              defaultValue=""
              style={textfieldStyle}
            />
            <FormControl>
              <FormHelperText>어떤 음식을 드실건가요</FormHelperText>
              <Select
                name="cuisine"
                value={this.state.cuisine}
                onChange={this.onChange}
                defaultValue="0"
                style={selectStyle}
              >
                <MenuItem value="0">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="51">한식</MenuItem>
                <MenuItem value="52">양식</MenuItem>
                <MenuItem value="53">중식</MenuItem>
                <MenuItem value="54">일식</MenuItem>
                <MenuItem value="55">동남아식</MenuItem>
                <MenuItem value="56">뷔페식</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" onClick={this.search}>
              <SearchIcon />
            </Button>
          </form>
        </div>
        {this.state.showSearchResult && (
          <StoreSearchResult data={this.state.list} />
        )}
        {""}
        {/* 폼메일 보내기 */}
        <Button onClick={this.openModal}>Email Us</Button>
        {this.state.isModalOpen && <FormMail onClose={this.closeModal} />} {""}
      </div>
    );
  }
}

const textfieldStyle = {
  margin: "10px",
  width: "300px"
};

const selectStyle = {
  width: "300px"
};

export default Main;
