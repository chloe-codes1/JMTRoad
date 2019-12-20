import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import '../../index.css';

import img from '../../img/123.jpg';



class ListStoreComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ownerstore: [],
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
                this.setState({ownerstore: res.data})
            });
    }

    deletereserve(waitNO) {
        ApiService.deletereserve(waitNO)
           .then(res => {
               this.setState({ownerstore: this.state.ownerstore.filter(ownerstore => ownerstore.waitNO !== waitNO)});
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
                <button className="btn btn-danger" onClick={() => this.addreserve()} > 음 식 점 등 록 </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">ownerNo</th>
                            <th> 음 식 점 이 름 </th>
                            <th> 주 소 </th>
                            <th> 전 화 번 호 </th>
                            <th> 이 미 지 </th>
                            <th> 음 식 스 타 일 </th>
                            <th> 주 메 뉴 </th>
                            <th> 운 영 시 간 </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.ownerstore.map((ownerstore) =>(
                                    <tr key={ownerstore.ownerNo}>
                    
                                        <td>{ownerstore.stName}</td>
                                        <td>{ownerstore.loc}</td>
                                        <td>{ownerstore.tel}</td>
                                        <td><img src={img}></img>{ownerstore.menuImg}</td>
                                        <td><img src="require({../../img/123.jpg})"></img>{ownerstore.menuImg}</td>
                                        <td>{ownerstore.foodstyle}</td>
                                        <td>{ownerstore.mainMenu}</td>
                                        <td>{ownerstore.octime}</td>

                                       
                                    </tr>
                            ))}
                    </tbody>
                </table>

            </div>
        );
    }

}

export default ListStoreComponent;