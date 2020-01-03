import React from "react";
import { Route, Switch } from "react-router-dom";
// import AddUserComponent from "./user/AddUserComponent";
// import EditUserComponent from "./user/EditUserComponent";
// import ListUserComponent from "./user/ListUserComponent";
// import MyPage from "./mypage/MyPage";
// import OthersPage from "./mypage/OthersPage";
// import MyPageProfile from "./mypage/MyPageProfile";
// import MyPageWithdraw from "./mypage/MyPageWithdraw";
// import FormMail from "./admin/FormMail";
// import Main from "./main/Main";
// import Chat from "./chat/Chat";
// import Entrance from "./page/Entrance";
// import Login from "./login/LoginContainer";
// import Project from "./project/Project";
// import StorePageComponent from "./user/StorePageComponent";
// import ListStoreComponent from "./owner/ListStoreComponent";
import EditStoreComponent from "./EditStoreComponent";
import RegStoreComponent from "./RegStoreComponent";
// import OneStoreComponent from "./owner/OneStoreComponent";
import OwnerLoginComponent from "./OwnerLoginComponent";
import OwnerMainComponent from "./OwnerMainComponent";
import NoStoreComponent from "./NoStoreComponent"
// import ReviewListComponent from "./StoreReview/ReviewListUserComponent"

const AppRouter1 = () => {
  return (
    <div>
       <div className="col-md-6" style={style}>
         <Switch>
{/* //           <Route exact path="/" component={Entrance} />
//           <Route path="/main" exact component={Main} />
//           <Route path="/mypage" component={MyPage} />
//           <Route path="/others-page" component={OthersPage} />
//           <Route path="/profile" component={MyPageProfile} />
//           <Route path="/withdraw" component={MyPageWithdraw} />
//           <Route path="/users" component={ListUserComponent} />
//           <Route path="/add-user" component={AddUserComponent} />
//           <Route path="/edit-user" component={EditUserComponent} />
//           <Route path="/mail" component={FormMail} />
//           <Route path="/chat" component={Chat} />
//           <Route path="/login" component={Login} />
//           <Route path="/project" component={Project} />
//           <Route path="/store" exact component={StorePageComponent} /> */}
          <Route path="/ownerlogin" component={OwnerLoginComponent} />
{/* //           <Route path="/ownerList" exact component={ListStoreComponent} /> */}
          <Route path="/addstore" component={EditStoreComponent} />
          <Route path="/regowners" component={RegStoreComponent} />
{/* //           <Route path="/owners" component={ListStoreComponent} />
//           <Route path="/one" component={OneStoreComponent} /> */}
          <Route path="/ownerMain" component={OwnerMainComponent} />
          <Route path="/No" component={NoStoreComponent} />
{/* //           <Route path="/ReviewList" component={ReviewListComponent} />
//           <Route path="/waitingList" component={TodayWaitingListComponent}/>
//           <Route path="/todayreserveList" component={TodayreserveListComponent}/>
//           <Route path="/RequestReserveList" component={RequestReserveListComponent}/>
//           <Route path="/RequestReservation" component={RequestReservation}/> */}
         </Switch>

       </div>
     </div>
   );
 };
 const style = {
   marginTop: "30px"
 };

 export default AppRouter1;
