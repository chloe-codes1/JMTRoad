import React, { Component } from 'react';
import './Footer.scss'
import TextField from '@material-ui/core/TextField';
export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state =
            {
                chatMessage: '',
            };
    }

    handleSendMessage = () => {

        this.props.sendMessage('CHAT', this.state.chatMessage)

            this.setState({
              chatMessage: ''
            })
    }

    handleTyping = (event) => {

        this.setState({
            chatMessage: event.target.value,
        });
        this.props.sendMessage('TYPING', event.target.value);

    };

    render() {
        return (
            <div className="footerBox" style = {{display : "block"}}>
                {this.props.privateMessage?
                <div className="footerComponent-private">
                <TextField
                    id="msg"
                    label="이곳에 메시지를 입력하세요"
                    placeholder="Enter를 누르면 전송됩니다"
                    onChange={this.handleTyping}
                    margin="normal"
                    style ={{width: "1000px", marginLeft: "80px"}}
                    value={this.state.chatMessage}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            this.handleSendMessage();
                        }
                    }}
                />
            </div>:<div className="footerComponent">
                <TextField
                    id="msg"
                    label="이곳에 메시지를 입력하세요"
                    placeholder="Enter를 누르면 전송됩니다"
                    onChange={this.handleTyping}
                    margin="normal"
                    style ={{width: "600px"}}
                    value={this.state.chatMessage}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            this.handleSendMessage();
                        }
                    }}
                />
            </div>} 
            </div>
        )
    }
}
