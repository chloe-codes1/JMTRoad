import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import axios from "axios";
import React from "react";
import "./MyPageListData.scss";

class MyPageListData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      whichMethod: "myProjectList",
      whichView: "project",
      shouldCallMethod: false
    };
  }

  componentDidMount() {
    this.myProjectList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data)
      this.setState({
        whichMethod: this.props.data,
        shouldCallMethod: true
      });

    if (this.state.shouldCallMethod === true) {
      if (this.state.whichMethod === "myProjectList") {
        this.myProjectList();
        this.setState({
          whichView: "project"
        });
      } else if (this.state.whichMethod === "savedProjectList") {
        this.savedProjectList();
        this.setState({
          whichView: "project"
        });
      } else if (this.state.whichMethod === "likedProjectList") {
        this.likedProjectList();
        this.setState({
          whichView: "project"
        });
      } else if (this.state.whichMethod === "likedStoreList") {
        this.likedStoreList();
        this.setState({
          whichView: "store"
        });
      } else if (this.state.whichMethod === "followingList") {
        this.followingList();
        this.setState({
          whichView: "user"
        });
      } else if (this.state.whichMethod === "followerList") {
        this.followerList();
        this.setState({
          whichView: "user"
        });
      } else {
        console.log("에러....흑흑");
      }
      this.setState({
        shouldCallMethod: false
      });
    } else {
      console.log("호출 할 필요 노우");
    }
  }

  // 내가 만든 프로젝트 목록 출력
  myProjectList = async () => {
    const userNo = window.sessionStorage.getItem("userNo");
    await axios({
      method: "get",
      url: `myProjectList/${userNo}`
    })
      .then(success => {
        const data = success.data;
        console.log("내가 만든 프로젝트 출력 성고오옹 => " + data);
        this.setState({ list: data });
      })
      .catch(error => console.log("에러..흑흑.. => " + error));
  };

  // 저장한 프로젝트 목록 출력
  savedProjectList = async () => {
    const userNo = window.localStorage.getItem("userNo");
    await axios({
      method: "get",
      url: `savedProjectList/${userNo}`
    })
      .then(success => {
        const data = success.data;
        console.log("저장한 프로젝트 출력 성고오옹 => " + data);
        this.setState({ list: data });
      })
      .catch(error => console.log("에러..흑흑.. => " + error));
  };

  // 좋아요한 프로젝트 목록 출력
  likedProjectList = async () => {
    const userNo = window.sessionStorage.getItem("userNo");
    await axios({
      method: "get",
      url: `likedProjectList/${userNo}`
    })
      .then(success => {
        const data = success.data;
        console.log("좋아요한 프로젝트 출력 성고오옹 => " + data);
        this.setState({ list: data });
      })
      .catch(error => console.log("에러..흑흑.. => " + error));
  };

  // 좋아요한 음식점 목록 출력
  likedStoreList = async () => {
    const userNo = window.sessionStorage.getItem("userNo");
    await axios({
      method: "get",
      url: `likedStoreList/${userNo}`
    })
      .then(success => {
        const data = success.data;
        console.log("좋아요한 음식점 출력 성고오옹 => " + data);
        this.setState({ list: data });
      })
      .catch(error => console.log("에러..흑흑.. => " + error));
  };

  // 내가 팔로우 하는 유저 목록 출력
  followingList = async () => {
    const userNo = window.sessionStorage.getItem("userNo");
    await axios({
      method: "get",
      url: `followingList/${userNo}`
    })
      .then(success => {
        const data = success.data;
        console.log("팔로우 리스트 출력 성고오옹 => " + data);
        this.setState({ list: data });
      })
      .catch(error => console.log("에러..흑흑.. => " + error));
  };

  // 나를 팔로우 하는 유저 목록 출력
  followerList = async () => {
    const userNo = window.sessionStorage.getItem("userNo");
    await axios({
      method: "get",
      url: `followerList/${userNo}`
    })
      .then(success => {
        const data = success.data;
        console.log("팔로워 리스트 출력 성고오옹 => " + data);
        this.setState({ list: data });
      })
      .catch(error => console.log("에러..흑흑.. => " + error));
  };

  render() {
    const { whichView, list } = this.state;

    return (
      <div>
        {list.map((row, index) => (
          <div className="MyPageListData" key={index} style={{display: "inline"}}>
            {/* <img
              src={burgerImg}
              alt="default"
              style={{ width: "100px", height: "100px" }}
            /> */}

            {whichView === "project" ? (
              <Table key={row.projectNo} style={{width: "100%" , display: "inline"}}>
                <colgroup>
                  <col style={{ width: "200px" }} />
                  <col style={{ width: "700px" }} />
                </colgroup>
                <TableBody>
                  <TableRow>
                    <TableCell>프로젝트명</TableCell>
                    <TableCell>{row.title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>프로젝트 공개 여부</TableCell>
                    <TableCell>
                      {row.open === true ? "공개" : "비공개"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>작성일</TableCell>
                    <TableCell>{row.regDate}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              ""
            )}

            {whichView === "store" ? (
              <Table key={row.ownerNo} style={{width: "800px"}}>
                <colgroup>
                  <col style={{ width: "200px" }} />
                  <col style={{ width: "600px" }} />
                </colgroup>
                <TableBody>
                  <TableRow>
                    <TableCell>음식점 이름 </TableCell>
                    <TableCell>{row.storeName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>음식 종류</TableCell>
                    <TableCell>{row.cuisine}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              ""
            )}

            {whichView === "user" ? (
              <Table key={row.userNo} style={{width: "800px"}}>
                <colgroup>
                  <col style={{ width: "200px" }} />
                  <col style={{ width: "600px" }} />
                </colgroup>
                <TableBody>
                  <TableRow>
                    <TableCell>닉네임 </TableCell>
                    <TableCell>{row.nickname}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>나이</TableCell>
                    <TableCell>{row.age}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default MyPageListData;
