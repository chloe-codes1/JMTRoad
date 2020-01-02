import React from "react";
import Maps from "./maps/Maps";
import axios from "axios";
import "./Project.scss";
import { Row, Col, Button } from "react-bootstrap";
import jQuery from "jquery";
import $ from "jquery";

window.$ = window.jQuery = jQuery;
const { Tmap } = window;

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
      modifiedOrder: []
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
          storeInfos: data
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
        console.log("가게 정보 넘어 오너라.." + data);
        this.setState({
          storeInfos: data
        });
      })
      .catch(error => console.log("에러 잡아라아아..." + error));
  };

  handleSelection = async (storeName, coordinate) => {
    console.log("storeName이 project에 잘 넘어 왔는가..?" + storeName);
    console.log("coordinate이 project에 잘 넘어 왔는가...?" + coordinate);
    await this.setState({
      addedStore: storeName,
      coordinate: coordinate
      // index: 0
    });

    this.setState(state => {
      const selectedStores = state.selectedStores.concat(
        state.addedStore,
        state.coordinate
        // state.index
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
    const { selectedStores, storeResult } = this.state;
    const result = [];

    (async () => {
      this.state.storeInfos.map(store => {
        for (var i = 0; i < selectedStores.length; i++) {
          // if (store.A === selectedStores[i]) {
          // -> Json에서 가져왔을 때
          if (store.storeName === selectedStores[i]) {
            // -> DB에서 가져왔을 때
            var coordinateObject = { coordinate: selectedStores[i + 1] };

            // var indexObject = {index: --selectedStores.length}

            // store에 좌표를 추가하기 ...드디어 성공 흑흑 JQuery 최고야
            store = $.extend(store, coordinateObject);
            // store = $.extend(store, indexObject);
            result.push(store);
          }
        }
        return result;
      });
    })();
    await this.setState({
      storeResult: result
    });
    console.log("찍혀야해..." + JSON.stringify(storeResult));
  };

  // 경로 최적화 .... 머리터져
  shortestPath = () => {
    console.log("shortestPath() called!");
    const coordinate = [];
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

    this.setState({
      coords: coordinate
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
          // var util = require("util");
          // console.log("pointLayer는 무엇?" + util.inspect(pointLayer));
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

        // setTimeout(function() {
          // var util = require("util");
          // console.log("kmlForm은 무엇? " +  util.inspect(kmlForm));

          // var makeItString = kmlForm.toString();

          // console.log("kmlForm toString 가능? " + JSON.stringify(makeItString));
          // console.log("viaPointName 은 무엇?1 " + JSON.stringify(makeItString)[0].data.viaPointName);
          // console.log("viaPointName 은 무엇?2 " + kmlForm[0].data.viaPointName);
          // console.log("viaPointName 은 무엇?3 " + util.inspect(kmlForm)[0].data.viaPointName);
        // }, 3000);

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
    console.log("startOwnerNo's type ? " + typeof(startOwnerNo));

    console.log("endOwnerNo ? " + endOwnerNo);
    console.log("endOwnerNo's type ? " + typeof(endOwnerNo));

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

        console.log("modified order의 두번째 ownerNo ?"+ order[1].split(" ")[1]);
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

    for (var v = 0; v < beforeSort.length; v++) {
      if (order[4].split(" ")[1].includes(beforeSort[v].ownerNo)) {
        console.log(" 마지막번째 push");
        afterSort.push(beforeSort[v]);
      }
    }

    for (var b = 0; b < beforeSort.length; b++) {
      if (endOwnerNo === beforeSort[b].ownerNo) {
        afterSort.push(beforeSort[b]);
      }
    }



    if (afterSort.length !==0) {
      console.log(" sort 된 것 출력하기 " + JSON.stringify(afterSort));
        this.setState(state => {
          const storeResult = afterSort;
          return {
            storeResult: storeResult
          }
        });
    }
  };

  // 정렬
  sortOrder() {
    console.log("sortOrder() called!");

    console.log("정렬 전 " + JSON.stringify(this.state.storeResult));

    const { storeResult } = this.state;
    var sortedArray = require("sort-json-array");

    this.setState({
      storeResult: sortedArray(storeResult, "ownerNo", "des")
    });

    console.log("정렬 후 " + JSON.stringify(this.state.storeResult));
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

      if (
        "" + ownerNo + "" === data[i].getAttribute("mydata") &&
        data[i].getAttribute("id") === "도착"
      ) {
        $("#도착").attr("id", data[i].getAttribute("mydata"));
      }
      if (data[i].getAttribute("id") === "출발") {
        $("#출발").attr("id", data[i].getAttribute("mydata"));
      }
      if (data[i].getAttribute("mykey") !== index) {
        $("#" + data[i].getAttribute("mykey") + "").html(
          "<span> 출발지로 설정하기</span>"
        );
        $("#1" + data[i].getAttribute("mykey") + "").html(
          "<span> 도착지로 설정하기</span>"
        );
      }
    }
    $("#" + ownerNo + "").attr("id", "출발");
    $("#" + index + "").html("<span> 출발지</span>");
    // 잘 바뀌었는지 확인용! 나중에 지우셈
    for (var j = 0; j < data.length; j++) {
      id.push(data[j].getAttribute("id"));
    }
    console.log(id);
  }

  setEndPoint(ownerNo, index) {
    console.log("setEndPoint() called!!");
    const id = [];
    var data = document.getElementsByName("singleStore");
    for (var i = 0; i < data.length; i++) {
      console.log(" id " + data[i].getAttribute("id"));
      console.log(" mydata " + data[i].getAttribute("mydata"));
      console.log(" mykey " + data[i].getAttribute("mykey"));

      if (
        "" + ownerNo + "" === data[i].getAttribute("mydata") &&
        data[i].getAttribute("id") === "출발"
      ) {
        $("#출발").attr("id", data[i].getAttribute("mydata"));
      }
      if (data[i].getAttribute("id") === "도착") {
        $("#도착").attr("id", data[i].getAttribute("mydata"));
      }
      if (data[i].getAttribute("mykey") + 10 !== index) {
        $("#" + data[i].getAttribute("mykey") + "").html(
          "<span> 출발지로 설정하기</span>"
        );
        $("#1" + data[i].getAttribute("mykey") + "").html(
          "<span> 도착지로 설정하기</span>"
        );
      }
    }
    $("#" + ownerNo + "").attr("id", "도착");
    $("#1" + index + "").html("<span> 도착지</span>");

    // 잘 바뀌었는지 확인용! 나중에 지우셈
    for (var j = 0; j < data.length; j++) {
      id.push(data[j].getAttribute("id"));
    }
    console.log(id);
    console.log(id[1]);
  }

  componentDidMount() {
    // this.getJson();
    this.getStoreInfo();
  }

  componentDidUpdate() {
    if (this.state.shouldUpdate === true) {
      this.showStores();
      this.setState({
        shouldUpdate: false
      });
    }
  }

  //|| this.state.storeResult !== nextState.storeResult

  shouldComponentUpdate(nextState) {
    return this.state.selectedStores !== nextState.selectedStores;
  }

  render() {
    const { storeResult, showResult, coords } = this.state;

    return (
      <div>
        {this.state.selectedStores}
        <br />
        {coords[1]}
        <br />
        {showResult && (
          <div className="selectedStores" style={{ overflow: "scroll" }}>
            <Row className="justify-content-center">
              <Button
                onClick={() => this.shortestPath()}
                style={{
                  fontSize: "12pt",
                  padding: "3px, 10px",
                  marginTop: "10px"
                }}
              >
                경로 최적화
              </Button>
            </Row>

            <Row className="justify-content-center">
              <Button
                onClick={() => this.sortOrder()}
                style={{
                  fontSize: "12pt",
                  padding: "3px, 10px",
                  marginTop: "10px"
                }}
              >
                정렬
              </Button>
            </Row>

            <br />
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
                {/* JSON으로 가져올 때 */}
                {/* <p> {row.A}</p>
                <p> {row.B}</p>
                <p> {row.C}</p>
                <p> {row.D}</p>
                <p> {row.E}</p> */}

                {/* DB에서 가져올 때 */}
                <p> OwnerNo : {row.ownerNo}</p>
                <p> 가게 이름 : {row.storeName}</p>
                <p> 주소 : {row.address}</p>
                <p> 전화 번호 : {row.tel}</p>
                <p> 메인 메뉴 : {row.mainMenu}</p>
                <p> 좌표 : {row.coordinate}</p>

                <Button
                  id={index}
                  onClick={() => this.setStartPoint(row.ownerNo, index)}
                  variant="info"
                  style={{ fontSize: "10pt", padding: "2px, 7px" }}
                >
                  출발지로 설정하기
                </Button>

                <Button
                  id={index + 10}
                  onClick={() => this.setEndPoint(row.ownerNo, index)}
                  variant="warning"
                  style={{ fontSize: "10pt", padding: "2px, 7px" }}
                >
                  도착지로 설정하기
                </Button>

                <Button
                  onClick={() => this.dropStore(row.ownerNo)}
                  variant="danger"
                  style={{ fontSize: "10pt", padding: "2px, 7px" }}
                >
                  삭제
                </Button>
              </div>
            ))}
          </div>
        )}{" "}
        <div className="mapArea">
          <Maps
            selection={this.handleSelection}
            /* data={this.state.storeInfos} */
          />
        </div>
        <div className="tmapTemp">
          <div id="map_div"></div>
        </div>
      </div>
    );
  }
}
export default Project;
