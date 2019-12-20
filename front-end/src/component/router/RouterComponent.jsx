import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Entrance from '../page/Entrance';
import Login from '../login/LoginContainer';
import ListUserComponent from '../user/ListUserComponent';

//Route에 현재 localhost:3000 경로로 들어온 후 뒤 주소 적어주기
const AppRouter = () => {
  return(
    <div>
      <div>
        <Switch>
          <Route exact path="/" component={Entrance} />
          <Route path="/login" component={Login} />
          <Route path="/users" component={ListUserComponent} />
        </Switch>
      </div>
    </div>
  );
}

export default AppRouter;