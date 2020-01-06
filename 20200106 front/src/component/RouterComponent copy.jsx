import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import StorePageComponent from "./user/StorePageComponent";

// import StoreinfoListUserComponent from "./user/StoreinfoListUserComponent";
// import StoreinfoAddUserComponent from "./user/StoreinfoAddUserComponent";
// import ReviewRouterComponent from "../StoreReview/ReviewRouterComponent";
//import ReviewRouterComponent from "../component/StoreReview/ReviewRouterComponent"
// import ReviewListUserComponent from "./StoreReview/ReviewListUserComponent";

// import WaitingListUserComponent from "./user/WaitingListUserComponent";
// import WaitingAddUserComponent from "./user/WaitingAddUserComponent";

// import ReservationListUserComponent from "./user/ReservationListUserComponent";
// import ReservationAddUserComponent from "./user/ReservationAddUserComponent";

import ListStoreComponent from "./owner/ListStoreComponent";
import EditStoreComponent from "./owner/EditStoreComponent";
import RegStoreComponent from "./owner/RegStoreComponent";
import OneStoreComponent from "./owner/OneStoreComponent";
import OwnerLoginComponent from "./owner/OwnerLoginComponent";
import OwnerMainComponent from "./owner/OwnerMainComponent";
import NoStoreComponent from "./owner/NoStoreComponent"
import ReviewListComponent from "./StoreReview/ReviewListUserComponent"

const AppRouter = () => {
    return (
        <div style={style}>
            <Router>
                <Switch>
                    <Route path="/store" exact component={StorePageComponent} />
                    <Route path="/ownerlogin" component={OwnerLoginComponent} />
                    <Route path="/" exact component={ListStoreComponent} />
                    <Route path="/addstore" component={EditStoreComponent} />
                    <Route path="/regowners" component={RegStoreComponent} />
                    <Route path="/owners" component={ListStoreComponent} />
                    <Route path="/one" component={OneStoreComponent} />
                    <Route path="/ownerMain" component={OwnerMainComponent} />
                    <Route path="/No" component={NoStoreComponent} />
                    <Route path="/ReviewList" component={ReviewListComponent}/> 

                </Switch>
            </Router>
        </div>
    )
}

const style = {
    marginTop: '20px'
}

export default AppRouter;