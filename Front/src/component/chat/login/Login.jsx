import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
export default class Login extends Component
{
    constructor(props) {
        super(props);
        this.state =
          {
            username: ''
          };
      }

      shouldComponentUpdate(nextProps, nextState) {
        return nextProps.username !== this.props.username;
      }

    handleUserNameChange = (event) => {
        this.setState({
          username: event.target.value,
        });
      };

    //접속
    handleConnectPublicly = () => {
        this.props.connect(this.state.username, false)
          //-> 부모인 ChatMessageBox의 connect()호출
      }
    
    render(){
        return(
            <div className="component-Login">
             <TextField
                id="user"
                label="Type your username"
                placeholder="Username"
                onChange={this.handleUserNameChange}
                margin="normal"
              />
              <br />
              <Button variant="contained" color="primary" onClick={this.handleConnectPublicly} >
                Start Chatting
             </Button>

            </div>
        )
    }
}
