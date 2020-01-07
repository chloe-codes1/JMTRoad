import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import '../../index.css';

class WaitingListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            waiting: [],
            message: null
        }
        this.deletewaiting = this.deletewaiting.bind(this);
        this.addwaiting = this.addwaiting.bind(this);
        this.reloadwaitingList = this.reloadwaitingList.bind(this);
    }

    componentDidMount() {
        this.reloadwaitingList();
    }

    reloadwaitingList() {
        ApiService.fetchWaiting()
            .then((res) => {
                this.setState({waiting: res.data})
            });
    }

    deletewaiting(waitNO) {
        ApiService.deletewaiting(waitNO)
           .then(res => {
               this.setState({message : 'waiting deleted successfully.'});
               this.setState({waiting: this.state.waiting.filter(waiting => waiting.waitNO !== waitNO)});
           })

    }

    addwaiting() {
        window.localStorage.removeItem("waitNO");
        this.props.history.push('/add-waiting');
    }

    render() {
        const style = {
            color: 'red',
            margin: '10px'
        }
        return (
            <div>
                <h1 className="text-center" style={style}>대 기 자 명 단</h1>
                <button className="btn btn-danger" onClick={() => this.addwaiting()} > 대 기 추 가</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">waitNO</th>
                            <th> 대 기 자 </th>
                            <th> 성 인 수 </th>
                            <th> 유 아 수 </th>
                            <th> 요청사항 </th>
                            <th> 전화번호 </th>
                            
                            <th> 확   인 </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.waiting.map((waiting) =>(
                                    <tr key={waiting.waitNO}>
                    
                                        <td>{waiting.username}</td>
                                        <td>{waiting.adult}</td>
                                        <td>{waiting.child}</td>
                                        <td>{waiting.request}</td>
                                        <td>{waiting.retime}</td>
                                        <td>{waiting.phone}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => this.deletewaiting(waiting.waitNO)}>입장</button>
                                            <button className="btn btn-success" onClick={() => this.deletewaiting(waiting.waitNO)}>No-show</button>
                                        </td>
                                    </tr>
                            ))}
                    </tbody>
                </table>

            </div>
        );
    }

}

export default WaitingListUserComponent;