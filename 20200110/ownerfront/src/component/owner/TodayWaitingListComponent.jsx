import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import '../../index.css';


class TodayWaitingListComponent extends Component {
    this_isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            waiting: [],
        }
        
        this.reloadWaitingList = this.reloadWaitingList.bind(this);

    }

    componentDidMount() {
        this.reloadWaitingList();
    }

    reloadWaitingList() {
        ApiService.listWaiting(window.localStorage.getItem("ownerNo"))
            .then((res) => {
                this.setState({ waiting: res.data })
            });
    }

    noshow(waitNO){
        ApiService.noshowwaiting(waitNO)
    }

    entrance(waitNO){
        ApiService.entrancewaiting(waitNO)
    }
  
    render() {
        return (
            <form style={innercomp}>
            <div>
                <h1 className="text-center">오 늘 의 대 기</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={table}> 예 약 자 이 름</th>
                            <th style={table}> 전 화 번 호</th>
                            <th style={table}> 성 인 </th>
                            <th style={table}> 아 이 </th>
                            <th style={table}> 요청사항</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.waiting.map((waiting) => (
                                <tr key={waiting.waitNO}>
                                    <td style={table}>{waiting.username} </td>
                                    <td style={table}>{waiting.phone}</td>
                                    <td style={table}>{waiting.adult}</td>
                                    <td style={table}>{waiting.child}</td>
                                    <td style={table}>{waiting.request}</td>
                                    <td style={table}><button onClick={() => this.entrance(waiting.waitNO)}>입장</button>
                                   <button onClick={()=>this.noshow(waiting.waitNO)}>노쇼</button></td>
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

export default TodayWaitingListComponent;