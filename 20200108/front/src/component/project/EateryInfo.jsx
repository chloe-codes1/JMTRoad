import React, { Component } from "react";
import "./EateryInfo.css";
import axios from "axios";

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

  componentDidMount(){
    this.getStoreReview();
  }

  getStoreReview = () => {

    const { storeNumber } = this.state;

    this.setState({
      storeNumber: window.sessionStorage.getItem("ownerNo")
    }) 

    console.log('스토어넘버가 왜 안찍히지', window.sessionStorage.getItem("ownerNo"));

    axios
      .get("http://localhost:9999/storeReview" + "/" + window.sessionStorage.getItem("ownerNo"))
      .then( res => {
        console.log('레스레스레스', res)
        this.setState({
          reviews: res.data
        })
        console.log('reviews', this.state.reviews);
        console.log('자~알 받았다!');
      })
      .catch( err => {

      });
  }

  render(){

    const { eateryInfoCloseMC, storeName, storeAddress, storeTel, storeMainMenu } = this.props;
    //const { storeName, storeAddress, storeTel, storeMainMenu } = this.state;

    const { reviews } = this.state;

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
            <p>
              {reviews.map(review =>
                <p>{review.contents}</p>
              )}
            </p>
          </div>

        </div>
        <button onClick={eateryInfoCloseMC} className="btnCloseEatery">&#60;</button>
      
      </div>
    );
  }

}

export default EateryInfo;