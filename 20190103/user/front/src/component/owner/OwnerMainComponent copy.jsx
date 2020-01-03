import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import '../../index.css';
import Clock from 'react-live-clock';
import ReactDOM from 'react-dom';

import RequestReservationModal from "./RequestReservationModal"
import TodayReservationModal from "./TodayReservationModal"
import RequestReservationModalComponent from "./RequestReservationModalComponent"
import TodayWaitingModal from "./TodayWaitingModal"

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
            isLoggedIn: false
        }
        this.ownerstoreList = this.ownerstoreList.bind(this);
        this.editowner = this.editowner.bind(this);
        this.countreserve = this.countreserve.bind(this);
        this.countwaiting = this.countwaiting.bind(this);
        this.showwaitingList = this.showwaitingList.bind(this);
        this.todayreserveList = this.todayreserveList.bind(this);
        this.requestreserveList = this.requestreserveList.bind(this);
        this.requestcount = this.requestcount.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    componentWillMount() {
        this.ownerstoreList();
    }

    handleLoginClick() {
        this.setState({ isLoggedIn: true });
    }

    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
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

    requestreserveList() {
        window.localStorage.setItem("ownerNo", this.state.ownerNo);
        this.props.history.push('/RequestReserveList');
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

    render() {

        const isLoggedIn = this.state.isLoggedIn;
        let button;

        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }


        const style = {
            color: 'blue',
            marginleft: '50px'
        }
        return (
            <div>

                <div>
                    <Greeting isLoggedIn={isLoggedIn} />
                    {button}
                </div>

                <h1>{this.state.ownerNo}</h1>
                <h1 className="text-center" style={style}>{this.state.storename}</h1>


                <p><Clock format={'YYYY년 MM월 DD일'} /></p>

                <button onClick={this.editowner}> 가게 수정 </button>
                <button onClick={() => this.storeone(this.state.ownerNo)}> 가게 페이지</button>

                {/* <button onClock={view()}></button> */}
                <br>
                </br>
                <div id="button" style={{ float: "left" }}>
                    <button className="btn btn-danger" onClick={this.requestreserveList}> 예약 신청 : {this.state.reservecount}</button>
                    <button className="btn btn-danger" onClick={this.todayreserveList}> 오늘의 예약 : {this.state.todayreserve}</button>
                    <button className="btn btn-danger" onClick={this.showwaitingList} > 오늘의 대기 : {this.state.waitcount}</button>


                    <div id="requestreserve" style={{ display: "none" }}>

                        fdskfhjsalk
    
                </div>


                    {/* <span><TodayWaitingModal /></span>
                <span><TodayReservationModal to={{
                    pathname:"/RequestReservation",
                    state:{cccount:this.state.todayreserve}
                    }} /></span>
                <span><RequestReservationModal data={this.state.waitcount}/></span> */}



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