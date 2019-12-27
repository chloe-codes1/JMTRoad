import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import result from '../../result.json';


class RegStoreComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ownerNo: '',
      ownerID: '',
      password: '',
      name: '',
      brNo: '',
      
    }
    this.regOwner = this.regOwner.bind(this);
    this.login = this.login.bind(this);

  }

  login(e){
    this.props.history.push('/ownerlogin');
  }

  regOwner(e) {
    e.preventDefault();    

    const owner = {
      ownerNo: this.state.ownerNo,
      ownerID: this.state.ownerID,
      password: this.state.password,
      name: this.state.name,
      brNo: this.state.brNo,
    };
   
    console.log("입력 받은 사업자번호"+this.state.brNo);
    console.log("저장하는 사업자번호"+owner.brNo);
    
    ApiService.addOwners(owner)
      .then(res => {
        this.props.history.push('/ownerlogin');
      });
  }
  
  onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value });

  render() {

    return (

      <div>

        <h2 className="text-center">회 원 가 입</h2>


        <div className="form-group">

            <label>아이디</label>
            <input type="text" placeholder="아이디" id="ownerID" name="ownerID" className="form-control" value={this.state.ownerID} onChange={this.onChange} />
                    
        </div>

        <div className="form-group">
          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호" name="password" className="form-control" value={this.state.password} onChange={this.onChange} />
        </div>

        <div className="form-group">
          <label>사업자이름</label>
          <input type="text" placeholder="ex)홍길동" name="name" className="form-control" value={this.state.name} onChange={this.onChange} />
        </div>


        <div className="form-group">
          <label>사업자 등록번호</label>
          <input type="text" placeholder="사업자 등록번호를 입력해주세요 ex)111-11-11111" name="brNo" className="form-control" value={this.state.brNo} onChange={this.onChange} />
        </div>

        <button className="btn btn-success" onClick={this.regOwner}>회원가입</button>
        <button className="btn btn-success" onClick={this.login}>로그인</button>



      </div>
    );
  }
}

export default RegStoreComponent;