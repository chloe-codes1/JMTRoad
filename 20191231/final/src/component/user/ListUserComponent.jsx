import Button from '@material-ui/core/Button';
//@material-ui 사용하기
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ApiService from "../../service/ApiService";

const style ={
    display: 'flex',
    justifyContent: 'center'
}

class ListUserComponent extends Component {

    //component가 mount 되기 전에 mount 됨
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null
        }
        this.deleteUser = this.deleteUser.bind(this);
        // this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
        this.toMypage = this.toMypage.bind(this);
    }

    // 처음 component가 mount 되면 호출
    componentDidMount() {
        this.reloadUserList();
    }

    //여기부터 arrow function으로 바꾸고 bind 주석처리함
    reloadUserList = () =>{
        console.log("reloadUserList called")
        ApiService.fetchUsers()
            .then((response) => { //response는 그냥 변수명임 너맘대로 써라
                this.setState({users: response.data})
                console.log("찍혀라.." +response.data);
            });
    }

    //delete 할 때는 filter 사용
    deleteUser = (userNo) => {
        ApiService.deleteUser(userNo)
           .then(response => {
               this.setState({message : 'User deleted successfully.'});
               this.setState({users: this.state.users.filter(user => user.userNo !== userNo)});
           })

    }

    // editUser = (userNo) => {
    //     //userNo를 browser의 localStorage에 임시저장함
    //     window.sessionStorage.setItem("userNo", userNo);
    //     this.props.history.push('/edit-user');
    // }

    addUser = () => {
        //editUser로 임시저장한 userId를 지우기 
        window.sessionStorage.removeItem("userNo");
        this.props.history.push('/add-user');
    }

    toMypage = (userNo) => {
        window.localStorage.setItem("userNo", userNo);
        console.log("userNo 찍혀야한다..!!!! 이곳에!!" + userNo)
        this.props.history.push( {
                                pathname:'/others-page', 
                                state: {userNo: userNo}});
    }

    render() {
        return (
            <div>
               <Typography variant="h4" style={style}>User Details</Typography>
                <Button variant="contained" color="primary" onClick={() => this.addUser()}>
                    Add User
                </Button>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>UserNo</TableCell>
                            <TableCell>UserID</TableCell>
                            <TableCell>NickName</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Birthday</TableCell>
                            <TableCell align="right">Gender</TableCell>
                            <TableCell align="right">Location Info. Share</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map(row => (
                            <TableRow key={row.userNo}>
                                <TableCell component="th" scope="row">
                                   <div> {row.userNo}</div>
                                </TableCell>
                                <TableCell align="right"><div>{row.userID}</div></TableCell>
                                <TableCell align="right"><div>{row.nickname}</div></TableCell>
                                <TableCell align="right"><div>{row.phone}</div></TableCell>
                                <TableCell align="right"><div>{row.birthday}</div></TableCell>
                                <TableCell align="right"><div>{row.gender}</div></TableCell>
                                <TableCell align="right"><div>{row.shareLocation}</div></TableCell>
                                {/* <TableCell align="right" onClick={() => this.editUser(row.userNo)}><CreateIcon /></TableCell> */}
                                <TableCell align="right" onClick={() => this.deleteUser(row.userNo)}><DeleteIcon /></TableCell>
                                <TableCell align="right" onClick={() => this.toMypage(row.userNo)}><EmojiPeopleIcon/> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>      
        </div>
        );
    }
}

export default withRouter(ListUserComponent);