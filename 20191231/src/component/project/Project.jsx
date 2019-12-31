import React from "react";
import Maps from "./maps/Maps";
import axios from "axios";
//import Tmaps from "./maps/Tmap";
//import MapBox from "./maps/MapBox";
import './Project.scss'

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addedStore: "",
      coordinate: "",
      selectedStores: [],
      storeInfos: [],
      storeResult: [],
      showResult: false
    };
  }

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

  handleSelection = async (storeName,coordinate ) => {
    console.log("storeName이 project에 잘 넘어 왔는가..?" + storeName);
    console.log("coordinate이 project에 잘 넘어 왔는가...?" +coordinate);
    await this.setState({
      addedStore: storeName,
      coordinate: coordinate
    });

    this.setState(state => {
      const selectedStores = state.selectedStores.concat(state.addedStore, state.coordinate);
      return {
        selectedStores,
        addedStore: "",
        showResult: true,
        shouldUpdate: true
      };
    });



  };

  showStores = () => {
    const { selectedStores, storeResult } = this.state;
    const result = [];

    this.state.storeInfos.map(store => {
      for (var i = 0; i < selectedStores.length; i++) {
        if (store.A === selectedStores[i]) {
          result.push(store);
          result.push(selectedStores[i+1]);
        }
      }
      return result;
    });

    this.setState ({
      storeResult: result
    })

    console.log("찍혀야해..." +storeResult)
  };

  componentDidMount() {
    this.getJson();
  }

  componentDidUpdate() {
    if(this.state.shouldUpdate===true){
    this.showStores();

    this.setState({shouldUpdate: false})
    }
  }

  shouldComponentUpdate (nextState) {
    return this.state.selectedStores !== nextState.selectedStores;
  }


  render() {
    const { storeResult, showResult } = this.state;

    return (
      <div>
        프로젝트 생성 페이지 오홍홍 <br/>
        선택한 마커 넘어와서 리스트에 저장 되었니? 
        {this.state.selectedStores}
        <br/>
        {showResult && (
          <div className= "selectedStores" >
            {storeResult.map(row => (
              <div className="singleStore" key={row.A} >
                <p>{row.A}</p>
                <p>{row.B}</p>
                <p>{row.C}</p>
                <p>{row.D}</p>
                <p>{row.E}</p>
              </div>
            ))}
          </div>
        )}{" "}
        <div className="mapArea" >
          <Maps
            selection={this.handleSelection}
            /* data={this.state.storeInfos} */
          />
        </div>
        <div style={{ width: "1000px", height: "1500px" }}>
          {/* <Tmaps style={{width: "1000px", height: "1400px"}}/>  
          <MapBox/> */}
        </div>
      </div> 
    );
  }
}
export default Project;
