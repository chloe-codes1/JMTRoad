import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import StoreinfoListUserComponent from "./user/StoreinfoListUserComponent";
import StoreinfoAddUserComponent from "./user/StoreinfoAddUserComponent";
import StorePageComponent from "./user/StorePageComponent";
import ReviewRouterComponent from "../component/ReviewRouterComponent";

import ListUserComponent from "./user/ListUserComponent";
import AddUserComponent from "./user/AddUserComponent";

const AppRouter = () => {
    return(
        <div style={style}>
            <Router>
                    <Switch>
                        <Route path="/store" exact component={StorePageComponent} />
                        <Route path="/Storeinfo-list" exact component={StoreinfoListUserComponent} />
                        <Route path="/Storeinfo-list" component={StoreinfoListUserComponent} />
                        <Route path="/Storeinfo-add" component={StoreinfoAddUserComponent} />
                        <Route path="/storeReview" component={ReviewRouterComponent} />
                        
                        <Route path="/reserve" exact component={ListUserComponent} />
                        <Route path="/users" component={ListUserComponent} />
                        <Route path="/add-reserve" component={AddUserComponent} />
                    </Switch>
            </Router>
        </div>
    )
}

const style={
    marginTop:'20px'
}

export default AppRouter;