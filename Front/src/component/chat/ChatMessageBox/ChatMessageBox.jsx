import Paper from "@material-ui/core/Paper";
import React, { Component } from "react";
import Aside from "../aside/Aside";
import Footer from "../footer/Footer";
import Login from "../login/Login";
import Menu from "../menu-app-bar/MenuAppBar";
// Default user image
import userImage from "../../../userImage.png";
import "./ChatMessageBox.scss";



var stompClient = null;
class ChatMessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "", // -> login 에서 받아오기
      channelConnected: false, 
      chatMessage: "",
      roomNotification: [],
      broadcastMessage: [],
      error: "",
      bottom: false,
      curTime: "", // -> current time
      openNotifications: false,
      bellRing: false
    };
  }

  connect = userName => {
    if (userName) {
      const Stomp = require("stompjs");

      var SockJS = require("sockjs-client");

      SockJS = new SockJS("/ws");

      stompClient = Stomp.over(SockJS);

      stompClient.connect({}, this.onConnected, this.onError);
                      //header, connectCallback, errorCallback      
      this.setState({
        username: userName
      });
    }
  };

  onConnected = () => {
    this.setState({
      channelConnected: true
    });

    // Subscribing to the public topic
    stompClient.subscribe("/topic/pubic", this.onMessageReceived);

    // Registering user to server as a public chat user
    stompClient.send(
      "/app/addUser",
      {},
      JSON.stringify({ sender: this.state.username, type: "JOIN" })
    );
  };

  sendMessage = (type, value) => {
    if (stompClient) {
      var chatMessage = {
        sender: this.state.username,
        content: type === "TYPING" ? value : value,
        type: type
      };
      // send public message
      stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));
    }
  };

  //메세지 수신 시 
  onMessageReceived = payload => {
    var message = JSON.parse(payload.body);

    if (message.type === "JOIN") {
      this.state.roomNotification.push({
        sender: message.sender + " 님이 로그인 하셨습니다.",
        status: "online",
        dateTime: message.dateTime
      });
      this.setState({
        roomNotification: this.state.roomNotification,
        bellRing: true
      });
    } else if (message.type === "LEAVE") {
      this.state.roomNotification.map((notification, i) => {
        if (notification.sender === message.sender + " 님이 로그인 하셨습니다.") {
          notification.status = "offline";
          notification.sender = message.sender + " 님이 로그아웃 하셨습니다.";
          notification.dateTime = message.dateTime;
        }
      });
      this.setState({
        roomNotification: this.state.roomNotification,
        bellRing: true
      });
    } else if (message.type === "TYPING") {
      this.state.roomNotification.map((notification, i) => {
        if (notification.sender === message.sender + " 님이 로그인 하셨습니다.") {
          if (message.content) notification.status = "typing...";
          else notification.status = "online";
        }
      });
      this.setState({
        roomNotification: this.state.roomNotification
      });
    } else if (message.type === "CHAT") {
      this.state.roomNotification.map((notification, i) => {
        if (notification.sender === message.sender + " 님이 로그인 하셨습니다.") {
          notification.status = "online";
        }
      });
      this.state.broadcastMessage.push({
        message: message.content,
        sender: message.sender,
        dateTime: message.dateTime
      });
      this.setState({
        broadcastMessage: this.state.broadcastMessage
      });
    } else {
      // do nothing...
    }
  };

  onError = error => {
    this.setState({
      error:
        "Could not connect you to the Chat Room Server. Please refresh this page and try again!"
    });
  };

  //스크롤 바 조정
  scrollToBottom = () => {
    var object = this.refs.messageBox;
    if (object) object.scrollTop = object.scrollHeight;
  };

  componentDidUpdate() {
    if (this.state.error) {
      throw new Error("Unable to connect to chat room server.");
    } else {
      this.scrollToBottom();
    }
  }

  componentDidMount() {
    this.setState({
      curTime: new Date().toLocaleString()
    });

    this.timerID = setInterval(
      () =>
        this.state.bellRing
          ? this.setState({
              bellRing: false
            })
          : "",
      1000
    );
  }
  render() {
    return (
      <div>
        
        {/* 접속 되어 있으면 render */}
        {this.state.channelConnected ? (
          <div>
            <Menu
              roomNotification={this.state.roomNotification}
              bellRing={this.state.bellRing}
              openNotifications={this.state.openNotifications}
              username={this.state.username}
              broadcastMessage={this.state.broadcastMessage}
            />
            {/* 왼쪽 User 목록 출력 창 */}
            <Paper elevation={5}>
              <Aside
                roomNotification={this.state.roomNotification}
                openNotifications={this.state.openNotifications}
                username={this.state.username}
                broadcastMessage={this.state.broadcastMessage}
              />
            </Paper>

            {/* Chatting 내용 출력 창 */}
            <Paper elevation={5}>
              <ul id="chat" ref="messageBox">
                {this.state.broadcastMessage.map((msg, i) =>
                  this.state.username === msg.sender ? (
                    <li className="you" key={i}>
                      <div className="entity">
                        <h2>
                          <img
                            src={userImage}
                            alt="Default-User"
                            className="avatar"
                          />
                          <span> </span>
                          <span className="sender"> {msg.sender} ~ (You)</span>
                        </h2>
                        <span> </span>
                      </div>
                      <div className="triangle"></div>
                      <div className="message">{msg.message}</div>
                      <div>
                        <h3>{msg.dateTime}</h3>
                      </div>
                    </li>
                  ) : (
                    <li className="others">
                      <div className="entity">
                        <span> </span>
                        <img
                          src={userImage}
                          alt="Default-User"
                          className="avatar"
                        />
                        <span> </span>
                        <span className="sender">{msg.sender}</span>
                      </div>
                      <div className="triangle"></div>
                      <div className="message">{msg.message}</div>
                      <div>
                        <h3>{msg.dateTime}</h3>
                      </div>
                    </li>
                  )
                )}
              </ul>

              <Footer sendMessage={this.sendMessage} privateMessage={false} />
            </Paper>
          </div>
        ) : ( /* 접속중 아니면 로그인창 이동 */
          <Login connect={this.connect} />
        )}
      </div>
    );
  }
}

export default ChatMessageBox;
