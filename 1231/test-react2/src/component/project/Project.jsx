import React from "react";
import Maps from "./maps/Maps";
import axios from "axios";
//import Tmaps from "./maps/Tmap";
//import MapBox from "./maps/MapBox";
import "./Project.scss";
import { Row, Col, Button } from "react-bootstrap";
import jQuery from "jquery";
import $ from "jquery";
import { createDocumentRegistry } from "typescript";

window.$ = window.jQuery = jQuery;


class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addedStore: "",
      coordinate: "",
      coords: [],
      selectedStores: [],
      storeInfos: [],
      storeResult: [],
      showResult: false
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

  showStores = async() => {
    const { selectedStores, storeResult } = this.state;
    const result = [];

     (async () => { this.state.storeInfos.map(store => {
      for (var i = 0; i < selectedStores.length; i++) {
        // if (store.A === selectedStores[i]) {  
          // -> Json에서 가져왔을 때
        if (store.storeName === selectedStores[i]) {
          // -> DB에서 가져왔을 때
          var coordinateObject = { coordinate: selectedStores[i + 1] };

          console.log("store는 JSON이 맞니? " + JSON.stringify(store)); // -> 맞다고 전해라~
          console.log("coordinateObject는 JSON이 맞니? "+JSON.stringify(coordinateObject));

          // store에 좌표를 추가하기 ...드디어 성공 흑흑 JQuery 최고야
          store = $.extend(store,coordinateObject);
        
          result.push(store);
        }
      }
      return result;
    });
  }) ()
   await this.setState({
      storeResult: result
    });
    console.log("찍혀야해..." + JSON.stringify(storeResult));
  };


  

  shortestPath = () => {
    console.log("shortestPath() called!");
    const coordinate = [];

    var data = document.getElementsByName('singleStore');

    for(var i=0; i< data.length ; i++) {
      console.log(" 나와 " +data[i].getAttribute('value'));
      coordinate.push(data[i].getAttribute('value'));
    }
    
    console.log(coordinate);

    


  };



  handleStoreChange = () => {
    console.log("handleStoreChange() called!!!!");
  };

  dropStore (ownerNo) {
    console.log("dropStore() called!!")
    const {storeResult} = this.state;
    this.setState({
      storeResult: storeResult.filter(storeResult => storeResult.ownerNo !== ownerNo)
    })
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

  shouldComponentUpdate(nextState) {
    return this.state.selectedStores !== nextState.selectedStores;
  }

  render() {
    const { storeResult, showResult } = this.state;
  

    return (
      <div>
        프로젝트 생성 페이지 오홍홍 <br />
        선택한 마커 넘어와서 리스트에 저장 되었니?
        {this.state.selectedStores}
        <br />
        {showResult && (
          <div className="selectedStores" style={{overflow: "scroll"}}>
            <Row className="justify-content-center">
              <Button onClick={() => this.shortestPath()}>경로 최적화</Button>
            </Row>

            {storeResult.map(row => (
              <div
                className="singleStore"
                name='singleStore'
                id={row.ownerNo}
                key={row.ownerNo /* row.A */ } 
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
                <Button onClick={() => this.dropStore(row.ownerNo)} variant="danger">삭제</Button>
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
      </div>
    );
  }
}
export default Project;
