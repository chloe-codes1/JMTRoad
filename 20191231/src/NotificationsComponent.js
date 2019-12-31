import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import userImage from './userImage.png';

export default class NotificationsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open
        };
    };

    render() {

        return <div>

            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="responsive-dialog-title"
                onEscapeKeyDown={this.props.handleClose}
                autoScrollBodyContent={true}>

                {this.props.isPrivateMessage ?
                    <DialogTitle id="responsive-dialog-title">{"Private Messages"}</DialogTitle> :
                    <DialogTitle id="responsive-dialog-title">{"Group Notifications"}</DialogTitle>}
                <DialogContent>
                    {!this.props.isPrivateMessage ?
                        //Show user's notifications
                        <DialogContentText>
                            <div>
                                <h3>Total messages in the room: {this.props.roomMessages.length}</h3>
                            </div>
                            <br />
                            {this.props.notifications.map((notification, i) =>

                                [<div key={i}>

                                    <div> <img src={userImage} alt="Default-User" id="userImage" /></div>
                                    <div id="usernameDialogNotifications">
                                        <h5>{notification.sender.split('~')[0]}</h5>
                                    </div>
                                    <br />
                                    <div>
                                        <h6 >{notification.sender.split('~')[1]} at {notification.dateTime}</h6>
                                    </div>

                                </div>,

                                <hr />
                                ]
                            )}

                        </DialogContentText>
                        :
                        //Show user's private messages
                        <DialogContentText>
                            <br />
                            {this.props.privateMessages.map((msg, i) =>
                                <div><h3>{msg.sender}</h3>{msg.message}
                                </div>
                            )}
                        </DialogContentText>
                    }
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Close
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    }
}