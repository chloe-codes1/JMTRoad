import React from "react";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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

    let params = new FormData();
    params.append('title', title);
    params.append('content', content);

    await axios({
        method: 'post',
        url: 'sendMail',
        data: params
    }).then (success => {
        const data = success.data;
        console.log ("폼메일 발송 성공! => " + data);
        this.props.onClose();
    }).catch (
        error => console.log(" 에러다..." + error)
    );
    this.setState ({
        title: '',
        content: ''
    })
  }

  render() {
    return (
      <div className="MyModal">
          <div className="content">
          <button onClick={this.props.onClose} style ={{float: "right"}}> X </button>
        <Typography variant="h4" style={style}>
          의견을 보내주세요!
          
        </Typography>
        제목 :
        <TextField
          type="text"
          placeholder="title"
          margin="normal"
          name="title"
          value={this.state.title}
          onChange={this.onChange}
        />
        <br />
        내용 :
        <TextField
          type="text"
          placeholder="content"
          margin="normal"
          name="content"
          value={this.state.content}
          onChange={this.onChange}
        />
        <Button variant="contained" color="primary" onClick={this.sendMail}>
          Send
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

export default FormMail;
