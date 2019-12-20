import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import KakaoLogin from "react-kakao-login";
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import ApiService from "../../service/ApiService";

class Login extends Component{

  constructor(props){
    super(props);

    this.state = {
      id: '',
      name: '',
      email: '',
      provider: '',
      message: ''
    }
  }

  responseGoogle = (res) => {
    console.log('Google Login Success', res);
    this.setState({
      id: res.googleId,
      name: res.profileObj.name,
      email: res.profileObj.email,
      provider: 'Google'
    });
    console.log('id =>', this.state.id);
    console.log('name =>', this.state.name);
    console.log('email =>', this.state.email);
    console.log('provider =>', this.state.provider);
    
    this.saveUser();
    this.doSignUp();
  }
  
  responseKakao = (res) => {
    console.log('Kakao Login Success', res);
    
    this.setState({
      id: res.profile.id,
      name: res.profile.properties.nickname,
      email: res.profile.kakao_account.email,
      provider: 'Kakao'
    });
    console.log('id =>', this.state.id);
    console.log('name =>', this.state.name);
    console.log('email =>', this.state.email);

    this.saveUser();
    this.doSignUp();
  }

  responseFail = (err) => {
    console.error('Login Failed', err);
  }

  doSignUp = () => {
    const {id, name, email, provider} = this.state;

    window.sessionStorage.setItem('id', id);
    window.sessionStorage.setItem('name', name);
    window.sessionStorage.setItem('email', email);
    window.sessionStorage.setItem('provider', provider);

    this.props.onLogin(); //이거 왜 안받아지지
    //console.log('this.props.onLogin()', this.props.onLogin());
    this.props.history.push('/users');
  }

  saveUser = () => {
    console.log('saveUser() 호출');
    let user = {
      userID : this.state.email,
    }
    console.log(user.userID);

    ApiService.addUser(user).then( res => {
      this.setState({
        message: 'is added successfully from React.'
      });
      console.log('this', this);
      console.log(this.state.message);
      this.props.history.push('/'); //가입된 회원 목록 보는 페이지로 하고싶...
    });
    console.log('saveUser() 완료')
  }

  render(){
    return(
      <div>
        <GoogleLogin 
          clientId = "1006946931495-l762hspgg67tp5vrtq2q87cev7628rsk.apps.googleusercontent.com"
          buttonText = "Google 계정으로 로그인하기"
          onSuccess = {this.responseGoogle}
          onFailure = {this.responseFail}
        />
        <br/><br/>
        <KakaoButton
          jsKey = "0c66144cffc02f5a068f08dd5ec47ffe"
          buttonText = "Kakao 계정으로 로그인하기"
          onSuccess = {this.responseKakao}
          onFailure = {this.responseFail}
          getProfile = "true"
        />
      </div>
    );
  }
}

const KakaoButton = styled(KakaoLogin)`
  padding: 0;
  width: 242px;
  height: 44px;
  line-height: 44px;
  color: #783c00;
  background-color: #F7E600;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`

export default withRouter(Login);