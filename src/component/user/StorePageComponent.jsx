import React, { Component, Fragment } from 'react'
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

import reservemodal from '../Storebtn/ReservationModal';
import waitmodal from '../Storebtn/WaitingModal';


import snowman from '../../Img/snowman.png';
import menuinfo from '../../Img/menuinfo.png';
import KakaoMap from '../KakaoMap';

import ReviewRouterComponent from "../StoreReview/ReviewRouterComponent";


class StorePageComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            storeinfo: [],
            reviews: [],
            message: null
        }


        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
        this.deleteReview = this.deleteReview.bind(this);

        this.addReview = this.addReview.bind(this);
        this.reloadReviewList = this.reloadReviewList.bind(this);

    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
        ApiService.fetchUsers()
            .then((res) => {
                this.setState({ users: res.data.result })
            });
    }

    deleteUser(ownerNo) {
        ApiService.deleteUser(ownerNo)
            .then(res => {
                this.setState({ message: 'User deleted successfully.' });
                this.setState({ users: this.state.users.filter(user => user.ownerNo !== ownerNo) });
            })
    }

    editUser(ownerNo) {
        window.localStorage.setItem("userId", ownerNo);
        this.props.history.push('/edit-user');
    }

    addUser() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-user');
    }

    reloadReviewList() {
        ApiService.fetchUsers().then((res) => {
            this.setState({ reviews: res.data.result })
        });
    }

    deleteReview(storereviewNo) {
        ApiService.deleteReview(storereviewNo)
            .then(res => {
                this.setState({ message: 'Review deleted successfully.' });
                this.setState({ reviews: this.state.reviews.filter(reviews => reviews.storereviewNo !== storereviewNo) });
            })
    }

    addReview() {
        window.localStorage.removeItem("storereviewNo");
        this.props.history.push('/reviews');
    }

    render() {
        return (
            <Fragment>
                <div>
                    <h5>음식점이름 json에서 받아오는곳</h5>
                    <h5>음식점주소 json에서 받아오는곳</h5>
                </div>
                

                
                <div id="storeimg">
                    <p>[ 음식점메뉴사진 ]</p>
                    <span><img src={snowman} style={{ width: "200px", height: "200px", marginRight: "30px" }} className="img_snowman" /></span>
                    <span><img src={snowman} style={{ width: "200px", height: "200px", marginRight: "30px" }} className="img_snowman" /></span>
                    <span><img src={snowman} style={{ width: "200px", height: "200px", marginRight: "30px" }} className="img_snowman" /></span>
                </div>
                <div id="map" style={{ width: "500px", float: "right" }}>
                    <p style={{ float: "right" }}>[ 음식점지도부분 ]</p>
                    <KakaoMap
                        /*apiKey="725b06bbcc898a0aab70b933a5386549"*/
                        apiKey="30e0c0cb66c1d4abaa50bf716ecb633e"
                        lat={33.450701}
                        lng={126.570667}
                    /></div>
                <div id="storemenu">
                    <p style={{ float: "left" }}>[ 음식점정보부분 ]</p><br />
                    <span><img src={menuinfo} style={{ width: "600px", height: "400px", marginRight: "30px" }} className="img_snowman" /></span>
                </div>
                <hr style={{
                    color: '#000000',
                    backgroundColor: '#000000',
                    height: .5,
                    borderColor: '#000000'
                }} />
                <div style={{ color: '#000000', backgroundColor: '#9fa195', borderRadius:'8px'}}>
                    <Typography variant="h4" style={style}>Review Details</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>storereviewNo</TableCell>
                                <TableCell>nickname</TableCell>
                                <TableCell align="right">userNo</TableCell>
                                <TableCell align="right">date</TableCell>
                                <TableCell align="right">Star</TableCell>
                                <TableCell align="right">contents</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.reviews.map(row => (
                                <TableRow key={row.storereviewNo}>
                                    <TableCell component="th" scope="row">
                                        {row.storereviewNo}
                                    </TableCell>
                                    <TableCell align="right">{row.nickname}</TableCell>
                                    <TableCell align="right">{row.userNo}</TableCell>
                                    <TableCell align="right">{row.reviewDate}</TableCell>
                                    <TableCell align="right">{row.star}</TableCell>
                                    <TableCell align="right">{row.contents}</TableCell>
                                    <TableCell align="right" onClick={() => this.deleteReview(row.storereviewNo)}><DeleteIcon /></TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div><ReviewRouterComponent /></div>
            </Fragment>
        );
    }

}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default StorePageComponent;