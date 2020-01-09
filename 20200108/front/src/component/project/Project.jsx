import React from "react";
import Maps from "./maps/Maps";
import axios from "axios";
import "./Project.css";
import styled, { css } from "styled-components";
import EateryInfo from "./EateryInfo";
import withLogin from "../login/LoginHOC";
import jQuery from "jquery";
import $ from "jquery";
import { Row, Col, Button } from "react-bootstrap";
import SearchResult from "./SearchResult";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { withRouter } from "react-router-dom";

window.$ = window.jQuery = jQuery;

const { Tmap } = window;
const { kakao } = window;
class Project extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addedStore: "",
      coordinate: "",
      index: "",
      coords: [],
      selectedStores: [],
      storeInfos: [],
      storeResult: [],
      showResult: false,
      modifiedOrder: [],
      list: [],
      storeName: "",
      searchKeyword: "",
      showSearchResult: false,
      selectedStoreName: "",
      selectedAddress: "",
      //은석추가
      modal: false,
      eateryInfoCloseMC: this.eateryInfoCloseMC,
      title: "",
      date: "",
      totalExpense: "",

      //음식점 보여주기
      tel: "",
      address: "",
      storeName: "",
      mainMenu: "",

      time: "",
      expense: "",

      //프로젝트 추가용

      width: "84.3%",
      widthMessage: "default는 84.3%"
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
        //console.log("음식점 정보를 다 가져왔다하하하" + data);
        this.setState({
          storeInfos: data
        });
      })
      .catch(error => console.log("에러 났다고 전해라..." + error));
  };

  handleSelection = async (storeName, coordinate) => {
    console.log("해당 음식점 클릭하자마자 1번만 실행됨");
    console.log(
      "handleSelection에서는 어떻게 나올까? ",
      this.state.storeResult
    );
    //console.log("storeName이 project에 잘 넘어 왔는가..?" + storeName);
    //console.log("coordinate이 project에 잘 넘어 왔는가...?" + coordinate);

    await this.setState({
      addedStore: storeName,
      coordinate: coordinate
    });

    this.setState(state => {
      const selectedStores = state.selectedStores.concat(
        state.addedStore,
        state.coordinate
      );
      return {
        selectedStores,
        addedStore: "",
        showResult: true,
        shouldUpdate: true
      };
    });
  };

  showStores = async () => {
    console.log("showStores() excuted");
    const { selectedStores, storeResult } = this.state;
    const result = [];

    console.log("●storeResult => ", storeResult); //얘는 null
    console.log("지금까지 클릭한 selectedStores => ", selectedStores); //클릭한 음식점 이름, 좌표
    console.log("storeInfo 어마어마 => ", this.state.storeInfos); //db에 있는 음식점정보

    (async () => {
      this.state.storeInfos.map(store => {
        for (var i = 0; i < selectedStores.length; i++) {
          if (store.storeName === selectedStores[i]) {
            var coordinateObject = { coordinate: selectedStores[i + 1] };

            console.log(
              "store는 JSON이 맞니? 오 여기서 다 뜨나?" + JSON.stringify(store)
            ); // -> 맞다고 전해라~
            console.log("store", store); //캬 추출완료
            console.log(
              "coordinateObject는 JSON이 맞니? " +
                JSON.stringify(coordinateObject)
            );

            window.stName = store.storeName;
            window.stAddress = store.address;
            window.stTel = store.tel;
            window.stMainMenu = store.mainMenu;
            window.sessionStorage.setItem("ownerNo", store.ownerNo);

            console.log(
              "변수에 저장한 stName 등 =>",
              window.stName,
              window.stAddress,
              window.stTel,
              window.stMainMenu
            );

            // store에 좌표를 추가하기 ...드디어 성공 흑흑 JQuery 최고야
            store = $.extend(store, coordinateObject);

            console.log("★★selectedStores", selectedStores);
            console.log("★★storeResult", storeResult);
            console.log("★★store", store);
            console.log("**store보자", window.sessionStorage.getItem("ownerNo"));

            result.push(store);
          }
        }
        return result;
      });
    })();
      await this.setState({
        storeResult: result,
        tel: window.stTel,
        address: window.stAddress,
        storeName: window.stName,
        mainMenu: window.mainMenu
      });
  };
  shortestPath = () => {
    console.log("shortestPath() called!");

    const coordinate = [];
    const totalCoordinates = [];
    const ownerNo = [];
    let firstOrder = [];

    let startPoint = "";
    let endPoint = "";

    let startOwnerNo = "";
    let endOwnerNo = "";

    var data = document.getElementsByName("singleStore");

    firstOrder.push("출발");

    for (var i = 0; i < data.length; i++) {
      console.log(" 나와 " + data[i].getAttribute("value"));
      console.log(" OwnerNo " + data[i].getAttribute("id"));

      if (data[i].getAttribute("id") === "출발") {
        startPoint = data[i].getAttribute("value");
        startOwnerNo = data[i].getAttribute("mydata");
      } else if (data[i].getAttribute("id") === "도착") {
        endPoint = data[i].getAttribute("value");
        endOwnerNo = data[i].getAttribute("mydata");
      } else {
        coordinate.push(data[i].getAttribute("value"));
        ownerNo.push(data[i].getAttribute("id"));
        firstOrder.push(data[i].getAttribute("id"));
      }
    }

    firstOrder.push("도착");

    console.log("firstOrder ? " + firstOrder);

    console.log(coordinate);
    console.log(coordinate[1].split(","));
    console.log(coordinate[1].split(",")[1]);
    console.log(ownerNo);
    console.log(ownerNo[1]);
    console.log("startPoint ? " + startPoint);
    console.log("endPoint ? " + endPoint);
    console.log(startPoint.split(",")[0]);
    console.log(endPoint.split(",")[1]);

    totalCoordinates.push(startPoint);
    totalCoordinates.push(coordinate[0]);
    totalCoordinates.push(coordinate[1]);
    totalCoordinates.push(coordinate[2]);
    totalCoordinates.push(endPoint);

    console.log("totalCoordinates? " + totalCoordinates);
    console.log("totalCoordinates[1] ? " + typeof totalCoordinates[1]);
    console.log(
      "totalCoordinates[1] ? " +
        typeof parseInt(totalCoordinates[1].split(",")[0], 10)
    );

    this.setState({
      coords: totalCoordinates
    });

    // ---------------------- Tmap 경유지 최적화 API -----------------------------------

    const map = new Tmap.Map({
      div: "map_div",
      width: "500px",
      height: "500px"
    }); // -> zoom 설정

    let routeLayer = new Tmap.Layer.Vector("route");
    map.addLayer(routeLayer);

    var prtcl;
    var headers = {};

    var result;
    var order = [];

    // 주현 Tmap appKey.. 이거 지우고 올려야해...
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
        startX: startPoint.split(",")[0],
        startY: startPoint.split(",")[1],
        startTime: "201711121314",
        endName: "도착",
        endX: endPoint.split(",")[0],
        endY: endPoint.split(",")[1],
        searchOption: "0",
        viaPoints: [
          {
            viaPointId: "test01",
            viaPointName: firstOrder[1],
            viaX: coordinate[0].split(",")[0],
            viaY: coordinate[0].split(",")[1],
            viaTime: 600
          },
          {
            viaPointId: "test02",
            viaPointName: firstOrder[2],
            viaX: coordinate[1].split(",")[0],
            viaY: coordinate[1].split(",")[1],
            viaTime: 600
          },
          {
            viaPointId: "test03",
            viaPointName: firstOrder[3],
            viaX: coordinate[2].split(",")[0],
            viaY: coordinate[2].split(",")[1],
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

        // console.log("prtclString 찍어보긔" + prtclString);

        let xmlDoc = $.parseXML(prtclString),
          $xml = $(xmlDoc),
          $intRate = $xml.find("Placemark");

        // console.log("xmlDoc 찍어보긔" + xmlDoc);

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

        result = kmlForm;


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

    for (var j = 0; j < result.length; j++) {
      console.log(result[j].data.viaPointName);
      if (j % 2 === 0) {
        order.push(result[j].data.viaPointName);
      }
    }

    console.log("firstOrder " + firstOrder);
    console.log("(modified) order? " + order);

    this.setState({
      modifiedOrder: order
    });

    // ------------------- 정렬 ---------------------

    const { storeResult } = this.state;

    var beforeSort = storeResult;
    var afterSort = [];

    console.log("beforeSort length ? " + beforeSort.length);
    console.log("beforeSort  ? " + JSON.stringify(beforeSort));

    console.log("beforeSort ownerNo? " + beforeSort[0].ownerNo);
    console.log("beforeSort ownerNo? " + beforeSort[1].ownerNo);
    console.log("beforeSort ownerNo? " + beforeSort[2].ownerNo);
    console.log("beforeSort ownerNo? " + beforeSort[3].ownerNo);
    console.log("beforeSort ownerNo? " + beforeSort[4].ownerNo);

    console.log("modified order's ownerNo ? " + order[0].split(" ")[1]);
    console.log("modified order's ownerNo ? " + order[1].split(" ")[1]);
    console.log("modified order's ownerNo ? " + order[2].split(" ")[1]);
    console.log("modified order's ownerNo ? " + order[3].split(" ")[1]);
    console.log("modified order's ownerNo ? " + order[4].split(" ")[1]);

    console.log("startOwnerNo ? " + startOwnerNo);
    console.log("startOwnerNo's type ? " + typeof startOwnerNo);

    console.log("endOwnerNo ? " + endOwnerNo);
    console.log("endOwnerNo's type ? " + typeof endOwnerNo);

    for (var y = 0; y < beforeSort.length; y++) {
      console.log(startOwnerNo);
      console.log(beforeSort[y].ownerNo);

      if (startOwnerNo.includes(beforeSort[y].ownerNo)) {
        console.log(" 첫번째 push");
        afterSort.push(beforeSort[y]);
      }
    }

    for (var x = 0; x < beforeSort.length; x++) {
      if (order[1].split(" ")[1].includes(beforeSort[x].ownerNo)) {
        console.log(
          "modified order의 두번째 ownerNo ?" + order[1].split(" ")[1]
        );
        console.log(" 두번째 push");
        afterSort.push(beforeSort[x]);
      }
    }

    for (var z = 0; z < beforeSort.length; z++) {
      if (order[2].split(" ")[1].includes(beforeSort[z].ownerNo)) {
        console.log(" 세번째 push");
        afterSort.push(beforeSort[z]);
      }
    }

    for (var c = 0; c < beforeSort.length; c++) {
      if (order[3].split(" ")[1].includes(beforeSort[c].ownerNo)) {
        console.log(" 네번째 push");
        afterSort.push(beforeSort[c]);
      }
    }

    for (var b = 0; b < beforeSort.length; b++) {
      if (endOwnerNo.includes(beforeSort[b].ownerNo)) {
        console.log(" 마지막번째 push");
        afterSort.push(beforeSort[b]);
      }
    }

    if (afterSort.length !== 0) {
      console.log(" sort 된 것 출력하기 " + JSON.stringify(afterSort));
      this.setState(state => {
        const storeResult = afterSort;
        return {
          storeResult: storeResult
        };
      });

      $("#0").remove();
      $("#10").remove();
      $("#100").remove();
      $("#1000").html("<span> 첫번째 목적지</span>");
      $("#1000")
        .removeClass("hideOrders")
        .addClass("showOrders");

      $("#1").remove();
      $("#11").remove();
      $("#101").remove();
      $("#1001").html("<span> 두번째 목적지</span>");
      $("#1001")
        .removeClass("hideOrders")
        .addClass("showOrders");

      $("#2").remove();
      $("#12").remove();
      $("#102").remove();
      $("#1002").html("<span> 세번째 목적지</span>");
      $("#1002")
        .removeClass("hideOrders")
        .addClass("showOrders");

      $("#3").remove();
      $("#13").remove();
      $("#103").remove();
      $("#1003").html("<span> 네번째 목적지</span>");
      $("#1003")
        .removeClass("hideOrders")
        .addClass("showOrders");

      $("#4").remove();
      $("#14").remove();
      $("#104").remove();
      $("#1004").html("<span> 최종 목적지</span>");
      $("#1004")
        .removeClass("hideOrders")
        .addClass("showOrders");

      $("#resultMapArea")
        .removeClass("hideMap")
        .addClass("showMap");

      $("#processMap")
        .removeClass("googleMap")
        .addClass("hideMap");
      $("#map")
        .removeClass("kakao")
        .addClass("hideMap");

      $("#shortestPath").remove();

      $("#reload")
        .removeClass("hideOrders")
        .addClass("showOrders");

      //-------------------------- Kakao Map 을 경로 최적화 결과에 따라 새로 그리기 -------------------------------

      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=cf322787f4669732502374b0e6ffc647&autoload=false&libraries=services,clusterer,drawing";
      document.head.appendChild(script);

      script.onload = () => {
        var container = document.getElementById("resultMap");
        var options = {
          center: new kakao.maps.LatLng(37.4994764, 127.024962),
          level: 8
        };
        var kakaomap = new kakao.maps.Map(container, options); //지도 생성 + 객체 리턴

        // 주소-좌표 변환 객체를 생성
        var geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색
        this.state.storeResult.map((store, index) => {
          return geocoder.addressSearch(store.address, (result, status) => {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              var storeName = store.storeName;
              var coordinate = coords["Ga"] + "," + coords["Ha"];

              var imageSrc =
                  "https://image.flaticon.com/icons/svg/188/188234.svg",
                imageSize = new kakao.maps.Size(30, 30), // 마커이미지의 크기입니다
                imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다

              if (index === 1) {
                imageSrc =
                  "https://image.flaticon.com/icons/svg/188/188235.svg";
              } else if (index === 2) {
                imageSrc =
                  "https://image.flaticon.com/icons/svg/188/188236.svg";
              } else if (index === 3) {
                imageSrc =
                  "https://image.flaticon.com/icons/svg/188/188237.svg";
              } else if (index === 4) {
                imageSrc =
                  "https://image.flaticon.com/icons/svg/188/188238.svg";
              }

              // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
              var markerImage = new kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
                imageOption
              );

              // 결과로 받은 위치를 마커로 표시
              var marker = new kakao.maps.Marker({
                map: kakaomap,
                position: coords,
                title: storeName,
                image: markerImage,
                clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
              });

              console.log("위치 잘 찍히니? 네 => " + marker.getTitle());

              // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
              var content =
                '<div class="customoverlay">' +
                '<a href="https://map.kakao.com/link/to/' +
                storeName +
                "," +
                coords["Ga"] +
                "," +
                coords["Ha"] +
                '" style="color:blue" target="_blank"><span class="title">' +
                storeName +
                "</span></a></div>";

              var customOverlay = new kakao.maps.CustomOverlay({
                map: kakaomap,
                position: coords,
                content: content,
                yAnchor: 1
              });
            }
          });
        });
      };
    }
  };
  refreshPage() {
    window.location.reload();
  }

  setStartPoint(ownerNo, index) {
    console.log("setStartPoint() called!!");
    console.log("ownerNo 뭐임 " + ownerNo);
    const id = [];
    var data = document.getElementsByName("singleStore");
    for (var i = 0; i < data.length; i++) {
      console.log(" id " + data[i].getAttribute("id"));
      console.log(" mydata " + data[i].getAttribute("mydata"));
      console.log(" mykey " + data[i].getAttribute("mykey"));

      if (parseInt(ownerNo) === parseInt(data[i].getAttribute("mydata"))) {
        if (data[i].getAttribute("id") === "도착") {
          $("#도착").attr("id", data[i].getAttribute("mydata"));
        }
      }

      if (data[i].getAttribute("id") === "출발") {
        $("#출발").attr("id", data[i].getAttribute("mydata"));
      }

      if (data[i].getAttribute("mykey") !== index) {
        $("#" + data[i].getAttribute("mykey") + "").html(
          "<span> 출발지로</span>"
        );

        if (parseInt(ownerNo) === parseInt(data[i].getAttribute("mydata"))) {
          $("#1" + data[i].getAttribute("mykey") + "").html(
            "<span> 도착지로</span>"
          );
        }
      }
    }
    $("#" + ownerNo + "").attr("id", "출발");
    $("#" + index + "").html("<span style=\"font-weight: 900;\" > 출발지</span>");
    // 잘 바뀌었는지 확인용! 나중에 지우셈
    for (var j = 0; j < data.length; j++) {
      id.push(data[j].getAttribute("id"));
    }
    console.log(id);
  }

  setEndPoint(ownerNo, index) {
    console.log("setEndPoint() called!!");
    console.log("ownerNo? " + ownerNo);
    const id = [];
    var data = document.getElementsByName("singleStore");
    for (var i = 0; i < data.length; i++) {
      console.log(" id " + data[i].getAttribute("id"));
      console.log(" mydata " + data[i].getAttribute("mydata"));
      console.log(" mykey " + data[i].getAttribute("mykey"));

      if (parseInt(ownerNo) === parseInt(data[i].getAttribute("mydata"))) {
        if (data[i].getAttribute("id") === "출발") {
          $("#출발").attr("id", data[i].getAttribute("mydata"));
        }
      }

      if (data[i].getAttribute("id") === "도착") {
        $("#도착").attr("id", data[i].getAttribute("mydata"));
      }

      if (data[i].getAttribute("mykey") + 10 !== index) {
        $("#1" + data[i].getAttribute("mykey") + "").html(
          "<span> 도착지로</span>"
        );

        if (parseInt(ownerNo) === parseInt(data[i].getAttribute("mydata"))) {
          $("#" + data[i].getAttribute("mykey") + "").html(
            "<span> 출발지로</span>"
          );
        }
      }
    }

    $("#" + ownerNo + "").attr("id", "도착");
    $("#1" + index + "").html("<span style=\"font-weight: 900;\"> 도착지</span>");

    // 잘 바뀌었는지 확인용! 나중에 지우셈
    for (var j = 0; j < data.length; j++) {
      id.push(data[j].getAttribute("id"));
    }
    console.log(id);
    console.log(id[1]);
  }

  handleStoreChange = () => {
    console.log("handleStoreChange() called!!!!");
  };

  dropStore(ownerNo) {
    console.log("dropStore() called!!");
    const { storeResult } = this.state;

    this.setState({
      storeResult: storeResult.filter(
        storeResult => storeResult.ownerNo !== ownerNo
      )
    });

    console.log("♥non-drop storeResult[]", storeResult);
    console.log(
      "★dropped storeResult[]",
      storeResult.filter(storeResult => storeResult.ownerNo !== ownerNo)
    );
  }


  searchStore = async () => {
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
          searchKeyword: storeName,
          showSearchResult: true
        });
      })
      .catch(error => console.log("에러..흑흑.. => " + error));

      $("#searchingArea").removeClass("searchingArea").addClass("afterSearchingArea");

  };

  handleResult = async (storeName, address) => {
    console.log("선택된 store가 Project에 잘 넘어왔는가..." + storeName);
    console.log("선택된 store가 Project에 잘 넘어왔는가..." + address);
    this.setState({
      selectedStoreName: storeName,
      selectedAddress: address
    });
  };

  addToStoreResult = async () => {
    console.log("addToStoreResult Called!!");
    const address = this.state.selectedAddress;
    const storeName = this.state.selectedStoreName;
    const result = [];
    // 주소-좌표 변환 객체를 생성
    var geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        var coordinate = coords["Ga"] + "," + coords["Ha"];
        console.log("coords? " + coords);
        console.log("coordinate ? " + coordinate);

        (async () => {
          this.state.storeInfos.map(store => {
            var coordinateObject = { coordinate: coordinate };
            if (store.storeName === storeName) {
              console.log("store.storeName? " + storeName);
              console.log("storeName? " + storeName);
              // store = $.extend(store, coordinateObject);
              result.shift();
              // result.push(store);
              result.push(storeName);
              result.push(address);
            }
            return result;
          });
        })();


        this.setState(state => {
          const selectedStores = state.selectedStores.concat(
            result[0],
            result[1]
          );
          return {
            selectedStores,
            addedStore: "",
            showResult: true,
            shouldUpdate: true
          };
        });
      }
    });
    $("#searchingArea").removeClass("afterSearchingArea").addClass("searchingArea")
  };

  componentDidMount() {
    this.getStoreInfo();
  }

  componentDidUpdate() {
    const { storeName, tel, address, mainMenu } = this.state;

    if (this.state.shouldUpdate === true) {
      this.showStores();
      this.setState({
        shouldUpdate: false
      });
      console.log("다찍어 => ", storeName, tel, address, mainMenu);
    }
  }

  shouldComponentUpdate(nextState) {
    return this.state.selectedStores !== nextState.selectedStores;
  }

  //은석추가부분

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  eateryInfoOpenMC = () => {
    this.setState({
      modal: true,
      width: "68.6%",
      widthMessage: "이건 width가 68.6%"
    });
  };

  eateryInfoCloseMC = () => {
    this.setState({
      modal: false,
      width: "84.3%",
      widthMessage: "이건 width가 84.3%"
    });
  };
  
  saveProject = () => {
    //e.preventDefault();
    const { title, date, totalExpense, storeResult } = this.state;
    //console.log('너는 누구냐', window.sessionStorage.getItem('userNo'));
    
    let project = {
      userNo: window.sessionStorage.getItem("userNo"),
      title: title,
      meetingDate: date,
      totalExpense: totalExpense,
      //여기까지
      projectDetail: [{ routeNo: 0, ownerNo: 0 }]
    };
    
    if (project.userNo) {
      let rNo = 0;
      for (var i = 0; i < storeResult.length; i++) {
        project.projectDetail.push({
          routeNo: ++rNo,
          ownerNo: storeResult[i].ownerNo
        });
      }
      project.projectDetail = project.projectDetail.filter(
        store => store.routeNo !== 0
        );
    } else {
      console.log("userID가 존재하지 않습니다.");
    }
    
    console.log("★프로젝트정보 => ", project);

    axios
      .post("http://localhost:9999/project", project)
      .then(res => {
        console.log(res);
        alert("프로젝트가 저장되었습니다. 메인페이지로 이동합니다.");
        this.props.history.push('/main');
      })
      .catch(err => {
        console.log(err);
      });
      
    };
    
  cancelProject = () => {
      alert("프로젝트 작성을 취소하고 메인페이지로 이동합니다.");
      this.props.history.push('/main');
  }

  render() {
    const {
      storeResult,
      showResult,
      coords,
      storeName,
      tel,
      address,
      mainMenu
    } = this.state;

    console.log("project.jsx render() => 맛집순서배열", storeResult);
    console.log("제목이다 이것들아", this.state.title);

    console.log(
      "project.jsx가 render()되면서 현재 선택한 값이 잘 찍힐까? =>",
      storeName,
      tel,
      address,
      mainMenu
    );

    const { modal, eateryInfoCloseMC, width } = this.state;

    const style = {
      width: width
    };

    return (
      <div className="project">
        <div className="header">
          <div className="titleOutline">
            <Title
              type="text"
              placeholder="프로젝트 제목을 입력하세요."
              name="title"
              value={this.state.subject}
              onChange={this.onChange}
            />
          </div>
          <BtnGroup>
            <Button1 onClick={this.cancelProject}>취 소</Button1>
            <Button1 save onClick={this.saveProject}>
              저 장
            </Button1>
          </BtnGroup>
        </div>

        <div className="container">
          <div className="leftside">
            <div className="basicInfo">
              <Label date for="date">
                <b>날짜:</b>
              </Label>
              <input
                type="date"
                placeholder=""
                id="date"
                name="date"
                className="date"
                value={this.state.date}
                onChange={this.onChange}
              />
            </div>
            <div className="basicInfo">
              <Label totalExpense for="totalExpense">
                <b>총예산:</b>
              </Label>
              <input
                type="text"
                placeholder=""
                id="totalExpense"
                name="totalExpense"
                className="totalExpense"
                value={this.state.totalExpense}
                onChange={this.onChange}
              />
              &nbsp;원
            </div>

            <hr />
            <div className="optimalPath">
              <Button
                id="shortestPath"
                onClick={() => this.shortestPath()}
                className="btnOptimalPath"
              >
                경로 최적화
              </Button>
              <Button
                id="reload"
                onClick={() => this.refreshPage()}
                style={{
                  fontSize: "12pt",
                  padding: "3px, 10px",
                  marginTop: "10px"
                }}
                className="hideOrders"
              >
                다시 선택하기
              </Button>
            </div>
            <hr className="hr2" />

            <div className="wow">
              <div className="smc">
                여기에 경로가 생성됩니다.<br/>
                출발과 도착지 버튼을 눌러 최초경로와 <br/>
                마지막 경로를 지정합니다.
              </div>
              {/*this.state.selectedStores*/}
              <br />
              {showResult && (
                <div className="selectedStores" style={{ overflow: "scroll" }}>
                  {storeResult.map((row, index) => (
                    <div
                      className="singleStore"
                      name="singleStore"
                      id={row.ownerNo}
                      mydata={row.ownerNo}
                      key={index}
                      mykey={index}
                      value={row.coordinate}
                    >
                      <Route>
                        <RouteEateryInfo>
                          <p>{row.storeName}</p>

                          {/*
                      <p> OwnerNo : {row.ownerNo}</p>
                      <p> 가게 이름 : {row.storeName}</p>
                      <p> 주소 : {row.address}</p>
                      <p> 전화 번호 : {row.tel}</p>
                      <p> 메인 메뉴 : {row.mainMenu}</p>
                      <p> 좌표 : {row.coordinate}</p>
                    */}
                        </RouteEateryInfo>

                        <div className="routeDetailInfo">
                         
                        </div>

                        <div className="btnNavi">
                          <BtnSP
                            id={index}
                            onClick={() =>
                              this.setStartPoint(row.ownerNo, index)
                            }
                            variant="info"
                            style={{ fontSize: "10pt", padding: "2px, 1px" }}
                          >
                            출발지로
                          </BtnSP>

                          <BtnEP
                            id={index + 10}
                            onClick={() => this.setEndPoint(row.ownerNo, index)}
                            variant="warning"
                            style={{ fontSize: "10pt", padding: "2px, 1px" }}
                          >
                            도착지로
                          </BtnEP>

                          <Button
                            id={index + 1000}
                            variant="info"
                            className="hideOrders"
                            style={{ fontSize: "10pt", padding: "2px, 2px" }}
                          >
                            경유지 순서 출력될 곳
                          </Button>
                        </div>

                        <BtnRouteDelete
                          id={index + 100}
                          onClick={() => this.dropStore(row.ownerNo)}
                          variant="danger"
                        >
                          <i className="fas fa-trash-alt" />
                        </BtnRouteDelete>
                      </Route>

                      <div className="ellipsis">
                        <i class="fas fa-ellipsis-v" />
                      </div>
                    </div>
                  ))}
                </div>
              )}{" "}
            </div>
          </div>

          {!modal && (
            <button onClick={this.eateryInfoOpenMC} className="btnOpenEatery">
              >
            </button>
          )}
          {modal && (
            <EateryInfo
              eateryInfoCloseMC={eateryInfoCloseMC}
              storeName={this.state.storeName}
              storeAddress={this.state.address}
              storeTel={this.state.tel}
              storeMainMenu={this.state.mainMenu}
            />
          )}

          <div className="googleMap" style={style} id="processMap">
          <div className="searchingArea" id="searchingArea">
              <Row>
                <TextField
                  type="text"
                  id="outlined-basic"
                  margin="normal"
                  label="음식점 검색"
                  variant="outlined"
                  placeholder="음식점 이름을 입력하세요!"
                  name="storeName"
                  onChange={this.onChange}
                  value={this.state.storeName}
                  defaultValue=""
                  style={{
                    margin: "10px",
                    width: "280px",
                    fontSize: "10pt",
                    padding: "10px"
                  }}
                />
                <Button
                  variant="contained"
                  onClick={this.searchStore}
                  className="searchButton"
                  style={{ padding: "10px", marginTop: "20px" }}
                >
                  <SearchIcon />
                </Button>
              </Row>
              {this.state.showSearchResult && (
                <div id="searchResult">
                  <p> " {this.state.searchKeyword} " 검색 결과 </p>
                  <SearchResult
                    data={this.state.list}
                    result={this.handleResult}
                  />

                  <Button
                    style={{ fontSize: "10pt", padding: "2px, 7px" }}
                    onClick={() => this.addToStoreResult()}
                  >
                    맛집로드에 추가하기{" "}
                  </Button>
                  <hr />
                </div>
              )}
              {""}
            </div>
            <Maps selection={this.handleSelection} />
          </div>
          <div id="resultMapArea" className="hideMap">
            <div id="resultMap" className="kakaoResult"></div>
          </div>
        </div>
        <br />
        <div className="tmapTemp" style={{ display: "none" }}>
          <div id="map_div" />
        </div>
      </div>
    );
  }
}

