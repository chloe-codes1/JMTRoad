import React from "react";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./FormMail.scss";
import close from '../../Img/close.png';

class FormMail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  sendMail = async () => {
    const title = this.state.title;
    const content = this.state.content;
    const userID = window.sessionStorage.getItem("email");

    let params = new FormData();
    params.append("title", title);
    params.append("content", content);
    params.append("userID", userID);

    await axios({
      method: "post",
      url: "sendMail",
      data: params
    })
      .then(success => {
        const data = success.data;
        console.log("폼메일 발송 성공! => " + data);
        this.props.onClose();
      })
      .catch(error => console.log(" 에러다..." + error));
    this.setState({
      title: "",
      content: ""
    });
  };

  render() {
    return (
      <div className="MailModal">
        <div className="mail-content" style={{ textAlign: "center" , borderRadius:'4px'}}>
          <span onClick={this.props.onClose} style={{ float: "right" }}>
            {" "}<img src={close} id="closeimg"/>{" "}
          </span>
          <p
            style={{
              textAlign: "center",
              fontSize: "20pt",
              margin: "10px",
              letterSpacing: "2px",
              marginTop: "10px",
              color: "#7F46A6",
              fontFamily: "Roboto",
              fontWeight: "bold"
            }}
          >
            Q&A
          </p>
          <p style={style}>여러분의 소중한 의견을 보내주세요!</p>
          <p style={{ fontSize: "11pt", margin: "10px", fontFamily:"Handon3gyeopsal300g" }}>
            {" "}
            사이트를 이용하시면서 궁금한 점이 있으시면 답변해드리고, <br />
            불편하거나 아쉬운점을 알려주시면 개선될 수 있도록 노력하겠습니다!
          </p>
          <p style={{ fontSize: "10pt", marginTop: "10px", marginBottom:"20px", color: "#495057" }}>
            {" "}
            보내주신 의견은 3일 내로 등록된 이메일로 답변 드리겠습니다!
          </p>
          <span> 제목 : </span>
          <TextField
            type="text"
            placeholder="title"
            margin="normal"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
            style={{ marginBottom: "10px", width: "300px"}}
          />
          <br />
         <span> 내용 : </span>
          <TextField
            rows={6}
            rowsMax={20}
            multiline={true}
            type="text"
            placeholder="content"
            margin="normal"
            name="content"
            value={this.state.content}
            onChange={this.onChange}
            style = {{width: "300px"}}
          />
          <div style={{display: "block"}}>
            <Button variant="contained" id="sendbtn" onClick={this.sendMail}>
              Send
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const style = {
  display: "flex",
  justifyContent: "center",
  fontSize: "16pt",
  fontFamily: "LotteMartHappy"
};

export default FormMail;
