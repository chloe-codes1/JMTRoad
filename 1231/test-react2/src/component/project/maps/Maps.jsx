import React from "react";
import axios from "axios";
import jQuery from "jquery";
import $ from "jquery";
import "./Maps.scss";

window.$ = window.jQuery = jQuery;

const { kakao } = window;

class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: []
    };
  }

  //DB에서 가져오긔
  getStoreInfo = async () => {
    await axios({
      method: "get",
      url: "ownerStoreList"
    })
      .then(success => {
        const data = success.data;
        console.log("음식점 정보를 다 가져왔다하하하" + data);
        this.setState({
          addresses: data
        });
      })
      .catch(error => console.log("에러 났다고 전해라..." + error));
  };

  //Json에서 가져오긔
  getJson = async () => {
    const storeUrl = "/store.json";
    axios
      .get(storeUrl)
      .then(response => {
        let data = response.data.storeList;
        console.log("가게 정보 넘어 왔니?" + data);
        this.setState({
          addresses: data
        });
      })
      .catch(error => console.log("에러 잡아라아아..." + error));
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.addresses !== nextState.addresses;
  }

  componentDidMount() {
    console.log("component가 mount 되었다. ");
    //JSON file에서 음식점 정보 가져오기
    this.getJson();

    //DB에서 음식점 정보 가져오기
    // this.getStoreInfo();
  }

  componentDidUpdate() {
    console.log("componentDidUpdate() called!!");

    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=cf322787f4669732502374b0e6ffc647&autoload=false&libraries=services,clusterer,drawing";
    document.head.appendChild(script);

    script.onload = () => {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(37.4994764, 127.024962),
        level: 4
      };
      var map = new kakao.maps.Map(container, options); //지도 생성 + 객체 리턴

      //------------------------------ setTimeout() ------------------------------

      var displayMarker = setTimeout(function() {
        map.relayout();
        //------------------------------ GeoLocation 으로 지도 중심 재설정 ------------------------------

        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
        if (navigator.geolocation) {
          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude, // 위도
              lon = position.coords.longitude; // 경도

            var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
              message =
                '<div style="width:40px; text-align:center; padding:6px 0; font-size: 10pt">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

            // 마커와 인포윈도우를 표시합니다
            displayMarker(locPosition, message);
          });
        } else {
          // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

          var locPosition = new kakao.maps.LatLng(37.4994764, 127.024962),
            message = "geolocation을 사용할수 없어요..";

          displayMarker(locPosition, message);
        }

        displayMarker = (locPosition, message) => {
          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: locPosition
          });

          var iwContent = message, // 인포윈도우에 표시할 내용
            iwRemoveable = true;

          // 인포윈도우를 생성
          var infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable
          });

          // 인포윈도우 마커위에 표시
          infowindow.open(map, marker);

          // 지도 중심좌표를 접속위치로 변경
          map.setCenter(locPosition);
        };
      }, 5000);

      // 주소-좌표 변환 객체를 생성
      var geocoder = new kakao.maps.services.Geocoder();

      // ------------------------------ JSON으로 만든 list를 map으로 뽑기 ------------------------------

      // 주소로 좌표를 검색
      this.state.addresses.map(store => {
        return geocoder.addressSearch(store.B, (result, status) => {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            var storeName = store.A;
            var coordinate = coords["Ga"] + "," + coords["Ha"];

            // 결과로 받은 위치를 마커로 표시
            var marker = new kakao.maps.Marker({
              map: map,
              position: coords,
              title: store.A,
              clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
            });

            console.log("위치 잘 찍히니? 네 => " + marker.getTitle());

            // ------------------------------ 마커에 클릭이벤트를 등록하긔 ------------------------------

            kakao.maps.event.addListener(marker, "click", async () => {
              await (() => {
                this.props.selection(marker.getTitle(), coordinate);
              })();

              var imageSrc =
                  "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                imageSize = new kakao.maps.Size(37, 45), // 마커이미지의 크기입니다
                imageOption = { offset: new kakao.maps.Point(17, 40) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

              // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
              var markerImage = new kakao.maps.MarkerImage(
                  imageSrc,
                  imageSize,
                  imageOption
                ),
                markerPosition = marker.getPosition();

              // 마커를 생성합니다
              marker = new kakao.maps.Marker({
                position: markerPosition,
                image: markerImage // 마커이미지 설정
              });

              // 마커가 지도 위에 표시되도록 설정합니다
              marker.setMap(map);

              console.log("마커 눌렸따!" + marker.getTitle() + storeName);

              // 인포윈도우로 장소에 대한 설명을 표시
              var infowindow =
                coords &&
                new kakao.maps.InfoWindow({
                  content:
                    '<div style="width:40px; text-align:center; padding:6px 0; font-size: 10pt">' +
                    store.A +
                    '<br/> <a href="https://map.kakao.com/link/to/' +
                    store.A +
                    "," +
                    coords["Ga"] +
                    "," +
                    coords["Ha"] +
                    '" style="color:blue" target="_blank">길찾기</a></div>'
                });
              infowindow.open(map, marker);
            });

            // console.log(coords);
            // console.log(coords["Ga"]+","+coords["Ha"]);

            // 인포윈도우로 장소에 대한 설명을 표시
            var infowindow =
              coords &&
              new kakao.maps.InfoWindow({
                content:
                  '<div style="width:40px; text-align:center; padding:6px 0; font-size: 10pt">' +
                  store.A +
                  '<br/> <a href="https://map.kakao.com/link/to/' +
                  store.A +
                  "," +
                  coords["Ga"] +
                  "," +
                  coords["Ha"] +
                  '" style="color:blue" target="_blank">길찾기</a></div>'
              });
            // console.log(infowindow);

            // 마커에 마우스오버 이벤트를 등록합니다
            kakao.maps.event.addListener(marker, "mouseover", () => {
              // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
              infowindow.open(map, marker);
            });

            // 마커에 마우스아웃 이벤트를 등록.....
            kakao.maps.event.addListener(marker, "mouseout", () => {
              // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
              infowindow.close();
            });
          }
        });
      });

      var drawingFlag = false; // 선이 그려지고 있는 상태를 가지고 있을 변수입니다
      var moveLine; // 선이 그려지고 있을때 마우스 움직임에 따라 그려질 선 객체 입니다
      var clickLine; // 마우스로 클릭한 좌표로 그려질 선 객체입니다
      var distanceOverlay; // 선의 거리정보를 표시할 커스텀오버레이 입니다
      var dots = {}; // 선이 그려지고 있을때 클릭할 때마다 클릭 지점과 거리를 표시하는 커스텀 오버레이 배열입니다.

      // 지도에 클릭 이벤트를 등록합니다
      // 지도를 클릭하면 선 그리기가 시작됩니다 그려진 선이 있으면 지우고 다시 그립니다
      kakao.maps.event.addListener(map, "click", function(mouseEvent) {
        // 마우스로 클릭한 위치입니다
        var clickPosition = mouseEvent.latLng;

        // 지도 클릭이벤트가 발생했는데 선을 그리고있는 상태가 아니면
        if (!drawingFlag) {
          // 상태를 true로, 선이 그리고있는 상태로 변경합니다
          drawingFlag = true;

          // 지도 위에 선이 표시되고 있다면 지도에서 제거합니다
          deleteClickLine();

          // 지도 위에 커스텀오버레이가 표시되고 있다면 지도에서 제거합니다
          deleteDistnce();

          // 지도 위에 선을 그리기 위해 클릭한 지점과 해당 지점의 거리정보가 표시되고 있다면 지도에서 제거합니다
          deleteCircleDot();

          // 클릭한 위치를 기준으로 선을 생성하고 지도위에 표시합니다
          clickLine = new kakao.maps.Polyline({
            map: map, // 선을 표시할 지도입니다
            path: [clickPosition], // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
            strokeWeight: 3, // 선의 두께입니다
            strokeColor: "#db4040", // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: "solid" // 선의 스타일입니다
          });

          // 선이 그려지고 있을 때 마우스 움직임에 따라 선이 그려질 위치를 표시할 선을 생성합니다
          moveLine = new kakao.maps.Polyline({
            strokeWeight: 3, // 선의 두께입니다
            strokeColor: "#db4040", // 선의 색깔입니다
            strokeOpacity: 0.5, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: "solid" // 선의 스타일입니다
          });

          // 클릭한 지점에 대한 정보를 지도에 표시합니다
          displayCircleDot(clickPosition, 0);
        } else {
          // 선이 그려지고 있는 상태이면

          // 그려지고 있는 선의 좌표 배열을 얻어옵니다
          var path = clickLine.getPath();

          // 좌표 배열에 클릭한 위치를 추가합니다
          path.push(clickPosition);

          // 다시 선에 좌표 배열을 설정하여 클릭 위치까지 선을 그리도록 설정합니다
          clickLine.setPath(path);

          var distance = Math.round(clickLine.getLength());
          displayCircleDot(clickPosition, distance);
        }
      });

      // 지도에 마우스무브 이벤트를 등록합니다
      // 선을 그리고있는 상태에서 마우스무브 이벤트가 발생하면 그려질 선의 위치를 동적으로 보여주도록 합니다
      kakao.maps.event.addListener(map, "mousemove", function(mouseEvent) {
        // 지도 마우스무브 이벤트가 발생했는데 선을 그리고있는 상태이면
        if (drawingFlag) {
          // 마우스 커서의 현재 위치를 얻어옵니다
          var mousePosition = mouseEvent.latLng;

          // 마우스 클릭으로 그려진 선의 좌표 배열을 얻어옵니다
          var path = clickLine.getPath();

          // 마우스 클릭으로 그려진 마지막 좌표와 마우스 커서 위치의 좌표로 선을 표시합니다
          var movepath = [path[path.length - 1], mousePosition];
          moveLine.setPath(movepath);
          moveLine.setMap(map);

          var distance = Math.round(
              clickLine.getLength() + moveLine.getLength()
            ), // 선의 총 거리를 계산합니다
            content =
              '<div class="dotOverlay distanceInfo">총거리 <span class="number">' +
              distance +
              "</span>m</div>"; // 커스텀오버레이에 추가될 내용입니다

          // 거리정보를 지도에 표시합니다
          showDistance(content, mousePosition);
        }
      });

      // 지도에 마우스 오른쪽 클릭 이벤트를 등록합니다
      // 선을 그리고있는 상태에서 마우스 오른쪽 클릭 이벤트가 발생하면 선 그리기를 종료합니다
      kakao.maps.event.addListener(map, "rightclick", function(mouseEvent) {
        // 지도 오른쪽 클릭 이벤트가 발생했는데 선을 그리고있는 상태이면
        if (drawingFlag) {
          // 마우스무브로 그려진 선은 지도에서 제거합니다
          moveLine.setMap(null);
          moveLine = null;

          // 마우스 클릭으로 그린 선의 좌표 배열을 얻어옵니다
          var path = clickLine.getPath();

          // 선을 구성하는 좌표의 개수가 2개 이상이면
          if (path.length > 1) {
            // 마지막 클릭 지점에 대한 거리 정보 커스텀 오버레이를 지웁니다
            if (dots[dots.length - 1].distance) {
              dots[dots.length - 1].distance.setMap(null);
              dots[dots.length - 1].distance = null;
            }

            var distance = Math.round(clickLine.getLength()), // 선의 총 거리를 계산합니다
              content = getTimeHTML(distance); // 커스텀오버레이에 추가될 내용입니다

            // 그려진 선의 거리정보를 지도에 표시합니다
            showDistance(content, path[path.length - 1]);
          } else {
            // 선을 구성하는 좌표의 개수가 1개 이하이면
            // 지도에 표시되고 있는 선과 정보들을 지도에서 제거합니다.
            deleteClickLine();
            deleteCircleDot();
            deleteDistnce();
          }

          // 상태를 false로, 그리지 않고 있는 상태로 변경합니다
          drawingFlag = false;
        }
      });

      // 클릭으로 그려진 선을 지도에서 제거하는 함수입니다
      function deleteClickLine() {
        if (clickLine) {
          clickLine.setMap(null);
          clickLine = null;
        }
      }

      // 마우스 드래그로 그려지고 있는 선의 총거리 정보를 표시하거
      // 마우스 오른쪽 클릭으로 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 생성하고 지도에 표시하는 함수입니다
      function showDistance(content, position) {
        if (distanceOverlay) {
          // 커스텀오버레이가 생성된 상태이면

          // 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
          distanceOverlay.setPosition(position);
          distanceOverlay.setContent(content);
        } else {
          // 커스텀 오버레이가 생성되지 않은 상태이면

          // 커스텀 오버레이를 생성하고 지도에 표시합니다
          distanceOverlay = new kakao.maps.CustomOverlay({
            map: map, // 커스텀오버레이를 표시할 지도입니다
            content: content, // 커스텀오버레이에 표시할 내용입니다
            position: position, // 커스텀오버레이를 표시할 위치입니다.
            xAnchor: 0,
            yAnchor: 0,
            zIndex: 3
          });
        }
      }

      // 그려지고 있는 선의 총거리 정보와
      // 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 삭제하는 함수입니다
      function deleteDistnce() {
        if (distanceOverlay) {
          distanceOverlay.setMap(null);
          distanceOverlay = null;
        }
      }

      // 선이 그려지고 있는 상태일 때 지도를 클릭하면 호출하여
      // 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 표출하는 함수입니다
      function displayCircleDot(position, distance) {
        // 클릭 지점을 표시할 빨간 동그라미 커스텀오버레이를 생성합니다
        var circleOverlay = new kakao.maps.CustomOverlay({
          content: '<span class="dot"></span>',
          position: position,
          zIndex: 1
        });

        // 지도에 표시합니다
        circleOverlay.setMap(map);

        if (distance > 0) {
          // 클릭한 지점까지의 그려진 선의 총 거리를 표시할 커스텀 오버레이를 생성합니다
          var distanceOverlay = new kakao.maps.CustomOverlay({
            content:
              '<div class="dotOverlay">거리 <span class="number">' +
              distance +
              "</span>m</div>",
            position: position,
            yAnchor: 1,
            zIndex: 2
          });

          // 지도에 표시합니다
          distanceOverlay.setMap(map);
        }

        // 배열에 추가합니다
        dots.push({ circle: circleOverlay, distance: distanceOverlay });
      }

      // 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 지도에서 모두 제거하는 함수입니다
      function deleteCircleDot() {
        var i;

        for (i = 0; i < dots.length; i++) {
          if (dots[i].circle) {
            dots[i].circle.setMap(null);
          }

          if (dots[i].distance) {
            dots[i].distance.setMap(null);
          }
        }

        dots = [];
      }

      // 마우스 우클릭 하여 선 그리기가 종료됐을 때 호출하여
      // 그려진 선의 총거리 정보와 거리에 대한 도보, 자전거 시간을 계산하여
      // HTML Content를 만들어 리턴하는 함수입니다
      function getTimeHTML(distance) {
        // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
        var walkkTime = (distance / 67) | 0;
        var walkHour = "",
          walkMin = "";

        // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
        if (walkkTime > 60) {
          walkHour =
            '<span class="number">' +
            Math.floor(walkkTime / 60) +
            "</span>시간 ";
        }
        walkMin = '<span class="number">' + (walkkTime % 60) + "</span>분";

        // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
        var bycicleTime = (distance / 227) | 0;
        var bycicleHour = "",
          bycicleMin = "";

        // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
        if (bycicleTime > 60) {
          bycicleHour =
            '<span class="number">' +
            Math.floor(bycicleTime / 60) +
            "</span>시간 ";
        }
        bycicleMin = '<span class="number">' + (bycicleTime % 60) + "</span>분";

        // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
        var content = '<ul class="dotOverlay distanceInfo">';
        content += "    <li>";
        content +=
          '        <span class="label">총거리</span><span class="number">' +
          distance +
          "</span>m";
        content += "    </li>";
        content += "    <li>";
        content +=
          '        <span class="label">도보</span>' + walkHour + walkMin;
        content += "    </li>";
        content += "    <li>";
        content +=
          '        <span class="label">자전거</span>' +
          bycicleHour +
          bycicleMin;
        content += "    </li>";
        content += "</ul>";

        return content;
      }

      //이거 나중에 쓰려면 쓰셈

      // 도형 스타일을 변수로 설정합니다
      // var strokeColor = "#39f",
      //   fillColor = "#cce6ff",
      //   fillOpacity = 0.5,
      //   hintStrokeStyle = "dash";

      // var options = {
      //   // Drawing Manager를 생성할 때 사용할 옵션입니다
      //   map: map, // Drawing Manager로 그리기 요소를 그릴 map 객체입니다
      //   drawingMode: [
      //     kakao.maps.Drawing.OverlayType.MARKER,
      //     kakao.maps.Drawing.OverlayType.ARROW,
      //     kakao.maps.Drawing.OverlayType.POLYLINE,
      //     kakao.maps.Drawing.OverlayType.RECTANGLE,
      //     kakao.maps.Drawing.OverlayType.CIRCLE,
      //     kakao.maps.Drawing.OverlayType.ELLIPSE,
      //     kakao.maps.Drawing.OverlayType.POLYGON
      //   ],
      //   // 사용자에게 제공할 그리기 가이드 툴팁입니다
      //   // 사용자에게 도형을 그릴때, 드래그할때, 수정할때 가이드 툴팁을 표시하도록 설정합니다
      //   guideTooltip: ["draw", "drag", "edit"],
      //   markerOptions: {
      //     draggable: true,
      //     removable: true
      //   },
      //   arrowOptions: {
      //     draggable: true,
      //     removable: true,
      //     strokeColor: strokeColor,
      //     hintStrokeStyle: hintStrokeStyle
      //   },
      //   polylineOptions: {
      //     draggable: true,
      //     removable: true,
      //     strokeColor: strokeColor,
      //     hintStrokeStyle: hintStrokeStyle
      //   },
      //   rectangleOptions: {
      //     draggable: true,
      //     removable: true,
      //     strokeColor: strokeColor,
      //     fillColor: fillColor,
      //     fillOpacity: fillOpacity
      //   },
      //   circleOptions: {
      //     draggable: true,
      //     removable: true,
      //     strokeColor: strokeColor,
      //     fillColor: fillColor,
      //     fillOpacity: fillOpacity
      //   },
      //   ellipseOptions: {
      //     draggable: true,
      //     removable: true,
      //     strokeColor: strokeColor,
      //     fillColor: fillColor,
      //     fillOpacity: fillOpacity
      //   },
      //   polygonOptions: {
      //     draggable: true,
      //     removable: true,
      //     strokeColor: strokeColor,
      //     fillColor: fillColor,
      //     fillOpacity: fillOpacity
      //   }
      // };

      // // 위에 작성한 옵션으로 Drawing Manager를 생성합니다
      // var manager = new kakao.maps.Drawing.DrawingManager(options);

      // // Toolbox를 생성합니다.
      // // Toolbox 생성 시 위에서 생성한 DrawingManager 객체를 설정합니다.
      // // DrawingManager 객체를 꼭 설정해야만 그리기 모드와 매니저의 상태를 툴박스에 설정할 수 있습니다.
      // var toolbox = new kakao.maps.Drawing.Toolbox({ drawingManager: manager });

      // // 지도 위에 Toolbox를 표시합니다
      // // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOP은 위 가운데를 의미합니다.
      // map.addControl(toolbox.getElement(), kakao.maps.ControlPosition.TOP);

      // 일반 지도와 스카이뷰로 지도 타입을 전환용 지도타입 컨트롤 생성
      var mapTypeControl = new kakao.maps.MapTypeControl();

      // 지도에 컨트롤을 추가해야 지도위에 표시됨!
      // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의함
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // 지도에 교통정보를 표시하긔....정신 없으니 일단 지우긔
      // map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성
      var zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록
      kakao.maps.event.addListener(map, "zoom_changed", function() {
        // 지도의 현재 레벨을 얻어옵니다
        var level = map.getLevel();

        var message = "현재 지도 레벨은 " + level + " 입니다";
        var resultDiv = document.getElementById("result");
        resultDiv.innerHTML = message;
      });
    };
  }

  render() {
    return (
      <div>
        <p className="instruction">
          지도를 마우스로 클릭하면 선 그리기가 시작되고, 오른쪽 마우스를
          클릭하면 선 그리기가 종료됩니다!
        </p>
        <div id="map" className="kakao"></div>
        <div id="result"></div>

        
      {/* Json 잘 넘어오나 찍어보긔
      {this.state.addresses.map(function(store){
        return (
          <div key={store.A} className="store">
            {store.A}
            {store.B} <br/>
            {store.C} <br/>
            {store.D} <br/>

            {store.storeName}
            {store.address} <br/>
            {store.tel} <br/>
            {store.mainMenu} <br/>
          </div>
        )
      })} */}
      </div>
    );
  }
}
export default Maps;
