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
        this.Entrance = this.Entrance.bind(this);

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

    Noshow(reservationNO) {

        ApiService.noshowReserve(reservationNO)

        console.log("노쇼"+reservationNO)
    }


    Entrance(reservationNO)/* =(e)=> */{
        // e.preventDefault();

        ApiService.entranceReserve(reservationNO)
        console.log("입장")
    }


    render() {
        return (
            <form style={innercomp}>
                <h1>오 늘 의 예 약</h1>
                <table>
                    <thead>
                        <tr>
                            <th style={tablecell}> 예 약 자 이 름</th>
                            <th style={tablecell}> 전 화 번 호</th>
                            <th style={tablecell}> 성 인 </th>
                            <th style={tablecell}> 아 이 </th>
                            <th style={tablecell}> 요청사항</th>
                            <th style={tablecell}> 예 약 시 간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.todayreserve.map((todayreserve) => (
                            <tr key={todayreserve.reservationNO}>
                                <td style={tablecell}>{todayreserve.username} </td>
                                <td style={tablecell}>{todayreserve.phone}</td>
                                <td style={tablecell}>{todayreserve.adult}</td>
                                <td style={tablecell}>{todayreserve.child}</td>
                                <td style={tablecell}>{todayreserve.request}</td>
                                <td style={tablecell}>{todayreserve.retime}</td>
                                <td style={tablecell}> 
                                <button className="btn btn-success" onClick={() => this.Entrance(todayreserve.reservationNO,todayreserve.userNo)}>입장</button>
                                <button className="btn btn-success" onClick={() => this.Noshow(todayreserve.reservationNO)}>노쇼</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

const tablecell = {
    border: '1px solid black',
    padding: '10px'
}

export default TodayreservationListComponent;