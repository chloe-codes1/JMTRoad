import React, { Component } from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {       
            adminNo: '',
            adminID: '',
            password: '',
            error:null   
        };
        this.login = this.login.bind(this);
      }

      handleChange = (e) => {
        this.setState({
          [e.target.name] : e.target.value,
          error:null
        })
      }
      
    login = async() => {
        let admin = {
            adminID : this.state.adminID,
            password : this.state.password
        };
        console.log(admin)
        await Axios({
            method: "post",
            url:"/adminLogin",
            data: admin

          }).then(success => {
            const data = success.data;
            
            if(data === 1){
                console.log("로그인 성공"+data);
                // window.localStorage.setItem("adminID",this.state.adminID); 
                // window.localStorage.setItem("password",this.state.password);
                window.sessionStorage.setItem("adminID",this.state.adminID); 
                window.sessionStorage.setItem("password",this.state.password);
                // this.props.onLogin();
                this.props.history.push('/Main');  

                this.props.result(this.state.adminID);
            }
            else{
                console.log("로그인 실패"+data);
                this.setState({
                    error:"로그인실패 아이디/패스워드확인해주세요"
                })
            }
            
          });
          
    }

  render() {
    return (
       <div> 
           <h1>관리자로그인</h1> 
          <input placeholder="ID를 입력하세요" type="text" value= {this.state.adminID} onChange={this.handleChange} name="adminID" />
          <input placeholder="pw를 입력하세요" type="text" value= {this.state.password} onChange={this.handleChange} name="password" />
          {this.state.error}
          <button onClick={this.login}> 로그인 </button>
       </div>
    );
  }
}

export default withRouter(AdminLogin);