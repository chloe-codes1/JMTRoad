//matarial-ul 쓸꺼얌
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


const style = {
  flexGrow: 1
};

class NavBar extends React.Component {
  render() {
    //props 설정
    const { logged, onLogout } = this.props;

    const styled = {
      textAlign: "right"
    };
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton edge="start" color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" style={style}>
              맛집의 민족 <FastfoodIcon />
            </Typography>
            <Link to="/main" className="Nav_Links">
              Main
            </Link>
            <Link to="/ownerList" className="Nav_Links">
              전체 음식점 보기
            </Link>
            <Link to="/project" className="Nav_Links">
            프로젝트 생성
            </Link>
            <Link to="/chat" className="Nav_Links">
              Chat
            </Link>
            <Link to="/users" className="Nav_Links">
              User List
            </Link>
            <Link to="/mypage" className="Nav_Links">
              My Page
            </Link>
            {logged ? (
              <div style={styled}>
                <div>
                  <Link to="/" onClick={onLogout} className="Nav_Links">
                    {" "}
                    로그아웃{" "}
                  </Link>
                </div>
              </div>
            ) : (
              <div style={styled}>
                <div>
                  <Link to="/login" className="Nav_Links"> 로그인 </Link>
                </div>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NavBar;