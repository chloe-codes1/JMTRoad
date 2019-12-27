import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ReviewListUserComponent from "../StoreReview/ReviewListUserComponent";
import ReviewAddUserComponent from "../../component/StoreReview/ReviewAddUserComponent";
import Modal from "../user/Modal";


const ReviewRouterComponent = () => {
    return(
        <div style={style}>
            <Router>
                    <Switch>
                        <Modal/>
                        <Route path="/reviews" exact component={ReviewListUserComponent} />
                        <Route path="/reviews" component={ReviewListUserComponent} />
                        <Route path="/add-review" component={ReviewAddUserComponent} />
                    </Switch>
            </Router>
        </div>
    )
}

const style={
    marginTop:'20px'
}

export default ReviewRouterComponent;