import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import '../../index.css';
import Clock from 'react-live-clock';
import ReactDOM from 'react-dom';
import ReactTimeout from 'react-timeout'

import RequestReserveListComponent from "./RequestReserveListComponent"
import TodayreservationListComponent from "./TodayreservationListComponent"
import TodayWaitingListComponent from "./TodayWaitingListComponent"

class OwnerMainComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ownerNo: '',
            ownerID: '',
            password: '',
            name: '',
            tel: '',
            address: '',
            storename: '',
            brNo: '',
            cuisine: '',
            mainMenu: '',
            menuImg: '',
            openingHours: '',
            waitcount: '',
            todayreserve: '',
            reservecount: '',
        }
        this.ownerstoreList = this.ownerstoreList.bind(this);
        this.editowner = this.editowner.bind(this);
        this.countreserve = this.countreserve.bind(this);
        this.countwaiting = this.countwaiting.bind(this);
        this.showwaitingList = this.showwaitingList.bind(this);
        this.todayreserveList = this.todayreserveList.bind(this);
        this.requestreserveList = this.requestreserveList.bind(this);
        this.requestcount = this.requestcount.bind(this);
        // this.reload = this.reload.bind(this);
        // this.requset = this.requset.bind(this);
    }

    componentDidMount() {
        this.ownerstoreList();
    }

    editowner(ownerNo) {
        window.localStorage.setItem("ownerNo", this.state.ownerNo);
        this.props.history.push('/addstore')
    }

    storeone(ownerNo) {
        window.localStorage.setItem("ownerNo", ownerNo);
        this.props.history.push('/store');
    }

    ownerstoreList() {
        ApiService.fetchOwnerstore(window.localStorage.getItem("ownerid"), window.localStorage.getItem("password"))
            .then((res) => {
                this.setState({ storename: res.data.storeName, ownerNo: res.data.ownerNo, ownerID: res.data.ownerID })

                console.log("test" + this.state.ownerNo)
                if (this.state.ownerID == null) {
                    this.props.history.push('/No');
                }

                this.countreserve(this.state.ownerNo);
                this.countwaiting(this.state.ownerNo);
                this.requestcount(this.state.ownerNo)
            });


    }

    countreserve(ownerNo) {
        ApiService.countReserve(ownerNo)
            .then((res) => {
                this.setState({ todayreserve: res.data })
            });
    }

    countwaiting(ownerNo) {
        ApiService.listWaiting(ownerNo)
            .then((res) => {
                this.setState({ waitcount: res.data.length })
            });
    }

    showwaitingList() {
        window.localStorage.setItem("ownerNo", this.state.ownerNo);
        this.props.history.push('/waitingList');
    }

    todayreserveList() {
        window.localStorage.setItem("ownerNo", this.state.ownerNo);
        this.props.history.push('/todayreserveList');

    }

    print() {
        setTimeout(function () {
            window.location.href = window.location;
        }, 3000);
    }


    requestreserveList() {
        window.localStorage.setItem("ownerNo", this.state.ownerNo);
    }

    requestcount(ownerNo) {
        ApiService.requestcountReserve(ownerNo)
            .then((res) => {
                this.setState({ reservecount: res.data });
            })
    }

    requset() {
        window.localStorage.setItem("ownerNo", this.state.ownerNo);
        this.setState({
            inputLinkClicked: true,
            reserveClicked: false,
            waitingClicked: false
        })
    }

    reserve() {
        window.localStorage.setItem("ownerNo", this.state.ownerNo);
        this.setState({
            reserveClicked: true,
            inputLinkClicked: false,
            waitingClicked: false
        })
    }

    waiting() {
        window.localStorage.setItem("ownerNo", this.state.ownerNo);
        this.setState({
            waitingClicked: true,
            reserveClicked: false,
            inputLinkClicked: false
        })
    }

    render() {

        const style = {
            color: 'blue',
            marginleft: '50px'
        }



        return (
            <div>
                <h1 className="text-center" style={name}>{this.state.storename}</h1>

                <p style={clock}><Clock format={'YYYY년 MM월 DD일'} /></p>

                <button style={ownerMainbtn1} onClick={this.editowner}> 가게 수정 </button>

                <br/><br/><br/>
                <div id="button" style={{ float: "left"}}>

                    <button style={ownerMainbtn2} onClick={this.requset.bind(this)}> 예약 신청 : {this.state.reservecount}</button>
                    <button style={ownerMainbtn2} onClick={this.reserve.bind(this)}> 오늘의 예약 : {this.state.todayreserve}</button>
                    <button style={ownerMainbtn2} onClick={this.waiting.bind(this)} > 오늘의 대기 : {this.state.waitcount}</button>

                    {this.state.inputLinkClicked && <RequestReserveListComponent />}
                    {this.state.reserveClicked && <TodayreservationListComponent />}
                    {this.state.waitingClicked && <TodayWaitingListComponent />}

                </div>
            </div>
        );
    }
}

const name = {
    fontSize: '50px',
    fontFamily: 'Hanna',
    color:  '#592202',
    textAlign: 'center',
    marginTop: '10px'
}

const clock = {
    fontSize: '20px',
    fontFamily: 'BMHANNAPro',
    color: '#D9580D',
    textAlign: 'center',
}

const ownerMainbtn1 = {
    fontSize: '15px',
    letterSpacing: '1px',
    color: 'white',
    borderRadius: '8px',
    backgroundColor:'#F2CB57',
    padding: '14px 40px',
    cursor: 'pointer',
    float: 'right',
    marginRight: '40px',
}

const ownerMainbtn2 = {
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    color: 'white',
    borderRadius: '8px',
    backgroundColor:'#3F688C',
    padding: '30px 70px',
    cursor: 'pointer',
    position: 'relative',
    margin: '30px',
    marginTop: '40px',
    left: '100px'
}

ReactDOM.render(
    <OwnerMainComponent/>,
    document.getElementById('root')
);



export default OwnerMainComponent;