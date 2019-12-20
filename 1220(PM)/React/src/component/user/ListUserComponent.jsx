import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import '../../index.css';
class ListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reserve: [],
            message: null
        }
        this.deletereserve = this.deletereserve.bind(this);
        this.addreserve = this.addreserve.bind(this);
        this.reloadreserveList = this.reloadreserveList.bind(this);
    }

    componentDidMount() {
        this.reloadreserveList();
    }

    reloadreserveList() {
        ApiService.fetchUsers()
            .then((res) => {
                this.setState({reserve: res.data})
            });
    }

    deletereserve(waitNO) {
        ApiService.deletereserve(waitNO)
           .then(res => {
               this.setState({message : 'reserve deleted successfully.'});
               this.setState({reserve: this.state.reserve.filter(reserve => reserve.waitNO !== waitNO)});
           })

    }

    addreserve() {
        window.localStorage.removeItem("waitNO");
        this.props.history.push('/add-reserve');
    }

    render() {
        const style = {
            color: 'red',
            margin: '10px'
        }
        return (
            <div>
                <h1 className="text-center" style={style}>예 약 자 명 단</h1>
                <button className="btn btn-danger" onClick={() => this.addreserve()} > 예 약 추 가</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">waitNO</th>
                            <th> 예 약 자 </th>
                            <th> 성 인 수 </th>
                            <th> 유 아 수 </th>
                            <th> 요청사항 </th>
                            <th> 예약시간 </th>
                            <th> 전화번호 </th>
                            
                            <th> 확   인 </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.reserve.map((reserve) =>(
                                    <tr key={reserve.waitNO}>
                    
                                        <td>{reserve.username}</td>
                                        <td>{reserve.adult}</td>
                                        <td>{reserve.child}</td>
                                        <td>{reserve.request}</td>
                                        <td>{reserve.retime}</td>
                                        <td>{reserve.phone}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => this.deletereserve(reserve.waitNO)}>입장</button>
                                            <button className="btn btn-success" onClick={() => this.deletereserve(reserve.waitNO)}>No-show</button>
                                        </td>
                                    </tr>
                            ))}
                    </tbody>
                </table>

            </div>
        );
    }

}

export default ListUserComponent;