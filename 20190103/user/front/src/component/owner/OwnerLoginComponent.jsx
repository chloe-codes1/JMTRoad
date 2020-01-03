import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import result from '../../result.json';
import axios from 'axios';


class OwnerLoginComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
      ownerNo: '',
      ownerID: '',
      password: '',
      name: '',
      brNo: '',
      
      storeName: '',
      address: '',
      tel: '',
      cuisine: '',
      mainMenu: '',
      menuImg: '',
      openingHours: '',
      
    };
    this.login = this.login.bind(this);
  }

  login = (e) => {
   let ownerlogin = {
     ownerNo:  this.state.ownerNo,
     ownerID: this.state.ownerID,
     password: this.state.password,
     name: this.state.name,
     brNo: this.state.brNo,
     storeName: this.state.storeName,
     address: this.state.address,
     tel: this.state.tel,
     cuisine: this.state.cuisine,
     mainMenu: this.state.mainMenu,
     menuImg: this.state.menuImg,
     openingHours: this.state.openingHours,
   };


   window.localStorage.setItem("ownerid",this.state.ownerID);
   window.localStorage.setItem("password",this.state.password);
  //  window.localStorage.setItem("ownerNo",this.state.ownerNo);

  //  console.log("ㅁㅇㄴㄹ"+window.localStorage.setItem("ownerNo",this.state.ownerNo));
  //  console.log("aaa"+window.localStorage.setItem("password",this.state.password))
  //  console.log("가나다"+window.localStoage.setItem("ownerNo")+this.state.ownerNo)
   
    this.props.history.push('/ownerMain');     
  }
  
  onChange = (e) =>
  this.setState({ [e.target.name]: e.target.value });

  reg = (e) =>{
    this.props.history.push('/regowners');
  }


  render() {


    return (

      <div>

        <h2 className="text-center">음 식 점 회 원 로 그 인</h2>


        

          <div className="form-group">
            <label>아이디</label>
            <input type="text" placeholder="아이디" name="ownerID" className="form-control" value={this.state.ownerID} onChange={this.onChange} />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input type="password" placeholder="비밀번호" name="password" className="form-control" value={this.state.password} onChange={this.onChange} />
          </div>


        <button className="btn btn-success" onClick={this.login}>로그인</button>
        <button className="btn btn-success" onClick={this.reg}>회원가입</button>



      </div>
    );
  }
}

export default OwnerLoginComponent;