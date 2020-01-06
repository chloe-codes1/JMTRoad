import Container from "@material-ui/core/Container";
import React from "react";
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import "./App.css";
import Storage from "./component/login/Storage";
import NavBar from "./component/Navbar.jsx";
import AppRouter from "./component/RouterComponent";
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBbonXPz2Jz1Qj3e86yD1J23DrR81lVay0",
  authDomain: "final-project-1573702581092.firebaseapp.com",
  databaseURL: "https://final-project-1573702581092.firebaseio.com",
  projectId: "final-project-1573702581092",
  storageBucket: "final-project-1573702581092.appspot.com",
  messagingSenderId: "194830289232",
  appId: "1:194830289232:web:40fb1a2e5584ffa00c4455"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

//허가를 요청합니다!
messaging.requestPermission()
.then(function() {
  console.log('허가!');
  return messaging.getToken(); //토큰을 받는 함수를 추가!
})
.then(function(token) {
	console.log(token); //토큰을 출력!
})
.catch(function(err) {
	console.log('fcm에러 : ', err);
})

messaging.onMessage(function(payload){
	console.log(payload.notification.title);
	console.log(payload.notification.body);
})

messaging.onTokenRefresh(function() {
	messaging.getToken()
	.then(function(refreshedToken) {
		console.log(refreshedToken);
		console.log('Token refreshed.');
	})
	.catch(function(err) {
		console.log('Unable to retrieve refreshed token ', err);
	});
});

class App extends React.Component {

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
      console.log('provider =>', provider);
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


  render () {
    const { logged, onLogout } = this.state;

  return (
    <Storage.Provider value={this.state}>
      <div>
      <Router>
        <NavBar logged={logged} onLogout={onLogout}/>
        <Container>
          <AppRouter />
        </Container>
      </Router>
      </div>
      </Storage.Provider>
  );
  }
}

export default App;
