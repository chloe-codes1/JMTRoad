import Container from "@material-ui/core/Container";
import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import "./App.css";
import Storage from "./component/login/Storage";
import NavBar from "./component/Navbar.jsx";
import AppRouter from "./component/RouterComponent";

//Router에 대한 3개의 route 지정하는 곳
// -> 나는 index 이런거로 빼서 해야징

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
