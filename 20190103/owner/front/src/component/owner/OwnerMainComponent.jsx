import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import '../../index.css';
import Clock from 'react-live-clock';
import ReactDOM from 'react-dom';
import ReactTimeout from 'react-timeout'

import RequestReservationModal from "./RequestReservationModal"
import TodayReservationModal from "./TodayReservationModal"
import TodayWaitingModal from "./TodayWaitingModal"

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
                // window.location.reload();
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

    // requestreserveList() {
    //     window.localStorage.setItem("ownerNo", this.state.ownerNo);
    //     this.props.history.push('/RequestReserveList');
    // }

    print(){
       setTimeout(function(){
         window.location.href = window.location;       },3000);
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

    // SimpleModal() {
    //     const [open, setOpen] = React.useState(false);
    //     const handleOpen = () => {
    //         setOpen(true);
    //     };
    //     const handleClose = () => {
    //         setOpen(false);
    //     };
    // }

    requset() {
        window.localStorage.setItem("ownerNo", this.state.ownerNo);
        this.setState({
            inputLinkClicked: true,
            reserveClicked:false,
            waitingClicked:false
          })
    }

    reserve(){
        window.localStorage.setItem("ownerNo",this.state.ownerNo);
        this.setState({
            reserveClicked:true,
            inputLinkClicked:false,
            waitingClicked:false
        })
    }

    waiting(){
        window.localStorage.setItem("ownerNo",this.state.ownerNo);
        this.setState({
            waitingClicked:true,
            reserveClicked:false,
            inputLinkClicked:false
        })
    }

    // pagereload(){
    //     var time = 1000*60*60;
    //     setInterval("reload",time)
    // }

    // reload(){
    //     window.location.reload();
    //     // this.props.setTimeout(window.location.reload(),10000*60*60);
    // }

    render() {

        const style = {
            color: 'blue',
            marginleft: '50px'
        }

        

        return (
            <div>
                <button onClick={this.print}>test</button>
                <h1 className="text-center" style={style}>{this.state.storename}</h1>


                <p><Clock format={'YYYY년 MM월 DD일'} /></p>

                {/* <button onClick={window.location.reload}>123</button> */}

                <button onClick={this.editowner}> 가게 수정 </button>
                <button onClick={() => this.storeone(this.state.ownerNo)}> 가게 페이지</button>

                {/* <button onClock={view()}></button> */}
                <br>
                </br>
                <div id="button" style={{ float: "left" }}>

                    <button className="btn btn-danger" onClick={this.requset.bind(this)}> 예약 신청 : {this.state.reservecount}</button>


                    <button className="btn btn-danger" onClick={this.reserve.bind(this)}> 오늘의 예약 : {this.state.todayreserve}</button>
                    <button className="btn btn-danger" onClick={this.waiting.bind(this)} > 오늘의 대기 : {this.state.waitcount}</button>

                     
                    {this.state.inputLinkClicked && <RequestReserveListComponent />}
                    {this.state.reserveClicked && <TodayreservationListComponent/>}
                    {this.state.waitingClicked && <TodayWaitingListComponent/>}


                </div>
            </div>
        );
    }
}
ReactDOM.render(
    <OwnerMainComponent />,
    document.getElementById('root')
);

export default OwnerMainComponent;