import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListStoreComponent from "./component/user/ListStoreComponent";
import AddStoreComponent from "./component/user/AddStoreComponent";


function App() {
  return (
      <div className="container">
          <Router>
              <div className="col-md-6">
                  <Switch>
                      <Route path="/" exact component={ListStoreComponent} />
                      <Route path="/users" component={ListStoreComponent} />
                      <Route path="/add-reserve" component={AddStoreComponent} />
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