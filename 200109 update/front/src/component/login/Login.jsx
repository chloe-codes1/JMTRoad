import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import KakaoLogin from "react-kakao-login";
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import ApiService from "../../service/ApiService";
import ModalPortal from "../../ModalPortal";
import "./Login.css";

class Login extends Component{

  constructor(props){
    super(props);

    this.state = {
      modal: true,
      id: '',
      name: '',
      email: '',
      provider: '',
      nickname: '',
    }
  }
  
  handleCloseModal = () => {
    this.setState({
      modal: false
    });

    this.props.history.push('/');
  };

  responseGoogle = (res) => {
    console.log('Google Login Success', res);
    this.setState({
      id: res.googleId,
      name: res.profileObj.name,
      email: res.profileObj.email,
      provider: 'Google'
    });
    
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

    this.saveUser();
    this.doSignUp();
  }

  responseFail = (err) => {
    console.error('Login Failed', err);
  }

  saveUser = () => {
    console.log('saveUser() 호출');
    let user = {
      userID : this.state.email,
    }
    console.log('userID => ', user.userID);
    
    ApiService.addUser(user).then( res => {

      let nick = res.data.nickname;
      let userNo = res.data.userNo;
      console.log("userNo 나와야혀... " + userNo);
      window.sessionStorage.setItem('userNo', userNo);

      this.setState({
        nickname: res.data.nickname
      });

      console.log('res', res);
      console.log('res.data.nickname => ', res.data.nickname);

      window.sessionStorage.setItem('nickname', nick);
      console.log('nickname => ', nick);
    });
    
    console.log('saveUser() 완료')
    //여기에서 리스트 불러오는걸 해야하나..
  }

  doSignUp = () => {
    const {id, name, email, provider} = this.state;

    window.sessionStorage.setItem('id', id);
    window.sessionStorage.setItem('name', name);
    window.sessionStorage.setItem('email', email);
    window.sessionStorage.setItem('provider', provider);

    this.props.onLogin(); //이거 왜 안받아지지
    this.props.history.push('/main');
  }

  ownerLogin =() =>{
    this.props.history.push('/ownerlogin');
  }

  render(){
    console.log('Login Render()');
    return(
      <div>

        {this.state.modal && (
          <ModalPortal>
            <MyModal>
              <InnerModal>
                <div className="header">
                  <h2><b>맛집의민족</b></h2>
                  <p className="expl">다양한 맛집 프로젝트를 만들고 저장하세요!</p>
                </div>
                <div className="content">
                  <h3 className="h3"><b>일반회원</b></h3>
                  <p>
                    <GoogleButton 
                      clientId = "1006946931495-l762hspgg67tp5vrtq2q87cev7628rsk.apps.googleusercontent.com"
                      buttonText = "Google 계정으로 로그인하기"
                      onSuccess = {this.responseGoogle}
                      onFailure = {this.responseFail}
                    />
                    <br/><br/>
                    <KakaoButton
                      jsKey = "0c66144cffc02f5a068f08dd5ec47ffe"
                      buttonText = "카카오 계정으로 로그인하기"
                      onSuccess = {this.responseKakao}
                      onFailure = {this.responseFail}
                      getProfile = "true"
                    />
                  </p>
                </div>
                <hr/>
                  <BtnOwnerLogin onClick={this.ownerLogin}>음식점 로그인</BtnOwnerLogin>
                <hr/>
                <div className="footer">
                  <p>
                    <BtnClose onClick={this.handleCloseModal}>닫기</BtnClose>
                  </p>
                </div>
              </InnerModal>
            </MyModal>
          </ModalPortal>
        )}
      </div>
    );
  }
}

const GoogleButton = styled(GoogleLogin)`
  background-color: #F7E600;
  width: 242px;
  color: red;
`

const KakaoButton = styled(KakaoLogin)`
  padding: 0;
  width: 242px;
  height: 44px;
  color: #783c00;
  background-color: #F7E600;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  `
  
const BtnOwnerLogin = styled.button`
  width: 242px;
  height: 44px;
  padding: 0;
  margin: 10px auto;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
`

const MyModal = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const InnerModal = styled.div`
  background: white;
  padding: 1rem;
  width: 350px;
  height: auto;
  text-align: center;
`
const BtnClose = styled.button`
  background-color: #b2b2b2;
  border-radius: 3px;
  border: 2px solid #b2b2b2;
  color: white;
  margin: 0.1rem 1em;
  padding: 0.4em 1.2em;
  font-size: 1.05em;
  cursor: pointer;

  &:hover {
    background: #808080;
    border: 2px solid #808080;
    }

`

export default withRouter(Login);