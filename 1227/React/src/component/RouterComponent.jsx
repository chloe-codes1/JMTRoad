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

const AppRouter = () => {
    return(
        <div style={style}>
            <Router>
                    <Switch>
                        <Route path="/store" exact component={StorePageComponent} />
                         {/* <Route path="/Storeinfo-list" exact component={StoreinfoListUserComponent} />
                        <Route path="/Storeinfo-list" component={StoreinfoListUserComponent} />
                        <Route path="/Storeinfo-add" component={StoreinfoAddUserComponent} />
                        
                        <Route path="/store" component={ReviewRouterComponent} /> 
                        <Route path="/store1" component={ReviewListUserComponent} />*/}
                        
                        {/* <Route path="/waiting" exact component={WaitingListUserComponent} />
                        <Route path="/users-waiting" component={WaitingListUserComponent} />
                        <Route path="/add-waiting" component={WaitingAddUserComponent} />

                        <Route path="/reserve" exact component={ReservationListUserComponent} />
                        <Route path="/users-reserve" component={ReservationListUserComponent} />
                        <Route path="/add-reserve" component={ReservationAddUserComponent} /> */}
                        
                    </Switch>
            </Router>
        </div>
    )
}

const style={
    marginTop:'20px'
}

export default AppRouter;