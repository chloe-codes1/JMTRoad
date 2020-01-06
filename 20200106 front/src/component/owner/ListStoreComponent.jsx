import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import '../../index.css';


class ListStoreComponent extends Component {
    this_isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            ownerstore: [],
            cusine:'',
        }
        
        this.addstore = this.addstore.bind(this);
        this.reloadreserveList = this.reloadreserveList.bind(this);
        this.showonestore = this.showonestore.bind(this);

    }

    componentDidMount() {
        this.reloadreserveList();
    }

    reloadreserveList() {
        ApiService.fetchOwner()
            .then((res) => {
                this.setState({ ownerstore: res.data , cuisine:res.data.cuisine
                })
            });
            console.log("음식 스타일"+this.state.cuisine)
    }

    showonestore(ownerNo){
        console.log("음식점 순서"+ownerNo);
        window.localStorage.setItem("ownerNo",ownerNo);
        this.props.history.push('/one');
    }

    storeone(ownerNo){
        window.localStorage.setItem("ownerNo",ownerNo);
        console.log("음식점 번호 : " + ownerNo)
        this.props.history.push('/store');
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
                {/* <button className="btn btn-danger" onClick={() => this.regowner()} > 회 원 가 입</button> */}
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {/* <th className="hidden">ownerNo</th> */}
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
                                    <td>{ownerstore.storeName}</td>
                                    <td>{ownerstore.address}</td>
                                    <td>{ownerstore.tel}</td>
                                    <td>{/* <img src= */}{ownerstore.menuImg}{/*  ></img> */}</td>
                                    <td>{ownerstore.codeName}</td>
                                    <td>{ownerstore.mainMenu}</td>
                                    <td>{ownerstore.openingHours}</td>
                                    <button className="btn btn-danger" onClick={() => this.storeone(ownerstore.ownerNo)}>자세히 보기</button>
                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
        );
    }

}

export default ListStoreComponent;