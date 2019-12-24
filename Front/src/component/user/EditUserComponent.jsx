import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
//@material-ui 사용하기
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React, { Component } from "react";
import { Switch } from "react-router-dom";
import ApiService from "../../service/ApiService";
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
      level:"",
      userStatus:"",
      violation:"",
      reasonCode:""
    };
    this.saveUser = this.saveUser.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  UNSAFE_componentWillMount() {
    window.localStorage.setItem("userNo", this.props.userNo);
  }

  //Mount 될 때 DB에 저장되어 있는 user 정보를 userNo를 기준으로 fetch 하기 위해
  //DB API (ApiService.js 호출)
  //  -> LocalStorage에 저장되어 있는 user 정보와 동일함!
  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    ApiService.fetchUserById(window.localStorage.getItem("userNo")).then(
      response => {
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
      }
    );
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  saveUser = e => {
    e.preventDefault();
    let user = {
      userNo: this.state.userNo,
      userID: this.state.userID,
      nickname: this.state.nickname,
      phone: this.state.phone,
      birthday: this.state.birthday,
      gender: this.state.gender,
      shareLocation: this.state.shareLocation,
      level:this.state.level,
      userStatus:this.state.userStatus,
      violation:this.state.violation,
      reasonCode: this.state.reasonCode
    };

    ApiService.editUser(user).then(response => {
      this.setState({ message: "User updated successfully." });
      this.props.onClose();
      //this.props.history.push("/mypage");
    });
  };

  withdrawUser = () => {
    this.props.onClose();
    this.props.openWithdraw();
  }

  render() {
    return (
      <div className="MyModal">
        <div className="content">
          <Typography variant="h4" style={style}>
            회원 정보 수정
            <button onClick={this.props.onClose}> 닫기 </button>
          </Typography>
          <br />

          <form style={formContainer}>
            {/* 아이디 (이메일) 은 수정 못하겠지?? 연동회원이니까?? 일단 주석*/}

           아이디 :
            <TextField
              type="text"
              placeholder="userID"
              margin="normal"
              name="userID"
              value={this.state.userID}
              onChange={this.onChange}
            /> 
            <br/> 
            닉네임 :
            <TextField
              type="text"
              placeholder="nickname"
              margin="normal"
              name="nickname"
              value={this.state.nickname}
              onChange={this.onChange}
            />
            <br />
            연락처 :
            <TextField
              type="text"
              placeholder="phone"
              margin="normal"
              name="phone"
              value={this.state.phone}
              onChange={this.onChange}
            />
            <br />
            생년월일 :
            <TextField
              type="text"
              placeholder="birthday"
              margin="normal"
              name="birthday"
              value={this.state.birthday}
              onChange={this.onChange}
            />
            {/* <DatePicker placeholder="birthday"  margin="normal" name="birthday" selected={this.state.birthday} onChange={this.onChange}/> */}
            <br />
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
            <Button onClick={this.withdrawUser}>회원 탈퇴</Button>
            <br />
            <Button variant="contained" color="primary" onClick={this.saveUser}>
              Save
            </Button>
            <Switch>
            </Switch> 
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
