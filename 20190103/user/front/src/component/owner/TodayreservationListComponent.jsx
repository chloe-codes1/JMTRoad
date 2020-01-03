import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import '../../index.css';


class TodayreservationListComponent extends Component {
    this_isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            todayreserve: [],
        }

        this.reloadtodayreserveList = this.reloadtodayreserveList.bind(this);

    }

    componentDidMount() {
        this.reloadtodayreserveList();
    }

    reloadtodayreserveList() {
        ApiService.listtodayReserve(window.localStorage.getItem("ownerNo"))
            .then((res) => {
                this.setState({ todayreserve: res.data })
            });
    }


    render() {

        return (
            <div>

                <h1 className="text-center">today reserve List</h1>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th> 예 약 자 이 름</th>
                            <th> 전 화 번 호</th>
                            <th> 성 인 </th>
                            <th> 아 이 </th>
                            <th> 요청사항</th>
                            <th> 예 약 시 간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todayreserve.map((todayreserve) => (
                                <tr>
                                    <td>{todayreserve.username} </td>
                                    <td>{todayreserve.phone}</td>
                                    <td>{todayreserve.adult}</td>
                                    <td>{todayreserve.child}</td>
                                    <td>{todayreserve.request}</td>
                                    <td>{todayreserve.retime}</td>

                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
        );
    }

}

export default TodayreservationListComponent;