import { Button } from "@material-ui/core";
import React from "react";
import editImg from "../../edit.png";
import pizzaImg from "../../pizza.png";
import violationImg from "../../yellow-card.png";

import ApiService from "../../service/ApiService";
import EditUserComponent from "../user/EditUserComponent";
import MyPageWithdraw from "./MyPageWithdraw";

import "./MyPageProfile.scss";
import ProfilePhotoUpload from "./ProfilePhotoUpload";
import axios from "axios";
//import tomcat from '/home/chloe/Pictures/tomcat.png'

const path = "file://../../../../SpringBoot/JMTRoad2/src/main/webapp";
//import photo from "../../../../../SpringBoot/JMTRoad2/src/main/webapp//Final-Project/Nc8m2lGELQKMnRpOh08ivjYVZVH25fpP.png";

class MyPageProfile extends React.Component {
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

    this.editUser = this.editUser.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  // 처음 component가 mount 되면 호출
  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    ApiService.fetchUserById(window.localStorage.getItem("userNo")).then(
      response => {
        let user = response.data;
        console.log("찍어보긔.." + user.userNo);
        console.log(" 찍긔... " + user.nickname);
        this.setState({
          //  users: response.data.result
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
      }
    );
  };

  editUser = userNo => {
    //userNo를 browser의 localStorage에 임시저장함
    window.localStorage.setItem("userNo", userNo);
    this.props.history.push("/edit-user");
  };

  openModal = () => {
    this.setState({
      isModalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false
    });
  };

  openWithdrawModal = () => {
    this.setState({
      isWithdrawOpen: true
    });
  };

  closeWithdrawModal = () => {
    this.setState({
      isWithdrawOpen: false
    });
  };

  uploadFile = (file, stateKey) => {
    this.setState({
      [stateKey]: this.state[stateKey].concat(file),
      error: "",
      post: false
    });
  };

  saveFile = async () => {
    let flag = true;

    if (this.state.selectedImage.length === 0) flag = false;

    if (flag) {
      let params = new FormData();
      const file = this.state.selectedImage;

      let userNo = this.state.userNo;

      file.forEach(f => {
        params.append("file", f);
      });

      await axios({
        method: "post",
        url: `users/uploadProfileImage/${userNo}`,
        data: params
        // headers : {
        // 'Content-Type': 'multipart/*'
        // }
      })
        .then(success => {
          const data = success.data;
          console.log("잘 업로드 되나 볼까.." + data);
        })
        .catch(error => console.log("에러..." + error));
      this.setState({
        selectedImage: "",
        error: "",
        post: true,
        showing: false
      });
    } else {
      this.setState({
        error: "업로드 할 파일을 선택해주세요."
      });
    }
  };

  follow = async () => {
    let userNo = window.sessionStorage.getItem("userNo");
    let targetNo = window.localStorage.getItem("userNo");
    let params = new FormData();

    params.append("userNo", userNo);
    params.append("targetNo",targetNo);

    await axios ( {
      method: 'post',
      url: 'follow',
      data: params
    })
    .then (success => {
      const data = success.data;
      console.log("팔로우 성공! " +data);
      this.setState({
        following: true
      })
    })
  };

  unFollow = async () => {
    let userNo = window.sessionStorage.getItem("userNo");
    let targetNo = window.localStorage.getItem("userNo");
    let params = new FormData();

    params.append("userNo", userNo);
    params.append("targetNo",targetNo);

    await axios ({
      method: 'post',
      url: 'unFollow',
      data: params
    })
    .then (success => {
      const data = success.data;
      console.log("팔로우 취소 성공! " + data);
      this.setState({
        following: false
      })
    })
  };

  render() {
    const { showing, error, post } = this.state;
    const { uploadFile, removeFile, saveFile } = this;
    const imagePath = path + this.state.profileImg;

    return (
      <div id="MyPageProfile">
        <Button id="edit-button" onClick={this.openModal}>
          <img id="editImg" src={editImg} alt="edit-default" />
        </Button>
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

          <button
            className="profile-button"
            onClick={() => this.setState({ showing: !showing })}
          >
            프로필 사진 변경하기
          </button>
          <div
            className="ProfilePhotoUpload"
            style={{ display: showing ? "block" : "none" }}
          >
            <ProfilePhotoUpload
              onAdd={uploadFile}
              onRemove={removeFile}
              post={post}
              stateKey="selectedImage"
              name="프로필 사진을 추가하세요!"
              maxFile="1"
            />
            <div>{error}</div>
            <button
              onClick={saveFile}
              style={{
                display: "block",
                position: "relative",
                left: "225px",
                top: "12px"
              }}
            >
              {" "}
              Save{" "}
            </button>
          </div>
          <p>{this.state.nickname} </p>
          <p>Level. {this.state.level}</p>
          <br/><br/><br/>
          {this.state.following === true ? (
            <Button color="primary" onClick = {this.unFollow} style={{display: "block", border: "1px solid gray"}}>
              팔로잉
            </Button>
          ) : (
            <Button color="primary" onClick={this.follow} style={{display: "block", border: "1px solid gray"}}>
              팔로우 하기
            </Button>
          )}
        </div>

        {this.state.isModalOpen && (
          //  <ModalPortal>
          <EditUserComponent
            userNo={this.state.userNo}
            userID={this.state.userID}
            nickname={this.state.nickname}
            phone={this.state.phone}
            birthday={this.state.birthday}
            gender={this.state.gender}
            shareLocation={this.state.shareLocation}
            onClose={this.closeModal}
            openWithdraw={this.openWithdrawModal}
            history={this.props.history}
          />
          //  </ModalPortal>
        )}{" "}
        {""}
        {this.state.isWithdrawOpen && (
          <MyPageWithdraw onClose={this.closeWithdrawModal} />
        )}{" "}
        {""}
        {/* map 이용
        
        {this.state.users.map(
          row => (
          <div key={row.userNo}>
            <Button id="edit-button" onClick={this.openModal}>
              <img id="editImg" src={editImg} alt="edit-default" />
            </Button>
            <div id="profile">
              <img id="pizzaImg" src={pizzaImg} alt="Profile-default" />
              <p>{row.nickname} </p>
              <p>Level. {row.level}</p>
            </div>
            {this.state.isModalOpen && (
              // <ModalPortal>
              <EditUserComponent
                userNo={row.userNo}
                userId={row.userId}
                nickname={row.nickname}
                phone={row.phone}
                birthday={row.birthday}
                gender={row.gender}
                shareLocation={row.shareLocation}
                onClose={this.closeModal}
              />
              // </ModalPortal>
            )}{" "} */}
      </div>
    );
  }
}

export default MyPageProfile;
