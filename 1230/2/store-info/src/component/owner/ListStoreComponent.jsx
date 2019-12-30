import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import '../../index.css';
import img from '../../Img/123.jpg';

class ListStoreComponent extends Component {
    this_isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            ownerstore: [],
        }
        
        this.addstore = this.addstore.bind(this);
        this.reloadreserveList = this.reloadreserveList.bind(this);
        this.showonestore = this.showonestore.bind(this);

    }

    componentDidMount() {
        this.reloadreserveList();
    }

    reloadreserveList() {
        ApiService.fetchOwnerById()
            .then((res) => {
                this.setState({ ownerstore: res.data })
            });
    }

    showonestore(ownerNo){
        console.log("음식점 순서"+ownerNo);
        window.localStorage.setItem("ownerNo",ownerNo);
        this.props.history.push('/one');
    }

    addstore(ownerNo) {
        window.localStorage.setItem("ownerNo",ownerNo);
        this.props.history.push('/addstore');
        console.log("음식점 번호"+ownerNo)      
    }

    regowner(){
        
        this.props.history.push('/regowners');
    }

  
    render() {
        
        return (
            <div>

                <h1 className="text-center">음식점List</h1>
                <button className="btn btn-danger" onClick={() => this.regowner()} > 회 원 가 입</button>
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">ownerNo</th>
                            <th> 음 식 점 번 호</th>
                            <th> 아 이 디</th>
                            <th> 비 밀 번 호</th>
                            <th> 주 인 이 름 </th>
                            <th> 사 업 자 등 록 번 호</th>
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
                            this.state.ownerstore.map((ownerstore) => (
                                <tr key={ownerstore.ownerNo}>
                                    <td>{ownerstore.ownerNo} </td>
                                    <td>{ownerstore.ownerID}</td>
                                    <td>{ownerstore.password}</td>
                                    <td>{ownerstore.name}</td>
                                    <td>{ownerstore.brNo}</td>
                                    <td>{ownerstore.storeName}</td>
                                    <td>{ownerstore.address}</td>
                                    <td>{ownerstore.tel}</td>
                                    <td>{ownerstore.menuImg}</td>
                                    <td>{ownerstore.cuisine}</td>
                                    <td>{ownerstore.mainMenu}</td>
                                    <td>{ownerstore.openingHours}</td>
                                    <button className="btn btn-danger" onClick={() => this.addstore(ownerstore.ownerNo)} > 음 식 점 등 록 </button>
                                    <button className="btn btn-danger" onClick={() => this.showonestore(ownerstore.ownerNo)} > 음 식 점 하 나 보 기 </button>
                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
        );
    }

}

export default ListStoreComponent;