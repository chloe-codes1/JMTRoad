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
                console.log(this.state.ownerstore)
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
                <p style={listName}>음식점 전체보기</p>
                <table style={table}>
                    <thead style={thead}>
                        <tr>
                            <th> 음 식 점 이 름 </th>
                            <th> 주 소 </th>
                            <th> 전 화 번 호 </th>
                            <th> 이 미 지 </th>
                            <th> 음 식 스 타 일 </th>
                            <th> 주 메 뉴 </th>
                            <th> 운 영 시 간 </th>
                        </tr>
                    </thead>
                    <tbody >
                        {this.state.ownerstore.map((ownerstore) => (
                                <tr key={ownerstore.ownerNo} style={table}>
                                    <td>{ownerstore.storeName}</td>
                                    <td>{ownerstore.address}</td>
                                    <td>{ownerstore.tel}</td>
                                    <td><img width='50px' height='50px' src={ownerstore.menuImg}/></td>
                                    <td>{ownerstore.codeName}</td>
                                    <td>{ownerstore.mainMenu}</td>
                                    <td>{ownerstore.openingHours}시</td>
                                    <button style={detailbtn} onClick={() => this.storeone(ownerstore.ownerNo)}>자세히</button>
                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
        );
    }
}

const listName={
    fontSize: '30px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: '30px',
    paddingBottom: '50px'
}

const thead ={
    textAlign: 'center'
}
const table ={
    borderBottom: '2px solid #7F46A6',
    textAlign: 'left',
    margin: '0 auto',
    width: '90%'
}

const detailbtn={
    width:'70px',
    height:'30px',
    fontSize: '14px',
    fontFamily:'BMHANNAPro',
    borderRadius: '4px',
    border: '1px solid #7F46A6',
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#7F46A6',
    padding: '5px',
    cursor: 'pointer',
    float: 'right',
    marginTop:'5px',
    marginBottom: '5px'
}
export default ListStoreComponent;