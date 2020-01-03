import React from "react";
import { Route, Switch } from "react-router-dom";
import AddUserComponent from "./user/AddUserComponent";
import EditUserComponent from "./user/EditUserComponent";
import ListUserComponent from "./user/ListUserComponent";
import MyPage from "./mypage/MyPage";
import OthersPage from "./mypage/OthersPage";
import MyPageProfile from "./mypage/MyPageProfile";
import MyPageWithdraw from "./mypage/MyPageWithdraw";
import Chat from "./chat/Chat";
import Entrance from "./page/Entrance";
import Login from "./login/LoginContainer";
import Project from "./project/Project";
import StorePageComponent from "./user/StorePageComponent";
import ListStoreComponent from "./owner/ListStoreComponent";
import EditStoreComponent from "./owner/EditStoreComponent";
import RegStoreComponent from "./owner/RegStoreComponent";
import OneStoreComponent from "./owner/OneStoreComponent";
import OwnerLoginComponent from "./owner/OwnerLoginComponent";
import OwnerMainComponent from "./owner/OwnerMainComponent";
import NoStoreComponent from "./owner/NoStoreComponent"
import ReviewListComponent from "./StoreReview/ReviewListUserComponent"
import TodayWaitingListComponent from "./owner/TodayWaitingListComponent"
import TodayreserveListComponent from "./owner/TodayreservationListComponent"
import RequestReserveListComponent from "./owner/RequestReserveListComponent"

const AppRouter = () => {
  return (
    <div>
      <div className="col-md-6" style={style}>
        <Switch>
          <Route exact path="/" component={OwnerLoginComponent} />
          <Route path="/ownerlogin"  component={OwnerLoginComponent} />
          <Route path="/regowners" component={RegStoreComponent} />
          <Route path="/ownerMain" component={OwnerMainComponent} />
          <Route path="/addstore" component={EditStoreComponent} />
          <Route path="/No" component={NoStoreComponent} />
          <Route path="/store"  component={StorePageComponent} />

          
        </Switch>

      </div>
    </div>
  );
};

const style = {
  marginTop: "30px"
};

export default AppRouter;
