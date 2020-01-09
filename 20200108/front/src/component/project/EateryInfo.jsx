import React, { Component } from "react";
import "./EateryInfo.css";

class EateryInfo extends Component{

  constructor(props){
    super(props);
    this.state = {
      storeName: '',
      storeAddress: '',
      storeTel: '',
      storeMainMenu: '',
      storeNumber: '',

      reviews: []
    }
  }

  render(){

    const { eateryInfoCloseMC, storeName, storeAddress, 
      storeTel, storeMainMenu, rate, review, reviewCount } = this.props;

    console.log('EateryInfo() rendered');

    return(
      <div>

        <div className="eateryInfo">

          <br/>
          <h3 className="sectionHeader"><b>{storeName}</b></h3>
          <br/>
          <div className="mainImage">
          </div>

          <h3 className="sectionHeader">Information</h3>
          <div className="information">
            <div className="infoDetail">
              <b>[주소]</b><br/> 
              {storeAddress}<br/>
            </div>
            <div className="infoDetail">
              <b>[전화번호]</b><br/> 
              {storeTel}<br/>
            </div>
            <div className="infoDetail">
            <b>[메인메뉴]</b><br/> 
              {storeMainMenu}<br/>
            </div>
          </div>
          <br/>

          <h3 className="sectionHeader">Reviews</h3>
          <div className="review">
            
            <div className="infoDetail">
                <b>[평점]</b><br/>
              <span className="rate">
                {rate} / 5.0
              </span>
            </div>

            <div className="infoDetail">
              <b>[{reviewCount}개의 맛집평]</b><br/>
              <p>
              {review}
              </p>
            </div>

          </div>

        </div>
        <button onClick={eateryInfoCloseMC} className="btnCloseEatery">&#60;</button>
      
      </div>
    );
  }

}

export default EateryInfo;