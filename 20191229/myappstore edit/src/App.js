import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListStoreComponent from "./component/user/ListStoreComponent";
import EditStoreComponent from "./component/user/EditStoreComponent";
import RegStoreComponent from "./component/user/RegStoreComponent";
import OneStoreComponent from "./component/user/OneStoreComponent";
import OwnerLoginComponent from "./component/user/OwnerLoginComponent";
import OwnerMainComponent from  "./component/user/OwnerMainComponent";
import NoIdComponent from './component/user/NoIdComponent';
function App() {
  return (
      <div className="container">
          <Router>
              <div className="col-md-6">
                  <Switch>
                      <Route path="/ownerlogin" component={OwnerLoginComponent}/>
                      <Route path="/" exact component={ListStoreComponent} />
                      <Route path="/addstore" component={EditStoreComponent} />
                      <Route path="/regowners" component={RegStoreComponent}/>                  
                      <Route path="/owners" component={ListStoreComponent} />
                      <Route path="/one" component={OneStoreComponent}/>
                      <Route path="/ownerMain" component={OwnerMainComponent}/>
                      <Route path="/Noid" component={NoIdComponent}/>
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

const style = {
    color: 'red',
    margin: '10px'
}

export default App;