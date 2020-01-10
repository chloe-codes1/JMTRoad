import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import '../../index.css';


class RequestReserveListComponent extends Component {
    this_isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            requestreserve: [],
         
        }

        this.reloadtodayreserveList = this.reloadtodayreserveList.bind(this);
        this.acceptreserve = this.acceptreserve.bind(this);

    }

    componentDidMount() {
        this.reloadtodayreserveList();
    }

    reloadtodayreserveList() {
        ApiService.requestListReserve(window.localStorage.getItem("ownerNo"))
            .then((res) => {
                console.log("data"+res.data.reservatioNO)
                this.setState({ requestreserve: res.data ,reservationNO:res.data.reservationNO})
            });
    }

    acceptreserve(reservationNO){
        console.log(reservationNO);
        // window.localStorage.setItem("reservationNO",reservationNO);
        ApiService.acceptReserve(reservationNO)
        window.location.reload()
    }

    rejectreserve(reservationNO){
        console.log(reservationNO);
        ApiService.rejectReserve(reservationNO);
        window.location.reload();
    }




    render() {

        return (
            <form style={innercomp}>
            <div >
                <h1 className="text-center">예 약 신 청</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={table}> 예 약 자 이 름</th>
                            <th style={table}> 전 화 번 호</th>
                            <th style={table}> 성 인 </th>
                            <th style={table}> 아 이 </th>
                            <th style={table}> 요청사항</th>
                            <th style={table}> 예 약 시 간</th>
                            <th style={table}> 예 약 날 짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.requestreserve.map((requestreserve) => (
                                <tr key={requestreserve.reservationNO}>
                                    <td style={table}>{requestreserve.username} </td>
                                    <td style={table}>{requestreserve.phone}</td>
                                    <td style={table}>{requestreserve.adult}</td>
                                    <td style={table}>{requestreserve.child}</td>
                                    <td style={table}>{requestreserve.request}</td>
                                    <td style={table}>{requestreserve.retime}</td>
                                    <td style={table}>{requestreserve.regdate}</td>
                                    <td><button style={rejectionbtn} onClick={()=>this.rejectreserve(requestreserve.reservationNO)}>거절</button></td>
                                    <td><button style={acceptionbtn} onClick={()=>this.acceptreserve(requestreserve.reservationNO)}>수락</button></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            </form>
        );
    }

}

const innercomp = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    position: 'relative',
    left: '100px',
    border: '3px solid #D9D277',
    borderRadius: '4px',
}

const table ={
    border:'1px solid black',
    padding: '10px'
}

const rejectionbtn ={
    borderStyle: 'none',
    borderRadius: '2px',
    backgroundColor: '#F2636F',
    color:'white',
    padding: '5px 10px'

}

const acceptionbtn ={
    borderStyle: 'none',
    borderRadius: '2px',
    backgroundColor: '#A9BF04',
    color:'white',
    padding: '5px 10px'
}

export default RequestReserveListComponent;