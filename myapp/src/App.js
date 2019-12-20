import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListUserComponent from "./component/user/ListUserComponent";
import AddUserComponent from "./component/user/AddUserComponent";


function App() {
  return (
      <div className="container">
          <Router>
              <div className="col-md-6">
                  <Switch>
                      <Route path="/" exact component={ListUserComponent} />
                      <Route path="/users" component={ListUserComponent} />
                      <Route path="/add-reserve" component={AddUserComponent} />
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