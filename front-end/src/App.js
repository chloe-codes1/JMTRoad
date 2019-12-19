import React, { Component } from 'react';
import AppRouter from './component/router/RouterComponent';
import Header from './component/section/Header';
import Navigation from './component/section/Navigation';
import Store from './component/login/LoginStorage';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      logged: false,
      onLogin: this.onLogin,
      onLogout: this.onLogout
    }
  }

  onLogin = () => {
    this.setState({
      logged: true
    });
  }

  onLogout = () => {
    this.setState({
      logged: false
    });

    const provider = window.sessionStorage.getItem('provider');

    if(provider === 'Google'){
      const auth2 = window.gapi.auth2.getAuthInstance();
      console.log('auth2', auth2);
      auth2.signOut().then(()=>{
        console.log('Google Logout Success');
      });
    }else if(provider === 'Kakao'){
      window.Kakao.Auth.logout(()=>{
        console.log('Kakao Logout Success');
      });
    }
    window.sessionStorage.clear();
  }

  componentDidMount(){
    const id = window.sessionStorage.getItem('id');
    if(id){
      this.onLogin();
    } else {
      this.onLogout();
    }
  }

  render(){

    const { logged, onLogout } = this.state;

    return (
      <Store.Provider value={this.state}>
        <div>
          <Header logged={logged} onLogout={onLogout} />
          <Navigation />
          <div>
            <AppRouter />
          </div>
        </div>
      </Store.Provider>
    );
  }
}

export default App;
