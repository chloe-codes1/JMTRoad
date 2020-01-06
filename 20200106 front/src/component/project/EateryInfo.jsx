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
    }
  }

  render(){

    const { eateryInfoCloseMC, storeName, storeAddress, storeTel, storeMainMenu } = this.props;
    //const { storeName, storeAddress, storeTel, storeMainMenu } = this.state;

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
            주소: {storeAddress}<br/>
            전화번호: {storeTel}<br/>
            메인메뉴: {storeMainMenu}
          </div>
          <br/>

          <h3 className="sectionHeader">Reviews</h3>
          <div className="review">
            <h4>아 거기 별로였어요{this.props.reviewTitle}</h4>
            <p>
              블라블라{this.props.reviewContents}
            </p>
          </div>

        </div>
        <button onClick={eateryInfoCloseMC} className="btnCloseEatery">&#60;</button>
      
      </div>
    );
  }

}

export default EateryInfo;