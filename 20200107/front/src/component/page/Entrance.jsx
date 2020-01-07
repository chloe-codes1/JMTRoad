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
                  <BtnLogin>로그인</BtnLogin>
                </a>
              </span>
            </div>

        <div className="center">
          
          <div className="centerCont">
            <div className="textContent">
              <h3>우리가 어떤 민족입니까</h3>
              <p>사랑한다는 그 말 아껴둘 걸 그랬죠 이제 어떻게 내 맘 표현해야 하나 모든 것이 변해가도 이 맘으로 그대 사랑할게요 사랑할 수 있나요 내가 다가간만큼 이젠 내게 와줘요 내게 기댄 마음 사랑이 아니라해도 괜찮아요 그댈 볼 수 있으니 괜찮아요 내가 사랑할테니 크....</p>
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

const BtnLogin = styled.button`

  border-radius: 3px;
  border: 2px solid white;
  margin: 1em 1em;
  padding: 0.4em 1em;
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