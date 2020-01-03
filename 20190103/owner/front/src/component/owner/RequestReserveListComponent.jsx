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
            <div>

                <h1 className="text-center">예 약 신 청</h1>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th> 예 약 자 이 름</th>
                            <th> 전 화 번 호</th>
                            <th> 성 인 </th>
                            <th> 아 이 </th>
                            <th> 요청사항</th>
                            <th> 예 약 시 간</th>
                            <th> 예 약 날 짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.requestreserve.map((requestreserve) => (
                                <tr key={requestreserve.reservationNO}>
                                    <td>{requestreserve.username} </td>
                                    <td>{requestreserve.phone}</td>
                                    <td>{requestreserve.adult}</td>
                                    <td>{requestreserve.child}</td>
                                    <td>{requestreserve.request}</td>
                                    <td>{requestreserve.retime}</td>
                                    <td>{requestreserve.regdate}</td>
                                    <td><button className="btn btn-danger" onClick={()=>this.rejectreserve(requestreserve.reservationNO)}>거절</button></td>
                                    <td><button className="btn btn-danger" onClick={()=>this.acceptreserve(requestreserve.reservationNO)}>수락</button></td>
                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
        );
    }

}

export default RequestReserveListComponent;