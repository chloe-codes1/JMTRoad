import React, { Component } from "react";
import foodIllust from "../../image/bgImage.jpg";
import "./Entrance.css";
import styled from "styled-components";

class Entrance extends Component {

  render(){
    return(
      <div className="body"> 

            <div className="hcontents">
              <h1>맛집의민족</h1>
              <span className="btnLogin">
                <a href="/login">
                  <BtnSignUp>회원가입</BtnSignUp>
                  <BtnLogin>로그인</BtnLogin>
                </a>
              </span>
            </div>

        <div className="center">
          
          <div className="centerCont">
            <div className="textContent">
              <h3>우리가 어떤 민족입니까</h3>
              <p>우리는 맛을 사랑하는 민족입니다. 맛있는 음식점을 찾아 사진을 찍고 추억을 남깁니다. 하지만 우리는 이 음식점들을 하나로 잇지 못했습니다. 이 음식점들을 선으로 연결해 줄 지도가 필요합니다. 이제는 음식점을 사진으로만 남기지 않고, 여정으로 남겨두세요. 여러분의 그 사소한 여정이 누군가에겐 위대한 여정이 될 수 있으니.</p>
            </div>
            <div className="bemypartner">
              지금 바로 간편하게 가입하고 무료로 이용하세요.
            </div>

            <div className="bgImage">
              <img
                width="450px"
                height="350px"
                src={foodIllust}
                alt="첫진입장벽"
                />
            </div>
          </div>

        </div>

      </div>
    );
  }
}

const BtnSignUp = styled.button`

  border-radius: 3px 0 0 3px;
  border: 2px solid white;
  margin: 1em 1em;
  padding: 0.4em 1em;
  font-weight: 800;
  font-size: 1.3em;
  letter-spacing: 1.5px;
  cursor: pointer;
  background: white;
  color: #7f46a6;

  position: absolute;
  top: 30px;
  right: 150px;

  &:hover {
    background: #7f46a6;
    border: 2px solid #7f46a6;
    color: white;
  }

`

const BtnLogin = styled.button`

  border-radius: 0 3px 3px 0;
  border: 2px solid white;
  margin: 1em 1em;
  padding: 0.4em 1.3em;
  font-weight: 800;
  font-size: 1.3em;
  letter-spacing: 1.5px;
  cursor: pointer;
  background: #7f46a6;
  color: white;

  position: absolute;
  top: 30px;
  right: 50px;

  &:hover {
    background: white;
    border: 2px solid #7f46a6;
    color: #7f46a6
  }
`

export default Entrance;