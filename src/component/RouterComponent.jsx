import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListUserComponent from "./user/ListUserComponent";
import AddUserComponent from "./user/AddUserComponent";
import EditUserComponent from "./user/EditUserComponent";
import StorePageComponent from "./user/StorePageComponent";

import ReviewRouterComponent from "../component/ReviewRouterComponent";

const AppRouter = () => {
    return(
        <div style={style}>
            <Router>
                    <Switch>
                        <Route path="/store" exact component={StorePageComponent} />
                        <Route path="/storelist" exact component={ListUserComponent} />
                        <Route path="/storeinfo" component={ListUserComponent} />
                        <Route path="/add-user" component={AddUserComponent} />
                        <Route path="/edit-user" component={EditUserComponent} />
                        <Route path="/storeReview" component={ReviewRouterComponent} />

                    </Switch>
            </Router>
        </div>
    )
}

const style={
    marginTop:'20px'
}

export default AppRouter;