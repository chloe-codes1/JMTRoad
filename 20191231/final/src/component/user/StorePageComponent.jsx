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
import img from '../../Img/balls.png'
import ReservationModal from "../Storebtn/ReservationModal";
import WaitingModal from "../Storebtn/WaitingModal";

import KakaoMap from '../KakaoMap';

import SimpleTabs from "../user/SimpleTabs";


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

    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
        ApiService.fetchOwnerById(window.localStorage.getItem("ownerNo"))
        .then((res) => {
            let owner = res.data;

            if(owner.cuisine=="51"){
                owner.cuisine="한식";
            }
            else if(owner.cuisine=="52"){
                owner.cuisine="양식";
            }
            else if(owner.cuisine=="53"){
                owner.cuisine="중식";
            }
            else if(owner.cuisine=="54"){
                owner.cuisine="일식";
            }
            else if(owner.cuisine=="55"){
                owner.cuisine="동남아식";
            }
            else if(owner.cuisine=="56"){
                owner.cuisine="뷔페식";
            }
            

            this.setState({
                ownerNo: owner.ownerNo,
                ownerID: owner.ownerID,
                password: owner.password,
                name: owner.name,
                brNo: owner.brNo,
                storeName: owner.storeName,
                address: owner.address,
                tel: owner.tel,
                menuImg: owner.menuImg,
                cuisine: owner.cuisine,
                mainMenu: owner.mainMenu,
                openingHours: owner.openingHours
            })

         
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

    render() {
        return (
    
            <Fragment>
                <WaitingModal />
                <ReservationModal />
                <div>
                    <h5>{this.state.ownerNo}</h5>
                    <h5>{this.state.storeName}</h5>
                    <h5>{this.state.address}</h5>
                </div>
                
                <div id="storeimg">
                    {/* <p>[ 음식점메뉴사진 ]</p> */}
                    <span><img src={this.state.menuImg} style={{ width: "500px", height: "500px" }} className="img_snowman" /></span>
                </div>
                <div id="map" style={{ width: "500px", float: "right" }}>
                    {/* <p style={{ float: "right" }}>[ 음식점지도부분 ]</p> */}
                    <KakaoMap
                        apiKey="725b06bbcc898a0aab70b933a5386549"
                        /*apiKey="30e0c0cb66c1d4abaa50bf716ecb633e"*/
                        lat={33.450701}
                        lng={126.570667}
                    /></div>
                <div id="storemenu">
                    {/* <p >[ 음식점정보부분 ]</p> */}
                
                    <p> 운영시간 : {this.state.openingHours}</p>
                    <p> 음식스타일 : {this.state.cuisine} </p>
                    <p> 전화번호 : {this.state.tel}</p>
                    <p> 메인메뉴 : {this.state.mainMenu}</p>
                    
                </div>
                <div><SimpleTabs/></div>
            </Fragment>
        );
    }

}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default StorePageComponent;