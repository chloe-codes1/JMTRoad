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

  
    render() {
        
        return (
            <div>

                <h1 className="text-center">오 늘 의 대 기</h1>
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th> 예 약 자 이 름</th>
                            <th> 전 화 번 호</th>
                            <th> 성 인 </th>
                            <th> 아 이 </th>
                            <th> 요청사항</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.waiting.map((waiting) => (
                                <tr key={waiting.waitNO}>
                                    <td>{waiting.username} </td>
                                    <td>{waiting.phone}</td>
                                    <td>{waiting.adult}</td>
                                    <td>{waiting.child}</td>
                                    <td>{waiting.request}</td>
                                    
                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
        );
    }

}

export default TodayWaitingListComponent;