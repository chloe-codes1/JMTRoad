
import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import './MenuAppBar.scss'

import Badge from '@material-ui/core/Badge';
import Notifications from '../../../NotificationsComponent'
import BellIcon from 'react-bell-icon';
import msgImage from '../../../msgImage.png';



var stompClient = null;
export default class MenuAppBar extends React.Component {

  constructor(props) {
    super(props);
    this.state =
      {
        openNotifications: false,
        anchorEl: null,
        privateMessages: [],
        isPrivateMessage: false
      };

    this.connect()
  }

  connect = () => {

    if (this.props.username) {

      const Stomp = require('stompjs')

      var SockJS = require('sockjs-client')

      SockJS = new SockJS('/ws')

      stompClient = Stomp.over(SockJS);

      stompClient.connect({}, this.onConnected, this.onError);

      this.setState({
        username: this.props.username,
      })
    }
  }

  onConnected = () => {

    // Subscribing to the private topic
    stompClient.subscribe('/user/' + this.props.username.toString().toLowerCase() + '/reply', this.onMessageReceived);
    // Registering user to server as a private chat user
    stompClient.send('/app/addPrivateUser', {}, JSON.stringify({ sender: this.props.username, type: 'JOIN' }))
  }

  sendMessage = (type, value) => {

    this.setState({
      bellRing: true
    })

    if (stompClient) {
      var chatMessage = {
        sender: this.props.user,
        content: type === 'TYPING' ? value : value,
        type: type

      };
      // send private message
      stompClient.send('/app/sendPrivateMessage', {}, JSON.stringify(chatMessage));

    }
  }

  onMessageReceived = (payload) => {

    var message = JSON.parse(payload.body);

    if (message.type === 'CHAT') {
      this.state.privateMessages.push({
        message: message.content,
        sender: message.sender,
        dateTime: message.dateTime
      })
      this.setState({
        privateMessages: this.state.privateMessages,
      })
    }
  }

  handleOpenNotifications = () => {
    this.setState({
      openNotifications: true,
      isPrivateMessage: false
    })
  }

  handleOpenPrivateMessages = () => {
    this.setState({
      openNotifications: true,
      isPrivateMessage: true
    })
  }

  handleCloseNotifications = () => {
    this.setState({
      openNotifications: false
    })
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogOut = () => {
    window.location.reload();
  };

  render() {

    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div >
        <AppBar position="static" style={{ background: 'black' }}>
          <Toolbar>
            <IconButton className="" color="inherit" aria-label="Menu">
              <MenuIcon onClick={this.handleClick} />
            </IconButton>
            <Typography variant="title" color="inherit" className="">
              {this.props.username} <span> </span> <span className="status green"></span>
            </Typography>
            {auth && (
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            )}
          </Toolbar>
          <div>

            <Badge className="badge" badgeContent={this.props.roomNotification.length} color="secondary" onClick={this.handleOpenNotifications}>
              <a href="#"> <BellIcon active={this.props.bellRing} animate={this.props.bellRing} color="white" width="25px" /></a>
            </Badge>
            <Badge className="badgeMessage" badgeContent={this.state.privateMessages != null ? this.state.privateMessages.length : 0} color="secondary" onClick={this.handleOpenPrivateMessages}>
              <a href="#"><img src={msgImage} alt="Private messages" className="avatar" style={{ width: '48px', height: '46px' }} /></a>
            </Badge>

            <Notifications open={this.state.openNotifications} handleClose={this.handleCloseNotifications}
              notifications={this.props.roomNotification} roomMessages={this.props.broadcastMessage}
              privateMessages={this.state.privateMessages} isPrivateMessage={this.state.isPrivateMessage} />
          </div>
        </AppBar>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Broadcast </MenuItem>
          <MenuItem onClick={this.handleClose}>Starred </MenuItem>
          <MenuItem onClick={this.handleLogOut}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}



