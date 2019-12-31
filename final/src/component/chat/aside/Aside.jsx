import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import CommentIcon from '@material-ui/icons/Comment';
import React, { Component } from 'react';
import userImage from '../../../userImage.png';
import PrivateMessageBox from '../PrivateMessageBox/PrivateMessageBox';
import './Aside.scss';


export default class Aside extends Component {

    constructor(props) {
        super(props);
        this.state =
            {
                openPrivateBox: false,
                roomNotification: this.props.roomNotification,
                username: this.props.username,
                otherUser: ''

            };
    }

    handleClosePrivateBox = () => {
        this.setState({
            openPrivateBox: false
        })
    }

    handleOpenPrivateBox = (e) => {
        let otherUser = e.currentTarget.dataset.value;

        this.setState({
            openPrivateBox: true,
            otherUser: otherUser
        })
    }

    handleSearch = (e) => {

        let currentList = [];
        let newList = [];

        if (e.target.value !== "") {
            currentList = this.props.roomNotification;
            newList = currentList.filter(notification => {
                const lc = notification.sender.split('~')[0].toLowerCase();
                const filter = e.target.value.toLowerCase();
                return lc.includes(filter);
            });
        } else {
            newList = this.props.roomNotification;
        }

        this.setState({
            roomNotification: newList
        });
    }

    render() {
        return (
            <aside>
                {/* <div className="vr"></div> */}
                <TextField
                    id="search full-width"
                    label="Search members"
                    type="search"
                    onChange={this.handleSearch}
                    margin="normal"
                />
                <ul >
                    <List component="nav">
                        {this.state.roomNotification.map((notification, i) =>
                            this.state.username.toLowerCase().trim() === notification.sender.split('~')[0].toLowerCase().trim()
                                ? ""
                                : <li key={i} onClick={this.handleOpenPrivateBox} data-value={notification.sender.split('~')[0].toLowerCase().trim()}>
                                    <div>
                                        <div>
                                            <ListItem
                                                key={i}
                                                role={undefined}
                                                dense
                                                button >
                                                <Avatar alt="User Image" src={userImage} />
                                               
                                                <ListItemText primary={notification.sender.split('~')[0]}
                                                    secondary={notification.status === 'online' ||
                                                        notification.status === 'typing...' ?
                                                        <span className="status green"></span> : <span className="status orange"></span>} />
                                                <ListItemSecondaryAction>
                                                <Tooltip title="Send private message">
                                                    <IconButton aria-label="Private Message">
                                                        <CommentIcon />
                                                    </IconButton>
                                                    </Tooltip>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </div>
                                        <br />

                                    </div>
                                </li>
                        )} </List></ul>

                {this.state.openPrivateBox ?
                    <PrivateMessageBox open={this.state.openPrivateBox} handleClose={this.handleClosePrivateBox}
                        notifications={this.props.roomNotification} user={this.state.username} otherUser={this.state.otherUser} />
                    : ""}

            </aside>
        )
    }
}
