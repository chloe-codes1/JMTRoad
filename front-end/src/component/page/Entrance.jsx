import React, { Component } from "react";
import TDE from "../../image/TDEntertainment.jpg";

class Entrance extends Component {

  render(){
    return(
      <div>
        <img 
          width="40%"
          height="15%"
          src={TDE}
          alt="트둥엔터테인먼트 공식 PPT 배경화면"
        />
      </div>
    );
  }
}

export default Entrance;