import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListStoreComponent from "./component/user/ListStoreComponent";
import AddStoreComponent from "./component/user/AddStoreComponent";
import RegStoreComponent from "./component/user/RegStoreComponent";
import OneStoreComponent from "./component/user/OneStoreComponent";

function App() {
  return (
      <div className="container">
          <Router>
              <div className="col-md-6">
                  <Switch>
                      <Route path="/" exact component={ListStoreComponent} />
                      <Route path="/addstore" component={AddStoreComponent} />
                      <Route path="/regowners" component={RegStoreComponent}/>
                      {/* <Route exact path={'/one/:ownerNo'} component={OneStoreComponent}/> */}
                      
                      <Route path="/owners" component={ListStoreComponent} />
                      <Route path="/one" component={OneStoreComponent}/>
                    {/* <Route exact path = {'/one/:ownerNo'} component={OneStoreComponent} /> */}
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