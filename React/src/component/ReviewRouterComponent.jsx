import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ReviewListUserComponent from "./StoreReview/ReviewListUserComponent";
import ReviewAddUserComponent from "./StoreReview/ReviewAddUserComponent";
import Modal from "./user/Modal";


const ReviewAppRouter = () => {
    return(
        <div style={style}>
            <Router>
                    <Switch>
                        <Modal/>
                        <Route path="/" exact component={ReviewListUserComponent} />
                        <Route path="/store" component={ReviewListUserComponent} />
                        <Route path="/add-review" component={ReviewAddUserComponent} />
                    </Switch>
            </Router>
        </div>
    )
}

const style={
    marginTop:'20px'
}

export default ReviewAppRouter;