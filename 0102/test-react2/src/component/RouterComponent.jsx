import React from "react";
import { Route, Switch } from "react-router-dom";
import AddUserComponent from "./user/AddUserComponent";
import EditUserComponent from "./user/EditUserComponent";
import ListUserComponent from "./user/ListUserComponent";
import MyPage from "./mypage/MyPage";
import OthersPage from "./mypage/OthersPage";
import MyPageProfile from "./mypage/MyPageProfile";
import MyPageWithdraw from "./mypage/MyPageWithdraw";
import FormMail from "./admin/FormMail";
import Main from "./main/Main";
import Chat from "./chat/Chat";
import Entrance from "./page/Entrance";
import Login from "./login/LoginContainer";
import Project from "./project/Project";

const AppRouter = () => {
  return (
    <div>
      <div className="col-md-6" style={style}>
        <Switch>
        <Route exact path="/" component={Entrance} />
          <Route path="/main" exact component={Main} />
          <Route path="/mypage" component={MyPage} />
          <Route path="/others-page" component={OthersPage}/>
          <Route path="/profile" component={MyPageProfile} />
          <Route path="/withdraw" component={MyPageWithdraw} />
          <Route path="/users" component={ListUserComponent} />
          <Route path="/add-user" component={AddUserComponent} />
          <Route path="/edit-user" component={EditUserComponent} />
          <Route path="/mail" component={FormMail}/>
          <Route path="/chat" component={Chat}/>
          <Route path="/login" component={Login} />
          <Route path="/project" component={Project}/>
        </Switch>

      </div>
    </div>
  );
};

const style = {
  marginTop: "30px"
};

export default AppRouter;
