import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component{
  
  state = {
    modal: false
  }

  handleOpenModal = () => {
    this.setState({
      modal: true
    });
  };

  render(){

    //props 설정
    const { logged, onLogout } = this.props;

    const styled = {
      textAlign: "right"
    }

    //Logout버튼 눌렀는데 onLogout은 어디에서 실행되는거야?
    return(
      <div>
        <h1>Header.jsx</h1>
        <div>
          {logged ?
            <div style={styled}>
              <div>
                <Link to="/" onClick={onLogout}> 로그아웃 </Link>
              </div>
            </div> :
            <div style={styled}> 
              <div>
                <Link to="/login">
                  <button onClick={this.handleOpenModal}>
                    로그인
                  </button>
                </Link>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}



export default Header;