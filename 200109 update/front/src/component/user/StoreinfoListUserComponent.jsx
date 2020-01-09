import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

class StoreinfoListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            storeinfo: [],
            message: null
        }
        this.StoreinfodeleteUser = this.StoreinfodeleteUser.bind(this);
        this.StoreinfoaddUser = this.StoreinfoaddUser.bind(this);
        this.StoreinforeloadUserList = this.StoreinforeloadUserList.bind(this);
    }

    componentDidMount() {
        this.StoreinforeloadUserList();
    }

    StoreinforeloadUserList() {
        ApiService.fetchStoreinfo()
            .then((res) => {
                this.setState({users: res.data.result})
            });
    }

    StoreinfodeleteUser(ownerNo) {
        ApiService.StoreinfodeleteUser(ownerNo)
           .then(res => {
               this.setState({message : 'User deleted successfully.'});
               this.setState({users: this.state.users.filter(user => user.ownerNo !== ownerNo)});
           })
    }

    StoreinfoaddUser() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/Storeinfo-add');
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={() => this.StoreinfoaddUser()}>Add StoreOwner</Button>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>UserName</TableCell>
                            <TableCell align="right">음식점이름</TableCell>
                            <TableCell align="right">사업자등록번호</TableCell>
                            <TableCell align="right">전화번호</TableCell>
                            <TableCell align="right">주소</TableCell>
                            <TableCell align="right">운영시간</TableCell>
                            <TableCell align="right">음식메뉴</TableCell>
                            <TableCell align="right">음식메뉴사진</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.storeinfo.map(row => (
                            <TableRow key={row.ownerNo}>
                                <TableCell component="th" scope="row">
                                    {row.ownerNo}
                                </TableCell>
                                <TableCell align="right">{row.storeName}</TableCell>
                                <TableCell align="right">{row.BRNo}</TableCell>
                                <TableCell align="right">{row.tel}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.openingHours}</TableCell>
                                <TableCell align="right">{row.cusine}</TableCell>
                                <TableCell align="right">{row.menuImg}</TableCell>
                                <TableCell align="right">{row.file}</TableCell>
                                <TableCell align="right" onClick={() => this.StoreinfoeditUser(row.ownerNo)}><CreateIcon /></TableCell>
                                <TableCell align="right" onClick={() => this.StoreinfodeleteUser(row.ownerNo)}><DeleteIcon /></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        );
    }

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default StoreinfoListUserComponent;