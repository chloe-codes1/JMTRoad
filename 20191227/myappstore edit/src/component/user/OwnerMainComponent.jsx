import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import '../../index.css';
import Clock from 'react-live-clock';

class OwnerMainComponent extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            ownerNo:'',
            ownerID:'',
            password:'',
            name:'',
            tel:'',
            address:'',
            storename:'',
            brNo:'',
            cuisine:'',
            mainMenu:'',
            menuImg:'',
            openingHours:'',
        }
        this.ownerstorelist = this.ownerstorelist.bind(this);
        this.editowner = this.editowner.bind(this);
    }

    componentDidMount(){
        this.ownerstorelist();       
    }

    editowner(ownerNo){
        
        console.log(this.state.ownerNo);
        window.localStorage.setItem("ownerNo",this.state.ownerNo);
        this.props.history.push('/addstore')
        console.log("edit")
     }

    ownerstorelist(){
                
        ApiService.fetchownerstore(window.localStorage.getItem("ownerid"),window.localStorage.getItem("password"))
        .then((res) => {
            console.log(res.data)
            this.setState({storename: res.data.storeName,ownerNo:res.data.ownerNo})
        });

    }


    render() {
        const style = {
            color: 'red',
            margin: '10px'
        }
        return (
            <div>

                

                <h1 className="text-center" style={style}>{this.state.storename}</h1>
                
                <p><Clock format={'YYYY년 MM월 DD일'}  /></p>

                <button onClick={this.editowner}> 가게 수정 </button>
                <button> 가게 페이지</button>

                <br>
            </br>


                <button className="btn btn-danger">예약 신청 : </button>
                <button className="btn btn-danger"> 오늘의 예약 : </button>
                <button className="btn btn-danger"> 오늘의 대기 : </button>
            
            </div>
        );
    }
}

export default OwnerMainComponent;