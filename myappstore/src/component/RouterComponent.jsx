import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListStoreComponent from "./user/ListStoreComponent";
import AddUserComponent from "./user/AddStoreComponent";

import React from "react";

const AppRouter = () => {
    return(
        <div>
            <Router>
                <div className="col-md-6">
                    <h1 className="text-center" style={style}> User Application</h1>
                    <Switch>
                        <Route path="/reserve" exact component={ListStoreComponent} />
                        <Route path="/users" component={ListStoreComponent} />
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