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

    //어쩔 수 없다.. 훼이크다
    setTimeout(() => {
      this.setState({
        modal: true
      })
    }, 10000)
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
    this.props.history.push('/');
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
                  <h3><b>맛집의민족</b></h3>
                  <p className="hcontent">다양한 맛집 프로젝트를 만들고 공유하세요!</p>
                </div>
                <hr/>
                <div className="content">
                  <h5><b>다른 계정과 연동하여 로그인</b></h5>
                  <p>
                    <GoogleLogin 
                      clientId = "구글키값"
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
                  </p>
                </div>
                <hr/>
                    <button onClick={this.ownerLogin}>음식점 로그인</button>
                <hr/>
                <div className="footer">
                  <p>
                    <button onClick={this.handleCloseModal}>닫기</button>
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

export default withRouter(Login);