import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import '../../index.css';

import img from '../../img/123.jpg';

class OneStoreComponent extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            ownerNo: '',
            ownerID:'',
            password:'',
            name:'',
            brNo:'',
            storeName:'',
            address:'',
            tel:'',
            menuImg:'',
            cuisine:'',
            mainMenu:'',
            openingHours:''
        }
        this.showonestore = this.showonestore.bind(this);

    }

    componentDidMount() {
        this.showonestore();
    }

    showonestore() {
         ApiService.fetchUserById(window.localStorage.getItem("ownerNo"))
        .then((res) => {
            let owner = res.data;
            this.setState({
                ownerNo: owner.ownerNo,
                ownerID: owner.ownerID,
                password: owner.password,
                name: owner.name,
                brNo: owner.brNo,
                storeName: owner.storeName,
                address: owner.address,
                tel: owner.tel,
                menuImg: owner.menuImg,
                cuisine: owner.cuisine,
                mainMenu: owner.mainMenu,
                openingHours: owner.openingHours
            })
        });
        console.log("음식점 순서 ======= "+ this.state.ownerNo);
    }

    // showonestore(ownerNo){
    //     axios({
    //         method: 'get',
    //         url: '/one/:ownerNo',
    //         data: {
    //             ownerNo: this.state.ownerNo
    //         }
    //     }).then(function (response) {
    //         alert('success');
    //     }).catch(function (error) {
    //         alert('성공하지 못했답니다..ㅠ^ㅠ');
    //     });
    //  console.log("음식점 순서 ======= "+ ownerNo)
    // }
        


    regowner(){
        this.props.history.push('/regowners');
    }


    render() {
        const style = {
            color: 'red',
            margin: '10px'
        }
        return (
            <div>

                <h1 className="text-center" style={style}>예 약 자 명 단</h1>
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

                                    <td>{this.state.ownerNo} </td>
                                    <td>{this.state.ownerID}</td>
                                    <td>{this.state.password}</td>
                                    <td>{this.state.name}</td>
                                    <td>{this.state.brNo}</td>
                                    <td>{this.state.storeName}</td>
                                    <td>{this.state.address}</td>
                                    <td>{this.state.tel}</td>
                                    <td>{this.state.menuImg}</td>
                                    <td>{this.state.cuisine}</td>
                                    <td>{this.state.mainMenu}</td>
                                    <td>{this.state.openingHours}</td>
                            ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default OneStoreComponent;