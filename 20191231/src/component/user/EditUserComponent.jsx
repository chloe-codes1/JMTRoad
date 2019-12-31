// import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
//@material-ui 사용하기
import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";
import axios from "axios";
import clsx from "clsx";
import React, { Component } from "react";
import { Switch } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import "./EditUser.scss";

class EditUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      userNo: "",
      nickname: "",
      phone: "",
      birthday: "",
      gender: "",
      shareLocation: "",
      level: "",
      userStatus: "",
      violation: "",
      reasonCode: ""
    };
    this.updateUser = this.updateUser.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  UNSAFE_componentWillMount() {
    window.sessionStorage.setItem("userNo", this.props.userNo);
  }

  //Mount 될 때 DB에 저장되어 있는 user 정보를 userNo를 기준으로 fetch 하기 위해
  //DB API (ApiService.js 호출)
  //  -> LocalStorage에 저장되어 있는 user 정보와 동일함!
  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    let userID = window.sessionStorage.getItem("email");
    await axios({
      method: "get",
      url: `showUser/${userID}`
    }).then(response => {
      let user = response.data;
      this.setState({
        userNo: user.userNo,
        userID: user.userID,
        nickname: user.nickname,
        phone: user.phone,
        birthday: user.birthday,
        gender: user.gender,
        shareLocation: user.shareLocation,
        level: user.level,
        userStatus: user.userStatus,
        violation: user.violation,
        reasonCode: user.reasonCode
      });
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  updateUser = async e => {
    e.preventDefault();
    let user = {
      userNo: this.state.userNo,
      userID: this.state.userID,
      nickname: this.state.nickname,
      phone: this.state.phone,
      birthday: this.state.birthday,
      gender: this.state.gender,
      shareLocation: this.state.shareLocation,
      level: this.state.level,
      userStatus: this.state.userStatus,
      violation: this.state.violation,
      reasonCode: this.state.reasonCode
    };

    await axios({
      method: "post",
      url: "users/update",
      data: user
    })
      .then(success => {
        const data = success.data;
        console.log("회원정보 Update 성공 " + data);
        this.props.onClose();
        window.location.reload();
      })
      .catch(error => console.log("에러다..." + error));
  };

  withdrawUser = () => {
    this.props.onClose();
    this.props.openWithdraw();
  };

  render() {
    return (
      <div className="MyModal">
        <div className="content">
          {/*  <Typography variant="h4" style={style}> */}
          <Row className="justify-content-end">
            <Button onClick={this.props.onClose} variant="secondary">
              X
            </Button>
          </Row>
          <Row>
            <Col>회원 정보 수정</Col>
          </Row>
          {/*     </Typography> */}
          <br />

          <form style={formContainer}>
            {/* 아이디 (이메일) 은 수정 못하겠지?? 연동회원이니까?? 일단 주석*/}
           <span className="edit-options"> 아이디 :</span>
            <TextField
              type="text"
              placeholder="userID"
              margin="normal"
              name="userID"
              value={this.state.userID}
              onChange={this.onChange}
              InputProps={{
                readOnly: true //-> 아이디 수정 못하게 바꿈
              }}
            />
            <br/>
            <span className="edit-options"> 닉네임 :</span>
            <TextField
              type="text"
              placeholder="nickname"
              margin="normal"
              name="nickname"
              value={this.state.nickname || ""}
              onChange={this.onChange}
            />
            <br />
            <span className="edit-options"> 연락처 :</span>
            <TextField
              type="text"
              placeholder="phone"
              margin="normal"
              name="phone"
              value={this.state.phone}
              onChange={this.onChange}
            />
            <br />
            <span className="edit-options"> 생년월일 :</span>
            <TextField
              type="text"
              placeholder="birthday"
              margin="normal"
              name="birthday"
              value={this.state.birthday}
              onChange={this.onChange}
            />
            {/* <DatePicker placeholder="birthday"  margin="normal" name="birthday" selected={this.state.birthday} onChange={this.onChange}/> */}
            <br /> <br/>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                defaultValue="41"
                margin="normal"
                name="gender"
                value={this.state.gender}
                onChange={this.onChange}
              >
                <FormControlLabel
                  value="41"
                  control={<StyledRadio />}
                  label="Female"
                />
                <FormControlLabel
                  value="42"
                  control={<StyledRadio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">Share Your Location </FormLabel>
              <RadioGroup
                defaultValue="true"
                margin="normal"
                name="shareLocation"
                value={this.state.shareLocation}
                onChange={this.onChange}
              >
                <FormControlLabel
                  value="true"
                  control={<StyledRadio />}
                  label="Agree"
                />
                <FormControlLabel
                  value="false"
                  control={<StyledRadio />}
                  label="Disagree"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <br />
            <Button onClick={this.withdrawUser} variant="light">회원 탈퇴</Button>
            <br />
            <Button
              variant="secondary"
              color="primary"
              onClick={this.updateUser}
            >
              Save
            </Button>
            <Switch></Switch>
          </form>
        </div>
      </div>
    );
  }
}
const style = {
  display: "flex",
  justifyContent: "center"
};

const formContainer = {
  display: "inline-block"
};

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5"
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)"
    }
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""'
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3"
    }
  }
});

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default EditUserComponent;
