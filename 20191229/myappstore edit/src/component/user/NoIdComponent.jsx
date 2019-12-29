import React, { Component } from 'react'



class NoIdComponent extends Component {

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
 
    this.props.history.push('/ownerlogin');     
  }
  
  reg = (e) =>{
    this.props.history.push('/regowners');
  }


  render() {


    return (

      <div>

          <div className="form-group">
            <label>입력 하신 정보가 일치 하지 않습니다.</label>
          </div>

        <button className="btn btn-success" onClick={this.login}>로그인</button>
        <button className="btn btn-success" onClick={this.reg}>회원가입</button>

      </div>
    );
  }
}

export default NoIdComponent;