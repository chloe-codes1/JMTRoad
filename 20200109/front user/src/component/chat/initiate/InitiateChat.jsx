import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import UserSearchResult from "../../user/UserSearchResult";
import axios from "axios";
import "./InitiateChat.scss";
import close from '../../../Img/close.png';

class InitiateChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      list: [],
      showSearchResult: false,
      result: ""
    };
  }

  handleResult = async userNo => {
    console.log("User Number 가 Initiate Chat에 잘 넘어왔는가..." + userNo);
    await this.setState({ result: userNo });
    console.log("찍혀야혀.." + this.state.result);
  };

  handleUserNameChange = event => {
    this.setState({
      nickname: event.target.value
    });
  };

  //접속
  handleConnectPublicly = () => {
    this.props.connect(this.state.result, false);
    //-> 부모인 ChatMessageBox의 connect()호출
  };

  toMainPage = () => {
    this.props.history.push("/main");
  };

  search = async () => {
    let nickname = this.state.nickname;

    await axios({
      method: "get",
      url: `searchUser/${nickname}`
    })
      .then(success => {
        const data = success.data;
        console.log("User nickname으로 검색 성공! " + data);
        this.setState({
          list: data,
          nickname: "",
          showSearchResult: true
        });
        console.log("한번 봐봅세" + this.state.showSearchResult);
      })
      .catch(error => console.log("에러났다.. 잡아라..") + error);
  };

  render() {
    return (
      <div className="InitiateModal" style={{ textAlign: "center" }}>
        <div className="Initiate-content" style={{borderRadius:"8px"}}>
          <Button
            onClick={this.toMainPage}
            style={{ float: "right", display: "inline" }}
          >{" "}<img src={close} id="closeimg"/>{" "}
          </Button>
          <h4 style={{ fontSize: "16pt", textAlign: "center", fontFamily: "LotteMartHappy" }}>
            채팅 시작하기
          </h4>
          <p style={{ fontFamily:"Handon3gyeopsal300g" }}>채팅할 유저의 닉네임을 입력하세요</p>
          <div>
            <TextField
              id="user"
              label="닉네임을 입력해주세요"
              placeholder="Nickname"
              onChange={this.handleUserNameChange}
              style={{ width: "200px" }}
            />
            <Button onClick={this.search} style={searchbtn}>검색</Button>
            {this.state.showSearchResult && (
              <div>
                <UserSearchResult
                  data={this.state.list}
                  result={this.handleResult}
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleConnectPublicly}
                >
                  채팅 시작
                </Button>
              </div>
            )}{" "}
            {""}
          </div>
        </div>
      </div>
    );
  }
}

const searchbtn={
    color: 'white',
    letterSpacing: '2px',
    fontFamily: 'LotteMartHappy',
    backgroundColor: '#F29A2E',
    marginLeft:'20px'
}

export default withRouter(InitiateChat);
