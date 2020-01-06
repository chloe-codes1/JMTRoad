import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import React from "react";
import { withRouter } from "react-router-dom";

class MyPageWithdraw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNo: "",
      isMounted: false
    };
  }

  close = () =>{
    this.props.onClose();
    this.props.history.push("/mypage");
  }


  componentDidMount() {
    this.setState = {
      isMounted: true
    };
  }

  UNSAFE_componentWillMount() {
    this.setState = {
      isMounted: false
    };
  }

  deleteUser = async () => {
    const userNo = window.sessionStorage.getItem("userNo");
    await axios({
      method: "post",
      url: `users/withdrawUser/${userNo}`
    })
      .then(success => {
        const data = success.data;
        console.log("회원 탈퇴 (업데이트) 성공 ! " + data);

        alert("정상적으로 탈퇴 처리 되었습니다.");
        window.sessionStorage.clear(); // -> 세션 끊기
        window.location.reload();
      })
      .catch(error => console.log("에러났다..." + error));
  };

  render() {
    const { deleteUser } = this;

    return (
      <div className="MyModal">
        <div className="content">
          <button onClick={this.close} style={{ float: "right" }}>
            {" "}
            X{" "}
          </button>
          <Typography variant="h5" style={style}>
            {" "}
            다시 한번 고민해주세요! &nbsp;{" "}
          </Typography>
          <br/>
          <Typography style={{fontSize: "13pt" }}>
            정말 떠나실건가요? 마음이 너무 아파요 ㅠ_ㅠ <br />
            <br />
            여러분의 맛집 탐방을 응원하기 위한 최고의 서비스가 되도록
            <br />
            맛집의 민족은 지속적으로 노력중입니다. <br />
            불편한점은 support@foodies.com으로 알려주시면 <br />
            개선하고, 반영하겠습니다. <br />
            <br />
            맛집의 민족을 더 이상 사용하과 싶지 않다면, <br />
            아래 '탈퇴하기'를 클릭해주세요. <br /><br/>
          </Typography>
          <Button variant="contained" color="primary" onClick={deleteUser}>
            탈퇴하기
          </Button>
        </div>
      </div>
    );
  }
}

const style = {
  display: "flex",
  justifyContent: "center"
};

export default withRouter(MyPageWithdraw);
