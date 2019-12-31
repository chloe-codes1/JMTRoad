import React from "react";
import jQuery from "jquery";
import $ from "jquery";
import './Tmap.scss'

window.$ = window.jQuery = jQuery;

const { Tmap } = window;

class Tmaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // 1. 지도 띄우기
    const map = new Tmap.Map({
      div: "map_div",
      width: "500px",
      height: "500px"
    }); // -> zoom 설정

    map.setCenter(
      new Tmap.LonLat("126.98605733268329", "37.568085523663385").transform(
        "EPSG:4326",
        "EPSG:3857"
      ),
      5
    );
    let routeLayer = new Tmap.Layer.Vector("route");
    map.addLayer(routeLayer);

    function onZoom() {
      var result = "현재 지도의 레벨은" + map.getZoom() + "입니다."; //지도의 레벨을 표시합니다.
      var resultDiv = document.getElementById("result");
      resultDiv.innerHTML = result;
    }

    let markerStartLayer = new Tmap.Layer.Markers("start");
    let markerEndLayer = new Tmap.Layer.Markers("end");
    let markerWaypointLayer = new Tmap.Layer.Markers("waypoint");

    let pointLayer = new Tmap.Layer.Vector("point");

    // 2. 시작, 도착 심볼찍기
    // 시작
    map.addLayer(markerStartLayer);

    var size = new Tmap.Size(24, 38);
    var offset = new Tmap.Pixel(-(size.w / 2), -size.h);
    var icon = new Tmap.IconHtml(
      "<img src='http://tmapapis.sktelecom.com/upload/tmap/marker/pin_r_m_s.png' />",
      size,
      offset
    );
    var marker_s = new Tmap.Marker(
      new Tmap.LonLat("126.98605733268329", "37.568085523663385").transform(
        "EPSG:4326",
        "EPSG:3857"
      ),
      icon
    );
    // var marker_s = new Tmap.Marker(new Tmap.LonLat(firstSpot).transform("EPSG:4326", "EPSG:3857"), icon);
    markerStartLayer.addMarker(marker_s);

    // 도착
    map.addLayer(markerEndLayer);

    var size = new Tmap.Size(24, 38);
    var offset = new Tmap.Pixel(-(size.w / 2), -size.h);
    var icon = new Tmap.IconHtml(
      "<img src='http://tmapapis.sktelecom.com/upload/tmap/marker/pin_r_m_e.png' />",
      size,
      offset
    );
    var marker_e = new Tmap.Marker(
      new Tmap.LonLat("127.00973587385866", "37.56445848334345").transform(
        "EPSG:4326",
        "EPSG:3857"
      ),
      icon
    );
    markerEndLayer.addMarker(marker_e);

    // 3. 경유지 심볼 찍기
    map.addLayer(markerWaypointLayer);

    var size = new Tmap.Size(24, 38);
    var offset = new Tmap.Pixel(-(size.w / 2), -size.h);
    var icon = new Tmap.IconHtml(
      "<img src='http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_1.png' />",
      size,
      offset
    );
    var marker = new Tmap.Marker(
      new Tmap.LonLat("126.98735015742581", "37.56626352138058").transform(
        "EPSG:4326",
        "EPSG:3857"
      ),
      icon
    );
    markerWaypointLayer.addMarker(marker);

    icon = new Tmap.IconHtml(
      "<img src='http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_2.png' />",
      size,
      offset
    );
    marker = new Tmap.Marker(
      new Tmap.LonLat("127.00352387777271", "37.56335290252303").transform(
        "EPSG:4326",
        "EPSG:3857"
      ),
      icon
    );
    markerWaypointLayer.addMarker(marker);

    icon = new Tmap.IconHtml(
      "<img src='http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_3.png' />",
      size,
      offset
    );
    marker = new Tmap.Marker(
      new Tmap.LonLat("127.00221495976581", "37.56568310756034").transform(
        "EPSG:4326",
        "EPSG:3857"
      ),
      icon
    );
    markerWaypointLayer.addMarker(marker);

    icon = new Tmap.IconHtml(
      "<img src='http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_4.png' />",
      size,
      offset
    );
    marker = new Tmap.Marker(
      new Tmap.LonLat("126.992153", "37.570369").transform(
        "EPSG:4326",
        "EPSG:3857"
      ),
      icon
    );
    markerWaypointLayer.addMarker(marker);

    icon = new Tmap.IconHtml(
      "<img src='http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_5.png' />",
      size,
      offset
    );
    marker = new Tmap.Marker(
      new Tmap.LonLat("127.00186090818215", "37.570721714117965").transform(
        "EPSG:4326",
        "EPSG:3857"
      ),
      icon
    );
    markerWaypointLayer.addMarker(marker);

    icon = new Tmap.IconHtml(
      "<img src='http://tmapapis.sktelecom.com/upload/tmap/marker/pin_b_m_6.png' />",
      size,
      offset
    );
    marker = new Tmap.Marker(
      new Tmap.LonLat("126.99066536776698", "37.56515390827723").transform(
        "EPSG:4326",
        "EPSG:3857"
      ),
      icon
    );
    markerWaypointLayer.addMarker(marker);

    // 4. 경유지 최적화 API 사용요청
    var prtcl;
    var headers = {};
    headers["appKey"] = "84431dd5-3d00-402c-8f27-83feafcd1ff8";
    $.ajax({
      type: "POST",
      headers: headers,
      url:
        "https://apis.openapi.sk.com/tmap/routes/routeOptimization10?version=1&format=xml", //
      async: false,
      contentType: "application/json",
      data: JSON.stringify({
        reqCoordType: "WGS84GEO",
        resCoordType: "EPSG3857",
        startName: "출발",
        startX: "126.98605733268329",
        startY: "37.568085523663385",
        startTime: "201711121314",
        endName: "도착",
        endX: "127.00973587385866",
        endY: "37.56445848334345",
        searchOption: "0",
        viaPoints: [
          {
            viaPointId: "test01",
            viaPointName: "test01",
            viaX: "126.98735015742581",
            viaY: "37.56626352138058",
            viaTime: 600
          },
          {
            viaPointId: "test02",
            viaPointName: "test02",
            viaX: "127.00221495976581",
            viaY: "37.56568310756034",
            viaTime: 600
          },
          {
            viaPointId: "test03",
            viaPointName: "test03",
            viaX: "126.992153",
            viaY: "37.570369",
            viaTime: 600
          },
          {
            viaPointId: "test04",
            viaPointName: "test04",
            viaX: "127.00352387777271",
            viaY: "37.56335290252303",
            viaTime: 600
          },
          {
            viaPointId: "test05",
            viaPointName: "test05",
            viaX: "127.00186090818215",
            viaY: "37.570721714117965",
            viaTime: 600
          },
          {
            viaPointId: "test06",
            viaPointName: "test06",
            viaX: "126.99066536776698",
            viaY: "37.56515390827723",
            viaTime: 600
          }
        ]
      }),
      success: function(response) {
        prtcl = response;
        // 5. 경유지 최적화 결과 Line 그리기
        //경유지 최적화 결과 POINT 찍기
        /* -------------- Geometry.Point -------------- */
        var pointLayer = new Tmap.Layer.Vector("point");
        var prtclString = new XMLSerializer().serializeToString(prtcl); //xml to String
        let xmlDoc = $.parseXML(prtclString),
          $xml = $(xmlDoc),
          $intRate = $xml.find("Placemark");
        var style_red = {
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          strokeColor: "#FF0000",
          strokeWidth: 3,
          strokeDashstyle: "solid",
          pointRadius: 2,
          title: "this is a red line"
        };
        $intRate.each(function(index, element) {
          var nodeType = element.getElementsByTagName("tmap:nodeType")[0]
            .childNodes[0].nodeValue;
          if (nodeType === "POINT") {
            var point = element
              .getElementsByTagName("coordinates")[0]
              .childNodes[0].nodeValue.split(",");
            var geoPoint = new Tmap.Geometry.Point(point[0], point[1]);
            var pointFeature = new Tmap.Feature.Vector(
              geoPoint,
              null,
              style_red
            );
            pointLayer.addFeatures([pointFeature]);
          }
        });
        map.addLayer(pointLayer);
        /* -------------- Geometry.Point -------------- */
        //경유지 최적화 결과 Line 그리기
        routeLayer.style = {
          fillColor: "#FF0000",
          fillOpacity: 0.2,
          strokeColor: "#FF0000",
          strokeWidth: 3,
          strokeDashstyle: "solid",
          pointRadius: 2,
          title: "this is a red line"
        };
        var kmlForm = new Tmap.Format.KML().read(prtcl);
        routeLayer.addFeatures(kmlForm);

        // 6. 경유지 최적화 결과 반경만큼 지도 레벨 조정
        map.zoomToExtent(routeLayer.getDataExtent());
      },
      error: function(request, status, error) {
        console.log(
          "code:" +
            request.status +
            "\n message:" +
            request.responseText +
            "\n error:" +
            error
        );
      }
  
  });

  }

  render() {
    return (
      <div>
        <div id="map_div" className="Tmap">Tmap 이에염</div>
      </div>
    );
  }
}
export default Tmaps;
