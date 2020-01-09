import React, { Component } from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';

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
                    error:"로그인 실패 : 아이디/패스워드 확인해주세요."
                })
            }
            
          });
          
    }

  render() {
    return (
       <div> 
          <h3><b>관리자</b></h3>
          <div className="loginOutline">
            <input placeholder="ID를 입력하세요" type="text" 
              value= {this.state.adminID} 
              onChange={this.handleChange} 
              name="adminID" 
              className="adminLogin" />
          </div>
          <div className="loginOutline">
            <input placeholder="PW를 입력하세요" type="text" 
              value= {this.state.password} 
              onChange={this.handleChange} 
              name="password"
              className="adminLogin" />
          </div><br/>
          <button onClick={this.login} className="btnLogin"> 로그인 </button><br/>
          <div className="loginStatus">
            {this.state.error}
          </div>
       </div>
    );
  }
}

export default withRouter(AdminLogin);