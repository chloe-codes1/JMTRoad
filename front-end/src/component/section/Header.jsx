import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

class Header extends Component{

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
        {logged ?
          <div style={styled}>
            <ShortCut>
              <Link to="/" onClick={onLogout}> 로그아웃 </Link>
            </ShortCut>
          </div> :
          <div style={styled}>
            <ShortCut>
              <Link to="/login"> 로그인/회원가입 </Link>
            </ShortCut>
          </div>
        }
      </div>
    );
  }
}

const ShortCut = styled.div`
  order: 1;
  width: 100%;
  heigh: 20px;
  display: inline;
  text-align: right;
  background-color: #a8ff78;
`

export default withRouter(Header);