import { Button } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { withRouter } from "react-router-dom";
import pizzaImg from "../../pizza.png";
import violationImg from "../../yellow-card.png";
import "./OthersPageProfile.scss";

//import tomcat from '/home/chloe/Pictures/tomcat.png'

const path = "file://../../../../SpringBoot/JMTRoad2/src/main/webapp";
//import photo from "../../../../../SpringBoot/JMTRoad2/src/main/webapp//Final-Project/Nc8m2lGELQKMnRpOh08ivjYVZVH25fpP.png";

class OthersPageProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      isModalOpen: false,
      isWithdrawOpen: false,
      following: false,
      message: null,
      userNo: "",
      userID: "",
      nickname: "",
      phone: "",
      birthday: "",
      gender: "",
      profileImg: "",
      shareLocation: "",
      level: "",
      violation: "",
      selectedImage: [],
      targetNo: "",
      error: "",
      post: false
    };

    this.loadUser = this.loadUser.bind(this);
  }

  // 처음 component가 mount 되면 호출
  componentDidMount() {

    this.loadUser();
  }

  loadUser = async () => {
      let userNo = this.props.location.state.userNo;
      console.log("마이페이지에 userNo 잘 넘어왔는가 .." + userNo);
      await axios({
        method: "get",
        url: `getOne/${userNo}`
      }).then(response => {
        let user = response.data;
        console.log("찍어보긔.." + user.userNo);
        console.log(" 찍긔... " + user.nickname);
        this.setState({
          userNo: user.userNo,
          userID: user.userID,
          nickname: user.nickname,
          phone: user.phone,
          birthday: user.birthday,
          profileImg: user.profileImg,
          gender: user.gender,
          shareLocation: user.shareLocation,
          level: user.level,
          violation: user.violation
        });
      });
  };

  follow = async () => {
    let userNo = window.sessionStorage.getItem("userNo");
    let targetNo = this.props.location.state.userNo;
    let params = new FormData();

    params.append("userNo", userNo);
    params.append("targetNo", targetNo);

    await axios({
      method: "post",
      url: "follow",
      data: params
    }).then(success => {
      const data = success.data;
      console.log("팔로우 성공! " + data);
      this.setState({
        following: true
      });
    });
  };

  unFollow = async () => {
    let userNo = window.sessionStorage.getItem("userNo");
    let targetNo = this.props.location.state.userNo;
    let params = new FormData();

    params.append("userNo", userNo);
    params.append("targetNo", targetNo);

    await axios({
      method: "post",
      url: "unFollow",
      data: params
    }).then(success => {
      const data = success.data;
      console.log("팔로우 취소 성공! " + data);
      this.setState({
        following: false
      });
    });
  };

  render() {
    const { showing, error, post } = this.state;
    const { uploadFile, removeFile, saveFile } = this;
    const imagePath = path + this.state.profileImg;

    return (
      <div id="MyPageProfile">
        <div id="profile">
          {/* 등록한 프사 없을 때는 피자 이미지 출력 */}
          {this.state.profileImg === null ? (
            <img id="pizzaImg" src={pizzaImg} alt="Profile Default" />
          ) : (
            <img id="profileImg" src={imagePath} alt="Profile" />
          )}
          <br />
          {/* violation 22면 옐로카드 이미지 출력하기 */}

          {this.state.violation === 22 ? (
            <img id="violationImg" src={violationImg} alt="Yellow Card" />
          ) : (
            ""
          )}

          <p>{this.state.nickname} </p>
          <p>Level. {this.state.level}</p>
          <br />
          <br />
          <br />
          {this.state.following === true ? (
            <Button
              color="primary"
              onClick={this.unFollow}
              style={{ display: "block", border: "1px solid gray", marginLeft: "40px" }}
            >
              팔로잉
            </Button>
          ) : (
            <Button
              color="primary"
              onClick={this.follow}
              style={{ display: "block", border: "1px solid gray", marginLeft: "20px" }}
            >
              팔로우 하기
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(OthersPageProfile);