const Route = styled.div`
  text-align: center;
  margin: 10px auto 10px auto;
  display: block;
  border: 1px solid grey;
  border-radius: 10px;
  width: 200px;
`;

const RouteEateryInfo = styled.div`
  text-align: center;
  margin: 10px auto 0 auto;
  display: block;
  border: 1px solid grey;
  border-radius: 10px;
  width: 180px;
  height: 50px;
  line-height: 50px;
  background-color: #e2e2e2;
`;

const Button1 = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #7f46a6;
  color: #7f46a6;
  margin: 1.1rem 1em;
  padding: 0.4em 1.2em;
  font-size: 1.05em;
  cursor: pointer;

  ${props =>
    props.save &&
    css`
      background: #7f46a6;
      color: white;

      &:hover {
        background: white;
        border: 2px solid #7f46a6;
        color: #7f46a6;
      }
    `}
`;

const Title = styled.input`
  width: 90%;
  height: 30px;
  margin: 0.35rem 0.5em;
  padding: 0em 0.5em;
  color: black;
  font-size: 1em;
  border: none;
`;

const BtnGroup = styled.div`
  float: right;
`;

const Label = styled.label`
  display: inline-block;
  width: 52px;
  height: 20px;
  
  ${props =>
    props.date &&
    css`
      margin: 10px 0px 3px 10px;
    `}
    
  ${props =>
    props.totalExpense &&
    css`
      margin: 3px 0px 5px 10px;
    `}

  ${props =>
    props.time &&
    css`
      width: 30px;
      margin: 5px auto 0px auto;
      font-size: 0.9em;
    `}
    
    ${props =>
      props.expense &&
      css`
        width: 30px;
        margin: 0px auto 7px auto;
        font-size: 0.9em;
      `}
`;

const BtnRouteDelete = styled.button`
  border-radius: 100px;
  width: 30px;
  height: 30px;
  text-align: center;
  vertical-align: middle;
  line-height: 18px;
  margin: 3px auto;
  float: right;
  position: relative;
  right: 10px;
  top: -46px;
  font-size: 0.9em;
  cursor: pointer;
  background-color: white;
  border: 1px solid gray;
  display: block;

  &:hover {
    color: palevioletred;
  }
`;

const BtnSP = styled.button`
  margin: 0 5px 0 0;
  background-color: white;
  border-radius: 3px;
  border: 1px solid rgb(39, 136, 252);
  color: rgb(39, 136, 252);
  cursor: pointer;

  &:hover {
    background-color: rgb(39, 136, 252);
    color: white;
  }
`;

const BtnEP = styled.button`
  margin: 0 0 0 5px;
  background-color: white;
  border-radius: 3px;
  border: 1px solid #f2506e;
  color: #f2506e;
  cursor: pointer;

  &:hover {
    background-color: #f2506e;
    color: white;
  }
`;

export default withLogin(withRouter(Project));
