import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListUserComponent from "./user/ListUserComponent";
import AddUserComponent from "./user/AddUserComponent";

import React from "react";

const AppRouter = () => {
    return(
        <div>
            <Router>
                <div className="col-md-6">
                    <h1 className="text-center" style={style}> User Application</h1>
                    <Switch>
                        <Route path="/reserve" exact component={ListUserComponent} />
                        <Route path="/users" component={ListUserComponent} />
                        <Route path="/add-reserve" component={AddUserComponent} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

const style = {
    color: 'red',
    margin: '10px'
}

export default AppRouter;